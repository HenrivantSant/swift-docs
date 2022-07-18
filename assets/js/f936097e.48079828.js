(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{134:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return l})),t.d(n,"default",(function(){return m}));var o=t(3),a=t(7),r=(t(0),t(139)),i={title:"Command line interface"},c={unversionedId:"command-line-interface",id:"command-line-interface",isDocsHomePage:!1,title:"Command line interface",description:"The command line presents a clean implementation of the Symfony Command Line. See their documentation on how to use the command line general.",source:"@site/docs/command-line-interface.md",slug:"/command-line-interface",permalink:"/swift-docs/docs/command-line-interface",editUrl:"https://github.com/SwiftAPI/swift-docs/tree/main/docs/command-line-interface.md",version:"current",sidebar:"docs",previous:{title:"Attributes",permalink:"/swift-docs/docs/attributes"},next:{title:"Configuration",permalink:"/swift-docs/docs/configuration"}},l=[{value:"Setup",id:"setup",children:[]},{value:"Creating a custom command",id:"creating-a-custom-command",children:[{value:"Output",id:"output",children:[]}]},{value:"Default commands",id:"default-commands",children:[]}],s={toc:l};function m(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"The command line presents a clean implementation of the ",Object(r.b)("a",{parentName:"p",href:"https://symfony.com/doc/current/components/console.html"},"Symfony Command Line"),". See their documentation on how to use the command line general."),Object(r.b)("h2",{id:"setup"},"Setup"),Object(r.b)("p",null,"It's requires a small setup to get to command line running. If you set up using the swift-starter template this is already in place."),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Create a folder 'bin' in your project root"),Object(r.b)("li",{parentName:"ol"},"Create a file (without extension) named 'console' with the content from below")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-php"},"#!/usr/bin/env php\n<?php declare(strict_types=1);\nrequire dirname(__DIR__, 1) . '/vendor/autoload.php';\n\nuse Swift\\Console\\CliApplication;\n\n$CliApplication = new CliApplication();\n$CliApplication->run();\n")),Object(r.b)("p",null,"This should be all. Open your command line in the root of the project and run ",Object(r.b)("inlineCode",{parentName:"p"},"php bin/console list"),"."),Object(r.b)("h2",{id:"creating-a-custom-command"},"Creating a custom command"),Object(r.b)("p",null,"It is very easy to add your own command for running tasks, changing settings, creating cron commands, etc. Create a command by extending the ",Object(r.b)("inlineCode",{parentName:"p"},"Swift\\Console\\Command\\AbstractCommand"),". "),Object(r.b)("p",null,"This class requires to create a method getCommandName() which should return the name of the command. Further this is an extension of the Symfony Command class with some handy utilities. It will automatically be recognized by the container and registered as a command."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-php"},"declare(strict_types=1);\n\nnamespace Foo\\Command;\n\nuse Swift\\Console\\Command\\AbstractCommand;\nuse Symfony\\Component\\Console\\Input\\InputInterface;\nuse Symfony\\Component\\Console\\Output\\OutputInterface;\n\n/**\n * Class FooCommand\n * @package Foo\\Command\n */\nclass FooCommand extends AbstractCommand {\n\n    /**\n     * @inheritDoc\n     */\n    public function getCommandName(): string {\n        // the name of the command (the part after \"bin/console\")\n        return 'foo:bar';\n    }\n\n    /**\n     * Configure command \n     */\n    protected function configure(): void {\n        $this\n            ->setDescription('Command description')\n\n            ->setHelp('Explanatory information about command')\n        ;\n    }\n\n    /**\n     * Entry point for command execution\n     * \n     * @param InputInterface $input     Input for command\n     * @param OutputInterface $output   Output helper for command\n     *\n     * @return int\n     */\n    protected function execute(InputInterface $input, OutputInterface $output): int {\n        $this->io->writeln('Foo bar');\n\n        return AbstractCommand::SUCCESS; // OR AbstractCommand::FAILURE\n    }\n\n}\n")),Object(r.b)("h3",{id:"output"},"Output"),Object(r.b)("p",null,"Symfony automatically provides a 'simple' output helper as the second argument for the execute method. If you desire some more styling to your command or for e.g. tables. Abstract Command already populated a ",Object(r.b)("a",{parentName:"p",href:"https://symfony.com/doc/current/console/style.html"},"Symfony Style")," class ready to use e.g. ",Object(r.b)("inlineCode",{parentName:"p"},"$this->io->title(...)"),"."),Object(r.b)("h2",{id:"default-commands"},"Default commands"),Object(r.b)("p",null,"The system comes with a batch of useful commands. Get a list of all available commands by running ",Object(r.b)("inlineCode",{parentName:"p"},"php bin/console list")," from the command line in the root of your project. The specifics of each command will be explained in their respective chapters."),Object(r.b)("p",null,"This should look something like this:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-shell"},"$ php bin/console foo:bar\nFoo bar\n\nBuro26-Henri@DESKTOP-F8V939M MSYS /c/Buro26/www/swift-helloworld\n$ php bin/console\n\n\n ________  ___       __   ___  ________ _________\n|\\   ____\\|\\  \\     |\\  \\|\\  \\|\\  _____\\___   ___\\\n\\ \\  \\___|\\ \\  \\    \\ \\  \\ \\  \\ \\  \\__/\\|___ \\  \\_|\n \\ \\_____  \\ \\  \\  __\\ \\  \\ \\  \\ \\   __\\    \\ \\  \\\n  \\|____|\\  \\ \\  \\|\\__\\_\\  \\ \\  \\ \\  \\_|     \\ \\  \\\n    ____\\_\\  \\ \\____________\\ \\__\\ \\__\\       \\ \\__\\\n   |\\_________\\|____________|\\|__|\\|__|        \\|__|\n   \\|_________|\n\n\n\nSWIFT CONSOLE \ud83d\ude80\n\nUsage:\n  command [options] [arguments]\n\nOptions:\n  -h, --help            Display help for the given command. When no command is given display help for the list command\n  -q, --quiet           Do not output any message\n  -V, --version         Display this application version\n      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output\n  -n, --no-interaction  Do not ask any interactive question\n  -t, --track-time      Track and report execution time of command\n  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug\n\nAvailable commands:\n  completion              Dump the shell completion script\n  help                    Display help for a command\n  list                    List commands\n app\n  app:mode:set            Set current application mode\n  app:mode:show           Show current application mode\n cache\n  cache:flush             Clear all caches\n  cache:list              List all caches\n config\n  config:get              Get a setting value\n cron\n  cron:run                Starts the event runner.\n dbal\n  dbal:list               Get list of available databases, their tables and records count\n  dbal:table              Describe table schema of specific database\n debug\n  debug:container         Display current services for the application\n events\n  events:list:all         List available event(s)\n  events:list:single      Display event data\n graphql\n  graphql:schema:dump     Dump graphql schema in type language\n orm\n  orm:list                List of all available entities and their tables\n  orm:sync                Sync ORM schema with database (generate tables)\n  orm:update              Show updates for ORM schema based on entity and relation annotations\n routing\n  routing:list            List all or any available route(s)\n security\n  security:client:create\n  security:client:get     Get client by name\n")))}m.isMDXComponent=!0},139:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return b}));var o=t(0),a=t.n(o);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=a.a.createContext({}),m=function(e){var n=a.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},p=function(e){var n=m(e.components);return a.a.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},d=a.a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=m(t),d=o,b=p["".concat(i,".").concat(d)]||p[d]||u[d]||r;return t?a.a.createElement(b,c(c({ref:n},s),{},{components:t})):a.a.createElement(b,c({ref:n},s))}));function b(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,i=new Array(r);i[0]=d;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var s=2;s<r;s++)i[s]=t[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);