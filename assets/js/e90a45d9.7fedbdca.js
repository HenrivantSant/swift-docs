(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{132:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return a})),t.d(n,"toc",(function(){return u})),t.d(n,"default",(function(){return l}));var r=t(3),o=t(7),i=(t(0),t(141)),c={title:"Configuration"},a={unversionedId:"runtime/configuration",id:"runtime/configuration",isDocsHomePage:!1,title:"Configuration",description:"The Runtime Component is configured in the etc/runtime.yaml file.",source:"@site/docs/runtime/configuration.md",slug:"/runtime/configuration",permalink:"/swift-docs/docs/runtime/configuration",editUrl:"https://github.com/SwiftAPI/swift-docs/tree/main/docs/runtime/configuration.md",version:"current",sidebar:"docs",previous:{title:"Introduction",permalink:"/swift-docs/docs/runtime/introduction"},next:{title:"Cron",permalink:"/swift-docs/docs/runtime/cron"}},u=[],p={toc:u};function l(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The Runtime Component is configured in the ",Object(i.b)("inlineCode",{parentName:"p"},"etc/runtime.yaml")," file."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"runtime:\n    enabled: true\nfile_watcher:\n    enabled: true\n    watch: [services.yaml, app, src, etc/config]\n    extensions: [php, yaml]\n    ignore: [tests]\nwebsocket:\n    port: 8000\ncron:\n    enabled: true\n    run_in_background: true\ncoroutines:\n    enabled: true\n    run_in_background: true\n")))}l.isMDXComponent=!0},141:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return d}));var r=t(0),o=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=o.a.createContext({}),l=function(e){var n=o.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},s=function(e){var n=l(e.components);return o.a.createElement(p.Provider,{value:n},e.children)},f={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},m=o.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),s=l(t),m=r,d=s["".concat(c,".").concat(m)]||s[m]||f[m]||i;return t?o.a.createElement(d,a(a({ref:n},p),{},{components:t})):o.a.createElement(d,a({ref:n},p))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,c=new Array(i);c[0]=m;var a={};for(var u in n)hasOwnProperty.call(n,u)&&(a[u]=n[u]);a.originalType=e,a.mdxType="string"==typeof e?e:r,c[1]=a;for(var p=2;p<i;p++)c[p]=t[p];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);