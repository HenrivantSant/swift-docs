(window.webpackJsonp=window.webpackJsonp||[]).push([[76,56],{158:function(e,t,a){"use strict";var r=a(3),l=a(7),o=a(0),n=a.n(o),c=a(156),s=a(150),i=a(149),m=a(153),f=a(55),u=a.n(f),h=a(155);function d(e){var t=e.to,a=e.href,o=e.label,c=e.prependBaseUrlToHref,i=Object(l.a)(e,["to","href","label","prependBaseUrlToHref"]),f=Object(m.a)(t),u=Object(m.a)(a,{forcePrependBaseUrl:!0});return n.a.createElement(s.a,Object(r.a)({className:"footer__link-item"},a?{href:c?u:a}:{to:f},i),o)}var p=function(e){var t=e.sources,a=e.alt;return n.a.createElement(h.a,{className:"footer__logo",alt:a,sources:t})};t.a=function(){var e=Object(i.useThemeConfig)().footer,t=e||{},a=t.copyright,r=t.links,l=void 0===r?[]:r,o=t.logo,f=void 0===o?{}:o,h={light:Object(m.a)(f.src),dark:Object(m.a)(f.srcDark||f.src)};return e?n.a.createElement("footer",{className:Object(c.a)("footer",{"footer--dark":"dark"===e.style})},n.a.createElement("div",{className:"container"},l&&l.length>0&&n.a.createElement("div",{className:"row footer__links"},l.map((function(e,t){return n.a.createElement("div",{key:t,className:"col footer__col"},null!=e.title?n.a.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?n.a.createElement("ul",{className:"footer__items"},e.items.map((function(e,t){return e.html?n.a.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):n.a.createElement("li",{key:e.href||e.to,className:"footer__item"},n.a.createElement(d,e))}))):null)}))),(f||a)&&n.a.createElement("div",{className:"footer__bottom text--center"},f&&(f.src||f.srcDark)&&n.a.createElement("div",{className:"margin-bottom--sm"},f.href?n.a.createElement(s.a,{href:f.href,className:u.a.footerLogoLink},n.a.createElement(p,{alt:f.alt,sources:h})):n.a.createElement(p,{alt:f.alt,sources:h})),a?n.a.createElement("div",{className:"footer__copyright",dangerouslySetInnerHTML:{__html:a}}):null))):null}},176:function(e,t,a){"use strict";a.r(t);var r=a(0),l=a.n(r),o=a(157),n=a(152);t.default=function(){return l.a.createElement(o.a,{title:"Page Not Found"},l.a.createElement("main",{className:"container margin-vert--xl"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col col--6 col--offset-3"},l.a.createElement("h1",{className:"hero__title"},l.a.createElement(n.a,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),l.a.createElement("p",null,l.a.createElement(n.a,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),l.a.createElement("p",null,l.a.createElement(n.a,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}}}]);