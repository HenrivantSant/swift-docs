(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{121:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var o=n(0),r=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),s=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):g(g({},t),e)),n},p=function(e){var t=s(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=s(n),m=o,d=p["".concat(a,".").concat(m)]||p[m]||u[m]||i;return n?r.a.createElement(d,g(g({ref:t},c),{},{components:n})):r.a.createElement(d,g({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=m;var g={};for(var l in t)hasOwnProperty.call(t,l)&&(g[l]=t[l]);g.originalType=e,g.mdxType="string"==typeof e?e:o,a[1]=g;for(var c=2;c<i;c++)a[c]=n[c];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},90:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return g})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return s}));var o=n(3),r=n(7),i=(n(0),n(121)),a={title:"Logging"},g={unversionedId:"logging",id:"logging",isDocsHomePage:!1,title:"Logging",description:"Logging is crucial to know when certain things occur in the application or what errors happen. The guys from Monolog have done an outstanding job at their component. This logging component is a small wrapper around Monolog to easily integrate it with the rest of the system, but feel free to use it directly.",source:"@site/docs/logging.md",slug:"/logging",permalink:"/swift-docs/docs/logging",editUrl:"https://github.com/SwiftAPI/swift-docs/tree/master/docs/logging.md",version:"current",sidebar:"docs",previous:{title:"HTTP Foundation",permalink:"/swift-docs/docs/httpfoundation"},next:{title:"Making requests",permalink:"/swift-docs/docs/making-requests"}},l=[{value:"Native logging",id:"native-logging",children:[{value:"AppLogger",id:"applogger",children:[]},{value:"DBLogger",id:"dblogger",children:[]},{value:"SystemLogger",id:"systemlogger",children:[]}]},{value:"Configuration",id:"configuration",children:[]},{value:"Custom logger",id:"custom-logger",children:[]},{value:"Events",id:"events",children:[]}],c={toc:l};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Logging is crucial to know when certain things occur in the application or what errors happen. The guys from ",Object(i.b)("a",{parentName:"p",href:"https://github.com/Seldaek/monolog"},"Monolog")," have done an outstanding job at their component. This logging component is a small wrapper around Monolog to easily integrate it with the rest of the system, but feel free to use it directly."),Object(i.b)("h4",{id:"purpose"},"Purpose"),Object(i.b)("p",null,"Provide a simple wrapper, utilities and ready-to-go loggers within the framework. As well as configurable system logging."),Object(i.b)("h2",{id:"native-logging"},"Native logging"),Object(i.b)("p",null,"Some native loggers come with the package. For more detailed information on usage see ",Object(i.b)("a",{parentName:"p",href:"https://github.com/Seldaek/monolog"},"Monolog Documentation"),". This will be focused on added/Swift specific features."),Object(i.b)("h3",{id:"applogger"},"AppLogger"),Object(i.b)("p",null,"Logs to a /var/app.log file."),Object(i.b)("h3",{id:"dblogger"},"DBLogger"),Object(i.b)("p",null,"Logs to the log table (",Object(i.b)("inlineCode",{parentName:"p"},"Swift\\Logging\\Entity\\LogEntity"),")."),Object(i.b)("h3",{id:"systemlogger"},"SystemLogger"),Object(i.b)("p",null,"System logger is mainly meant for the system itself. When extending core functionality this is a useful place. Otherwise, use App/DB Logging or a custom logger."),Object(i.b)("h2",{id:"configuration"},"Configuration"),Object(i.b)("p",null,"At this moment configuration is still limited. However it is possible to send logging notifications by mail for error levels from ERROR and higher. This configuration can be set in ",Object(i.b)("inlineCode",{parentName:"p"},"etc/app.yaml")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"logging:\n  enable_mail: true\n  logging_mail_from: log@example.com\n  logging_mail_to: log@example.com\n")),Object(i.b)("h2",{id:"custom-logger"},"Custom logger"),Object(i.b)("p",null,"Easily create your own logger by extending ",Object(i.b)("inlineCode",{parentName:"p"},"Swift\\Logging\\AbstractLogger"),", this extends ",Object(i.b)("inlineCode",{parentName:"p"},"Monolog\\Logger")," with some useful functionality and e.g. dispatches certain events. "),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-php"},"declare(strict_types=1);\n\nnamespace Swift\\Logging;\n\nuse Swift\\Kernel\\Attributes\\Autowire;\nuse Swift\\Logging\\Formatter\\LineFormatter;\nuse Monolog\\Handler\\StreamHandler;\n\n/**\n * Class AppLogger\n * @package Swift\\Logging\n */\n#[Autowire]\nclass AppLogger extends AbstractLogger {\n\n    /**\n     * AppLogger constructor.\n     */\n    public function __construct() {\n        $stream = new StreamHandler(INCLUDE_DIR . '/var/app.log', AbstractLogger::DEBUG);\n        $stream->setFormatter(new LineFormatter());\n\n        parent::__construct('app', array($stream));\n    }\n\n\n}\n")),Object(i.b)("h2",{id:"events"},"Events"))}s.isMDXComponent=!0}}]);