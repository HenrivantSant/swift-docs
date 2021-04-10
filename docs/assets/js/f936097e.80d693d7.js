(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{113:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return i})),t.d(n,"toc",(function(){return m})),t.d(n,"default",(function(){return u}));var o=t(3),r=t(7),a=(t(0),t(118)),c={title:"Command line interface"},i={unversionedId:"command-line-interface",id:"command-line-interface",isDocsHomePage:!1,title:"Command line interface",description:"The command line presents a clean implementation of the Symfony Command Line. See their documentation on how to use the command line general.",source:"@site/docs/command-line-interface.md",slug:"/command-line-interface",permalink:"/docs/command-line-interface",editUrl:"https://github.com/HenrivantSant/swift/docs/docs/command-line-interface.md",version:"current",sidebar:"docs",previous:{title:"Attributes",permalink:"/docs/attributes"},next:{title:"Configuration",permalink:"/docs/configuration"}},m=[{value:"Setup",id:"setup",children:[]},{value:"Default commands",id:"default-commands",children:[]},{value:"Creating a custom command",id:"creating-a-custom-command",children:[]}],l={toc:m};function u(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The command line presents a clean implementation of the ",Object(a.b)("a",{parentName:"p",href:"https://symfony.com/doc/current/components/console.html"},"Symfony Command Line"),". See their documentation on how to use the command line general."),Object(a.b)("h2",{id:"setup"},"Setup"),Object(a.b)("p",null,"It's requires a small setup to get to command line running."),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Create a folder 'bin' in your project root"),Object(a.b)("li",{parentName:"ol"},"Create a file (without extension) named 'console' with the content from below")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-php"},"#!/usr/bin/env php\n<?php\nrequire_once 'vendor/autoload.php';\n\nuse Swift\\Console\\CLIApplication;\n\n$CLIApplication = new CLIApplication();\n$CLIApplication->run();\n")),Object(a.b)("p",null,"This should be all. Open your command line in the root of the project and run ",Object(a.b)("inlineCode",{parentName:"p"},"php bin/console list"),"."),Object(a.b)("h2",{id:"default-commands"},"Default commands"),Object(a.b)("p",null,"The system comes with a batch of useful commands. Get a list of all available commands by running ",Object(a.b)("inlineCode",{parentName:"p"},"php bin/console list")," from the command line in the root of your project. The specifics of each command will be explained in their respective chapters."),Object(a.b)("h2",{id:"creating-a-custom-command"},"Creating a custom command"),Object(a.b)("p",null,"It is very easy to add your own command for running tasks, changing settings, creating cron commands, etc."),Object(a.b)("h4",{id:"output"},"Output"),Object(a.b)("p",null,"Symfony automatically provides a 'simple' output helper as the second argument for the execute method. If you desire some more styling to your command or for e.g. tables. Abstract Command already populated a ",Object(a.b)("a",{parentName:"p",href:"https://symfony.com/doc/current/console/style.html"},"Symfony Style")," class ready to use e.g. ",Object(a.b)("inlineCode",{parentName:"p"},"$this->io->title(...)"),"."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-php"},"declare(strict_types=1);\n\nnamespace Foo\\Command;\n\nuse Swift\\Console\\Command\\AbstractCommand;\nuse Symfony\\Component\\Console\\Input\\InputInterface;\nuse Symfony\\Component\\Console\\Output\\OutputInterface;\n\n/**\n * Class FooCommand\n * @package Foo\\Command\n */\nclass FooCommand extends AbstractCommand {\n\n    /**\n     * @inheritDoc\n     */\n    public function getCommandName(): string {\n        // the name of the command (the part after \"bin/console\")\n        return 'foo:bar';\n    }\n\n    /**\n     * Configure command \n     */\n    protected function configure(): void {\n        $this\n            ->setDescription('Command description')\n\n            ->setHelp('Explanatory information about command')\n        ;\n    }\n\n    /**\n     * Entry point for command execution\n     * \n     * @param InputInterface $input     Input for command\n     * @param OutputInterface $output   Output helper for command\n     *\n     * @return int\n     */\n    protected function execute(InputInterface $input, OutputInterface $output): int {\n        $this->io->writeln('Foo bar');\n\n        return AbstractCommand::SUCCESS; // OR AbstractCommand::FAILURE\n    }\n\n}\n")))}u.isMDXComponent=!0},118:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return f}));var o=t(0),r=t.n(o);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function m(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=r.a.createContext({}),u=function(e){var n=r.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=u(e.components);return r.a.createElement(l.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},d=r.a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=m(e,["components","mdxType","originalType","parentName"]),p=u(t),d=o,f=p["".concat(c,".").concat(d)]||p[d]||s[d]||a;return t?r.a.createElement(f,i(i({ref:n},l),{},{components:t})):r.a.createElement(f,i({ref:n},l))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,c=new Array(a);c[0]=d;var i={};for(var m in n)hasOwnProperty.call(n,m)&&(i[m]=n[m]);i.originalType=e,i.mdxType="string"==typeof e?e:o,c[1]=i;for(var l=2;l<a;l++)c[l]=t[l];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);