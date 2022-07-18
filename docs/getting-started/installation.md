---
title: Installation
---

## Option 1: Starter template
The easiest way is to kickoff with the starter template (https://github.com/SwiftAPI/swift-starter).

### Install
Create a project and pass the of your project. Run the command below and change project_name to the name of your project.
```shell
composer create-project swift-api/swift-starter project_name
```
After running a new directory is created. Type `cd project_name` in your terminal (your project's name) to enter the project. This is necessary for the next step.

### Init database
Make sure to fill out login detail to a database in /etc/config/database.yaml.
```yaml
connection:
    driver: mysql
    host: localhost
    username: root
    password: ''
    database: myapp_db
    port: 3306
    prefix: prefix_
```
Init the database by running in your terminal from the root of the project.
```shell
php bin/console orm:sync
```

### Setup app details
Fill out /etc/config/app.yaml. Make sure to add the right baseurl, otherwise routing won't work.

### All set!
Visit your site site _app-domain_/hello-world and you should get the following response
```json
{
    "message": "Hey legend! Let's get started at https://swiftapi.github.io/swift-docs/"
}
```

From here you can rename the references from MyApp to your own namespace and get going.
1. Rename in root services.yaml (this references to destination to the first part of the namespace)
2. Rename in App folder
3. Rename in app/config.yaml
4. Rename namespace of the HelloWorld controller or remove it

## Option 2: Manual install
This one quite a bit harder and not recommended, however it is possible.

### Install
Get it from Composer https://packagist.org/packages/swift-api/swift. Only do this if you're quite familiar with Swift.
```shell
composer require swift-api/swift
```

### Create right file structure
See https://github.com/SwiftAPI/swift-starter as a reference for setting the right folder structure and files.

### Init database
Make sure to fill out login detail to a database in /etc/config/database.yaml
```yaml
connection:
    driver: mysql
    host: localhost
    username: root
    password: ''
    database: myapp_db
    port: 3306
    prefix: prefix_
```
Init the database by running
```shell
php bin/console orm:sync
```

### Setup app details
Fill out /etc/config/app.yaml. Make sure to add the right baseurl, otherwise routing won't work.

### All set!
You should be able to create an endpoint now and retrieve responses accordingly.