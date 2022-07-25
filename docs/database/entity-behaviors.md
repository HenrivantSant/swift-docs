---
title: Entity Behaviors
---

The Entity Behavior package is a collection of attributes that adds behaviors to entities.

The package provides functionality that hooks in to the lifecycle events of entities. Those events are create, update, and delete.

> Note that embedded entities are not supported by the Entity Behavior package.

## UUID

The UUID behavior adds a UUID field to an entity. It for this it uses the `ramsey/uuid` library. This is already a dependency of Swift, so there's no need to install it.

### Usage

The package provides several implementations of the UUID behavior. The most basic form in the one below.

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Ramsey\Uuid\UuidInterface;
use Swift\Orm\Attributes\Behavior\Uuid\Uuid1;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;


#[Entity( table: 'security_users' )]
#[Uuid1( field: 'uuid' )]
class UserEntity extends AbstractEntity implements UserStorageInterface {
    
    #[Field( name: 'uuid', type: FieldTypes::UUID )]
    protected UuidInterface $uuid;
    
}
```

### RFC 4122 UUIDs

#### Version 1: Time-based

A version 1 UUID uses the current time, along with the MAC address (or node) for a network interface on the local machine.

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Ramsey\Uuid\UuidInterface;
use Swift\Orm\Attributes\Behavior\Uuid\Uuid1;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;


#[Entity( table: 'security_users' )]
#[Uuid1( field: 'uuid', node: '00000fffffff', clockSeq: 0xffff )]
class UserEntity extends AbstractEntity implements UserStorageInterface {
    
    #[Field( name: 'uuid', type: FieldTypes::UUID )]
    protected UuidInterface $uuid;
    
}
```

#### Version 2: DCE Security

UUID v2 uses the current time, along with the MAC address (or node) for a network interface on the local machine. Additionally, a version 2 UUID replaces the low part of the time field with a local identifier such as the user ID or group ID of the local account that created the UUID.

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Ramsey\Uuid\UuidInterface;
use Ramsey\Uuid\Uuid;
use Swift\Orm\Attributes\Behavior\Uuid\Uuid2;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;


#[Entity( table: 'security_users' )]
#[Uuid2(
    field: 'uuid',
    localDomain: Uuid::DCE_DOMAIN_PERSON, 
    localIdentifier: '12345678', 
    node: '00000fffffff', 
    clockSeq: 0xffff
)]
class UserEntity extends AbstractEntity implements UserStorageInterface {
    
    #[Field( name: 'uuid', type: FieldTypes::UUID )]
    protected UuidInterface $uuid;
    
}
```

#### Version 3: Name-based (MD5)

Uses a version 3 (name-based) UUID based on the MD5 hash of a namespace ID and a name.

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Ramsey\Uuid\UuidInterface;
use Ramsey\Uuid\Uuid;
use Swift\Orm\Attributes\Behavior\Uuid\Uuid3;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;


#[Entity( table: 'security_users' )]
#[Uuid3(
    field: 'uuid',
    namespace: Uuid::NAMESPACE_URL,
    name: 'https://example.com/foo'
)]
class UserEntity extends AbstractEntity implements UserStorageInterface {
    
    #[Field( name: 'uuid', type: FieldTypes::UUID )]
    protected UuidInterface $uuid;
    
}
```

#### Version 4: Random

They are randomly-generated and do not contain any information about the time they are created or the machine that generated them.

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Ramsey\Uuid\UuidInterface;
use Swift\Orm\Attributes\Behavior\Uuid\Uuid4;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;


#[Entity( table: 'security_users' )]
#[Uuid4( field: 'uuid' )]
class UserEntity extends AbstractEntity implements UserStorageInterface {
    
    #[Field( name: 'uuid', type: FieldTypes::UUID )]
    protected UuidInterface $uuid;
    
}
```

#### Version 5: Name-based (SHA-1)

Uses a version 5 (name-based) UUID based on the SHA-1 hash of a namespace ID and a name.

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Ramsey\Uuid\UuidInterface;
use Ramsey\Uuid\Uuid;
use Swift\Orm\Attributes\Behavior\Uuid\Uuid5;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;


#[Entity( table: 'security_users' )]
#[Uuid5(
    field: 'uuid', 
    namespace: Uuid::NAMESPACE_URL, 
    name: 'https://example.com/foo'
)]
class UserEntity extends AbstractEntity implements UserStorageInterface {
    
    #[Field( name: 'uuid', type: FieldTypes::UUID )]
    protected UuidInterface $uuid;
    
}
```

#### Version 6: Nonstandard UUIDs

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Ramsey\Uuid\UuidInterface;
use Ramsey\Uuid\Uuid;
use Swift\Orm\Attributes\Behavior\Uuid\Uuid6;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;


#[Entity( table: 'security_users' )]
#[Uuid6(
    field: 'uuid', 
    node: '00000fffffff', 
    clockSeq: 0xffff
)]
class UserEntity extends AbstractEntity implements UserStorageInterface {
    
    #[Field( name: 'uuid', type: FieldTypes::UUID )]
    protected UuidInterface $uuid;
    
}
```

> If you want to use a custom `uuid` declaration, you have to extend the `Swift\Orm\Attributes\Behavior\Uuid\Uuid` class.

## Auto timestamps

The behaviour that is likely most used in the Auto Timestamps. This pattern adds `created_at` and `updated_at` fields to your entity. This behavior automatically saves datetime values to createdAt and updateAt fields.

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Swift\Orm\Attributes\Behavior\CreatedAt;
use Swift\Orm\Attributes\Behavior\UpdatedAt;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;

#[Entity( table: 'security_users' )]
#[CreatedAt( field: 'created' )]
#[UpdatedAt( field: 'modified' )]
class UserEntity extends AbstractEntity {
    
    #[Field( name: 'created', type: FieldTypes::DATETIME )]
    protected \DateTimeInterface $created;
    
    #[Field( name: 'modified', type: FieldTypes::DATETIME )]
    protected \DateTimeInterface $modified;
}
```

## Soft delete (DeletedAT)

Adds a deleted_at column which defines if a record has been marked as deleted (and if so, when). Useful when designing a highly complicated system where data consistency is important and even if some data should be invisible in the backend, it should still remain in the database.

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Swift\Orm\Attributes\Behavior\SoftDelete;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;

#[Entity( table: 'security_users' )]
#[SoftDelete( field: 'created' )]
class UserEntity extends AbstractEntity {
    
    #[Field( name: 'created', type: FieldTypes::DATETIME )]
    protected \DateTimeInterface $created;
    
    #[Field( name: 'modified', type: FieldTypes::DATETIME, empty: true )]
    protected ?\DateTimeInterface $deletedAt = null;
}
```

## Optimistic lock

The package adds support for automatic optimistic locking via a version field. In this approach any entity that should be protected against concurrent modifications during long-running business transactions gets a version field. When changes to such an entity are persisted at the end of a long-running conversation the version of the entity is compared to the version in the database and if they don't match, an `Swift\Orm\Behavior\Exception\OptimisticLock\RecordIsLockedException` is thrown,
indicating that the entity has been modified by someone else already.

### Available strategies

- `MICROTIME` - Current timestamp with microseconds as string.
- `RAND_STR` - Random generated string (random_bytes).
- `INCREMENT` - Auto incremented integer version.
- `DATETIME` - Current datetime.
- `MANUAL` - Allows using custom realisation for setting and controlling version. You have to manage entity and DB column by yourself.

### Usage

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Swift\Orm\Attributes\Behavior\OptimisticLock;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;

#[Entity( table: 'security_users' )]
#[OptimisticLock(
  field: 'version',                         // Required. By default 'version' 
  column: 'version',                        // Optional. By default 'null'. If not set, will be used information from property declaration.
  rule: OptimisticLock::RULE_INCREMENT      // Optional. By default OptimisticLock::RULE_INCREMENT
)]
class UserEntity extends AbstractEntity {
    
    #[Field( name: 'created', type: FieldTypes::DATETIME )]
    protected \DateTimeInterface $created;
    
    #[Field( name: 'version', type: FieldTypes::INT )]
    protected int $version;
}
```

> Note: Your field declaration should be compatible with the strategy you use.

## Hooks
Events serve as a great way to decouple various aspects of your application, since a single event can have multiple listeners that do not depend on each other.

This package provides a simple observer pattern implementation, allowing you to subscribe and listen for various events via closure based event listeners.

> This is basically a simple version on [LifeCycles](/docs/database/lifecycles)

### Usage
To start listening to entity events, add a `Swift\Orm\Attributes\Behavior\Hook` attribute to your Entity.

```php
<?php declare( strict_types=1 );

namespace Swift\Security\User\Entity;

use Swift\Orm\Attributes\Behavior\Hook;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;
use Swift\Orm\Entity\AbstractEntity;

#[Entity( table: 'review' )]
#[Hook(
  callable: [Review::class, 'onCreate'],
  events: [\Swift\Orm\Behavior\Event\Mapper\Command\OnCreate::class],
)]
#[Hook(
  callable: [Review::class, 'onUpdate'],
  events: [\Swift\Orm\Behavior\Event\Mapper\Command\OnUpdate::class],
)]
class Review extends AbstractEntity {
    
    #[Field( name: 'id', primary: true, type: FieldTypes::INT, length: 11 )]
    public int $id;

    public static function onCreate( \Swift\Orm\Behavior\Event\Mapper\Command\OnCreate $event ): void {
        // do something before review created
    }

    public static function onUpdate( \Swift\Orm\Behavior\Event\Mapper\Command\OnUpdate $event ): void {
        // do something when review updated
    }
    
}
```

## Event listener
Events serve as a great way to decouple various aspects of your application, since a single event can have multiple listeners that do not depend on each other.

This package provides a simple observer pattern implementation, allowing you to subscribe and listen for various events.

### Usage
If you are listening for many events on a given entity, you may use `Swift\Orm\Attributes\Behavior\EventListener` attribute to group all of your listeners into a single class. Event listener classes should have attributes which subscribe to the Entity events you wish to listen for. Each of these methods receives the event object as their only argument.

#### Entity event listener
```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Orm\Attributes\Behavior\EventListener;
use Swift\Orm\Entity\AbstractEntity;
use Swift\Orm\Attributes\Entity;
use Swift\Orm\Attributes\Field;
use Swift\Orm\Types\FieldTypes;

#[Entity( table: 'movies' )]
#[EventListener( listener: MovieListener::class, args: [ 'test' => 'foo bar' ] )]
class Movie extends AbstractEntity {
    
    #[Field( name: 'id', primary: true, type: FieldTypes::INT, length: 11 )]
    protected int $id;
    
}
```

#### Listener class
Next, let's take a look at the listener for our example Comment entity. Event listeners receive event instances in their methods that subscribed to the events.

```php
<?php declare( strict_types=1 );

namespace Foo\Repository;

use Swift\DependencyInjection\Attributes\Autowire;
use Swift\Orm\Attributes\Behavior\Listen;
use Swift\Orm\Behavior\Event\Mapper\Command\OnUpdate;

#[Autowire]
class MovieListener {
    
    public function __construct(
        protected readonly \Swift\Configuration\ConfigurationInterface $configuration,
        protected string $test = 'test',
    ) {
    }
    
    #[Listen( event: OnUpdate::class )]
    public function onUpdate( OnUpdate $event ): void {
        // do something when movie updated
    }
    
}
```

## Extensions
Todo

## Events
The package dispatch several events, allowing you to hook into the following moments in an entity's lifecycle:

An event object contains the following public properties:
```php
// Entity mapper
print_r($event->mapper);     

// Read only entity object. Change entity property values carefully.
// Property value changes won't affect persisting data, but will affect next event listeners.
print_r($event->entity);    

// Use for changing persisting data. Data from state will be stored to the database
print_r($event->state);

// DateTime object shared between all events
print_r($event->timestamp); 

// Entity state before changes
print_r($event->node); 
```

### OnCreate
The event will dispatch before an entity is stored to the database.
```php
public function onCreate( \Swift\Orm\Behavior\Event\Mapper\Command\OnCreate $event ): void {
    $event->state->register( 'id', Uuid::uuid4() );
}
```

### OnUpdate
The event will dispatch before an entity is updated in the database.
```php
public function onUpdate( \Swift\Orm\Behavior\Event\Mapper\Command\OnUpdate $event ): void {
    $event->state->register( 'modifiedAt', new \DateTimeImmutable() );
}
```

### OnDelete
The event will dispatch before an entity is deleted from the database.
```php
public function onDelete( \Swift\Orm\Behavior\Event\Mapper\Command\OnDelete $event ): void {
    if ( ! $accessDecisionManager->isGranted( [ 'ROLE_ADMIN' ] ) ) {
        throw new UnauthorizedException();
    } 
}
```