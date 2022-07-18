(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{139:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return v}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=i.a.createContext({}),l=function(e){var t=i.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=l(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=l(n),b=r,v=d["".concat(s,".").concat(b)]||d[b]||p[b]||o;return n?i.a.createElement(v,a(a({ref:t},u),{},{components:n})):i.a.createElement(v,a({ref:t},u))}));function v(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=b;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:r,s[1]=a;for(var u=2;u<o;u++)s[u]=n[u];return i.a.createElement.apply(null,s)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},92:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return a})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var r=n(3),i=n(7),o=(n(0),n(139)),s={title:"Events, Subscribers & Listeners"},a={unversionedId:"events-and-subscribers",id:"events-and-subscribers",isDocsHomePage:!1,title:"Events, Subscribers & Listeners",description:"Under the hood the Symfony Event Dispatcher is used, however there is a custom implementation on the Event Dispatcher. This is in order to provide future stability and to enable the system for adding functionality in to the event system.",source:"@site/docs/events-and-subscribers.md",slug:"/events-and-subscribers",permalink:"/swift-docs/docs/events-and-subscribers",editUrl:"https://github.com/SwiftAPI/swift-docs/tree/main/docs/events-and-subscribers.md",version:"current",sidebar:"docs",previous:{title:"Dependency Injection",permalink:"/swift-docs/docs/dependency-injection"},next:{title:"Introduction",permalink:"/swift-docs/docs/graphql/introduction"}},c=[{value:"Subscriber or listening to events",id:"subscriber-or-listening-to-events",children:[{value:"Subscribing to events",id:"subscribing-to-events",children:[]},{value:"Listening to an event",id:"listening-to-an-event",children:[]}]},{value:"How to create your own events",id:"how-to-create-your-own-events",children:[]},{value:"Dispatching events",id:"dispatching-events",children:[]},{value:"Default system events",id:"default-system-events",children:[]}],u={toc:c};function l(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Under the hood the ",Object(o.b)("a",{parentName:"p",href:"https://symfony.com/doc/current/components/event_dispatcher.html"},"Symfony Event Dispatcher")," is used, however there is a custom implementation on the Event Dispatcher. This is in order to provide future stability and to enable the system for adding functionality in to the event system."),Object(o.b)("h2",{id:"subscriber-or-listening-to-events"},"Subscriber or listening to events"),Object(o.b)("p",null,"You can choose to subscribe to (multiple) events by using an EventSubscriber. An EventSubscriber has to return an array of the events it desires to listen (subscribe) to. An EventListener on the other hand can mark a public method as a Listener for a specific event by annotating it with the ListenTo attribute (example below)."),Object(o.b)("h3",{id:"subscribing-to-events"},"Subscribing to events"),Object(o.b)("p",null,"When you want to do something when a given event occurs (like logging, or for example add a Route variable_type) you can subscribe to those events using a EventSubscriber instance. In contrary to Symfony, in this system Event Subscriber do support Dependency Injection. It is recommended to only use subscribers to 'catch' the event and use a service to execute the actual logic (and if applicable apply the result to the event). Quite the same as you would do in a Controller or a command. This makes the logic in the service reusable for different occasions and keeps the subscriber clean."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-php"},"<?php declare( strict_types=1 );\n\n\nnamespace App\\Foo\\EventSubscriber;\n\n\nuse Swift\\Router\\Event\\OnBeforeRouteEnterEvent;\n\nclass FooSubscriber implements \\Swift\\Events\\EventSubscriberInterface {\n    \n    /**\n     * @inheritDoc\n     */\n    public static function getSubscribedEvents(): array {\n        return [\n            OnBeforeRouteEnterEvent::class => 'onBeforeRouteEnter',\n        ];\n    }\n    \n    public function onBeforeRouteEnter( OnBeforeRouteEnterEvent $event ): void {\n        // Do something here\n    }\n    \n}\n")),Object(o.b)("h3",{id:"listening-to-an-event"},"Listening to an event"),Object(o.b)("p",null,"Listen to an event by marking the class an EventListener by implement the Interface and marking a method as a listener. Provide the event as argument in the attribute. The event will be passed to the method as an argument."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-php"},"<?php declare( strict_types=1 );\n\n\nnamespace App\\Foo\\Listener;\n\n\nuse Swift\\Events\\Attribute\\ListenTo;\nuse Swift\\Security\\Authentication\\Events\\AuthenticationTokenCreatedEvent;\nuse Swift\\Security\\Authentication\\Token\\ResetPasswordToken;\n\nclass OnAfterAuthentication implements \\Swift\\Events\\EventListenerInterface {\n    \n    /**\n     * Send user a mail with password reset token after creating one\n     *\n     * @param AuthenticationTokenCreatedEvent $event\n     */\n    #[ListenTo(event: AuthenticationTokenCreatedEvent::class)]\n    public function mailOnPasswordTokenCreated( AuthenticationTokenCreatedEvent $event ): void {\n        if ($event->getToken() instanceof ResetPasswordToken) {\n            mail(\n                to: $event->getToken()->getUser()->getEmail(),\n                subject: 'Password reset',\n                message: sprintf('Hi %s, Hereby your password reset token: %s.', $event->getToken()->getUser()->getFullName(), $event->getToken()->getTokenString())\n            );\n        }\n    }\n    \n}\n")),Object(o.b)("h2",{id:"how-to-create-your-own-events"},"How to create your own events"),Object(o.b)("p",null,"Events are classes which can be dispatched using the EventDispatcher. You can easily create your own like the example."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-php"},"declare(strict_types=1);\n\nnamespace Swift\\Security\\Authentication\\Events;\n\n\nuse Swift\\Events\\AbstractEvent;\nuse Swift\\Security\\Authentication\\Token\\TokenInterface;\n\n/**\n * Class AuthenticationTokenCreatedEvent\n * @package Swift\\Security\\Authentication\\Events\n */\nclass AuthenticationTokenCreatedEvent extends AbstractEvent {\n\n    protected static string $eventDescription = 'Authentication token has been created';\n    protected static string $eventLongDescription = '';\n\n    /**\n     * AuthenticationTokenCreatedEvent constructor.\n     *\n     * @param TokenInterface $token\n     */\n    public function __construct(\n        private TokenInterface $token,\n    ) {\n    }\n\n    /**\n     * @return TokenInterface\n     */\n    public function getToken(): TokenInterface {\n        return $this->token;\n    }\n\n    /**\n     * @param TokenInterface $token\n     */\n    public function setToken( TokenInterface $token ): void {\n        $this->token = $token;\n    }\n\n}\n")),Object(o.b)("h2",{id:"dispatching-events"},"Dispatching events"),Object(o.b)("p",null,"Events are dispatched using the EventDispatcher. You will need to inject the EventDispatcher (",Object(o.b)("inlineCode",{parentName:"p"},"Swift\\Events\\EventDispatcher"),") into your class."),Object(o.b)("p",null,"Below an example from the Authentication Manager dispatching an event for the created token."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-php"},"// Create authenticated token\n$token = $authenticator->createAuthenticatedToken( $passport );\n$token = $this->eventDispatcher->dispatch( new AuthenticationTokenCreatedEvent( $token ) )->getToken();\n")),Object(o.b)("h2",{id:"default-system-events"},"Default system events"),Object(o.b)("p",null,"All events and their description can be listed by running the command ",Object(o.b)("inlineCode",{parentName:"p"},"php bin/console events:list:all"),". This will result in something as such."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-shell"},"$ php bin/console events:list:all\n ---------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------\n  event                                                                  description\n ---------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------\n  Foo\\Event\\OnBeforeFooEvent                                             Foo example event\n\n  Swift\\HttpFoundation\\Event\\BeforeResponseEvent                         Before response is send\n\n  Swift\\Kernel\\Event\\KernelOnBeforeShutdown                              Before Kernel is terminated after sending response\n\n  Swift\\Kernel\\Event\\KernelRequestEvent                                  Entry into Kernel, before routing and authentication has started\n\n  Swift\\Logging\\Event\\OnBeforeLoggerHandlersEvent                        On Logger construction. Optionally add or remove Logger Handlers\n\n  Swift\\Model\\Events\\EntityOnFieldSerializeEvent                         Before entity serializes field\n\n  Swift\\Model\\Events\\EntityOnFieldUnSerializeEvent                       Before entity deserializes field\n\n  Swift\\Router\\Event\\OnBeforeRouteEnterEvent                             Route is matched, but not the Controller has not been called yet\n\n  Swift\\Router\\Event\\OnBeforeRoutesCompileEvent                          Routes have been collected from Controller, but have not been Compiled yet. Add, modify or remove routes\n  \n  Swift\\Security\\Authentication\\Events\\AuthenticationFailedEvent         Authentication has failed. This could be due to an error or access could be denied\n\n  Swift\\Security\\Authentication\\Events\\AuthenticationFinishedEvent       Authentication process is completed\n\n  Swift\\Security\\Authentication\\Events\\AuthenticationSuccessEvent        A user or client has successfully authenticated against the application\n\n  Swift\\Security\\Authentication\\Events\\AuthenticationTokenCreatedEvent   Authentication token has been created\n\n  Swift\\Security\\Authentication\\Events\\CheckPassportEvent                Passport has been created. Run any validations against passport or add data to passport\n ---------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------\n")))}l.isMDXComponent=!0}}]);