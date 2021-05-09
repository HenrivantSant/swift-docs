---
title: Events, Subscribers & Listeners
---

Under the hood the [Symfony Event Dispatcher](https://symfony.com/doc/current/components/event_dispatcher.html) is used, however there is a custom implementation on the Event Dispatcher. This is in order to provide future stability and to enable the system for adding functionality in to the event system.


## Subscriber or listening to events
You can choose to subscribe to (multiple) events by using an EventSubscriber. An EventSubscriber has to return an array of the events it desires to listen to. An EventListener on the other hand can mark a public method as a Listener for a specific event by annotating it with the ListenTo attribute (example below).

### Subscribing to events
When you want to do something when a given event occurs (like logging, or for example add a Route variable_type) you can subscribe to those events using a EventSubscriber instance. In contrary to Symfony, in this system Event Subscriber do support Dependency Injection. It is recommended to only use subscribers to 'catch' the event and use a service to execute the actual logic (and if applicable apply the result to the event). Quite the same as you would do in a Controller or a command. This makes the logic in the service reusable for different occasions and keeps the subscriber clean.

```php
namespace Foo\EventSubscriber;

use Henri\Framework\Configuration\Configuration;
use Henri\Framework\Events\EventDispatcher;
use Swift\Events\EventSubscriberInterface;
use Swift\Router\Event\OnBeforeRouteEnterEvent;

final class FooSubscriber implements EventSubscriberInterface {

    /**
     * @var Configuration $configuration
     */
    private $configuration;

    /**
     * FooSubscriber constructor.
     *
     * @param Configuration $configuration
     */
    public function __construct( Configuration $configuration ) {
        $this->configuration = $configuration;
    }


    /**
     * Returns an array of event names this subscriber wants to listen to.
     *
     * The array keys are event names and the value can be:
     *
     *  * The method name to call (priority defaults to 0)
     *  * An array composed of the method name to call and the priority
     *  * An array of arrays composed of the method names to call and respective
     *    priorities, or 0 if unset
     *
     * For instance:
     *
     *  * ['eventName' => 'methodName']
     *  * ['eventName' => ['methodName', $priority]]
     *  * ['eventName' => [['methodName1', $priority], ['methodName2']]]
     *
     * @return array The event names to listen to
     */
    public static function getSubscribedEvents(): array {
        return array(
            OnBeforeRouteEnterEvent::class => 'onBeforeRouteEnter',
        );
    }

    /**
     * @param OnBeforeRouteEnterEvent $event
     * @param string $eventClassName
     * @param EventDispatcher $eventDispatcher
     */
    public function onBeforeRouteEnter( OnBeforeRouteEnterEvent $event, string $eventClassName, EventDispatcher $eventDispatcher ): void {
        // Read/modify event data or do some logging
    }

}
```

### Listening to an event
Listen to an event by marking the class an EventListener by implement the Interface and marking a method as a listener. Provide the event as argument in the attribute. The event will be passed to the method as an argument.
```php
declare(strict_types=1);

namespace Foo\Listener;

use Swift\Events\Attribute\ListenTo;
use Swift\Events\EventListenerInterface;
use Swift\Security\Authentication\Events\AuthenticationTokenCreatedEvent;
use Swift\Security\Authentication\Token\ResetPasswordToken;

/**
 * Class OnAfterAuthentication
 * @package Foo\Listener
 */
class OnAfterAuthentication implements EventListenerInterface {

    /**
     * Send user a mail with password reset token after creating one
     *
     * @param AuthenticationTokenCreatedEvent $event
     */
    #[ListenTo(event: AuthenticationTokenCreatedEvent::class)]
    public function mailOnPasswordTokenCreated( AuthenticationTokenCreatedEvent $event ): void {
        if ($event->getToken() instanceof ResetPasswordToken) {
            mail(
                to: $event->getToken()->getUser()->getEmail(),
                subject: 'Password reset',
                message: sprintf('Hi %s, Hereby your password reset token: %s.', $event->getToken()->getUser()->getFullName(), $event->getToken()->getTokenString())
            );
        }
    }

}
```

## How to create your own events
Events are classes which can be dispatched using the EventDispatcher. You can easily create your own like the example.
```php
declare(strict_types=1);

namespace Swift\Security\Authentication\Events;


use Swift\Events\AbstractEvent;
use Swift\Security\Authentication\Token\TokenInterface;

/**
 * Class AuthenticationTokenCreatedEvent
 * @package Swift\Security\Authentication\Events
 */
class AuthenticationTokenCreatedEvent extends AbstractEvent {

    protected static string $eventDescription = 'Authentication token has been created';
    protected static string $eventLongDescription = '';

    /**
     * AuthenticationTokenCreatedEvent constructor.
     *
     * @param TokenInterface $token
     */
    public function __construct(
        private TokenInterface $token,
    ) {
    }

    /**
     * @return TokenInterface
     */
    public function getToken(): TokenInterface {
        return $this->token;
    }

    /**
     * @param TokenInterface $token
     */
    public function setToken( TokenInterface $token ): void {
        $this->token = $token;
    }

}
```

## Dispatching events
Events are dispatched using the EventDispatcher. You will need to inject the EventDispatcher (`Swift\Events\EventDispatcher`) into your class.

Below an example from the Authentication Manager dispatching an event for the created token.
```php
// Create authenticated token
$token = $authenticator->createAuthenticatedToken( $passport );
$token = $this->eventDispatcher->dispatch( new AuthenticationTokenCreatedEvent( $token ) )->getToken();
```

## Default system events
All events and their description can be listed by running the command `php bin/console events:list:all`. This will result in something as such.

```shell
$ php bin/console events:list:all
 ---------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------
  event                                                                  description
 ---------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------
  Foo\Event\OnBeforeFooEvent                                             Foo example event

  Swift\HttpFoundation\Event\BeforeResponseEvent                         Before response is send

  Swift\Kernel\Event\KernelOnBeforeShutdown                              Before Kernel is terminated after sending response

  Swift\Kernel\Event\KernelRequestEvent                                  Entry into Kernel, before routing and authentication has started

  Swift\Logging\Event\OnBeforeLoggerHandlersEvent                        On Logger construction. Optionally add or remove Logger Handlers

  Swift\Model\Events\EntityOnFieldSerializeEvent                         Before entity serializes field

  Swift\Model\Events\EntityOnFieldUnSerializeEvent                       Before entity deserializes field

  Swift\Router\Event\OnBeforeRouteEnterEvent                             Route is matched, but not the Controller has not been called yet

  Swift\Router\Event\OnBeforeRoutesCompileEvent                          Routes have been collected from Controller, but have not been Compiled yet. Add, modify or remove routes
  
  Swift\Security\Authentication\Events\AuthenticationFailedEvent         Authentication has failed. This could be due to an error or access could be denied

  Swift\Security\Authentication\Events\AuthenticationFinishedEvent       Authentication process is completed

  Swift\Security\Authentication\Events\AuthenticationSuccessEvent        A user or client has successfully authenticated against the application

  Swift\Security\Authentication\Events\AuthenticationTokenCreatedEvent   Authentication token has been created

  Swift\Security\Authentication\Events\CheckPassportEvent                Passport has been created. Run any validations against passport or add data to passport
 ---------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------
```