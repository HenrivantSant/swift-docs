(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{100:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return l})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return s}));var r=t(3),i=t(7),a=(t(0),t(143)),o={title:"Middleware"},l={unversionedId:"graphql/middleware",id:"graphql/middleware",isDocsHomePage:!1,title:"Middleware",description:"The GraphQl component heavily relies on middleware for both schema declaration and execution. It is possible to declare your own middleware to handle the schema and execution.",source:"@site/docs/graphql/middleware.md",slug:"/graphql/middleware",permalink:"/swift-docs/docs/graphql/middleware",editUrl:"https://github.com/SwiftAPI/swift-docs/tree/main/docs/graphql/middleware.md",version:"current",sidebar:"docs",previous:{title:"Builder",permalink:"/swift-docs/docs/graphql/builder"},next:{title:"Resolvers",permalink:"/swift-docs/docs/graphql/resolvers"}},c=[{value:"Schema middleware",id:"schema-middleware",children:[]},{value:"Execution middleware",id:"execution-middleware",children:[]},{value:"Advanced usage",id:"advanced-usage",children:[]}],d={toc:c};function s(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},d,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The GraphQl component heavily relies on middleware for both schema declaration and execution. It is possible to declare your own middleware to handle the schema and execution."),Object(a.b)("h2",{id:"schema-middleware"},"Schema middleware"),Object(a.b)("p",null,"With Schema middleware you can modify declaration before they are registered in the schema. You can also block a definition from being registered in the schema. Or wrap in a new definition. Below a fairly simple example where a new resolver function is registered on the user credentials to hash them."),Object(a.b)("p",null,"For a more advanced example, see how the Relay Component wraps 'simple' types in a Connection type: ",Object(a.b)("a",{parentName:"p",href:"https://github.com/SwiftAPI/swift/blob/main/src/GraphQl/Relay/Schema/Middleware/ConnectionMiddleware.php"},"example"),". Here you can see how an existing type is modified and new types are added."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-php"},"<?php declare( strict_types=1 );\n\nnamespace Swift\\Security\\User\\GraphQl\\Schema\\Middleware;\n\n\nuse Swift\\DependencyInjection\\Attributes\\Autowire;\nuse Swift\\GraphQl\\Schema\\Registry;\nuse Swift\\Security\\Authorization\\AuthorizationCheckerInterface;\nuse Swift\\Security\\Security;\n\n#[Autowire]\nclass UserCredentialsMiddleware implements \\Swift\\GraphQl\\Schema\\Middleware\\SchemaMiddlewareInterface {\n    \n    public function __construct(\n        protected Security $security,\n        protected AuthorizationCheckerInterface $authorizationChecker,\n    ) {\n    }\n    \n    /**\n     * @inheritDoc\n     */\n    public function process( mixed $builder, Registry $registry, callable $next ): mixed {\n        if ( ! $builder instanceof \\Swift\\GraphQl\\Schema\\Builder\\ObjectBuilder ) {\n            return $next( $builder, $registry );\n        }\n        \n        if ( $builder->getName() !== 'SecurityUsersCredential' ) {\n            return $next( $builder, $registry );\n        }\n        \n        $fields = $builder->getFields();\n        \n        if ( ! is_array( $fields ) ) {\n            return $next( $builder, $registry );\n        }\n        \n        // Anonymize the password field\n        $fields['credential']['resolve'] = static function() {\n            return '##############';\n        };\n        \n        $builder->setFields( $fields );\n    \n        return $next( $builder, $registry );\n    }\n    \n}\n")),Object(a.b)("h2",{id:"execution-middleware"},"Execution middleware"),Object(a.b)("p",null,"With Execution middleware you can modify the execution of a query or mutation. You can for example add a cache to your execution, or hash a field (e.g. the password of a user). Below again a fairly straight forward example where Relay uses a middleware to decode the id of Node to its actual internal id."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-php"},"<?php declare( strict_types=1 );\n\nnamespace Swift\\GraphQl\\Relay\\Executor\\Middleware;\n\n\nuse GraphQL\\Type\\Definition\\ResolveInfo;\nuse Swift\\Code\\PropertyReader;\nuse Swift\\DependencyInjection\\Attributes\\Autowire;\nuse Swift\\GraphQl\\Relay\\Relay;\nuse Swift\\GraphQl\\Schema\\Registry;\n\n#[Autowire]\nclass NodeMiddleware implements \\Swift\\GraphQl\\Executor\\Middleware\\ResolverMiddlewareInterface {\n    \n    public function __construct(\n        protected PropertyReader $propertyReader,\n    ) {\n    }\n    \n    public function process( mixed $objectValue, mixed $args, mixed $context, ResolveInfo $info, ?callable $next = null ): mixed {\n        if ( ! ( $info->fieldDefinition->getType() instanceof \\GraphQL\\Type\\Definition\\ObjectType ) ||\n             ! $info->fieldDefinition->getType()->implementsInterface( Registry::$typeMap[ Relay::NODE ] )\n        ) {\n            return $next( $objectValue, $args, $context, $info );\n        }\n        \n        if ( ! empty( $args[ 'id' ] ) ) {\n            $response     = Relay::decodeId( $args[ 'id' ] );\n            $args[ 'id' ] = (int) $response[ 'id' ];\n        }\n        \n        return $next( $objectValue, $args, $context, $info );\n    }\n    \n}\n")),Object(a.b)("h2",{id:"advanced-usage"},"Advanced usage"),Object(a.b)("p",null,"Note that calling the $next() function executes the rest of the middleware chain. It is possible to modify the output of your middleware by calling the $next() function, modifying its result and returning it."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-php"},"public function process( mixed $objectValue, mixed $args, mixed $context, ResolveInfo $info, ?callable $next = null ): mixed {\n    // Possibly do something\n    \n    $resolvedValue = $next( $objectValue, $args, $context, $info );\n    \n    // Do something with the resolved value\n    \n    return $resolvedValue;\n} \n")))}s.isMDXComponent=!0},143:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return m}));var r=t(0),i=t.n(r);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var d=i.a.createContext({}),s=function(e){var n=i.a.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=s(e.components);return i.a.createElement(d.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},f=i.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),u=s(t),f=r,m=u["".concat(o,".").concat(f)]||u[f]||p[f]||a;return t?i.a.createElement(m,l(l({ref:n},d),{},{components:t})):i.a.createElement(m,l({ref:n},d))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,o=new Array(a);o[0]=f;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var d=2;d<a;d++)o[d]=t[d];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"}}]);