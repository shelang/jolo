(this.webpackJsonpjolo=this.webpackJsonpjolo||[]).push([[4],{114:function(e,t,n){"use strict";t.a=function(){return[function(e,t){void 0!==t&&window.localStorage.setItem(e,JSON.stringify(t))},function(e){return JSON.parse(window.localStorage.getItem(e))}]}},127:function(e,t,n){},140:function(e,t,n){},224:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),r=n(23),s=n.n(r),a=(n(140),n(38));var o=function(){var e=JSON.parse(window.localStorage.getItem("user"));return e&&e.token},l=n(16),j=(n(130),function(e){return e.perform,e.data,e.depth,e.yes(e)});j.defaultProps={yes:function(){return null},no:function(){return null},depth:0};var b=j,u=n(6);var d=function(e){return o()?Object(u.jsx)(b,{yes:function(){return Object(u.jsx)(l.b,Object(a.a)({},e))},no:function(){return Object(u.jsx)(l.a,{to:"/dashboard"})},perform:e.perform,depth:e.depth}):Object(u.jsx)(l.a,{to:{pathname:"/login"}})},h=n(48),A=n(231),O=n(232),x=[{title:"Create Link",icon:Object(u.jsx)(A.a,{}),url:"dashboard/create-link?isEditing=false",id:1,permission:"link:create"},{title:"Links",icon:Object(u.jsx)(O.a,{}),url:"dashboard/links",id:2,permission:"links:read"}],g=n(114),m=n(226),f=n(42),w=n(233);var p=function(){var e=Object(l.g)(),t=Object(c.useState)(""),n=Object(h.a)(t,2),i=n[0],r=n[1],s=Object(g.a)(),o=Object(h.a)(s,2),j=o[0];return o[1],Object(c.useEffect)((function(){x.forEach((function(t){e.location.pathname.includes(t.url)&&r(t.id.toString())}))}),[]),Object(u.jsxs)(m.a,{mode:"inline",selectedKeys:[i],onClick:function(t){"0"===t.key?(j("user",null),e.push("/login")):r(t.key)},style:{maxHeight:"94vh",height:"94vh",overflow:"auto"},children:[x.map((function(e,t){return Object(u.jsx)(b,{depth:1,yes:function(t){return Object(u.jsx)(m.a.Item,Object(a.a)(Object(a.a)({icon:e.icon},t),{},{children:Object(u.jsx)(f.b,{to:"/".concat(e.url),children:e.title})}),e.id.toString())},no:function(){return null},perform:e.permission},t+1)})),Object(u.jsx)(m.a.Item,{icon:Object(u.jsx)(w.a,{}),style:{position:"absolute",bottom:10},children:"Sign Out"},"0")]})},C="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABFCAYAAADw8dtTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEExQUY1RjlGRjBBMTFFQThFN0JCMzIwNkZFQjgwQkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEExQUY1RkFGRjBBMTFFQThFN0JCMzIwNkZFQjgwQkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QTFBRjVGN0ZGMEExMUVBOEU3QkIzMjA2RkVCODBCRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QTFBRjVGOEZGMEExMUVBOEU3QkIzMjA2RkVCODBCRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po4H65cAAA0tSURBVHja7F0J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",v=n(229),G=n(225),I=n(234),E=n(235),L=n(95),Y=(n(127),v.a.Header),k=v.a.Content,B=v.a.Footer,Z=v.a.Sider;var y=function(e){var t=Object(c.useState)(L.isMobile),n=Object(h.a)(t,2),i=n[0],r=n[1];return Object(u.jsxs)(v.a,{children:[Object(u.jsxs)(Y,{className:"header",children:[L.isMobile?Object(u.jsx)(G.a,{type:"primary",onClick:function(){return r(!i)},style:{marginBottom:16},children:i?Object(u.jsx)(I.a,{}):Object(u.jsx)(E.a,{})}):null,Object(u.jsx)("div",{className:"logo",children:Object(u.jsx)("img",{src:C,alt:"logo",width:200})})]}),Object(u.jsx)(k,{className:"content",children:Object(u.jsxs)(v.a,{className:"site-layout-background",children:[Object(u.jsx)(Z,{trigger:null,collapsible:!0,collapsed:i,className:"site-layout-background",width:200,children:Object(u.jsx)(p,{})}),Object(u.jsx)(k,{className:"internal_content",children:e.children})]})}),Object(u.jsx)(B,{style:{alignItems:"center",height:50,padding:0,display:"flex",justifyContent:"center"},children:"LinkComposer \xa92021 Created by LinkComposer Team"})]})},F=n(230),N=v.a.Header,J=v.a.Content,M=v.a.Footer;var Q=function(e){return Object(u.jsxs)(v.a,{children:[Object(u.jsx)(N,{className:"header",children:Object(u.jsx)("div",{className:"logo",children:Object(u.jsx)(F.a,{src:C,alt:"logo",width:200})})}),Object(u.jsx)(J,{className:"content",children:Object(u.jsx)(v.a,{className:"site-layout-background",children:Object(u.jsx)(J,{className:"internal_content",children:e.children})})}),Object(u.jsx)(M,{style:{textAlign:"center"},children:"LinkComposer \xa92021 Created by LinkComposer Team"})]})};var D=function(e){return Object(u.jsxs)("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",backgroundColor:"#FFF",padding:16},children:[Object(u.jsx)("h1",{children:"Welcome"}),Object(u.jsx)("h4",{children:"The System in under develope..."}),Object(u.jsxs)("p",{children:["plz be patient the ",Object(u.jsx)("strong",{children:e.sectionName})," section will place here."]})]})},W=n(227),P=i.a.lazy((function(){return Promise.all([n.e(0),n.e(2),n.e(11),n.e(10)]).then(n.bind(null,305))})),S=i.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(7)]).then(n.bind(null,308))})),V=i.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(8),n.e(12)]).then(n.bind(null,306))})),z=i.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(9)]).then(n.bind(null,313))}));var R=function(){return Object(u.jsx)(c.Suspense,{fallback:Object(u.jsx)(W.a,{}),children:Object(u.jsxs)(l.d,{children:[Object(u.jsx)(l.b,{exact:!0,path:"/login",render:function(){return Object(u.jsx)(Q,{children:Object(u.jsx)(P,{})})}}),Object(u.jsx)(d,{path:"/",exact:!0,render:function(){return Object(u.jsx)(l.a,{to:{pathname:"/dashboard"}})}}),Object(u.jsx)(d,{path:"/dashboard",exact:!0,render:function(){return Object(u.jsx)(y,{children:Object(u.jsx)(D,{sectionName:"Main Dashboard"})})}}),Object(u.jsx)(d,{path:"/dashboard/create-link",exact:!0,render:function(){return Object(u.jsx)(y,{children:Object(u.jsx)(S,{})})}}),Object(u.jsx)(d,{path:"/dashboard/links",exact:!0,render:function(){return Object(u.jsx)(y,{children:Object(u.jsx)(V,{})})}}),Object(u.jsx)(d,{path:"/dashboard/links/:id",exact:!0,render:function(e){return Object(u.jsx)(y,{children:Object(u.jsx)(z,Object(a.a)({},e))})}})]})})},U=n(129);n(223);var T=function(){return Object(u.jsxs)(f.a,{children:[Object(u.jsx)(U.a,{}),Object(u.jsx)(R,{})]})},H=function(e){e&&e instanceof Function&&n.e(13).then(n.bind(null,307)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),i(e),r(e),s(e)}))};s.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(T,{})}),document.getElementById("root")),H()}},[[224,5,6]]]);
//# sourceMappingURL=main.5bf60b83.chunk.js.map