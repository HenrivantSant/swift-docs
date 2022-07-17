---
title: Driver
---

To interact with the database directly for executing raw SQL queries, you can inject the `Swift\Dbal\Dbal` service. This is a direct implementation of the `Cycle\Database\DatabaseInterface`.

You can select data from the database by using the `query()` method.

```php
$result = $dbal->query( 'SELECT * FROM movies WHERE id = ?', [ 1 ] );
print_r( $result->fetchAll() );
```

You can also use named parameters.

```php
$result = $dbal->query( 'SELECT * FROM movies WHERE id = :id', [ 'id' => 1 ] );
print_r( $result->fetchAll() );
```

To execute and non-select queries, you can use the `execute()` method.

```php
$affected = $dbal->execute( 'DELETE FROM movies WHERE id = :id', [ 'id' => 1 ] );
print_r( $affected );
```