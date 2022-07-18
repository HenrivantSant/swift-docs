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