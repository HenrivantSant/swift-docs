---
title: Builder
---

To create a GraphQl schema, you need to use the `Swift\GraphQl\Schema\Builder\Builder`. This class is used to generated objects will be interpreted by the Compiler to generate the Schema. The builder comes with the following static methods.

```php
<?php declare( strict_types=1 );

namespace Swift\GraphQl\Schema\Builder;


use GraphQL\Type\Definition\ListOfType;
use GraphQL\Type\Definition\Type;

class Builder {
    
    public static function enumType( string $name ): EnumBuilder {
        return EnumBuilder::create( $name );
    }
    
    public static function fieldType( string $name, \GraphQL\Type\Definition\Type|callable $type ): FieldBuilder {
        return FieldBuilder::create( $name, $type );
    }
    
    public static function connectionType( string $name, ObjectBuilder $builder ): ConnectionBuilder {
        return ConnectionBuilder::create( $name, $builder );
    }
    
    public static function inputField( string $name, mixed $type ): InputFieldBuilder {
        return InputFieldBuilder::create( $name, $type );
    }
    
    public static function inputObject( string $name ): InputObjectBuilder {
        return InputObjectBuilder::create( $name );
    }
    
    public static function interface( string $name ): InterfaceBuilder {
        return InterfaceBuilder::create( $name );
    }
    
    public static function objectType( string $name ): ObjectBuilder {
        return ObjectBuilder::create( $name );
    }
    
    public static function directive( string $name ): DirectiveBuilder {
        return DirectiveBuilder::create( $name );
    }
    
    public static function union( string $name ): UnionBuilder {
        return UnionBuilder::create( $name );
    }
    
    public static function listOf( mixed $type ): ListOfType {
        return Type::listOf( $type );
    }
    
    public static function nonNull( mixed $type ): \GraphQL\Type\Definition\NonNull {
        return Type::nonNull( $type );
    }
    
}
```

## Add a Query or Mutation
To register a query or mutation we have to add a field to the Query or Mutation type, which are already predefined in the Schema. How extending the type works is explained in the following section. See the example below how the AuthTokenGet mutation is added to the Mutations type.
```php
$registry->extendType( 'Mutation', function ( ObjectBuilder $objectBuilder ) use ( $registry ) {
    $accessTokenResponse = $this->generateAccessTokenResult( $registry );
    
    $objectBuilder->addField( 'AuthAccessTokenGet', [
        'type'    => static fn() => Registry::$typeMap[ $accessTokenResponse->getName() ],
        'description' => 'Get an access token as client',
        'args'    => [
            'grantType' => [
                'type' => Type::string(),
            ],
            'clientId' => [
                'type' => Type::string(),
            ],
            'clientSecret' => [
                'type' => Type::string(),
            ],
        ],
        'resolve' => function ( $objectValue, $args, $context, $info ) {
            return $this->clientResolver->resolveAuthTokenGet( $objectValue, $args, $context, $info );
        },
    ] );
    
} );
```

## Extending a type
It is likely that at some point you will want or have to extend a type in the Schema. The following section explains how to do this. For example when adding a Query or Mutation, you will have to extend the Query or Mutation type to add a field.

Extending a field is done by all `extendType( string $name, \Closure $closure )` method. The `$name` parameter is the name of the type you want to extend. The `$closure` parameter is a closure that will be called with the type builder as parameter. In this Closure (like in the example above) you can add fields to the type and register new types that didn't exist before.

## Referring to other types
For GraphQl Resolver to work it is important to refer the Core GraphQl type as type to use. Those will only be available after the Schema is compiled. Another option is that the type you're referring to is not yet defined in the building phase. There it is always possible (like in the example above) to lazily refer to types with a Closure. This Closure will only be called when the type is needed in the Resolver. This is where the Registry comes in handy.

The Registry has a static property `$typeMap` that contains all types that are defined in the Schema. This property is used to refer to types that are not yet defined in the building phase, but will be after compilation.