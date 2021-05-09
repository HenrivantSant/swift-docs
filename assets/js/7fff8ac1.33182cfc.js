(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{100:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return h}));var a=n(3),r=n(7),i=(n(0),n(121)),o={title:"Authentication"},s={unversionedId:"security/authentication",id:"security/authentication",isDocsHomePage:!1,title:"Authentication",description:"Authentication represents the process where users or clients confirm they're identity with the application. The authentication process follows a certain number of steps to finally generate a Token. This token represents the access the current user or client has.",source:"@site/docs/security/authentication.md",slug:"/security/authentication",permalink:"/swift-docs/docs/security/authentication",editUrl:"https://github.com/SwiftAPI/swift-docs/tree/master/docs/security/authentication.md",version:"current",sidebar:"docs",previous:{title:"Introduction",permalink:"/swift-docs/docs/security/introduction"},next:{title:"Authorization",permalink:"/swift-docs/docs/security/authorization"}},c=[{value:"Authentication process",id:"authentication-process",children:[{value:"Passport",id:"passport",children:[]},{value:"Token (Visa)",id:"token-visa",children:[]}]},{value:"Events",id:"events",children:[]},{value:"Entry points",id:"entry-points",children:[{value:"Entry point routes",id:"entry-point-routes",children:[]}]},{value:"Fetching the Token or User in Service",id:"fetching-the-token-or-user-in-service",children:[]},{value:"Fetching the Token or User in Controller",id:"fetching-the-token-or-user-in-controller",children:[]}],u={toc:c};function h(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Authentication represents the process where users or clients confirm they're identity with the application. The authentication process follows a certain number of steps to finally generate a Token. This token represents the access the current user or client has. "),Object(i.b)("h2",{id:"authentication-process"},"Authentication process"),Object(i.b)("p",null,"Authentication is handled by 'Authenticators'. Implementing the ",Object(i.b)("a",{parentName:"p",href:"https://github.com/HenrivantSant/swift/blob/master/src/Security/Authentication/Authenticator/AuthenticatorInterface.php"},Object(i.b)("inlineCode",{parentName:"a"},"Swift\\Security\\Authentication\\Authenticator\\AuthenticatorInterface")),". Take a look a REST User Authenticator for example:"),Object(i.b)("p",null,"A very important note is that the authentication process takes place before actually executing the Request a Controller. By the time a Controller method gets called Authentication has already finished. Authentication therefore NEVER takes place in a Controller. A controller however can still define Authentication Endpoints and return it's reponse. More  on this later."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-php"},"declare(strict_types=1);\n\nnamespace Swift\\Security\\Authentication\\Authenticator\\User;\n\n\nuse Swift\\HttpFoundation\\RequestInterface;\nuse Swift\\HttpFoundation\\HeaderBag;\nuse Swift\\HttpFoundation\\JsonResponse;\nuse Swift\\HttpFoundation\\ResponseInterface;\nuse Swift\\Kernel\\Attributes\\Autowire;\nuse Swift\\Model\\EntityInterface;\nuse Swift\\Security\\Authentication\\Authenticator\\AuthenticatorEntrypointInterface;\nuse Swift\\Security\\Authentication\\Authenticator\\AuthenticatorInterface;\nuse Swift\\Security\\Authentication\\Exception\\AuthenticationException;\nuse Swift\\Security\\Authentication\\Passport\\Credentials\\PasswordCredentials;\nuse Swift\\Security\\Authentication\\Passport\\Passport;\nuse Swift\\Security\\Authentication\\Passport\\PassportInterface;\nuse Swift\\Security\\Authentication\\Token\\AuthenticatedToken;\nuse Swift\\Security\\Authentication\\Token\\TokenInterface;\nuse Swift\\Security\\User\\UserProviderInterface;\n\n/**\n * Class UserAuthenticator\n * @package Swift\\Security\\Authentication\\Authenticator\n */\n#[Autowire]\nfinal class UserAuthenticator implements AuthenticatorInterface, AuthenticatorEntrypointInterface {\n\n    /**\n     * AccessTokenAuthenticator constructor.\n     *\n     * @param EntityInterface $accessTokenEntity\n     * @param UserProviderInterface $userProvider\n     */\n    public function __construct(\n        private EntityInterface $accessTokenEntity,\n        private UserProviderInterface $userProvider,\n    ) {\n    }\n\n    /**\n     * Confirm whether authenticator can authenticate current request\n     *\n     * @param RequestInterface $request\n     *\n     * @return bool\n     */\n    public function supports( RequestInterface $request ): bool {\n        /** @var HeaderBag $headers */\n        $headers = $request->getHeaders();\n\n        return ($headers->has('php-auth-user') && $headers->has('php-auth-pw'));\n    }\n\n    /**\n     * Authenticate given request\n     *\n     * @param RequestInterface $request\n     *\n     * @return PassportInterface    PassportInterface representing the user\n     *\n     * @throws AuthenticationException  When authentication fails. In onAuthenticationFailure you will be able to further deal with this and generate a fitting response\n     */\n    public function authenticate( RequestInterface $request ): PassportInterface {\n        /** @var HeaderBag $headers */\n        $headers = $request->getHeaders();\n\n        $username = $headers->get('php-auth-user');\n        $password = $headers->get('php-auth-pw');\n\n        if (!$user = $this->userProvider->getUserByUsername($username)) {\n            throw new AuthenticationException('No user found with given credentials');\n        }\n\n        return new Passport($user, new PasswordCredentials( $password ));\n    }\n\n    /**\n     * Create an authenticated token based on given passport\n     *\n     * @param PassportInterface $passport\n     *\n     * @return TokenInterface\n     */\n    public function createAuthenticatedToken( PassportInterface $passport ): TokenInterface {\n        return new AuthenticatedToken(\n            user: $passport->getUser(),\n            scope: TokenInterface::SCOPE_ACCESS_TOKEN,\n            token: null,\n            isAuthenticated: true,\n        );\n    }\n\n    /**\n     * Called when successfully authenticated.\n     *\n     * @param RequestInterface $request\n     * @param TokenInterface $token\n     *\n     * @return ResponseInterface|null   Null will make the request move on. By returning a response this response will be used and the request will not move on\n     */\n    public function onAuthenticationSuccess( RequestInterface $request, TokenInterface $token ): ?ResponseInterface {\n        return null;\n    }\n\n    /**\n     * Called on authentication failure.\n     *\n     * @param RequestInterface $request\n     * @param AuthenticationException $authenticationException\n     *\n     * @return ResponseInterface|null   Null will ignore the failure and move on. By returning a response this response will be used and the request will not move on\n     */\n    public function onAuthenticationFailure( RequestInterface $request, AuthenticationException $authenticationException ): ?ResponseInterface {\n        $response = new \\stdClass();\n        $response->message = $authenticationException->getMessage();\n        $response->code = $authenticationException->getCode();\n        return new JsonResponse($response, $authenticationException->getCode());\n    }\n}\n")),Object(i.b)("p",null,"The authentication process is directed by an Authentication Manager. This manager checks all Authenticators whether the 'support' the given request. Once a Authenticator claims it support the Request, this Authenticator will be executed. No other Authenticator will be searched for nor authenticated against."),Object(i.b)("h3",{id:"passport"},"Passport"),Object(i.b)("p",null,"Once the authenticator claims to support the request (for example credentials have been found in the header) the Authentication Manager will call the authenticate method which is supposed to return a Passport representing the User or Client trying to authentication. This can be the default ",Object(i.b)("a",{parentName:"p",href:"https://github.com/HenrivantSant/swift/blob/master/src/Security/Authentication/Passport/Passport.php"},Object(i.b)("inlineCode",{parentName:"a"},"Swift\\Security\\Authentication\\Passport\\Passport"))," or any class implementing the ",Object(i.b)("a",{parentName:"p",href:"https://github.com/HenrivantSant/swift/blob/master/src/Security/Authentication/Passport/PassportInterface.php"},Object(i.b)("inlineCode",{parentName:"a"},"Swift\\Security\\Authentication\\Passport\\PassportInterface")),". This passport contains the User (implementation of ",Object(i.b)("a",{parentName:"p",href:"https://github.com/HenrivantSant/swift/blob/master/src/Security/User/UserInterface.php"},Object(i.b)("inlineCode",{parentName:"a"},"Swift\\Security\\User\\UserInterface\n")),") that is found based on the Request and should contain and instance of ",Object(i.b)("a",{parentName:"p",href:"https://github.com/HenrivantSant/swift/blob/master/src/Security/Authentication/Passport/Credentials/CredentialsInterface.php"},Object(i.b)("inlineCode",{parentName:"a"},"Swift\\Security\\Authentication\\Passport\\Credentials\\CredentialsInterface")),". The Passport calls ",Object(i.b)("inlineCode",{parentName:"p"},"validateCredentials()")," on this credentials to validate whether the provided credentials in the Request match the ones belonging the User on the Passport. "),Object(i.b)("h4",{id:"stamps"},"Stamps"),Object(i.b)("p",null,"A Passport can be enriched with Stamps ",Object(i.b)("a",{parentName:"p",href:"https://github.com/HenrivantSant/swift/blob/master/src/Security/Authentication/Passport/Stamp/StampInterface.php"},Object(i.b)("inlineCode",{parentName:"a"},"Swift\\Security\\Authentication\\Passport\\Stamp\\StampInterface")),". This could for example tell that Authentication is already okay in case of a valid Bearer token. Take a look a ",Object(i.b)("inlineCode",{parentName:"p"},"AccessTokenAuthenticator::authenticate()")," for example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-php"},"/**\n * @inheritDoc\n */\npublic function authenticate( RequestInterface $request ): PassportInterface {\n    /** @var HeaderBag $headers */\n    $headers = $request->getHeaders();\n    $accessToken = str_replace('Bearer ', '', $headers->get('authorization'));\n\n    if (!$token = $this->accessTokenEntity->findOne(array('accessToken' => $accessToken))) {\n        throw new InvalidCredentialsException('No valid token found', Response::HTTP_UNAUTHORIZED);\n    }\n\n    if (!$token->userId && !$token->clientId) {\n        throw new AuthenticationException('No user or client related to token');\n    }\n\n    if ($token->userId) {\n        $user = $this->userProvider->getUserById($token->userId);\n    } else {\n        $user = $this->oauthClientsEntity->findOne([\n            'id' => $token->clientId,\n        ]);\n\n        if (!$user) {\n            throw new AuthenticationException('Client not found');\n        }\n\n        $user = new ClientUser(...(array) $user);\n    }\n\n    return new Passport($user, new AccessTokenCredentials($token), array(new PreAuthenticatedStamp($token)));\n}\n")),Object(i.b)("h4",{id:"attributes"},"Attributes"),Object(i.b)("p",null,"Besides Stamps there's also attributes that can be passed. This no more, and no less than simple meta data that can shipped with the Passport. This could be useful for passing state or redirect data in case of Oauth authentication for example."),Object(i.b)("h3",{id:"token-visa"},"Token (Visa)"),Object(i.b)("p",null,"After the Passport has been created in the authentication the Authenticator will be passed the Passport to ",Object(i.b)("inlineCode",{parentName:"p"},"createAuthenticatedToken( PassportInterface $passport ): TokenInterface")," to create a token based on this Passport. This token should implement the ",Object(i.b)("inlineCode",{parentName:"p"},"Swift\\Security\\Authentication\\Token\\TokenInterface")," and plays an important role on the application to provide the authentication user, it's scope, whether the user is authenticated. whether authentication has expired, etc.  "),Object(i.b)("p",null,"In this scope of Passports and Stamps it would make more sense to name a Token a 'Visa', but since 'Token' is generally accepted. This is the term that will be used. "),Object(i.b)("h2",{id:"events"},"Events"),Object(i.b)("p",null,"During Authentication several events are dispatched to patch into to append additional data, deny a Request access and more."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-php"},"/**\n * @param RequestInterface $request\n *\n * @return PassportInterface\n */\npublic function authenticate( RequestInterface $request ): PassportInterface {\n    if ( $authenticator = $this->getAuthenticator( $request ) ) {\n        try {\n            // Get the passport\n            $passport = $authenticator->authenticate( $request );\n\n            // Option for additional passport validation\n            $this->eventDispatcher->dispatch( new CheckPassportEvent( $authenticator, $passport ) );\n\n            // Create authenticated token\n            $token = $authenticator->createAuthenticatedToken( $passport );\n            $token = $this->eventDispatcher->dispatch( new AuthenticationTokenCreatedEvent( $token ) )->getToken();\n\n            // Store the token\n            $this->tokenStoragePool->setToken( $token );\n\n            // Finalize request with provided response\n            if ( $response = $authenticator->onAuthenticationSuccess( $request, $token ) ) {\n                $this->kernel->finalize( $response );\n            }\n\n            $this->security->setPassport( $passport );\n            $this->security->setUser( $token->getUser() );\n            $this->security->setToken( $token );\n\n            $this->eventDispatcher->dispatch( new AuthenticationSuccessEvent( $token, $passport, $request, $authenticator ) );\n\n            return $passport;\n        } catch ( AuthenticationException $authenticationException ) {\n            if ( $response = $authenticator->onAuthenticationFailure( $request, $authenticationException ) ) {\n                $this->kernel->finalize( $response );\n            }\n        }\n    }\n\n    $token    = new Token\\NullToken( new NullUser(), TokenInterface::SCOPE_ACCESS_TOKEN, null, false );\n    $passport = new Passport( $token->getUser(), new NullCredentials() );\n    $this->security->setPassport( $passport );\n    $this->security->setUser( $token->getUser() );\n    $this->security->setToken( $token );\n\n    return $passport;\n}\n")),Object(i.b)("h2",{id:"entry-points"},"Entry points"),Object(i.b)("p",null,"Since authentication occurs before a route is executed a user could potentially authentication against any valid uri. This is not desireable as that might lead to unwanted behaviour, and besides a lot of unclarity for end users."),Object(i.b)("p",null,"One possible solution to this is to check the route in supports method in the authenticator and return false if the uri is not as desired. This works!"),Object(i.b)("p",null,"Another solution is to 'protect' the authenticator by having it implement ",Object(i.b)("inlineCode",{parentName:"p"},"Swift\\Security\\Authentication\\Authenticator\\AuthenticatorEntrypointInterface"),". This will only allow the authenticator on Entry Point Routes. All Swift's default authenticators implement this execept for the AccessTokenAuthenticator as this is not bound to a specific route."),Object(i.b)("h3",{id:"entry-point-routes"},"Entry point routes"),Object(i.b)("p",null,"A route can marked as being an Entry Point by added the ENTRY_POINT tag as in the example below."),Object(i.b)("p",null,"Also note that authentication has already finished when we get to the controller. We simply just get the user and return it. Also we require the user to be authenticated directly. When is a user is authenticated using a token retrieved by an earlier login this will not be true. This way we make sure we're dealing with a 'fresh' authentication. "),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-php"},"/**\n* Rest user authentication endpoint\n*\n* Authentication already occurs on the security component. So all that needs to be done is return the currently authenticated user\n*\n* Only a direct login is valid here. Re-authentication or no authentication is not valid. This is already cover through isGranted in the route (validated by the firewall)\n*\n* @param RouteParameterBag $params\n*\n* @return JsonResponse\n*/\n#[Route( method: [RouteMethodEnum::POST], route: '/login/', name: 'security.user.login', isGranted: [AuthorizationTypesEnum::IS_AUTHENTICATED_DIRECTLY], tags: [Route::TAG_ENTRYPOINT] )]\npublic function login( RouteParameterBag $params ): JsonResponse {\n    $data = $this->getCurrentUser()?->serialize();\n    $data->created = $data->created->format('Y-m-d H:i:s');\n    $data->modified = $data->modified->format('Y-m-d H:i:s');\n    $data->token = new \\stdClass();\n    $data->token->token = $this->getSecurityToken()->getTokenString();\n    $data->token->expires = $this->getSecurityToken()->expiresAt()->format('Y-m-d H:i:s');\n    \n    return new JsonResponse($data);\n}\n")),Object(i.b)("h2",{id:"fetching-the-token-or-user-in-service"},"Fetching the Token or User in Service"),Object(i.b)("p",null,"By injecting the ",Object(i.b)("inlineCode",{parentName:"p"},"Swift\\Security\\Security")," class you will be able to fetch the Token, User and Passport in any Service. Note that it's not possible to inject those directly as these are not available yet at Container Compilation time."),Object(i.b)("h2",{id:"fetching-the-token-or-user-in-controller"},"Fetching the Token or User in Controller"),Object(i.b)("p",null,"A Controller is by default already provided with the Security class through ",Object(i.b)("inlineCode",{parentName:"p"},"$this->security"),". However there's some handy shortcuts:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$this->getSecurityToken()")," // The authenticated token"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$this->getCurrentUser()")," // The currently authenticated user (or NullUser)")),Object(i.b)("p",null,"There is no shortcut for the Passport as this is mainly relevant during Authentication before a token has been granted."))}h.isMDXComponent=!0},121:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=r.a.createContext({}),h=function(e){var t=r.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=h(e.components);return r.a.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=h(n),d=a,f=p["".concat(o,".").concat(d)]||p[d]||l[d]||i;return n?r.a.createElement(f,s(s({ref:t},u),{},{components:n})):r.a.createElement(f,s({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=n[u];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);