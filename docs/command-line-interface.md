---
title: Command line interface
---

The command line presents a clean implementation of the [Symfony Command Line](https://symfony.com/doc/current/components/console.html). See their documentation on how to use the command line general.

## Setup
It's requires a small setup to get to command line running. If you set up using the swift-starter template this is already in place.
1. Create a folder 'bin' in your project root
2. Create a file (without extension) named 'console' with the content from below
```php
#!/usr/bin/env php
<?php declare(strict_types=1);
require dirname(__DIR__, 1) . '/vendor/autoload.php';

use Swift\Console\CliApplication;

$CliApplication = new CliApplication();
$CliApplication->run();
```
This should be all. Open your command line in the root of the project and run ``php bin/console list``.

## Creating a custom command
It is very easy to add your own command for running tasks, changing settings, creating cron commands, etc. Create a command by extending the ``Swift\Console\Command\AbstractCommand``. 

This class requires to create a method getCommandName() which should return the name of the command. Further this is an extension of the Symfony Command class with some handy utilities. It will automatically be recognized by the container and registered as a command.

```php
declare(strict_types=1);

namespace Foo\Command;

use Swift\Console\Command\AbstractCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Class FooCommand
 * @package Foo\Command
 */
class FooCommand extends AbstractCommand {

    /**
     * @inheritDoc
     */
    public function getCommandName(): string {
        // the name of the command (the part after "bin/console")
        return 'foo:bar';
    }

    /**
     * Configure command 
     */
    protected function configure(): void {
        $this
            ->setDescription('Command description')

            ->setHelp('Explanatory information about command')
        ;
    }

    /**
     * Entry point for command execution
     * 
     * @param InputInterface $input     Input for command
     * @param OutputInterface $output   Output helper for command
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int {
        $this->io->writeln('Foo bar');

        return AbstractCommand::SUCCESS; // OR AbstractCommand::FAILURE
    }

}
```

### Output
Symfony automatically provides a 'simple' output helper as the second argument for the execute method. If you desire some more styling to your command or for e.g. tables. Abstract Command already populated a [Symfony Style](https://symfony.com/doc/current/console/style.html) class ready to use e.g. ``$this->io->title(...)``.

## Default commands
The system comes with a batch of useful commands. Get a list of all available commands by running `php bin/console list` from the command line in the root of your project. The specifics of each command will be explained in their respective chapters.

This should look something like this:
```shell
$ php bin/console foo:bar
Foo bar

Buro26-Henri@DESKTOP-F8V939M MSYS /c/Buro26/www/swift-helloworld
$ php bin/console


 ________  ___       __   ___  ________ _________
|\   ____\|\  \     |\  \|\  \|\  _____\___   ___\
\ \  \___|\ \  \    \ \  \ \  \ \  \__/\|___ \  \_|
 \ \_____  \ \  \  __\ \  \ \  \ \   __\    \ \  \
  \|____|\  \ \  \|\__\_\  \ \  \ \  \_|     \ \  \
    ____\_\  \ \____________\ \__\ \__\       \ \__\
   |\_________\|____________|\|__|\|__|        \|__|
   \|_________|



SWIFT CONSOLE 🚀

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given display help for the list command
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -t, --track-time      Track and report execution time of command
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  completion              Dump the shell completion script
  help                    Display help for a command
  list                    List commands
 app
  app:mode:set            Set current application mode
  app:mode:show           Show current application mode
 cache
  cache:flush             Clear all caches
  cache:list              List all caches
 config
  config:get              Get a setting value
 cron
  cron:run                Starts the event runner.
 dbal
  dbal:list               Get list of available databases, their tables and records count
  dbal:table              Describe table schema of specific database
 debug
  debug:container         Display current services for the application
 events
  events:list:all         List available event(s)
  events:list:single      Display event data
 graphql
  graphql:schema:dump     Dump graphql schema in type language
 orm
  orm:list                List of all available entities and their tables
  orm:sync                Sync ORM schema with database (generate tables)
  orm:update              Show updates for ORM schema based on entity and relation annotations
 routing
  routing:list            List all or any available route(s)
 security
  security:client:create
  security:client:get     Get client by name
```