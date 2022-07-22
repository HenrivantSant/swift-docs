---
title: Relay
---


It is recommended to follow the [Relay Server Specs](https://relay.dev/docs/guides/graphql-server-specification/) in the schema. All default Swift endpoint will comply with this spec out of the box. There's some useful abstracts and interfaces to help you on the way.

> Currently, Relay only support Collections of data queried from the database.

## Usage
To create a connection there's three basic steps.

### 1. Create a single type
This is the list of types that will be returned by the query. For example a list (connection) of Movie's.

This type should implement the `Node` interface.

> When the Node Interface is queried by id, the fieldResolver will be called with the ID param. The fieldResolver should return the entity with the given ID. If the ID not passed as an arg, you should just return the $objectValue.

```php
$type = Builder::objectType( 'Foo' )
                   ->addInterface( Relay::NODE, static fn() => Registry::$typeMap[ Relay::NODE ] )
                   ->addField(
                       'id',
                       Builder::fieldType(
                           'id',
                           static fn() => Builder::nonNull( Type::id() )
                       )->buildType(),
                   )
                   ->addField(
                       'title',
                       Builder::fieldType(
                           'title',
                           static fn() => Builder::nonNull( Type::string() )
                       )->buildType(),
                   )
                   ->addField(
                       'description',
                       Builder::fieldType(
                           'description',
                           static fn() => Builder::nonNull( Type::string() )
                       )->buildType(),
                   )
                   ->setFieldResolver( function ( $objectValue, array $args, $context, ResolveInfo $info ) {
                       // Resolve Node Interface query
                       if ( ! $objectValue && ! empty( $args[ 'id' ] ) ) {
                           return $this->entityManager->findOne( Movie::class, $args[ 'id' ] );
                       }
        
                       return $objectValue;
                   } );
    
$registry->objectType( $type );
```

### 2. Create a connection type
This is the type that will be returned by the query, the connection. This is fairly easy as the Relay Middleware will do most of the work for you. All you need to do create a connection and refer it to the type you created in step 1.

```php
$connection = Builder::connectionType( 'FooConnection', $type );   
$registry->objectType( $connection );
```

### 3. Add the connection to the query
This is the last step. You need to add the connection to the query. So it actually becomes available. 

> Note that Relay expects a `Swift\Orm\Dbal\ResultCollectionInterface` as the result of the query. This is always the return value of any findMany query on the ORMs EntityManager. However, you can also use any other implementation of the interface.

```php
$registry->extendType( 'Query', function ( ObjectBuilder $builder ) use ( $connection ) {
    $query = Builder::fieldType( 'FooList', static fn() => Registry::$typeMap[ $connection->getName() ] )
                    ->setResolver( function ( $objectValue, $args, $context, ResolveInfo $info ) {
                        // Resolve connection
                        return $this->entityManager->findMany( Movie::class );
                    } );
    
    $builder->addField( 'FooList', $query->buildType() );
    
    return $builder;
} );
```

## Full example
The full example below as generators looks like this:

```php
<?php declare( strict_types=1 );

namespace Foo\GraphQl\Schema\Generator;

use Foo\Repository\Movie;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Swift\DependencyInjection\Attributes\Autowire;
use Swift\GraphQl\Relay\Relay;
use Swift\GraphQl\Schema\Builder\Builder;
use Swift\GraphQl\Schema\Builder\ObjectBuilder;
use Swift\GraphQl\Schema\Registry;
use Swift\Orm\EntityManagerInterface;

#[Autowire]
class DemoGenerator implements \Swift\GraphQl\Schema\Generator\GeneratorInterface {
    
    public function __construct(
        protected readonly EntityManagerInterface $entityManager,
    ) {
    }
    
    public function generate( \Swift\GraphQl\Schema\Registry $registry ): \Swift\GraphQl\Schema\Registry {
        $type = $this->genType( $registry );
        
        $connection = Builder::connectionType( 'FooConnection', $type );
        $registry->objectType( $connection );
        
        $registry->extendType( 'Query', function ( ObjectBuilder $builder ) use ( $connection ) {
            $query = Builder::fieldType( 'FooList', static fn() => Registry::$typeMap[ $connection->getName() ] )
                            ->setResolver( function ( $objectValue, $args, $context, ResolveInfo $info ) {
                                // Resolve connection
                                return $this->entityManager->findMany( Movie::class );
                            } );
            
            $builder->addField( 'FooList', $query->buildType() );
            
            return $builder;
        } );
        
        return $registry;
    }
    
    public function genType( \Swift\GraphQl\Schema\Registry $registry ): ObjectBuilder {
        $type = Builder::objectType( 'Foo' )
                       ->addInterface( Relay::NODE, static fn() => Registry::$typeMap[ Relay::NODE ] )
                       ->addField(
                           'id',
                           Builder::fieldType(
                               'id',
                               static fn() => Builder::nonNull( Type::id() )
                           )->buildType(),
                       )
                       ->addField(
                           'title',
                           Builder::fieldType(
                               'title',
                               static fn() => Builder::nonNull( Type::string() )
                           )->buildType(),
                       )
                       ->addField(
                           'description',
                           Builder::fieldType(
                               'description',
                               static fn() => Builder::nonNull( Type::string() )
                           )->buildType(),
                       )
                       ->setFieldResolver( function ( $objectValue, array $args, $context, ResolveInfo $info ) {
                           // Resolve Node Interface query
                           if ( ! $objectValue && ! empty( $args[ 'id' ] ) ) {
                               return $this->entityManager->findOne( Movie::class, $args[ 'id' ] );
                           }
            
                           return $objectValue;
                       } );
        
        $registry->objectType( $type );
        
        return $type;
    }
    
}
```

## Advanced
For a more advanced example: see the [ORM Generator](https://github.com/SwiftAPI/swift/blob/main/src/Orm/GraphQl/Schema/Generator/OrmGenerator.php).