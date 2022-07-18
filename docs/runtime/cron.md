---
title: Cron
---

The Runtime Components makes it easy to run tasks in the background. One of the most common tasks is to run cron jobs. A cron can be defined by implementing the `Swift\Cron\CronInterface` interface.

```php
<?php declare( strict_types=1 );

namespace Swift\Cron\Test;

use Swift\Cron\Job;
use Swift\Console\Style\ConsoleStyle;

class TestCron implements \Swift\Cron\CronInterface {
    
    public function getIdentifier(): string {
        return 'foo-bar';
    }
    
    public function getDescription(): string {
        return 'Test cron';
    }
    
    public function configure( Job $job ): Job {
        return $job->at( '*/5 * * * *' );
    }
    
    public function run( ?ConsoleStyle $consoleStyle ): void {
        $consoleStyle?->writeln('Foo bar here!');
        sleep(2);
        $consoleStyle?->writeln('Foo bar here ended!');
    }
    
}
```