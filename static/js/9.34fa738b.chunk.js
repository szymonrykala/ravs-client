(this["webpackJsonpravs-client"]=this["webpackJsonpravs-client"]||[]).push([[9],{1025:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return I}));var n=a(2),r=a(990),c=a(439),o=a.n(c),i=a(11),s=a.n(i),l=a(20),u=a(4),d=a(13),j=a(6),b=a(315),m=a(955),p=a(884),O=a(997),x=a(973),h=a(316),v=a(481),f=a(49),k=a(46),w=a(33),C=a(60),g=a(21),y=a(0);function z(){var e=Object(w.a)(),t=n.useState(""),a=Object(j.a)(t,2),r=a[0],c=a[1],o=n.useState(null),i=Object(j.a)(o,2),z=i[0],I=i[1],E=n.useState({email:"",password:"",name:"",surname:""}),S=Object(j.a)(E,2),P=S[0],A=S[1],M=n.useCallback((function(e){var t=e.target.value;t!==P.password?I("Podane has\u0142a si\u0119 r\xf3\u017cni\u0105"):I(null),c(t)}),[P.password]),N=n.useCallback((function(e){A((function(t){return Object(d.a)(Object(d.a)({},t),{},Object(u.a)({},e.target.name,e.target.value))}))}),[]),T=n.useCallback(function(){var t=Object(l.a)(s.a.mark((function t(a){var n,c;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),r===P.password){t.next=4;break}return e("Podane has\u0142a musz\u0105 by\u0107 takie same","error"),t.abrupt("return");case 4:return t.prev=4,t.next=7,C.b.register(P);case 7:n=t.sent,t.t0=n,t.next=t.t0===C.a.ACTIVATION_NEEDED?11:t.t0===C.a.NO_ACTIVATION_NEEDED?13:15;break;case 11:return e("Zarejestrowano","success",(function(){return Object(y.jsx)(f.a,{to:g.a.ACTIVATE})})),t.abrupt("break",15);case 13:return e("Zarejestrowano i aktywowano","success",(function(){return Object(y.jsx)(f.a,{to:g.a.LOGIN})})),t.abrupt("break",15);case 15:t.next=21;break;case 17:t.prev=17,t.t1=t.catch(4),c=t.t1.description,e(c,"error");case 21:case"end":return t.stop()}}),t,null,[[4,17]])})));return function(e){return t.apply(this,arguments)}}(),[P,e,r]);return Object(y.jsxs)(v.a,{component:"form",onSubmit:T,sx:{mt:3},children:[Object(y.jsxs)(h.a,{container:!0,spacing:2,children:[Object(y.jsx)(h.a,{item:!0,xs:12,sm:6,children:Object(y.jsx)(m.a,{autoComplete:"given-name",name:"name",required:!0,fullWidth:!0,id:"name",label:"Imi\u0119",autoFocus:!0,value:P.name,onChange:N})}),Object(y.jsx)(h.a,{item:!0,xs:12,sm:6,children:Object(y.jsx)(m.a,{required:!0,fullWidth:!0,id:"surname",label:"Nazwisko",name:"surname",autoComplete:"family-name",value:P.surname,onChange:N})}),Object(y.jsx)(h.a,{item:!0,xs:12,children:Object(y.jsx)(m.a,{required:!0,fullWidth:!0,id:"email",label:"Adres Email",name:"email",autoComplete:"email",value:P.email,onChange:N})}),Object(y.jsx)(h.a,{item:!0,xs:12,children:Object(y.jsx)(m.a,{required:!0,fullWidth:!0,name:"password",label:"Has\u0142o",type:"password",id:"password",autoComplete:"new-password",value:P.password,onChange:N})}),Object(y.jsx)(h.a,{item:!0,xs:12,children:Object(y.jsx)(m.a,{required:!0,fullWidth:!0,name:"repeatPassword",label:"Powt\xf3rz Has\u0142o",type:"password",id:"repeatPassword",autoComplete:"repeatPassword",value:r,onChange:M,error:Boolean(z),helperText:z})}),Object(y.jsx)(h.a,{item:!0,xs:12,children:Object(y.jsx)(p.a,{control:Object(y.jsx)(O.a,{required:!0,value:"allowExtraEmails",color:"primary"}),label:"Akceptuj\u0119 warunki"})})]}),Object(y.jsx)(b.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Za\u0142\xf3\u017c konto!"}),Object(y.jsx)(h.a,{container:!0,justifyContent:"flex-end",children:Object(y.jsx)(h.a,{item:!0,children:Object(y.jsx)(x.a,{component:k.b,to:g.a.LOGIN,variant:"body2",children:"Masz ju\u017c konto? Zaloguj si\u0119!"})})})]})}function I(){return Object(y.jsx)(r.a,{title:"Rejestracja",icon:Object(y.jsx)(o.a,{}),children:Object(y.jsx)(z,{})})}},990:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));a(2);var n=a(987),r=a(958),c=a(89),o=a(941),i=a(0);function s(e){return Object(i.jsx)(n.a,{component:"div",maxWidth:"xs",children:Object(i.jsxs)(o.a,{sx:{marginTop:"5vw",display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"background.paper",padding:"25px",borderRadius:"10px"},children:[Object(i.jsx)(r.a,{sx:{m:1,bgcolor:"primary.main"},children:e.icon}),Object(i.jsx)(c.a,{component:"h1",variant:"h5",children:e.title}),e.children]})})}},997:function(e,t,a){"use strict";var n=a(4),r=a(5),c=a(3),o=a(2),i=(a(19),a(256)),s=a(208),l=a(212),u=a(30),d=a(0),j=Object(u.a)(Object(d.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),b=Object(u.a)(Object(d.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),m=Object(u.a)(Object(d.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),p=a(14),O=a(16),x=a(7),h=a(182),v=a(209);function f(e){return Object(h.a)("MuiCheckbox",e)}var k=Object(v.a)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),w=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],C=Object(x.a)(l.a,{shouldForwardProp:function(e){return Object(x.b)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.indeterminate&&t.indeterminate,"default"!==a.color&&t["color".concat(Object(p.a)(a.color))]]}})((function(e){var t,a=e.theme,r=e.ownerState;return Object(c.a)({color:a.palette.text.secondary},!r.disableRipple&&{"&:hover":{backgroundColor:Object(s.a)("default"===r.color?a.palette.action.active:a.palette[r.color].main,a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==r.color&&(t={},Object(n.a)(t,"&.".concat(k.checked,", &.").concat(k.indeterminate),{color:a.palette[r.color].main}),Object(n.a)(t,"&.".concat(k.disabled),{color:a.palette.action.disabled}),t))})),g=Object(d.jsx)(b,{}),y=Object(d.jsx)(j,{}),z=Object(d.jsx)(m,{}),I=o.forwardRef((function(e,t){var a,n,s=Object(O.a)({props:e,name:"MuiCheckbox"}),l=s.checkedIcon,u=void 0===l?g:l,j=s.color,b=void 0===j?"primary":j,m=s.icon,x=void 0===m?y:m,h=s.indeterminate,v=void 0!==h&&h,k=s.indeterminateIcon,I=void 0===k?z:k,E=s.inputProps,S=s.size,P=void 0===S?"medium":S,A=Object(r.a)(s,w),M=v?I:x,N=v?I:u,T=Object(c.a)({},s,{color:b,indeterminate:v,size:P}),H=function(e){var t=e.classes,a=e.indeterminate,n=e.color,r={root:["root",a&&"indeterminate","color".concat(Object(p.a)(n))]},o=Object(i.a)(r,f,t);return Object(c.a)({},t,o)}(T);return Object(d.jsx)(C,Object(c.a)({type:"checkbox",inputProps:Object(c.a)({"data-indeterminate":v},E),icon:o.cloneElement(M,{fontSize:null!=(a=M.props.fontSize)?a:P}),checkedIcon:o.cloneElement(N,{fontSize:null!=(n=N.props.fontSize)?n:P}),ownerState:T,ref:t},A,{classes:H}))}));t.a=I}}]);
//# sourceMappingURL=9.34fa738b.chunk.js.map