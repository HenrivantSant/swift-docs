---
title: Middleware
---

Middleware is a queue of callbacks that will be executed in order. The middleware stack is executed in the order that the middleware is added to the stack. The middleware stack is executed for each request. The middleware is responsible for handling the request and generating the response. 

Middleware is a good place to add logging, authentication, routing, etc.

Swift middleware is compliant with the [PSR-15 middleware interface](https://www.php-fig.org/psr/psr-15/). Any implementation of the `Psr\Http\Server\MiddlewareInterface` can be used and will automatically be recognized by the kernel and added to the queue.

## Usage
Middlewares will automatically be added to the kernel. All middleware must implement the `Psr\Http\Server\MiddlewareInterface` or `Swift\Kernel\Middleware\MiddlewareInterface` which is an extension of the PSR interface.

```php
<?php declare( strict_types=1 );

namespace Swift\Kernel\Middleware;

use Swift\Configuration\ConfigurationInterface;
use Swift\DependencyInjection\Attributes\Autowire;

#[Autowire]
class CorsMiddleware implements MiddlewareInterface {
    
    public function __construct(
        protected ConfigurationInterface $configuration,
    ) {
    }
    
    public function getOrder(): int {
        return KernelMiddlewareOrder::CORS;
    }
    
    public function process(
        \Psr\Http\Message\ServerRequestInterface $request,
        \Psr\Http\Server\RequestHandlerInterface $handler,
    ): \Psr\Http\Message\ResponseInterface {
        if ( $this->configuration->get( 'app.allow_cors', 'root' ) && $request->isPreflight() ) {
            return new \Swift\HttpFoundation\CorsResponse();
        }
        
        return $handler->handle( $request );
    }
    
}
```

### Modifying the response
The handler returns a response. The response can be modified by the middleware.

```php
public function process(
    \Psr\Http\Message\ServerRequestInterface $request,
    \Psr\Http\Server\RequestHandlerInterface $handler,
): \Psr\Http\Message\ResponseInterface {
    return $handler->handle( $request )->withHeader(
        'X-Powered-By',
        $this->configuration->get( 'app.name', 'root' ),
    );
}
```

### Async middleware
ReactPHP can be used to handle async middleware. This is a good way to handle independent tasks, so they won't block the request.

```php
public function process( ServerRequestInterface $request, RequestHandlerInterface $handler ): ResponseInterface {
    // There's no point in logging cli requests
    if ( ! $this->configuration->get( 'app.log_requests', 'app' ) || ( Environment::isCli() && ! Environment::isRuntime() ) ) {
        return $handler->handle( $request );
    }
    
    \React\Async\async( function () use ( $request ) {
        $requestLog = new LogRequest();
        $requestLog->setIp( $request->getClientIp() );
        $requestLog->setOrigin( $request->getUri()->getPath() );
        $requestLog->setTime( new \DateTime() );
        $requestLog->setMethod( $request->getMethod() );
        $requestLog->setHeaders( (object) $request->getHeaders()->all() );
        $requestLog->setBody( (object) $request->getParsedBody() );
        $requestLog->setCode( 200 );

        $this->entityManager->persist( $requestLog );
        $this->entityManager->run();
    } )();
    
    return $handler->handle( $request );
}
```

## Middleware queue
All middleware is added to a queue in which it will be executed in order when it's added to the stack. This can be influenced by implementing the `Swift\Middleware\MiddlewareInterface`, which is an extension of the PSR interface.

## Middleware execution order
Middleware is executed in the order that it is added to the stack. This order can be influenced by implementing the `Swift\Middleware\MiddlewareInterface`, which is an extension of the PSR interface. This interface also adds the `getOrder(): int` method. All middlewares not implementing this method will default to order 0. 

## Default middleware
Swift itself relies fully on middleware. The middlewares that are available by default in the following order are:
### RequestParsingMiddleware
The `Swift\HttpFoundation\Kernel\Middleware\RequestParsingMiddleware` parses any PSR-7 request to a Swift `Swift\HttpFoundation\ServerRequest` request. It has order - 80.

### DefaultTimeZoneMiddleware
The `Swift\Kernel\Middleware\DefaultTimeZoneMiddleware` sets the default timezone as configured in the application config. It has order - 50.

### DeprecationMiddleware
The `Swift\Kernel\Middleware\DeprecationMiddleware` sets the correct Deprecation level for the application. It has order -50.

### CorsMiddleware
The `Swift\Kernel\Middleware\CorsMiddleware` intercepts any CORS preflight request and returns a CORS response. It has order - 45.

### AuthMiddleware
The `Swift\Security\Authentication\Kernel\Middleware\AuthMiddleware` is responsible for handling authentication. It has order - 10.

### RequestLoggingMiddleware
The `Swift\Kernel\Middleware\RequestLoggingMiddleware` logs all requests to the database if enabled. It has order 0.

### GraphQlMiddleware
The `Swift\GraphQl\Middleware\RequestMiddleware` is responsible for handling GraphQl requests. It has order 30.

### RestMiddleware
The `Swift\Router\Kernel\Middleware\RestMiddleware` is responsible for handling REST requests. It has order 40.