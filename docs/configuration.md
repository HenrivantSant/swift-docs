---
title: Configuration
---

The system uses [Yaml](https://yaml.org/) for configuration.
## Basic setup
The basic app configuration setup is as below. Place these yaml files in the etc/config/ directory of your project. The configuration comes with three configuration files which are necessary. Security (security.yaml) will be preset for you and you don't need to change anything here if there's no need.

#### app.yaml
```yaml
app:
  # App name
  name: Foo Bar App
  # App mode (either develop or production)
  mode: develop
  # Enable/disable debug mode
  debug: true
  # Allow cross origin requests (returns 200 response for OPTIONS Request if no Route is matched)
  allow_cors: true
  # Default application timezone
  timezone: Europe/Amsterdam

routing:
  # Base url used in route matching. This is also useful on sub domains
  baseurl: foo.bar.com

graphql:
  # Enable/disable graphql 
  enabled: true
  # Enable/disable introspection for graphql
  enable_introspection: true

logging:
  # Enable/disable mails for logger
  enable_mail: true
  # Mail from address
  logging_mail_from: log@foo-bar.com
  # Mail to address
  logging_mail_to: log@foo-bar.com
```
#### database.yaml
For more on the actual working of this, see the Database component.
```yaml
connection:
  driver: mysqli
  host: localhost
  username: root
  password: ''
  database: foo_bar
  port: 3306
  prefix: 4593g_
```
#### security.yaml
For more on the actual working of this, see the Security component.
```yaml
enable_firewalls: true

firewalls:
  main:
    # limit login attempts, defaults to 5 per minute. Set to 0 to disable throttling
    login_throttling:
      max_attempts: 5

role_hierarchy:
  ROLE_GUEST:
  ROLE_USER:
  ROLE_CLIENT: ['ROLE_USERS_LIST']
  ROLE_ADMIN: ['ROLE_USERS_LIST']
  ROLE_SUPER_ADMIN: ['ROLE_ADMIN']

access_decision_manager:
  strategy: Swift\Security\Authorization\Strategy\AffirmativeDecisionStrategy
  allow_if_all_abstain: false

access_control:
```

## Configuration scopes
To organize configuration, this is split in into different categories called 'scopes'. 

By default, there are three of those:
 - app (etc/config/app.yaml)
 - database (etc/config/database.yaml)
 - security (etc/config/security.yaml)

All three scopes have their own drivers, but they're all available through the generic Configuration ``Swift\Configuration\ConfigurationInterface``.

## Defining custom configuration
It is highly likely that you might have the need for custom/additional configuration. This is easily possible. Swift checks the app directory for a config.yaml file. If it is present use it import app configuration files. See the example below.  

_app/config.yaml_
```yaml
imports:
  - { resource: app/Foo/config.yaml }
```

Now let's add some configuration in there.  

_app/Foo/config.yaml_
```yaml
foo:
    bar: example
    lorem: ipsum
```

## Reading the configuration
To read the configuration you will have to inject the `Swift\Configuration\Configuration` class (or `Swift\Configuration\ConfigurationInterface $configuration`). Simply calling the 'get' method is enough. The first argument is the name of the setting and the second one is the scope. Reading the app configuration uses the 'app' as scope.
```php
// Get foo bar value from the example above
$fooBarConfigurationValue = $this->configuration->get('foo.bar', 'app/Foo');

// Check if app is in debug mode
$isDebug = $this->configuration->get('app.debug', 'app');

// Database username
$databaseUsername = $this->configuration->get('connection.username', 'database');
```

## Writing the configuration
Writing the configuration works in the exact same matter. Note that is not possible to write to non-existing settings. Make sure the setting you're trying to write is defined on beforehand.

```php
// Write to the previous foo.bar example
$this->configuration->set('foo.bar', 'writing example', 'app/Foo');
```
