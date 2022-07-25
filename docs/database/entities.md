---
title: Entities
---

Entities are the very core of the ORM. They represent the Data Objects in the database. The ORM will automatically find the defined entities and map them into the schema. To indicate that an entity is an entity, you need to use the `Swift\Orm\Attributes\Entity` Attribute and extend the `Swift\Orm\Entity\AbstractEntity` class.

In the Entity Attribute you define the name of the table in the database.

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;

#[Entity( table: 'movies' )]
class Movie extends AbstractEntity {
    
}
```

### Sync schema with database
Changes in Entity classes will NOT automatically be reflected in the database. You will need to run the command below to sync the schema with the database.

```bash
php bin/console orm:sync
```

> Note: This won't work as expected in production. Never change such things in production mode. Always update in develop mode.

## Fields

Entities are not valid without having declared fields. Fields are the columns in the database. To declare a field, you need to use the `Swift\Orm\Attributes\Field`.

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
    
}
```

> Read how to use non-incrementing fields in the Entity Behaviors section: [UUID](/docs/database/entity-behaviors#uuid).

While adding new fields to entities which are allowed to be empty, you need to enable this for the field. This can be done in the Field Attribute.

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
    
    #[Field( name: 'description', type: FieldTypes::LONGTEXT, empty: true )]
    protected string $description;
    
}
```

### Field configuration
The following options are available for configuration a field:

| Options | Value                              | Comment                                                      |
|---------|------------------------------------|--------------------------------------------------------------|
| name    | string                             | The name of the column in the database.                      |
| type    | string<Swift\Orm\Types\FieldTypes> | The type of the field in the database.                       |
| primary | bool                               | Whether the field is a primary key. Defaults to false.       |
| unique  | bool                               | Whether the field is a unique key. Defaults to false.        |
| index   | bool                               | Whether the field is an index. Defaults to false.            |
| length  | int                                | The length of the field. Defaults to 0.                      |
| empty   | bool                               | Whether the field is allowed to be empty. Defaults to false. |
| enum    | string                             | Classname of the enum to map.                                |

### Field types
The following field types (Swift\Orm\Types\FieldTypes) are available. Field types will automatically be converted to the correct type in the database and vice versa.

| Type      | Arguments        |                                                                                                                                                                                                                                             | Description |
|-----------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| TEXT      | ---              | Database specific type to store text data. Check DBMS to find size limitations. Note that this field does not support indexes or unique constraints. To use this, use the STRING type.                                                      |
| LONGTEXT  | ---              | Long text, same as "text" for most of the databases. It differs only in MySQL.                                                                                                                                                              |
| STRING    | length (1 - 255) | String with specified length, a perfect type for emails and usernames as it can be indexed.                                                                                                                                                 |
| INT       | ---              | Database specific integer. Usually stored as 32-bits.                                                                                                                                                                                       |
| FLOAT     | ---              | Single precision number, usually mapped into "real" type in the database.                                                                                                                                                                   |
| BIG_FLOAT | length (1 - 255) | Renders to float in PHP, but saved in the database as a varchar. This overcomes some size issues for large precision floats.                                                                                                                |
| DOUBLE    | ---              | [Double precision number](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)                                                                                                                                             |
| DATETIME  | ---              | To store date only, DBAL will automatically force UTC timezone for such columns.                                                                                                                                                            |
| TIME      | ---              | To store time only.                                                                                                                                                                                                                         |
| TIMESTAMP | ---              | Timestamp without a timezone, DBAL will automatically convert incoming values into UTC timezone. Do not use such column type in your objects to store time (use `datetime` instead) as timestamps will behave very specific to select DBMS. |
| JSON      | ---              | To store JSON structures, such type usually mapped to "text", only Postgres support it natively.                                                                                                                                            |
| BOOL      | ---              | Boolean type. Some database will store this value as integer 1/0.                                                                                                                                                                           |
| UUID      | ---              | Store column as UUID type. Most DBMS will store this as text. A unique constraint will automatically be added.                                                                                                                              |
| ENUM      | ---              | Saves the cases of the enum as enum values in the DBMS.                                                                                                                                                                                     |

### Enums
The ORM supports the enum type for all available drivers. To use it, you need to use the `Swift\Orm\Types\FieldTypes::ENUM` type and map the Enum class to the field. The ORM will automatically map the enum values to the database and instantiate the enum with the in the Entity.

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

enum FooType: string {
    
    case BAR = 'bar';
    case BAZ = 'baz';
    
}
```
```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;

#[Entity( table: 'movies' )]
class Movie extends AbstractEntity {
    
    #[Field( name: 'type', type: FieldTypes::ENUM, enum: FooType::class )]
    protected string|FooType $type;
    
      /**
     * @return \App\Foo\Repository\FooType
     */
    public function getType(): FooType {
        return $this->type;
    }
    
    /**
     * @param \App\Foo\Repository\FooType $type
     */
    public function setType( FooType $type ): void {
        $this->type = $type;
    }
    
}
```
> Note that the enum is lazily instantiated, therefore you need to make sure to also type the property as `string` besides the enum class. Getters and setters can only use the enum class.

## Embeddings
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
    
    #[Field( name: 'country', type: FieldTypes::TEXT )]
    protected string $country;
    
    #[Field( name: 'city', type: FieldTypes::TEXT, length: 32 )]
    protected string $city;
    
    #[Field( name: 'address', type: FieldTypes::TEXT )]
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
    
    #[Field( name: 'country', type: FieldTypes::TEXT )]
    protected string $country;
    
    #[Field( name: 'city', type: FieldTypes::TEXT, length: 32 )]
    protected string $city;
    
    #[Field( name: 'address', type: FieldTypes::TEXT )]
    protected string $address;
    
}
```

## Relations
The ORM provides multiple annotations designed to describe entity relations. Each relation must be associated with specific entity properties in order to work. In addition, most of the relation options (such as the name of inner, outer keys) will be generated automatically.

> More on relations can be found in later chapters.

### Common statement
Each relation must have a proper `target` option. The target must point to the class of the related entity.

### Relations
- [Embedded](/docs/database/relations#embedding-entities)
- [BelongsTo](/docs/database/relations#belongsto)
- [RefersTo](/docs/database/relations#refersTo)
- [HasOne](/docs/database/relations#hasone)
- [HasMany](/docs/database/relations#hasMany)
- [ManyToMany](/docs/database/relations#manyToMany)