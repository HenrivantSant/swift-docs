---
title: Cli
---

There's a few useful commands for interacting with the database (DBAl) and the ORM.

## dbal:list
Get list of available databases, their tables and records count.

```bash
php bin/console dbal:list [<db>]
```

## dbal:table
Describe table schema of specific database.

```bash
php bin/console dbal:table [options] [--] <table>
```

## orm:list
List of all available entities and their tables.

```bash
php bin/console orm:list
```

## orm:sync
Sync ORM schema with database (generate tables).

```bash
php bin/console orm:sync
```

## orm:update
Show updates for ORM schema based on entity and relation attributes.

```bash
php bin/console orm:update
```