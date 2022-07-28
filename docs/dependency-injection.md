---
title: Dependency Injection
---

DI is in the core of the system. It requires hardly any configuration. Under the hood [Symfony Dependency Injection](https://symfony.com/doc/current/components/dependency_injection.html) is used. See the Symfony documentation for more detailed information on the specifics of DI.

```yaml
imports:
# ...

services:
  _defaults:
    autowire: false
    autoconfigure: true
    public: true

  Foo\:
    resource: 'app/Foo/*'
```

This will tell the DI Container how it should load the given namespace and to enable DI for all files in the app/Foo directory. In the top of the file the configuration for DI is included. Make sure to put the services.yaml file in the root of your project. Feel free to split your services.yaml in different files if it grows too big. This can easily be done by using an import statement to the additional services.yaml file.

## What is dependency injection

We're not diving into the specifics of Dependency Injection here. For more on the subject check the [wiki](https://en.wikipedia.org/wiki/Dependency_injection).

## Dependency Injection in Swift

Injection usually happens in the constructor. Add the classes you wish to inject as arguments to the constructor, and they will automatically be provided as an instance. How convenient! This is available through autowiring.

```php
<?php declare( strict_types=1 );


namespace App\Foo\Service;

use Swift\Configuration\ConfigurationInterface;
use Swift\DependencyInjection\Attributes\Autowire;
use Swift\Orm\EntityManagerInterface;
use Swift\Security\Security;

#[Autowire]
class FooService {
    
    public function __construct(
        protected Security               $security,
        protected ConfigurationInterface $configuration,
        protected EntityManagerInterface $entityManager,
        protected ?string                $nonAutowired = null,
    ) {
    }
    
}
``` 

## Autowiring

Autowiring will make the dependency injection container read the types in the constructor of the class and inject those types when it creates an instance of the class. Through the services.yaml configuration file this can be enabled by default for all classes, or not. There are some important notes to take into consideration for both.

### Do not autowire all by default

It is possible to set autowire to true in the services configuration. If you choose to autowire all classes by default, note that the container will try to inject all types in the constructor. As in the example above, giving a default value will solve this.

As seen below, $nonAutowired needs a default value when autowiring this FooService. When autowiring is enabled by default, it can be disabled by setting it to false in the example below. Once again, this is not recommended. It is recommended to specify each class to autowire specifically (more on this later).

```php
declare(strict_types=1);

namespace Foo\Service;

use Swift\Configuration\ConfigurationInterface;
use Swift\Kernel\Attributes\DI;
use Swift\Orm\EntityManagerInterface;
use Swift\Security\Security;

/**
 * Class FooService
 * @package Foo\Service
 */
#[DI(autowire: false)]
class FooService {

    public function __construct(
        protected Security               $security,
        protected ConfigurationInterface $configuration,
        protected EntityManagerInterface $entityManager,
        protected ?string                $nonAutowired = null,
    ) {
    }
    
}
```

### Manually set class to autowire

The example as below is more recommended. By specifically telling the container to autowire you will keep your code more predictable. Simple add to #[Swift\Kernel\Attributes\Autowire] attribute to the class as in the example below to autowire the class.

```php
<?php declare( strict_types=1 );


namespace App\Foo\Service;

use Swift\Configuration\ConfigurationInterface;
use Swift\DependencyInjection\Attributes\Autowire;
use Swift\Orm\EntityManagerInterface;
use Swift\Security\Security;

#[Autowire]
class FooService {
    
    public function __construct(
        protected Security               $security,
        protected ConfigurationInterface $configuration,
        protected EntityManagerInterface $entityManager,
        protected ?string                $nonAutowired = null,
    ) {
    }
    
}
``` 

## Interface injection
To prevent code from becoming dependent on specific implementations it is recommended to use interfaces instead of direct class references. This however presents challenges for autowiring since an interface is not directly linked to a class implementation, and so the container will need a little help in finding the right class associated to the interface. The container uses 'aliases' which are combination between interface name and variable name to reference to implementing classes.

During container compilation default aliases based on Interface implementations will already be created. See 'Default Alias' for more on this.

### Default alias

By default a camelCase alias will be created according to following example:
`class FooBar implement Foo\Bar\FooBarInterface`

We can now inject this using the interface followed by a camelCase of the implementing class. So this would be `Foo\Bar\FooBarInterface $fooBar`. This is also included in the example above.

It is also possible to create manual aliases, more on this in 'Class aliasing'.

## Tagged iterator injection
The container can also inject tagged iterators. This is useful for injecting services based on their tags.

```php
public function __construct(
    #[Autowire( tag: 'foo.service' )] protected readonly ?iterable $entities,
    #[Autowire( serviceId: 'my.service' )] protected ServiceInterface $service,
) {
}
```

## Setter injection

Setter injection offers some more functionalities over constructor injection for several specific use cases. Setter injection is also dependency injection by the container, but not via de constructor. But through defined class methods called by the container after the classes has been instantiated.

### When to use setter injection?

This is particularly useful when injection a group of tagged services or when writing abstract or base classes to prevent complex inheritance structures through constructor injection.

```php
<?php declare( strict_types=1 );


namespace App\Foo\Service;

use Swift\Configuration\ConfigurationInterface;
use Swift\DependencyInjection\Attributes\Autowire;
use Swift\DependencyInjection\Attributes\DI;
use Swift\HttpClient\HttpClientInterface;
use Swift\Orm\EntityManagerInterface;
use Swift\Security\Security;

#[Autowire]
#[DI( tags: [ 'foo.service', 'foo.example' ] )]
class FooService {
    
    protected iterable $services;
    protected HttpClientInterface $httpClient;
    
    public function __construct(
        protected Security               $security,
        protected ConfigurationInterface $configuration,
        protected EntityManagerInterface $entityManager,
        protected ?string                $nonAutowired = null,
    ) {
    }
    
    /**
     * @param \Swift\HttpClient\HttpClientInterface $httpClient
     */
    #[Autowire]
    public function setHttpClient( HttpClientInterface $httpClient ): void {
        $this->httpClient = $httpClient;
    }
    
    #[Autowire]
    public function setTaggedServices( #[Autowire( tag: 'example_tag' )] iterable $services ): void {
        $this->services = $services;
    }
    
}
```

## DI and Autowire Attribute

Container configuration happens through the DI Attribute. This comes with multiple configuration options. The Autowire attribute is just a shortcut to set Autowire to true.

### Inheritance

Note that attribute settings are inherited from classes, interfaces and traits! Settings can be overwritten. When an implemented interface claims autowire to be false, the class can overwrite this to be true.

```php
<?php declare(strict_types=1);

namespace Swift\DependencyInjection\Attributes;

use Attribute;


#[Attribute(Attribute::TARGET_CLASS)]
class DI {

    public function __construct(
        public array $tags = [],
        public bool $shared = true,
        public bool $exclude = false,
        public bool $autowire = true,
        public array $aliases = [],
    ) {
    }
}
```

### Class tagging

By tagging services they can be retrieved from the container as a batch. As used on the previous example with Setter Injection.

### Class shared

By default classes classes are shared. So the container will only make one single instance and inject this in all dependents. By setting shared to false, a new instance will be created every time. This might be useful in some cases.

### Class exclude

When a class in excluded it will be unknown in the container. Note that tagging for example will also not work on this classes if excluded. If you're not sure about the difference, it's recommended to set autowire to false instead of excluding.

### Class autowire

Set the class to autowire or not. It is recommended to always provide either true or false so changing the general autowire settings does not break the application.

### Class aliasing

A class can have multiple aliases. Those aliases can be type hinted for dependency injection. Usually you'd want to use this to relate interfaces to implementing classes to avoid having to depend on them directly, which would make maintaining the application much harder on long term.

```php
declare(strict_types=1);

namespace Foo\Service;

use Swift\Kernel\Attributes\DI;

#[DI(aliases: [BarInterface::class . ' $barService'])]
class FooService implements BarInterface {

}
```

## Compiler passes

It is possible to directly hook into the container compilation and adjust the service definitions in any desired way. There's to kinds of CompilerPasses:

- On compilation CompilerPass
- Post compilation CompilerPass (passes run after the container compiled, but before the application is initialized)

### On Compilation CompilerPass

To register the compiler pass simply implement the ``Swift\DependencyInjection\CompilerPass\CompilerPassInterface``. This is useful for adding actual configuration before compilation. See the example below from the GraphQl component.

```php
<?php declare( strict_types=1 );


namespace App\Foo\DependencyInjection;


use Swift\DependencyInjection\Container;

class FooPrecompilerPass implements \Swift\DependencyInjection\CompilerPass\CompilerPassInterface {
    
    public function process( Container $container ) {
        // Add tags to definitions
        // Add method calls to definitions
        // Etc.
    }
    
}
```

### Post Compilation CompilerPass

Useful for post compilation tasks like registering tagged events or subscribers.

```php
<?php declare( strict_types=1 );


namespace App\Foo\DependencyInjection;


use Swift\DependencyInjection\Container;

class FooPostCompilerPass implements \Swift\DependencyInjection\CompilerPass\PostCompilerPassInterface {
    
    public function process( Container $container ) {
        // Find tags services
        // Register services to listener
        // Etc.
    }
    
}
```