(this.webpackJsonpjolo=this.webpackJsonpjolo||[]).push([[12],{242:function(e,t,n){"use strict";var r=n(237),a=n.n(r),o=n(238),s=n(48),c=n(38),i=n(0);function u(e){return e.status>=200&&e.status<300?p(e):e.json().then((function(e){return Promise.reject(e)}))}function p(e){return l.apply(this,arguments)}function l(){return(l=Object(o.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t||!t.headers){e.next=9;break}if("application/json"!==t.headers.get("Content-Type")){e.next=5;break}return e.next=4,t.json();case 4:return e.abrupt("return",e.sent);case 5:if("text/plain;charset=UTF-8"!==t.headers.get("Content-Type")){e.next=9;break}return e.next=8,t.text();case 8:return e.abrupt("return",e.sent);case 9:return e.abrupt("return",t);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var d=function(e,t){var n=function(e){return"https://n.snpp.link/api/v1"+("/"!==e[0]?"/".concat(e):e)}(e),r=t;if(r.headers=r.headers||{},"formdata"===r.type)for(var a in r.body=new FormData,t.data)"string"===typeof a&&t.data.hasOwnProperty(a)&&"undefined"!==typeof t.data[a]&&r.body.append(a,t.data[a]);else r.body=JSON.stringify(t.data),r.headers["Content-Type"]="application/json",r.headers.Accept="application/json";var o=JSON.parse(window.localStorage.getItem("user"));return o&&o.token&&(r.headers.Authorization="Bearer ".concat(o.token)),fetch(n,Object(c.a)({},r)).then(u).then(p)},f=function(e,t){switch(t.type){case"FETCH_INIT":return Object(c.a)(Object(c.a)({},e),{},{isLoading:!0,error:null,response:null});case"FETCH_SUCCESS":return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1,error:null,response:t.payload});case"FETCH_FAILURE":return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1,error:t.payload,response:null});default:return e}};t.a=function(e){var t=Object(i.useReducer)(f,{isLoading:!1,error:null,response:null}),n=Object(s.a)(t,2),r=n[0],c=n[1];function u(){return(u=Object(o.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,c({type:"FETCH_INIT"}),t.next=4,d(n.url,n);case 4:r=t.sent,e&&e.onSuccess&&e.onSuccess(r),c({type:"FETCH_SUCCESS",payload:r}),t.next=14;break;case 9:t.prev=9,t.t0=t.catch(0),console.log("here",t.t0),e&&e.onError&&e.onError(t.t0),c({type:"FETCH_FAILURE",payload:t.t0});case 14:case"end":return t.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}return[r,function(e){return u.apply(this,arguments)}]}},306:function(e,t,n){"use strict";n.r(t);var r=n(237),a=n.n(r),o=n(238),s=n(48),c=n(0),i=n(242),u=n(16),p=n(300),l=n(314),d=n(282),f=n(227),h=n(309),b=n(6);t.default=function(){var e=Object(u.g)(),t=Object(c.useState)(1),n=Object(s.a)(t,2),r=n[0],j=n[1],k=Object(i.a)(),y=Object(s.a)(k,2),O=y[0],x=O.response,C=O.isLoading,v=(O.error,y[1]);Object(c.useEffect)((function(){g()}),[]);var g=function(){var e=Object(o.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v({url:"links",method:"GET"});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=[{title:"Link ID",dataIndex:"linkId",key:"linkId"},{title:"Link Hash",dataIndex:"linkHash",key:"linkHash"},{title:"Created at",dataIndex:"createAt",key:"createAt"},{title:"Action",key:"action",render:function(t,n){return Object(b.jsxs)(l.b,{size:"middle",children:[Object(b.jsx)("a",{onClick:function(t){return e.push("./links/".concat(n.linkId))},children:"View Report"}),Object(b.jsx)("a",{onClick:function(e){return t=n.linkHash,navigator.clipboard.writeText(t),void p.b.success("Copied to Your Clipboard");var t},children:"Copy"})]})}}];return Object(b.jsx)(d.a,{children:Object(b.jsx)(f.a,{spinning:C,children:Object(b.jsx)(h.a,{columns:w,dataSource:x?x.links:[],pagination:{position:["bottomCenter"],size:"small",current:r,total:x?x.links/10:0,onChange:function(e){j(e)}},style:{width:"100%"}})})})}}}]);
//# sourceMappingURL=12.066b189d.chunk.js.map