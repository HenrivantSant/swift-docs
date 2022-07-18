---
title: Introduction
---

PHP is great. It's easy. It's flexible. It's open source. However, it's not always fast, it's not asynchronous, and it's hard to work with things like websockets.

A runtime would be a great way to make it easy to work with things like websockets, and it also eliminates bootstrapping the application on every request. Sounds great right!? Exactly!

The development of the Runtime Component is just getting started. It's not ready for production yet, but it's ready for you to try it out. At the moment it exists of four components:

- [Cron](/swift-docs/docs/runtime/cron)
- [Coroutines](/swift-docs/docs/runtime/coroutines)
- [WebSockets](/swift-docs/docs/runtime/websockets)
- [FileWatcher](/swift-docs/docs/runtime/filewatcher)

## Usage
The Runtime can be started by running the command below. Since it's a runtime, it will keep running until you stop it. Once you stop it, the runtime will stop and the sockets will be closed.

### Starting the Runtime
```bash
bin/server runtime:start
```

This should give you an output somewhat like this:

```bash
$ bin/server runtime:start

   _______          _______ ______ _______   _____  _    _ _   _ _______ _____ __  __ ______
  / ____\ \        / /_   _|  ____|__   __| |  __ \| |  | | \ | |__   __|_   _|  \/  |  ____|
 | (___  \ \  /\  / /  | | | |__     | |    | |__) | |  | |  \| |  | |    | | | \  / | |__
  \___ \  \ \/  \/ /   | | |  __|    | |    |  _  /| |  | | . ` |  | |    | | | |\/| |  __|
  ____) |  \  /\  /   _| |_| |       | |    | | \ \| |__| | |\  |  | |   _| |_| |  | | |____
 |_____/    \/  \/   |_____|_|       |_|    |_|  \_\____/|_| \_|  |_|  |_____|_|  |_|______|


Coroutines
==========

Scheduled 2 coroutines



File watcher
============

  Server will restart on changes in configured files and/or directories

 ------------------------------------- ----------
  Watching                              Ignoring
 ------------------------------------- ----------
  services.yaml, app, src, etc/config   tests
 ------------------------------------- ----------




Websocket server
================

✅  Successfully booted socket router

 -------- ---------
  Status   Enabled
  Port     8000
  Routes   1
 -------- ---------


⠹
```

