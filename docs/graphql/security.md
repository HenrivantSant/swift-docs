---
title: Security
---

It's very important to protect your GraphQL API from unauthorized access. There are several ways to do this. By default, all Queries, Mutations and Types are public.

## Security configuration
The `graphql_access_control` directive in the security configuration allows you to specify which Queries, Mutations and Types should be accessible to which roles. See the example below.

When the fields array is empty, the whole limitation applies to all it's fields. When the fields array is not empty, the limitation applies only to the fields in the array.
```yaml
graphql_access_control:
    - { name: SecurityUser, fields: [lastname], roles: [ROLE_USER, ROLE_FOO] }
    - { name: SecurityUsersCredential, fields: [], roles: [ROLE_USER, ROLE_FOO] }
```

## Middleware
Through execution middleware you achieve similar functionality as in the security configuration however, you will have more freedom and can apply more nuanced security.

## Resolvers
The last option is to create a custom resolver. In there you can achieve similar functionality as in the middleware, but it's not called on every field. Therefore, it can provide better performance, but it could also override a previously defined resolver.

## Tip
It is recommended to work here with the roles from the Security Component. Simply use the [AuthorizationChecker](/docs/security/authorization#usage) to check if the current user is allowed to access the field.