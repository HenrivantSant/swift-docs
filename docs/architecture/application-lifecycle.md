---
title: Application lifecycle
---

The application heavily depends on middleware for its logic. This makes the footprint of the application in itself relatively small and composable.

![](/img/request_flow.png)


## Application
The Swift Application (or any other valid `Swift\Application\ApplicationInterface`) implementation is the main entry point for the application. It is responsible for bootstrapping the kernel and executing the application.

## Kernel
The Kernel is responsible for executing a request. It will execute the middleware stack and then send the response to the client. The kernel is also responsible for handling errors. Any implementation of the `Swift\Kernel\KernelInterface` can be used.

## Middleware
Middleware is a queue of callbacks that will be executed in order. The middleware stack is executed in the order that the middleware is added to the stack. The middleware stack is executed for each request. The middleware is responsible for handling the request and generating the response. More on middleware [here](/swift-docs/docs/middleware).