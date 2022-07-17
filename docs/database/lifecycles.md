---
title: Lifecycles
---

Every entity has a lifecycle. The lifecycle is a series of events that are triggered during the life of the entity. The events are:

- onCreate
- onUpdate
- onDelete

It might be useful to undertake certain actions when an entity is created, updated, or deleted. The ORM provides a way to do this. It is called a lifecycle.

> It is also possible to modify data before it is saved to the database.

The hook into the lifecycle of an entity is done by implementing the `Swift\Orm\Behavior\LifecycleInterface`.

The is no limit to the number of lifecycles that can be implemented.

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Configuration\ConfigurationInterface;
use Swift\DependencyInjection\Attributes\Autowire;
use Swift\Orm\Behavior\Event\Mapper\Command\OnCreate;
use Swift\Orm\Behavior\Event\Mapper\Command\OnDelete;
use Swift\Orm\Behavior\Event\Mapper\Command\OnUpdate;
use Swift\Orm\Behavior\LifeCycleInterface;

#[Autowire]
class MovieLifeCycle implements LifeCycleInterface {
    
    public function __construct(
        protected readonly ConfigurationInterface $configuration,
    ) {
    }
    
    /**
     * @inheritDoc
     */
    public static function getEntityClass(): string {
        return Movie::class;
    }
    
    /**
     * @inheritDoc
     */
    public function onCreate( OnCreate $event ): void {
        // TODO: Implement onCreate() method.
    }
    
    /**
     * @inheritDoc
     */
    public function onUpdate( OnUpdate $event ): void {
        // TODO: Implement onUpdate() method.
    }
    
    /**
     * @inheritDoc
     */
    public function onDelete( OnDelete $event ): void {
        // TODO: Implement onDelete() method.
    }
    
}
```

## Usage

A possible use case could be to add a spamfilter to the movie entity.

```php
<?php declare( strict_types=1 );

namespace App\Foo\Repository;

use Swift\Configuration\ConfigurationInterface;
use Swift\DependencyInjection\Attributes\Autowire;
use Swift\Orm\Behavior\Event\Mapper\Command\OnCreate;
use Swift\Orm\Behavior\Event\Mapper\Command\OnDelete;
use Swift\Orm\Behavior\Event\Mapper\Command\OnUpdate;
use Swift\Orm\Behavior\LifeCycleInterface;
use App\Foo\Service\SpamFilter;

#[Autowire]
class MovieLifeCycle implements LifeCycleInterface {
    
    public function __construct(
        protected readonly ConfigurationInterface $configuration,
        protected readonly SpamFilter $spamFilter,
    ) {
    }
    
    /**
     * @inheritDoc
     */
    public static function getEntityClass(): string {
        return Movie::class;
    }
    
    /**
     * @inheritDoc
     */
    public function onCreate( OnCreate $event ): void {
        $event->state->register( 
            'description', 
            $this->spamFilter->filter( 
                $event->state->get( 'description' )
            ) 
         );
    }
    
    /**
     * @inheritDoc
     */
    public function onUpdate( OnUpdate $event ): void {
        $event->state->register( 
            'description', 
            $this->spamFilter->filter( 
                $event->state->get( 'description' )
            ) 
        );
    }
    
    /**
     * @inheritDoc
     */
    public function onDelete( OnDelete $event ): void {
        // TODO: Implement onDelete() method.
    }
    
}
```