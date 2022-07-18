---
title: Introduction
---

The database abstraction for Swift consists of two layers. First the abstraction layer- or driver. This database layer (DBAL) is powered by [Cycle](https://github.com/cycle/database). Secondly of Entities, which are PHP Classes representing the Data Objects in the database.

This is code-first approach to create the database schema. The schema is defined in the `Entity` classes. The ORM will sync the schema with the database.

The ORM leaves you hardly having to write SQL statements. The ORM will also take care of managing relations between your data objects (entities).

- [Basics](/swift-docs/docs/database/basics)
- [Cli](/swift-docs/docs/database/cli)
- [Entities](/swift-docs/docs/database/entities)
- [Relations](/swift-docs/docs/database/relations)
- [Entity Behaviors](/swift-docs/docs/database/entity-behaviors)
- [Lifecycles](/swift-docs/docs/database/lifecycles)
- [Driver](/swift-docs/docs/database/driver)