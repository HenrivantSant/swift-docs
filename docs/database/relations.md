---
title: Relations
---

## HasOne
The Has One relation defines that an entity exclusively owns another entity in a form of parent-child. Consider this relation as a form of decomposition with the ability to store data in external table.

The HasOne relation is used to define the relation to one child object. This object will be automatically be saved with its parent. The simplest form of relation definition.

To define a HasOne relation, use the `HasOne` attribute.

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Relation\HasOne;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;

#[Entity( table: 'user' )]
class User extends AbstractEntity {

    #[HasOne( targetEntity: Address::class, nullable: true )]
    protected ?Address $address;
    
}
```

## HasMany
The Has Many relations defines that an entity exclusively owns multiple other entities in a form of parent-children.

To define a Has Many relation use:
```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Relation\HasOne;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Mapping\Definition\Relation\EntityRelationType;

#[Entity( table: 'movies' )]
class Movie extends AbstractEntity {

    #[HasOne( targetEntity: Address::class, nullable: true )]
    protected ?Address $address;
    
    #[HasMany( targetEntity: Review::class, inverse: new Inverse( as: 'movie', type: EntityRelationType::BELONGS_TO ) )]
    protected ArrayCollectionInterface $reviews;
    
    /**
     * @return \Swift\Orm\Collection\ArrayCollectionInterface
     */
    public function getReviews(): ArrayCollectionInterface {
        return $this->reviews;
    }
    
    /**
     * @param \App\Foo\Repository\Review $review
     */
    public function addReview( Review $review ): void {
        $review->setMovie( $this );
        $this->reviews[] = $review;
    }
    
}
```

## BelongsTo
**Belongs To** relation defines that an entity is owned by a related entity on the exclusive matter.  

**Example**: a post belongs to an author, a comment belongs a post. Most `belongsTo` relations can be created using the `inverse` option of the declared `hasOne` or `hasMany` relation.

> The entity will always be persisted after its related entity.

```php
<?php declare(strict_types=1);

namespace App\Foo\Repository;

use Swift\Orm\Attributes\Relation\BelongsTo;
use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Security\User\Entity\UserEntity;

#[Entity(table: 'movie_reviews')]
class Review extends AbstractEntity {
    
    #[BelongsTo( targetEntity: UserEntity::class, inverseAs: 'movie_reviews' )]
    protected ?UserEntity $user;

}
```
> You must properly handle the cases when the related entity is `null`.

By default, the ORM will generate an outer key in the relation object using the related entity's table and outer key ( primary key by default) values. As result column and FK will be added to Review entity on user_id column.

## RefersTo
The `RefersTo` relation is similar to the `BelongsTo` relation, but must be used to establish multiple relations to the same entity (or in case of a cyclic relation).

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Relation\HasMany;
use Swift\Orm\Attributes\Relation\RefersTo;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Mapping\Definition\Relation\EntityRelationType;

#[Entity( table: 'movies' )]
class Movie extends AbstractEntity {

    #[RefersTo(targetEntity: Review::class)]
    private ?Review $lastReview;;
    
    #[HasMany( targetEntity: Review::class, inverse: new Inverse( as: 'movie', type: EntityRelationType::BELONGS_TO ) )]
    protected ArrayCollectionInterface $reviews;
    
    /**
     * @return \Swift\Orm\Collection\ArrayCollectionInterface
     */
    public function getReviews(): ArrayCollectionInterface {
        return $this->reviews;
    }
    
    /**
     * @param \App\Foo\Repository\Review $review
     */
    public function addReview( Review $review ): void {
        $review->setMovie( $this );
        $this->reviews[] = $review;
    }
    
}
```
> You must properly handle the cases when the related entity is `null`.

By default, the ORM will generate an outer key in the relation object using the related entity's table and outer key ( primary key by default) values. As result column and FK will be added to Review entity on user_id column.

## ManyToMany
A relation of type 'Many To Many' provides a more complex connection. This relation will create a junction table to store the relation. This table will be generated automatically.

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Relation\ManyToMany;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Mapping\Definition\Relation\EntityRelationType;

#[Entity( table: 'movies' )]
class Movie extends AbstractEntity {

    #[ManyToMany( targetEntity: Actor::class )]
    protected ArrayCollectionInterface $actors;
    
}
```

Optionally you add the movies to the actors entity. There are no attributes necessary, as the relation is already defined in the `movie` entity.

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Collection\ArrayCollection;

#[Entity( table: 'movie_actors' )]
class Actor extends AbstractEntity {
    
    protected ArrayCollection $movies;
    
    public function __construct() {
        $this->movies = new ArrayCollection();
    }
    
}
```

## Embedding Entities
The ORM can simplify the definition of large entities by providing the ability to split some columns into an embedded entity. Embedded entities by default will always be loaded with the parent object. However, partial entity selection is possible as well.
> Embedded entities do not support relations at the moment.

### Definition
To define an embeddable entity use the `#[Embeddable]` (Swift\Orm\Attributes\Embeddable) attribute. As with `#[Entity]`.
```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Embeddable;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;

#[Embeddable]
class Address extends AbstractEntity {
    
    #[Field( name: 'country', type: FieldTypes::STRING, length: 128 )]
    protected string $country;
    
    #[Field( name: 'city', type: FieldTypes::STRING, length: 32 )]
    protected string $city;
    
    #[Field( name: 'address', type: FieldTypes::STRING, length: 255 )]
    protected string $address;
    
}
```

> You do not need to define the primary column, this column will be inherited from the parent entity.

To embed an entity use the `#[Embedded]` (Swift\Orm\Attributes\Embedded) attribute. Do not forget to initiate the embedding in your entity (see constructor).
```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Relation\Embedded;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;

#[Entity( table: 'user' )]
class User extends AbstractEntity {
    
    #[Field( name: 'id', primary: true, type: FieldTypes::INT, length: 11 )]
    protected int $id;
    
    #[Embedded( target: Address::class )]
    protected Address $address;
    
    public function __construct() {
        $this->address = new Address();
    }
    
}
```

#### Column mapping
By default, all embedded entity columns will be stored in the owning entity table without any prefix. If desired, you can use the `#[Embedded( prefix: 'foo' )]` attribute to add a prefix.
```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Relation\Embeddable;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;

#[Embeddable( prefix: 'address_' )]
class Address extends AbstractEntity {
    
    #[Field( name: 'country', type: FieldTypes::STRING, length: 128 )]
    protected string $country;
    
    #[Field( name: 'city', type: FieldTypes::STRING, length: 32 )]
    protected string $city;
    
    #[Field( name: 'address', type: FieldTypes::STRING, length: 255 )]
    protected string $address;
    
}
```

## Collections
Collections are an ArrayIterator implementation that provides a simple interface to iterate over a collection of entities and add some additional functionality. Collections represent a list of entities. Those are used for *Many relations.

This is a concept that is heavily inspired by [Doctrine Collections](https://www.doctrine-project.org/projects/doctrine-collections/en/latest/index.html).

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Collection\ArrayCollection;

#[Entity( table: 'movie_actors' )]
class Actor extends AbstractEntity {
    
    protected ArrayCollection $movies;
    
    public function __construct() {
        $this->movies = new ArrayCollection();
    }
    
}
```

> Note that collections should always be initiated in the constructor of the entity.