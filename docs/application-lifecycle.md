---
title: Application lifecycle
---

## Bootstrap
All requests are redirected to pub/index.php. From here the ``Swift\Application\Application`` class is loaded. This will initialize the necessary tools and initialize the `Swift\Kernel\Kernel` which is responsible for running the application.

### Autoloader
The autoloader will make sure all classes can be loaded properly.

### DI
All classes will be registered to the container and compiled. This is also the phase where the Compiler Passes are executed.

## Routing
Once booting has finished, at first the router will try to match an existing route. If no valid route could be matched the Kernel will generate 404 response and move on to the Response phase.

## Kernel Request
A valid route has been found. Before moving on the Kernel will dispatch the KernelRequestEvent.

### Security (Firewall & Authentication)
Before actually executing the Router Action which has been matched the Security Component executes authentication. When handling an action in a Controller, or any action after the KernelRequest you can depend on the authentication process being finished and a user/client either being authenticated or not. More on the specifics of this in the documentation of the Security Component.

### Execute Controller Action / GraphQl 
Once the initialized KernelRequest has been completed the resolved Controller Action will be called. Just before doing so the OnBeforeRouteEnterEvent will be dispatched. This could be useful for validating e.g. user rights before entering a route.

## Send response
The called Controller Action should always return a valid response (see Routing and Controllers).

Once the Kernel receives the Response from the Controller the BeforeResponseEvent is called. Here it's possible to e.g. modify the response.

Straight after this, the response will be sent out to the client.

## Finalize & shutdown
After sending the response the Kernel will be shutdown. One last event KernelOnBeforeShutdown will be dispatched. This is an important one as e.g. runtime configuration changes will be persisted during this event.