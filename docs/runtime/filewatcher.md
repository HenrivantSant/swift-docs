---
title: FileWatcher
---

The FileWatcher is development tool. It's only available in development mode. It's used to watch files and directories for changes. When a change is detected, the application is reloaded. It's simple yet, but it's useful.

The directories that should be watched can be configured in the `etc/security.yaml` file.

```yaml
file_watcher:
    enabled: true
    watch: [services.yaml, app, etc/config]
    extensions: [php, yaml]
    ignore: [tests]
```