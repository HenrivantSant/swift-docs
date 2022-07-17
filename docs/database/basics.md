---
title: Basics
---

Persisting entities is done using the `Swift\Orm\EntityManager`. 

## Create, update, and delete
All persistence actions are done using the `Swift\Orm\EntityManager`.

### Create
To create a new record of an entity, create a new class instance and add the values. After that persist the entity and run entity Manager.
```php
$movie = new Movie();
$movie->setTitle( 'Foo bar' );
$movie->setDescription( 'Movie about foo bar' );
$movie->setReleased( new \DateTime() );
$movie->setType( ConditionTypeEnum::OUTSIDE_TEMP );

$this->entityManager->persist( $movie );
$this->entityManager->run();
```

In order to prevent the system from breaking, you might want to catch errors. 
```php
try {
    $this->entityManager->run();
} catch ( \Throwable $e ) {
    // handle error
}
```

### Update
To be able to update an object, you must first query the object.
```php
$movie = $this->entityManager->findByPk( Movie::class, 1 );

$movie->setDescription( 'Movie about hello foo' );

$this->entityManager->persist( $movie );
$this->entityManager->run();
```

By default the ORM will only update the fields that have changed. The given code would product SQL code like this:
```sql
UPDATE `movies`
SET `description` = "Movie about hello foo"
WHERE `id` = 1
```

### Delete an entity
An entity can be deleted by calling the `delete` method on the EntityManager.
```php
$movie = $this->entityManager->findByPk( Movie::class, 1 );

$this->entityManager->delete( $movie );
$this->entityManager->run();
```
Please note, the ORM will not automatically trigger the delete operation for related entities and will rely on foreign key rules set in the database.

## Direct database queries
You can always talk to the database directly without using the ORM abstraction on top of it. You can do this by injecting the `Swift\Dbal\Dbal` service. This is a direct implementation of the `Cycle\Database\DatabaseInterface`.

## Selecting data
The most common way to select data from the database is using the `Swift\Orm\EntityManager`. To use the entity manager you need to inject the `Swift\Orm\EntityManager` service.

The Entity Manager provides multiple methods to select the entity.

To find the entity using its primary key:
```php
$user = $entityManager->findByPk( Movie::class, 1 );
```
Null will be returned if the entity was not found.

You can use default values in the query. Field names will automatically be converted to the correct database field name.
```php
$entity = $entityManager->findOneBy( Movie::class, [
    'title' => 'Foo bar',
    'type' => FooType::BAR,
] );
```
More advanced queries can be created using the `Swift\Dbal\Arguments\Arguments`. Custom Arguments can easily be used to create custom queries. An argument is a class implementing the `Swift\Dbal\Arguments\ArgumentInterface`.
```php
$arguments = ( new \Swift\Dbal\Arguments\Arguments() )
        ->setOffset( 3 )
        ->setLimit( 2 )
        ->setOrderBy( 'title' )
        ->setDirection( \Swift\Dbal\Arguments\ArgumentDirection::DESC )
        ->addArgument( new \Swift\Dbal\Arguments\Where( 'title', \Swift\Dbal\Arguments\ArgumentComparison::CONTAINS, 'Foo' ) )
        ->addArgument( new \Swift\Dbal\Arguments\Where( 'id', \Swift\Dbal\Arguments\ArgumentComparison::IN, [ 1, 3, 5 ] ) );
    
$this->entityManager->findMany( Movie::class, [], $arguments );
```
The method `findMany` will return an `Swift\Orm\Dbal\ResultCollectionInterface`, which is an Iterator with some handy additional methods to aid in e.g. pagination.

## Simple relation
A significant part of the ORM is the ability to handle relations between objects. Relations are defined in the entity definition class using attributes.

### Describe the entity
Firstly we will have to create two entities we want to relate to one another. The first entity is called `Movie` and the second entity is called `Actor`.

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;

#[Entity( table: 'movies' )]
class Movie extends AbstractEntity {
    
    #[Field( name: 'id', primary: true, type: FieldTypes::INT, length: 11 )]
    protected int $id;
    
    #[Field( name: 'title', unique: true, index: true )]
    protected string $title;
    
    /**
     * @return int
     */
    public function getId(): int {
        return $this->id;
    }
    
    /**
     * @return string
     */
    public function getTitle(): string {
        return $this->title;
    }
    
    /**
     * @param string $title
     */
    public function setTitle( string $title ): void {
        $this->title = $title;
    }
    
}
```
And the entity we want to define a relationship with.
```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Collection\ArrayCollection;
use Swift\Orm\Types\FieldTypes;

#[Entity( table: 'movie_actors' )]
class Actor extends AbstractEntity {
    
    #[Field( name: 'id', primary: true, type: FieldTypes::INT )]
    protected int $id;
    
    #[Field( name: 'name', type: FieldTypes::TEXT )]
    protected string $name;

    /**
     * @return int
     */
    public function getId(): int {
        return $this->id;
    }
    
    /**
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }
    
    public function setName( string $name ): void {
        $this->name = $name;
    }
    
}
```

To relate our entities we have to add a new property to one of them and annotate it properly. We should also add getter and setter for this property.
```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Attributes\Relation\ManyToMany;
use Swift\Orm\Collection\ArrayCollection;
use Swift\Orm\Collection\ArrayCollectionInterface;
use Swift\Orm\Types\FieldTypes;

#[Entity( table: 'movies' )]
class Movie extends AbstractEntity {
    
    #[ManyToMany( targetEntity: Actor::class )]
    protected ArrayCollectionInterface $actors;
    
    public function __construct() {
        $this->actors  = new ArrayCollection();
    }
    
    /**
     * @return \Swift\Orm\Collection\ArrayCollectionInterface
     */
    public function getActors(): ArrayCollectionInterface {
        return $this->actors;
    }
    
    /**
     * @param \App\Foo\Repository\Actor $actor
     */
    public function addActor( Actor $actor ): void {
        $actor->addMovie( $this );
        $this->actors[] = $actor;
    }
    
}
```
We can also refer to the other side of the relation. Because we already defined the relationship in the other entity we just read it, as it's already defined in this side of the relation automatically.
```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Collection\ArrayCollection;
use Swift\Orm\Types\FieldTypes;

#[Entity( table: 'movie_actors' )]
class Actor extends AbstractEntity {
    
    protected ArrayCollection $movies;
    
    public function __construct() {
        $this->movies = new ArrayCollection();
    }
    
    /**
     * @return \Swift\Orm\Collection\ArrayCollection
     */
    public function getMovies(): ArrayCollection {
        return $this->movies;
    }
    
    public function addMovie( Movie $movie ): void {
        $this->movies[] = $movie;
    }
    
}
```

### Persisting related entities
Entities can have relations, embedded entities, and collections. Those are all handled by the ORM.
```php
$movie = new Movie();
$movie->setTitle( 'Foo bar' );
$movie->setDescription( 'Movie about foo bar' );
$movie->setReleased( new \DateTime() );
$movie->setType( ConditionType::OUTSIDE_TEMP );

$embed = new MovieEmbed();
$embed->setTest( 'test' );
$embed->setViewers( 123 );
$movie->setEmbed( $embed );

$actor = new Actor();
$actor->setName( 'David Johnson' );
$movie->addActor( $actor );
$actor2 = new Actor();
$actor2->setName( 'Davina Wheeler' );
$movie->addActor( $actor2 );
$actor3 = new Actor();
$actor3->setName( 'Greg Scott' );
$movie->addActor( $actor3 );

$user   = $this->entityManager->findByPK( UserEntity::class, 1 );
$review = new Review();
$review->setContent( 'Loving this movie!!' );
$review->setMovie( $movie );
$review->setUser( $user );
$movie->addReview( $review );
$review1 = new Review();
$review1->setContent( 'Great talent in this movie!' );
$review1->setMovie( $movie );
$review1->setUser( $user );
$movie->addReview( $review1 );

$this->entityManager->persist( $movie );
$this->entityManager->run();
```