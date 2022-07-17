---
title: Configuration
---

GraphQl can be enabled with setting this is in the etc/app.yaml config. This will automatically enable the /graphql endpoint.

To disable schema introspection, set the `graphql.enable_introspection` to `false` in the app.yaml config.
```yaml
graphql:
    enable: true
    enable_introspection: true
```
