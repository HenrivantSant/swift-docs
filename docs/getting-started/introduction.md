---
title: Introduction
slug: /
---

This is a small and fast PHP framework meant to write APIs or microservices in a fast and easy manner. This is a not meant as a replacement for other frameworks,
under the hood it uses a lot of the magic from [Symfony](https://symfony.com/), [Cycle](https://github.com/cycle/orm) and [GraphQl](https://github.com/webonyx/graphql-php/).

### Purpose
This framework is not intended for building websites or big applications. The purpose of this framework is to provide a simple set of basic tools to build microservices, like:
- Simple webservice
- API proxy to bundle several APIs endpoints into one or leverage legacy APIs
- Data caching layer
- REST/GraphQl API endpoint for headless front-ends
- Socket API endpoint for real-time communication
- Server Sent Events for real-time communication
- Logging service
- CDN
- etc.