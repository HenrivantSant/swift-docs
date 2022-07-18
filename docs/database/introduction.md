---
title: Introduction
---

The database abstraction for Swift consists of two layers. First the abstraction layer- or driver. This database layer (DBAL) is powered by [Cycle](https://github.com/cycle/database). Secondly of Entities, which are PHP Classes representing the Data Objects in the database.

This is code-first approach to create the database schema. The schema is defined in the `Entity` classes. The ORM will sync the schema with the database.