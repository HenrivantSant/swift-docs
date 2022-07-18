---
title: Coroutines
---

Coroutines are fairly similar to crons. However, cron as meant to be run in the background, while coroutines are meant to be run in the foreground. This means it's important to not run blocking code in coroutines.

In case you're not sure whether to use coroutines or crons, it's recommended to use a cron.

Coroutines are implemented by implementing the `Swift\Coroutine\CoroutineInterface` interface.

```php
<?php declare( strict_types=1 );

namespace Swift\CoRoutines\Test;


use React\Promise\Promise;
use Swift\CoRoutines\Job;
use Swift\Console\Style\ConsoleStyle;
use function React\Async\async;
use function React\Async\await;

class CoRoutine implements \Swift\CoRoutines\CoRoutineInterface {
    
    public function getIdentifier(): string {
        return 'foo bar';
    }
    
    public function getDescription(): string {
        return 'Test coroutine';
    }
    
    public function configure( Job $job ): Job {
        return $job->everyMinute()->onlyOne();
    }
    
    public function run( ?ConsoleStyle $consoleStyle ): void {
        // Do something here
    }
    
}
```