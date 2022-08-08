---
title: Rate Limiter
---

The rate limiter is responsible for limiting the rate of requests a user can make to the application within a given time period. This is useful for preventing a user from spamming the application, but mainly to control the amount of requests a user is allowed to make. The rate limiter is configured in the `etc/config/security.yaml` file.

```yaml
rate_limit:
  enabled: true
  enable_default: true
  default_limit: 10
  default_period: 60
  default_strategy: sliding_window
  rates:
    - { name: foo_bar, strategy: sliding_window, limit: 30, period: 60 }
```

Rate limits are measured using a [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket#:~:text=The%20token%20bucket%20is%20an,variations%20in%20the%20traffic%20flow). The limit is the maximum number of tokens that can be stored in the bucket. The period is the time in seconds that the bucket is allowed to hold tokens. The strategy is the algorithm used to determine the number of tokens that are added to the bucket.

## Default Rate Limiter
The default rate limiter limits all incoming requests as configured. The `Swift\Security\RateLimiter\Kernel\Middleware\RateLimitingMiddleware` middleware is responsible for adding the default rate limiter to the request. The default_limit, default_period and default_strategy are configured in the `etc/config/security.yaml` file. Default rate limiter is disabled by default. To enable it, set `default_enabled: true` in the `rate_limit` section. 

By default, each request consumes one token. 

### GraphQL Rate Limiter
GraphQl requests consume at least one token, however this is calculated based on the complexity of the query. The complexity of the query is determined by the number of fields in the query divided by 100. For example, a query with 100 fields will consume 1 token. A query with 200 fields will consume 2 tokens. The minimum is 1 token. A query with 170 fields, will consume 2 tokens (170 / 100 = 1.7). This will round off at 2 tokens.

## Custom Rate Limiter
There's a dozen of reasons to use a custom rate limiter. The most common is to limit the rate of requests to a specific endpoint, or you might want to limit the rate of requests to a specific user. You can still combine this with the default rate limiter. An example of this is Login throttling.

### Configuration
The easiest way to configure a custom rate limiter is to add a new rate to the `rates` array in the `rate_limit` section of the `etc/config/security.yaml` file.

```yaml
  rates:
    - { name: foo_bar, strategy: sliding_window, limit: 30, period: 60 }
```

The RateLimiterFactory will now look for a rate with the name `foo_bar` and return a RateLimiter configured as such. 

### Rate Limiter Configuration Factory
The RateLimiterConfigurationFactory is responsible for creating RateLimiterConfigurationInterface instances. These represent the configuration for a rate limiter.

#### Example 
This example shows how Swift uses the RateLimiterConfigurationFactory to create a RateLimiterConfigurationInterface instance for the custom configured rate limiter through configuration.
```php
<?php declare( strict_types=1 );

namespace Swift\Security\RateLimiter\Factory;

use Swift\DependencyInjection\Attributes\Autowire;

#[Autowire]
class ConfigurationFactory implements \Swift\Security\RateLimiter\Factory\RateLimiterConfigurationFactoryInterface {
    
    public function __construct(
        protected \Swift\Configuration\ConfigurationInterface $configuration,
    ) {
    }
    
    public function create( string $name, string $stateId ): ?RateLimiterConfigurationInterface {
        $config = $this->configuration->get( 'rate_limit.rates', 'security' );
        
        if ( ! isset( $config[ $name ] ) ) {
            return null;
        }
        
        return new RateLimiterConfiguration(
            $name,
            $config[ $name ][ 'strategy' ],
            $stateId,
            $config[ $name ][ 'limit' ],
            new \DateInterval( 'PT' . $config[ $name ][ 'period' ] . 'S' ),
        );
        
    }
    
}
```

### Rate Limiter Factory
The RateLimiterFactory is responsible for creating RateLimiterInterface instances based on the RateLimiterConfigurationInterface.

#### Example
This example shows how Swift uses the RateLimiterFactory to create a RateLimiterInterface instance.
```php
<?php declare( strict_types=1 );

namespace Swift\Security\RateLimiter\Strategy;

use Swift\DependencyInjection\Attributes\Autowire;
use Swift\Security\RateLimiter\Factory\RateLimiterConfigurationInterface;
use Swift\Security\RateLimiter\RateLimiterInterface;
use Swift\Security\RateLimiter\Storage\DatabaseTokenStorage;

#[Autowire]
class CoreStrategyFactory implements RateLimiterStrategyFactoryInterface {
    
    public function __construct(
        protected DatabaseTokenStorage $databaseTokenStorage,
    ) {
    }
    
    public function create( RateLimiterConfigurationInterface $configuration ): ?RateLimiterInterface {
        return match ( $configuration->getStrategy() ) {
            SlidingWindowStrategy::NAME, SlidingWindowStrategy::class => new SlidingWindowStrategy(
                $configuration->getName(),
                $configuration->getStateId(),
                $configuration->getLimit(),
                $configuration->getInterval(),
                $this->databaseTokenStorage,
            ),
            
            default => null,
        };
    }
    
}
```

### Token storage 
The TokenStorage is responsible for storing and fetching token buckets. By default, the TokenStorage is a DatabaseTokenStorage, but a custom TokenStorage can be used.

#### Example
```php
<?php declare( strict_types=1 );

namespace Swift\Security\RateLimiter\Storage;

use Swift\DependencyInjection\Attributes\Autowire;
use Swift\Security\RateLimiter\TokenBucketInterface;

#[Autowire]
class DatabaseTokenStorage implements StorageInterface {
    
    public function __construct(
        protected \Swift\Orm\EntityManagerInterface $entityManager,
    ) {
    }
    
    public function persist( TokenBucketInterface $tokenBucket ): void {
        foreach ( $tokenBucket->getTokens() as $token ) {
            $this->entityManager->persist( $token );
        }
        
        $this->entityManager->run();
    }
    
    public function fetch( string $name, string $stateId ): ?TokenBucketInterface {
        $tokens = $this->entityManager->findMany( LimiterTokenEntity::class, [
            'rateName' => $name,
            'stateId'  => $stateId,
        ] );
        
        return new DatabaseTokenBucket( $name, $stateId, $tokens );
    }
    
    public function reset( string $name, string $stateId, ?\DateTimeInterface $before = null ): void {
        $tokens = $this->entityManager->findMany( LimiterTokenEntity::class, [
            'rateName' => $name,
            'stateId'  => $stateId,
        ] );
        
        foreach ( $tokens as $token ) {
            if ( ( $before !== null ) && ( $token->getCreatedAt() > $before ) ) {
                continue;
            }
            
            $this->entityManager->delete( $token );
        }
        $this->entityManager->run();
    }
    
}
```

### Strategy
The Strategy is responsible for calculating the number of tokens to consume. The default strategy is the SlidingWindowStrategy. A custom strategy can be used by implementing the `Swift\Security\RateLimiter\RateLimiterInterface`. And defining a factory for initializing the strategy, like the CoreStrategyFactory above.

## Strategy
Strategies are responsible for calculating the number of tokens over a period of time. The default strategy is the SlidingWindowStrategy. This is the strategy that Swift uses by default and is the most common strategy. However, you can create your own strategy and use it by implementing the `Swift\Security\RateLimiter\RateLimiterInterface`. An example of another strategy is the FixedWindowStrategy.

### Sliding window
The SlidingWindowStrategy calculated the number of available tokens based on how many tokens were consumed between the moment of the request and the moment of the request minus the interval.

For example, if a request is made at time `t` and the interval is `1 minute`. The strategy will fetch all tokens created between `t - 1 minute` and `t`. It will now withdraw those tokens from the limit and return the number of tokens that can still be consumed.

## Usage
Interaction with the Rate Limiter is done through the `Swift\Security\RateLimiter\RateLimiterFactory`. The RateLimiterFactory is responsible for creating RateLimiterInterface instances.

### Example of usage in middleware
```php
<?php declare( strict_types=1 );

namespace Swift\Security\RateLimiter\Kernel\Middleware;

use Swift\Configuration\ConfigurationInterface;
use Swift\DependencyInjection\Attributes\Autowire;
use Swift\Kernel\Middleware\KernelMiddlewareOrder;
use Swift\Kernel\Middleware\MiddlewareInterface;
use Swift\Security\RateLimiter\RateLimit;
use Swift\Security\RateLimiter\RateLimiterFactory;

#[Autowire]
class RateLimitingMiddleware implements MiddlewareInterface {
    
    public function __construct(
        protected RateLimiterFactory     $rateLimiterFactory,
        protected ConfigurationInterface $configuration,
    ) {
    }
    
    public function getOrder(): int {
        return KernelMiddlewareOrder::RATE_LIMIT;
    }
    
    public function process(
        \Psr\Http\Message\ServerRequestInterface $request,
        \Psr\Http\Server\RequestHandlerInterface $handler,
    ): \Psr\Http\Message\ResponseInterface {
        // If rate limiting is disabled, skip this middleware
        if ( ! $this->configuration->get( 'rate_limit.enabled', 'security' ) ) {
            return $handler->handle( $request );
        }
        // If this is a GraphQL request, skip this middleware. GraphQL rate limiting is handled by the QueryComplexityRateLimiter rule.
        if ( \Swift\GraphQl\Util::isGraphQlRequest( $request ) ) {
            return $handler->handle( $request );
        }
        
        if ( $this->configuration->get('rate_limit.enable_default', 'security') ) {
            // Returns a RateLimiterInterface of null if no rate limiter is found.
            // The utility will automatically fetch a state id, for non-authenticated requests it will use the IP address, for authenticated requests it will use the user uuid.
            $limiter = $this->rateLimiterFactory->create( 'default', \Swift\Security\RateLimiter\Util::getStateFromRequest( $request ) );
            // This will return a Swift\Security\RateLimiter\RateLimit object.
            $rate = $limiter?->consume( 1 );
    
            // This will throw a Swift\HttpFoundation\Exception\TooManyRequestsException if the rate limit is exceeded.
            // The Kernel will handle this exception and return a 429 response.
            $rate->denyIfNotAccepted();
            
            // Another option is to manually check if the rate limit is exceeded.
            // if ( $rate->isAccepted() ) { // rate limit is not exceeded }
        }
        
        $response = $handler->handle( $request );
        
        // RateLimiter::bindToResponse will add the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers to the response.
        return RateLimit::bindToResponse( $rate ?? null, $response );
    }
    
}
```

### Example of usage in EventSubscriber
```php
<?php declare( strict_types=1 );

namespace Swift\Security\Firewall\EventSubscriber;

use Swift\DependencyInjection\Attributes\Autowire;
use Swift\Security\Firewall\Exception\LoginThrottlingTooManyAttempts;
use Swift\Security\User\Authentication\Passport\Stamp\LoginStamp;

#[Autowire]
class CheckPassportSubscriber implements \Swift\Events\EventSubscriberInterface {
    
    public function __construct(
        protected \Swift\Security\RateLimiter\RateLimiterFactory $rateLimiterFactory,
    ) {
    }
    
    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents(): array {
        return [
            \Swift\Security\Authentication\Events\CheckPassportEvent::class => [
                'loginThrottling',
            ],
        ];
    }
    
    /**
     * Validate the login throttling.
     *
     * @param \Swift\Security\Authentication\Events\CheckPassportEvent $event
     *
     * @return void
     */
    public function loginThrottling( \Swift\Security\Authentication\Events\CheckPassportEvent $event ): void {
        if ( ! $event->getPassport()->hasStamp( LoginStamp::class ) ) {
            return;
        }
        
        $limiter = $this->rateLimiterFactory->create( 'login_throttling', $event->getPassport()->getUser()->getUuid() );
        $rate    = $limiter?->consume();
        
        if ( ! $rate->isAccepted() ) {
            throw new LoginThrottlingTooManyAttempts( $rate );
        }
        
    }
    
}
```

### Rate Limiter HTTP Headers
It is good practice to add the rate limiter headers to the response. This is easily done by using the RateLimiter::bindToResponse method. Like in the example above, the RateLimiter::bindToResponse method will add the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers to the response.

```php
/**
 * Binds rate limit headers to a response.
 *
 * @param \Swift\Security\RateLimiter\RateLimitInterface|null $rateLimit
 * @param \Psr\Http\Message\ResponseInterface                 $response
 *
 * @return \Psr\Http\Message\ResponseInterface
 */
public static function bindToResponse( ?RateLimitInterface $rateLimit, ResponseInterface $response ): ResponseInterface {
    if ( ! $rateLimit ) {
        return $response;
    }
    
    return $response->withHeader( 'X-RateLimit-Limit', $rateLimit->getLimit() )
                    ->withHeader( 'X-RateLimit-Remaining', $rateLimit->getAvailableTokens() )
                    ->withHeader( 'X-RateLimit-Reset', $rateLimit->getResetTime()->getTimestamp() );
}
```