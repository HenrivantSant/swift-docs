---
title: Middleware
---


The GraphQl component heavily relies on middleware for both schema declaration and execution. It is possible to declare your own middleware to handle the schema and execution.

## Schema middleware
With Schema middleware you can modify declaration before they are registered in the schema. You can also block a definition from being registered in the schema. Or wrap in a new definition. Below a fairly simple example where a new resolver function is registered on the user credentials to hash them.

For a more advanced example, see how the Relay Component wraps 'simple' types in a Connection type: [example](https://github.com/SwiftAPI/swift/blob/main/src/GraphQl/Relay/Schema/Middleware/ConnectionMiddleware.php). Here you can see how an existing type is modified and new types are added.
```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\GraphQl\Schema\Middleware;


use Swift\DependencyInjection\Attributes\Autowire;
use Swift\GraphQl\Schema\Registry;
use Swift\Security\Authorization\AuthorizationCheckerInterface;
use Swift\Security\Security;

#[Autowire]
class UserCredentialsMiddleware implements \Swift\GraphQl\Schema\Middleware\SchemaMiddlewareInterface {
    
    public function __construct(
        protected Security $security,
        protected AuthorizationCheckerInterface $authorizationChecker,
    ) {
    }
    
    /**
     * @inheritDoc
     */
    public function process( mixed $builder, Registry $registry, callable $next ): mixed {
        if ( ! $builder instanceof \Swift\GraphQl\Schema\Builder\ObjectBuilder ) {
            return $next( $builder, $registry );
        }
        
        if ( $builder->getName() !== 'SecurityUsersCredential' ) {
            return $next( $builder, $registry );
        }
        
        $fields = $builder->getFields();
        
        if ( ! is_array( $fields ) ) {
            return $next( $builder, $registry );
        }
        
        // Anonymize the password field
        $fields['credential']['resolve'] = static function() {
            return '##############';
        };
        
        $builder->setFields( $fields );
    
        return $next( $builder, $registry );
    }
    
}
```


## Execution middleware
With Execution middleware you can modify the execution of a query or mutation. You can for example add a cache to your execution, or hash a field (e.g. the password of a user). Below again a fairly straight forward example where Relay uses a middleware to decode the id of Node to its actual internal id.
```php
<?php declare( strict_types=1 );

namespace Swift\GraphQl\Relay\Executor\Middleware;


use GraphQL\Type\Definition\ResolveInfo;
use Swift\Code\PropertyReader;
use Swift\DependencyInjection\Attributes\Autowire;
use Swift\GraphQl\Relay\Relay;
use Swift\GraphQl\Schema\Registry;

#[Autowire]
class NodeMiddleware implements \Swift\GraphQl\Executor\Middleware\ResolverMiddlewareInterface {
    
    public function __construct(
        protected PropertyReader $propertyReader,
    ) {
    }
    
    public function process( mixed $objectValue, mixed $args, mixed $context, ResolveInfo $info, ?callable $next = null ): mixed {
        if ( ! ( $info->fieldDefinition->getType() instanceof \GraphQL\Type\Definition\ObjectType ) ||
             ! $info->fieldDefinition->getType()->implementsInterface( Registry::$typeMap[ Relay::NODE ] )
        ) {
            return $next( $objectValue, $args, $context, $info );
        }
        
        if ( ! empty( $args[ 'id' ] ) ) {
            $response     = Relay::decodeId( $args[ 'id' ] );
            $args[ 'id' ] = (int) $response[ 'id' ];
        }
        
        return $next( $objectValue, $args, $context, $info );
    }
    
}
```

## Advanced usage
Note that calling the $next() function executes the rest of the middleware chain. It is possible to modify the output of your middleware by calling the $next() function, modifying its result and returning it.

```php
public function process( mixed $objectValue, mixed $args, mixed $context, ResolveInfo $info, ?callable $next = null ): mixed {
    // Possibly do something
    
    $resolvedValue = $next( $objectValue, $args, $context, $info );
    
    // Do something with the resolved value
    
    return $resolvedValue;
} 
```