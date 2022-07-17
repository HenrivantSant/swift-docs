---
title: Resolvers
---

In basis most types will be assigned a Resolver as a closure when being built. However sometimes you might want to separate the resolver from the type. This is possible using a Resolver class. This is a class that extends `Swift\GraphQl\Executor\Resolver\AbstractResolver`. This class comes with some useful Security features like you might be used to from REST Controllers.

The example below resolves a Query named 'SayHello'. Resolvers are executed after the default defined resolvers and middleware, but before the directives. 

See below the code for the Resolver to understand the flow.

```php
<?php declare( strict_types=1 );

namespace Swift\GraphQl\Executor;


use GraphQL\Type\Definition\ResolveInfo;
use Swift\DependencyInjection\Attributes\Autowire;
use Swift\GraphQl\Executor\Middleware\ResolverMiddlewareExecutor;
use Swift\GraphQl\Executor\Resolver\ResolverCollector;
use Swift\GraphQl\Schema\Registry;

#[Autowire]
class Resolver {
    
    public static self $instance;
    
    public function __construct(
        protected readonly ResolverCollector          $resolverCollector,
        protected readonly ResolverMiddlewareExecutor $middlewareExecutor,
    ) {
        self::$instance = $this;
    }
    
    public function resolve( $objectValue, $args, $context, ResolveInfo $info, ?callable $callback = null ): mixed {
        $resolve = function ( $objectValue, $args, $context, $info ) use ( $callback, $ref ) {
            if ( $callback ) {
                $objectValue = $callback( $objectValue, $args, $context, $info );
            } else {
                $objectValue = self::getDefaultResolver()( $objectValue, $args, $context, $info );
            }
            
            if ( $resolvers = $this->resolverCollector->get( $info->fieldDefinition->getName() ) ) {
                foreach ( $resolvers as $resolver ) {
                    $objectValue = $resolver[ 0 ]->{$resolver[ 1 ]}( $objectValue, $args, $context, $info );
                }
            }
    
            return $this->resolveDirectives( $objectValue, $args, $context, $info );
        };
        
        return $this->middlewareExecutor->process( $objectValue, $args, $context, $info, $resolve );
    }
    
    public static function wrapResolve( ?callable $callback ): \Closure {
        $instance = self::$instance;
        
        return static function ( $objectValue, $args, $context, ResolveInfo $info ) use ( $instance, $callback ) {
            return $instance->resolve( $objectValue, $args, $context, $info, $callback );
        };
    }
    
    public static function getDefaultResolver(): callable {
        return static function ( $objectValue, $args, $context, ResolveInfo $info ): mixed {
            $fieldName = $info->fieldName;
            $property  = null;
            
            if ( is_array( $objectValue ) || $objectValue instanceof \ArrayAccess ) {
                if ( isset( $objectValue[ $fieldName ] ) ) {
                    $property = $objectValue[ $fieldName ];
                }
            } else if ( is_object( $objectValue ) ) {
                if ( isset( $objectValue->{$fieldName} ) ) {
                    $property = $objectValue->{$fieldName};
                }
            }
            
            if ( $property instanceof \Closure ) {
                return $property( $objectValue, $args, $context, $info );
            }
            if ( $property ) {
                return $property;
            }
            
            try {
                $property = $objectValue?->{$fieldName} ?? null;
            } catch ( \Throwable ) {
            }
            
            return $property instanceof \Closure
                ? $property( $objectValue, $args, $context, $info )
                : $property;
        };
    }
    
    protected function resolveDirectives( $objectValue, $args, $context, ResolveInfo $info ): mixed {
        if ( empty( $info->fieldNodes[ 0 ]->directives ) ) {
            return $objectValue;
        }
        
        foreach ( $info->fieldNodes[ 0 ]->directives as $directive ) {
            $name = $directive->name->value;
            /** @var \GraphQL\Type\Definition\Directive|null $instance */
            $instance = Registry::$directivesMap[ $name ] ?? null;
            
            if ( ! $instance ) {
                continue;
            }
            
            if ( empty( $instance->config[ 'resolve' ] ) || ! is_callable( $instance->config[ 'resolve' ] ) ) {
                continue;
            }
    
            $objectValue = $instance->config[ 'resolve' ]( $objectValue, $this->getDirectiveArguments( $directive ), $context, $info, $directive );
        }
        
        
        return $objectValue;
    }
    
    /**
     * @inheritDoc
     */
    public function getDirectiveArguments( mixed $directiveNode ): array {
        $arguments = [];
        
        foreach ( $directiveNode->arguments->getIterator() as $argument ) {
            if ( property_exists( $argument->value, 'values' ) ) {
                $arguments[ $argument->name->value ] = [];
                foreach ( $argument->value->values->getIterator() as $value ) {
                    $arguments[ $argument->name->value ][] = $value->value;
                }
            }
            if ( property_exists( $argument->value, 'value' ) ) {
                $arguments[ $argument->name->value ] = $argument->value->value;
            }
        }
        
        return $arguments;
    }
    
    
}
```