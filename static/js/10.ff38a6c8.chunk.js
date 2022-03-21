(this["webpackJsonpravs-client"]=this["webpackJsonpravs-client"]||[]).push([[10],{1021:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return ke}));var a=n(2),r=n.n(a),c=n(109),i=n(13),s=n(11),o=n.n(s),u=n(20),l=n(6),d=n(33),j=n(27),b=n(28),p=n(42),f=n(43),m=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(j.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r)))._path="/accesses",e}return Object(b.a)(n,[{key:"path",get:function(){return this._path}},{key:"getAll",value:function(){return this.get("/accesses")}},{key:"remove",value:function(e){return this.delete(e?"".concat(this.path,"/").concat(e):this.path)}},{key:"update",value:function(e,t){return this.patch("".concat(this.path,"/").concat(e),t)}},{key:"create",value:function(e){return this.post(this.path,e)}}]),n}(n(59).a),h=new m,x=n(37),O=n(4),k=n(884),w=n(316),v=n(979),y=n(955),z=n(52),g=n(39),C=n(125),A=n(0),S=[{name:"owner",label:"W\u0142a\u015bciciel"},{name:"accessAdmin",label:"Administrator klas dost\u0119pu"},{name:"premisesAdmin",label:"Administrator inwentarza"},{name:"keysAdmin",label:"Administrator kluczy"},{name:"reservationsAdmin",label:"Administrator rezerwacji "},{name:"reservationsAbility",label:"Mo\u017cliwo\u015b\u0107 rezerwacji"},{name:"logsAdmin",label:"Administrator log\xf3w"},{name:"statsViewer",label:"Dost\u0119p do statystyk"}];function P(e){var t,n=e.access,a=e.open,c=e.onClose,s=e.onSubmit,d=r.a.useState({}),j=Object(l.a)(d,2),b=j[0],p=j[1],f=r.a.useCallback((function(e){var t;if("name"===e.target.name)t=e.target.value;else t=e.target.checked;p((function(n){return Object(i.a)(Object(i.a)({},n),{},Object(O.a)({},e.target.name,t))}))}),[]),m=r.a.useCallback((function(){c(),p({})}),[c]),h=r.a.useCallback(Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(n.id,b);case 2:if(!e.sent){e.next=5;break}c(),p({});case 5:case"end":return e.stop()}}),e)}))),[c,s,n.id,b]);return Object(A.jsx)(g.a,{open:a,onClose:m,children:Object(A.jsxs)(z.a,{onSubmit:h,onCancel:m,title:"Edycja klasy dost\u0119pu",subtitle:"Edycja klasy dost\u0119pu. Wprowadzone zmiany w spos\xf3b istotny wp\u0142ywaj\u0105 na zakres funkcji u\u017cytkownik\xf3w.",children:[Object(A.jsx)(w.a,{item:!0,xs:12,children:Object(A.jsx)(y.a,{required:!0,name:"name",label:"nazwa",id:"nazwa",value:null!==(t=b.name)&&void 0!==t?t:n.name,onChange:f})}),S.map((function(e,t){return Object(A.jsx)(w.a,{item:!0,xs:12,children:Object(A.jsx)(k.a,{labelPlacement:"start",control:Object(A.jsx)(v.a,{id:"access-".concat(e.name),name:e.name,inputProps:{"aria-label":e.label},onChange:f,checked:e.name in b?b[e.name]:n[e.name]}),label:e.label})},t)})),Object(A.jsx)(w.a,{item:!0,xs:12,ml:2,children:Object(A.jsx)(C.a,{model:n})})]})})}function M(e){var t=e.open,n=e.onClose,a=e.onSubmit,c=r.a.useState(""),i=Object(l.a)(c,2),s=i[0],d=i[1],j=r.a.useCallback((function(e){d(e.target.value)}),[]),b=r.a.useCallback((function(){n(),d("")}),[n]),p=r.a.useCallback(Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a({name:s});case 2:if(!e.sent){e.next=5;break}n(),d("");case 5:case"end":return e.stop()}}),e)}))),[n,a,s]);return Object(A.jsx)(g.a,{open:t,onClose:b,children:Object(A.jsx)(z.a,{onSubmit:p,onCancel:b,title:"Tworzenie klasy dost\u0119pu",subtitle:"Podaj nazw\u0119 dla nowej klasy dost\u0119pu. Stworzona zostanie klasa bez \u017cadnych uprawnie\u0144 - pami\u0119taj aby dostosowa\u0107 ja do swoich potrzeb.",children:Object(A.jsx)(w.a,{item:!0,xs:12,children:Object(A.jsx)(y.a,{autoFocus:!0,required:!0,name:"name",label:"nazwa",id:"nazwa",value:s,onChange:j})})})})}var I=r.a.createContext(null);function U(e){var t=Object(d.a)(),n=r.a.useState(!1),a=Object(l.a)(n,2),c=a[0],s=a[1],j=r.a.useState(),b=Object(l.a)(j,2),p=b[0],f=b[1],m=r.a.useState(),O=Object(l.a)(m,2),k=O[0],w=O[1],v=r.a.useCallback(Object(u.a)(o.a.mark((function e(){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.getAll();case 3:n=e.sent,w(n.data),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),t(e.t0.description,"error"),w([]);case 11:case"end":return e.stop()}}),e,null,[[0,7]])}))),[t]);r.a.useEffect((function(){v()}),[v]);var y=r.a.useCallback(function(){var e=Object(u.a)(o.a.mark((function e(n,a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.update(n,a);case 3:if(!e.sent){e.next=6;break}w((function(e){if(e)return e.map((function(e){return e.id===n&&(e=Object(i.a)(Object(i.a)({},e),a)),e}))})),t("Klasa dost\u0119pu zosta\u0142a zaktualizowana","success");case 6:return e.abrupt("return",!0);case 9:e.prev=9,e.t0=e.catch(0),t(e.t0.description,"error");case 12:return e.abrupt("return",!1);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,n){return e.apply(this,arguments)}}(),[t]),z=r.a.useCallback(function(){var e=Object(u.a)(o.a.mark((function e(n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.remove(n);case 3:return w((function(e){if(e)return e.filter((function(e){return e.id!==n}))})),t("Klasa dost\u0119pu zosta\u0142a usuni\u0119ta","success"),e.abrupt("return",!0);case 8:e.prev=8,e.t0=e.catch(0),t(e.t0.description,"error");case 11:return e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),[t]),g=r.a.useCallback(function(){var e=Object(u.a)(o.a.mark((function e(n){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.create(n);case 3:return a=e.sent,w((function(e){return null===e||void 0===e||e.unshift(Object(i.a)(Object(i.a)({},n),{},{id:a.data,_created:(new Date).toUTCString(),_updated:(new Date).toUTCString()})),Object.assign([],e)})),t("Klasa dost\u0119pu zosta\u0142a utworzona","success"),e.abrupt("return",!0);case 9:e.prev=9,e.t0=e.catch(0),t(e.t0.description,"error");case 12:return e.abrupt("return",!1);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),[t]),C=r.a.useMemo((function(){return null===k||void 0===k?void 0:k.find((function(e){return e.id===p}))}),[p,k]),S=r.a.useCallback((function(e){f(e),s(!0)}),[]);return k?Object(A.jsxs)(I.Provider,{value:{accessesList:k,updateAccess:y,deleteAccess:z,createAccess:g,openAccess:S},children:[e.children,C&&Object(A.jsx)(P,{open:c,onSubmit:y,onClose:function(){return s(!1)},access:C})]}):Object(A.jsx)(x.a,{})}function D(){return r.a.useContext(I)}var L=n(257),_=n(111),E=n(318),K=n(965),N=n(72),R=n.n(N),V=n(971),W=n(974),F=n(943),H=n(972);function T(e){return Object(A.jsxs)(V.a,{button:!0,onClick:e.onSelect,sx:{my:"5px"},children:[Object(A.jsx)(W.a,{children:e.id}),Object(A.jsx)(F.a,{primary:e.name}),Object(A.jsx)(H.a,{children:Object(A.jsx)(K.a,{color:"error",onClick:e.onDelete,children:Object(A.jsx)(R.a,{})})})]})}var B=n(969),J=n(234),q=n.n(J),G=n(946),Q=n(942);function X(e){return Object(A.jsx)(V.a,{disablePadding:!0,children:Object(A.jsxs)(G.a,{onClick:e.onClick,children:[Object(A.jsx)(Q.a,{children:Object(A.jsx)(q.a,{color:"primary"})}),Object(A.jsx)(F.a,{secondary:"Dodaj now\u0105 klas\u0119 dost\u0119pu"})]})})}var Y=n(75);function Z(){var e=D(),t=e.accessesList,n=e.openAccess,a=e.createAccess,c=e.deleteAccess,i=r.a.useState(!1),s=Object(l.a)(i,2),d=s[0],j=s[1],b=r.a.useState(!1),p=Object(l.a)(b,2),f=p[0],m=p[1],h=r.a.useState(null),x=Object(l.a)(h,2),O=x[0],k=x[1],w=r.a.useMemo((function(){return t.map((function(e){var t=e.id,a=e.name;return Object(A.jsx)(T,{id:t,name:a,onSelect:function(){return n(t)},onDelete:function(){k({id:t,name:a}),m(!0)}},t)})).reverse()}),[t,n]),v=r.a.useCallback(Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(O){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,c(O.id);case 4:if(!e.sent){e.next=6;break}m(!1);case 6:case"end":return e.stop()}}),e)}))),[O,c]);return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(M,{open:d,onClose:function(){return j(!1)},onSubmit:a}),Object(A.jsx)(_.a,{open:f,onClose:function(){k(null),m(!1)},onSuccess:v}),Object(A.jsxs)(L.a,{spacing:4,children:[Object(A.jsx)(E.a,{title:"Lista klas dost\u0119pu",subtitle:"Tw\xf3rz, edytuj i usuwaj klasy dost\u0119pu."}),Object(A.jsx)(Y.a,{text:"Kliknij element, aby zobaczy\u0107 uprawnienia.",children:Object(A.jsxs)(B.a,{sx:{maxWidth:"400px"},children:[Object(A.jsx)(X,{onClick:function(){return j(!0)}}),w]})})]})]})}var $=n(89),ee=[{field:"Identyfikator - id",text:"Numer identyfikacyjny klasy dost\u0119pu. Ten numer przypisujesz u\u017cytkownikowi podczas zmiany uprawnie\u0144."},{field:"Nazwa - name",text:"Nazwa klasy dost\u0119pu"},{field:"W\u0142a\u015bciciel - owner",text:Object(A.jsx)(A.Fragment,{children:"Najwy\u017cszy zestaw uprawnie\u0144. U\u017cytkownik ma mo\u017cliwo\u015b\u0107 zmiany konfiguracji platformy oraz posiada on wszystkie inne uprawnienia w\u0142\u0105czaj\u0105c w to edytowanie danych innych u\u017cytkownik\xf3w. Jest w\u0142a\u015bcicielem platformy."})},{field:"Administrator klas dost\u0119pu - accessAdmin",text:"U\u017cytkownik ma mo\u017cliwo\u015b\u0107 tworzenia, edytowania oraz usuwania klas dost\u0119pu. Jest odpowiedzialny za przydzielanie dost\u0119pu u\u017cytkownikom."},{field:"Administrator inwentarza - premisesAdmin",text:"U\u017cytkownik jest odpowiedzialny za tworzenie, edycj\u0119 i usuwanie adres\xf3w, budynk\xf3w i sal."},{field:"Administrator kluczy - keysAdmin",text:"U\u017cytkownik ma mo\u017cliwo\u015b\u0107 przypisywania i usuwania tag\xf3w RFID dla ka\u017cdej sali."},{field:"Mo\u017cliwo\u015b\u0107 rezerwacji - reservationsAbility",text:"U\u017cytkownik ma mo\u017cliwo\u015b\u0107 tworzenia rezerwacji"},{field:"Administrator rezerwacji - reservationsAdmin",text:"U\u017cytkownik ma mo\u017cliwo\u015b\u0107 edytowania oraz usuwania rezerwacji stworzonych przez innych u\u017cytkownik\xf3w."},{field:"Administrator log\xf3w - logsAdmin",text:"U\u017cytkownik ma mo\u017cliwo\u015b\u0107 przegl\u0105dania log\xf3w aplikacji."},{field:"Dost\u0119p do statystyk - statsViewer",text:"U\u017cytkownik mo\u017ce przegl\u0105da\u0107 statystyki wygenerowane dla aplikacji, u\u017cytkownika, budynku i pokoju."}];function te(){var e=r.a.useMemo((function(){return ee.map((function(e,t){var n=e.field,a=e.text;return Object(A.jsxs)("li",{children:[Object(A.jsx)($.a,{variant:"subtitle1",component:"h3",children:n}),Object(A.jsx)($.a,{variant:"body2",color:"text.secondary",mb:1,children:a})]},t)}))}),[]);return Object(A.jsxs)(L.a,{spacing:3,children:[Object(A.jsxs)("span",{children:[Object(A.jsx)($.a,{component:"h1",variant:"h3",color:"primary.dark",children:"Klasy Dost\u0119pu"}),Object(A.jsxs)($.a,{variant:"body1",color:"text.secondary",mt:"5px",children:["Dost\u0119pne tutaj opcje wp\u0142ywaj\u0105 znacz\u0105co na funkcjonowanie ca\u0142ej platformy. ",Object(A.jsx)("br",{}),"Konigurowanie klas dost\u0119pu u\u017cytkownik\xf3w to bardzo odpowiedzialne zadanie. Upewnij si\u0119 \u017ce nadajesz tylko wymagane uprawnienia. Stosuj si\u0119 do modelu ",Object(A.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://en.wikipedia.org/wiki/Principle_of_least_privilege",children:"Least Privilege"}),"."]})]}),Object(A.jsxs)("span",{children:[Object(A.jsx)($.a,{variant:"h5",component:"h2",children:"Pola u\u017cywane w klasach dost\u0119pu:"}),Object(A.jsx)("ul",{children:e})]})]})}var ne=n(975),ae=n(997),re=n(315),ce=n(945),ie=n(483),se=n(880),oe=n(877),ue=n(484),le=n(481),de=n(60),je=n(339),be=n.n(je),pe=n(21),fe=n(973);function me(e,t){return e.filter((function(e){return void 0===t.find((function(t){return t.id===e.id}))}))}function he(e,t){return e.filter((function(e){return-1===t.indexOf(e)}))}function xe(e,t){return e.filter((function(e){return t.find((function(t){return t.id===e}))}))}function Oe(){var e,t,n=D().accessesList,r=Object(d.a)(),c=a.useState([]),s=Object(l.a)(c,2),j=s[0],b=s[1],p=a.useState([]),f=Object(l.a)(p,2),m=f[0],h=f[1],x=a.useState([]),k=Object(l.a)(x,2),v=k[0],y=k[1],z=a.useState({left:null===(e=n[0])||void 0===e?void 0:e.id,right:null===(t=n[1])||void 0===t?void 0:t.id}),g=Object(l.a)(z,2),C=g[0],S=g[1],P=a.useCallback(function(){var e=Object(u.a)(o.a.mark((function e(t,n){var a,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.map(function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,de.b.updateAccess(t.id,n);case 3:return e.abrupt("return",t);case 6:return e.prev=6,e.t0=e.catch(0),r(e.t0.description,"error"),e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}()),e.next=3,Promise.all(a);case 3:return c=e.sent,e.abrupt("return",c.filter((function(e){return!1!==e})));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[r]),M=a.useCallback(function(){var e=Object(u.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,de.b.getUsers({accessId:t,deleted:!1});case 3:return n=e.sent,e.abrupt("return",n.data);case 7:e.prev=7,e.t0=e.catch(0),r(e.t0.description,"error");case 10:return e.abrupt("return",[]);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),[r]);a.useEffect((function(){M(C.left).then((function(e){return h(e)}))}),[C.left,M]),a.useEffect((function(){M(C.right).then((function(e){return y(e)}))}),[C.right,M]);var I=a.useMemo((function(){return xe(j,m)}),[j,m]),U=a.useMemo((function(){return xe(j,v)}),[j,v]),L=a.useCallback((function(e){return function(){b((function(t){var n=t.indexOf(e),a=Object.assign([],t);return-1===n?a.push(e):a.splice(n,1),a}))}}),[]),_=a.useCallback(Object(u.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=m.filter((function(e){var t=e.id;return-1!==I.indexOf(t)})),e.next=3,P(t,C.right);case 3:n=e.sent,y(v.concat(n)),h(me(m,n)),b(he(j,I));case 7:case"end":return e.stop()}}),e)}))),[I,v,m,j,C.right,P]),K=a.useCallback(Object(u.a)(o.a.mark((function e(){var t,n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v.filter((function(e){var t=e.id;return-1!==U.indexOf(t)})),e.next=3,P(t,C.left);case 3:n=e.sent,h(m.concat(n)),a=me(v,n),console.log(a),y(a),b(he(j,U));case 9:case"end":return e.stop()}}),e)}))),[U,m,v,j,C.left,P]),N=a.useCallback((function(e){var t=Number(e.target.value);S((function(n){return n.left===t||n.right===t?n:Object(i.a)(Object(i.a)({},n),{},Object(O.a)({},e.target.name,Number(e.target.value)))}))}),[]),R=a.useCallback((function(e,t){return Object(A.jsxs)(ne.a,{children:[Object(A.jsx)(le.a,{sx:{p:2},children:Object(A.jsxs)(ie.a,{fullWidth:!0,children:[Object(A.jsx)(se.a,{id:"wybierz-klase-dost\u0119pu",children:"Klasa dost\u0119pu"}),Object(A.jsx)(oe.a,{labelId:"wybierz-klase-dost\u0119pu",name:e,value:C[e],label:"klasa dost\u0119pu",onChange:N,children:n.map((function(e){var t=e.name,n=e.id;return Object(A.jsxs)(ue.a,{value:n,children:[t," "]},t)}))})]})}),Object(A.jsx)(ce.a,{}),Object(A.jsxs)(B.a,{sx:{height:550,bgcolor:"background.paper",overflow:"auto"},dense:!0,component:"div",role:"list",children:[t.map((function(e){var t="transfer-list-all-item-".concat(e.id,"-label");return Object(A.jsxs)(V.a,{role:"listitem",button:!0,onClick:L(e.id),children:[Object(A.jsx)(Q.a,{children:Object(A.jsx)(ae.a,{checked:-1!==j.indexOf(e.id),tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":t}})}),Object(A.jsx)(F.a,{id:t,primary:e.email}),Object(A.jsx)(Q.a,{onClick:function(e){return e.stopPropagation()},color:"primary",children:Object(A.jsx)(fe.a,{href:pe.b.toUser(e.id),children:Object(A.jsx)(be.a,{})})})]},e.id)})),Object(A.jsx)(V.a,{})]})]})}),[L,j,N,C,n]);return Object(A.jsxs)(w.a,{container:!0,spacing:2,justifyContent:"center",alignItems:"center",children:[Object(A.jsx)(w.a,{item:!0,xs:12,children:Object(A.jsx)(E.a,{title:"Administracja klasami dost\u0119pu",subtitle:"Wybierz stworzone klasy dost\u0119pu i przemieszczaj u\u017cytkownik\xf3w pomi\u0119dzy kolumnami, przypisuj\u0105c im wybran\u0105 role."})}),Object(A.jsx)(w.a,{item:!0,xs:12,sm:5,children:R("left",m)}),Object(A.jsx)(w.a,{item:!0,children:Object(A.jsxs)(w.a,{container:!0,direction:"column",alignItems:"center",children:[Object(A.jsx)(re.a,{sx:{my:.5},variant:"outlined",size:"small",onClick:_,disabled:0===I.length,"aria-label":"move selected right",children:">"}),Object(A.jsx)(re.a,{sx:{my:.5},variant:"outlined",size:"small",onClick:K,disabled:0===U.length,"aria-label":"move selected left",children:"<"})]})}),Object(A.jsx)(w.a,{item:!0,xs:12,sm:5,children:R("right",v)})]})}function ke(){var e=r.a.useMemo((function(){var e=[];return e.push({name:"Informacje",component:Object(A.jsx)(te,{})}),e.push({name:"Lista klas",component:Object(A.jsx)(Z,{})}),e.push({name:"Administracja",component:Object(A.jsx)(Oe,{})}),e}),[]);return Object(A.jsx)(U,{children:Object(A.jsx)(c.a,{tabs:e})})}},997:function(e,t,n){"use strict";var a=n(4),r=n(5),c=n(3),i=n(2),s=(n(19),n(256)),o=n(208),u=n(212),l=n(30),d=n(0),j=Object(l.a)(Object(d.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),b=Object(l.a)(Object(d.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),p=Object(l.a)(Object(d.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),f=n(14),m=n(16),h=n(7),x=n(182),O=n(209);function k(e){return Object(x.a)("MuiCheckbox",e)}var w=Object(O.a)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),v=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],y=Object(h.a)(u.a,{shouldForwardProp:function(e){return Object(h.b)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.indeterminate&&t.indeterminate,"default"!==n.color&&t["color".concat(Object(f.a)(n.color))]]}})((function(e){var t,n=e.theme,r=e.ownerState;return Object(c.a)({color:n.palette.text.secondary},!r.disableRipple&&{"&:hover":{backgroundColor:Object(o.a)("default"===r.color?n.palette.action.active:n.palette[r.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==r.color&&(t={},Object(a.a)(t,"&.".concat(w.checked,", &.").concat(w.indeterminate),{color:n.palette[r.color].main}),Object(a.a)(t,"&.".concat(w.disabled),{color:n.palette.action.disabled}),t))})),z=Object(d.jsx)(b,{}),g=Object(d.jsx)(j,{}),C=Object(d.jsx)(p,{}),A=i.forwardRef((function(e,t){var n,a,o=Object(m.a)({props:e,name:"MuiCheckbox"}),u=o.checkedIcon,l=void 0===u?z:u,j=o.color,b=void 0===j?"primary":j,p=o.icon,h=void 0===p?g:p,x=o.indeterminate,O=void 0!==x&&x,w=o.indeterminateIcon,A=void 0===w?C:w,S=o.inputProps,P=o.size,M=void 0===P?"medium":P,I=Object(r.a)(o,v),U=O?A:h,D=O?A:l,L=Object(c.a)({},o,{color:b,indeterminate:O,size:M}),_=function(e){var t=e.classes,n=e.indeterminate,a=e.color,r={root:["root",n&&"indeterminate","color".concat(Object(f.a)(a))]},i=Object(s.a)(r,k,t);return Object(c.a)({},t,i)}(L);return Object(d.jsx)(y,Object(c.a)({type:"checkbox",inputProps:Object(c.a)({"data-indeterminate":O},S),icon:i.cloneElement(U,{fontSize:null!=(n=U.props.fontSize)?n:M}),checkedIcon:i.cloneElement(D,{fontSize:null!=(a=D.props.fontSize)?a:M}),ownerState:L,ref:t},I,{classes:_}))}));t.a=A}}]);
//# sourceMappingURL=10.ff38a6c8.chunk.js.map