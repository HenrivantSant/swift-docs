---
title: WebSocket
---

[WebSockets](https://www.iana.org/assignments/websocket/websocket.xhtml) are a protocol for bidirectional, full-duplex, message-oriented communication over the web. Basically, it's a way to send messages between a client and a server.

WebSockets will be available on the configured in the [Runtime Configuration](/swift-docs/docs/runtime/configuration) file.

## WebSocket Controllers
Swift support an unlimited amount of socket endpoints (routes) in your application. This is done by creating WebSocketControllers. A WebSocketController is a class that extends the `\Swift\WebSocket\Controller\AbstractWebSocketController` class and applies the `Swift\WebSocket\Attributes\SocketRoute` attribute.

```php
<?php declare( strict_types=1 );

namespace Foo\WebSocket;

use Ratchet\RFC6455\Messaging\Message;
use Swift\WebSocket\Attributes\SocketRoute;
use Swift\WebSocket\Exceptions\WebsocketErrorException;
use Swift\WebSocket\HttpFoundation\JsonMessage;
use Swift\WebSocket\HttpFoundation\MessageInterface;
use Swift\WebSocket\WsConnection;

#[SocketRoute( route: '/chat/', name: 'chat' )]
final class ChatController extends \Swift\WebSocket\Controller\AbstractWebSocketController {
    
    /**
     * @inheritDoc
     */
    public function onOpen( WsConnection $connection ): ?MessageInterface {
        return new JsonMessage(
            [
                'type' => 'system',
                'data' => 'Hello world!',
            ]
        );
    }
    
    /**
     * @inheritDoc
     */
    public function onClose( WsConnection $connection ): ?MessageInterface {
        return new JsonMessage(
            [
                'type' => 'system',
                'data' => 'Goodbye!',
            ]
        );
    }
    
    /**
     * @inheritDoc
     */
    public function onMessage( WsConnection $connection, Message $message, \SplObjectStorage $clients ): ?MessageInterface {
        foreach ( $clients as $client ) {
            if ( $connection !== $client ) {
                // The sender is not the receiver, send to each client connected
                $client->send( $message );
            }
        }
        
        return null;
    }
    
    /**
     * @inheritDoc
     */
    public function onError( WsConnection $connection, WebsocketErrorException $exception ): ?MessageInterface {
        return null;
    }
    
}
```

## Protecting your routes
Like with REST routes it's also possible to protect your routes. For this is are `isGranted` directive in the `SocketRoute` attribute.

```php
#[SocketRoute( route: '/chat/', name: 'chat', isGranted( [ 'ROLE_ADMIN' ]) )]
```
