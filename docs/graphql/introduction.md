---
title: Introduction
---

The GraphQl component integrates a GraphQl endpoint as alternative for REST endpoints. Queries and Mutation can both be declared using builders.

The GraphQl implementation fully complies with the [GraphQl Spec](http://spec.graphql.org/) and is basically a wrapper for [Webonxy GraphQl](https://github.com/webonyx/graphql-php). The core components of Swift all comply with the [Relay](https://graphql.org/learn/pagination/) Specification. There's bindings available to easily comply with those for custom definitions as well.

Note that the documentation provided by Webonyx is only partially helpful since Webonyx is almost a literal translation of the Javascript Spec and it's functional by design, where Swift adds functionality for easier use.

By default this implementation is declarative and code first. This means that you can declare your queries and mutations in your code and then just use the GraphQl endpoint to execute them. The implementation is inspired by [Nexus](https://github.com/graphql-nexus/nexus).

### Default generated schema
By default Swift will generate Queries and Mutations for all entities. It will generate a query to fetch a single entity by ID and and query to fetch a list (Connection) of entities. It will also generate mutations to create, update and delete entities.

- [Configuration](/swift-docs/docs/graphql/configuration)
- [Generators](/swift-docs/docs/graphql/generators)
- [Builder](/swift-docs/docs/graphql/builder)
- [Middleware](/swift-docs/docs/graphql/middleware)
- [Resolvers](/swift-docs/docs/graphql/resolvers)
- [Schema](/swift-docs/docs/graphql/schema)
- [Tools](/swift-docs/docs/graphql/tools)
- [Relay](/swift-docs/docs/graphql/relay)
- [Security](/swift-docs/docs/graphql/security)