---
title: Configuration
---

The Runtime Component is configured in the `etc/runtime.yaml` file.

```yaml
runtime:
    enabled: true
file_watcher:
    enabled: true
    watch: [services.yaml, app, src, etc/config]
    extensions: [php, yaml]
    ignore: [tests]
websocket:
    port: 8000
cron:
    enabled: true
    run_in_background: true
coroutines:
    enabled: true
    run_in_background: true
```