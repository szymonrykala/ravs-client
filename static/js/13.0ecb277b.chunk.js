(this["webpackJsonpravs-client"]=this["webpackJsonpravs-client"]||[]).push([[13],{358:function(e,a,t){"use strict";t.r(a);var n=t(202),c=t(1),r=t.n(c),s=t(159),l=t(161),i=t(8),j=t.n(i),u=t(9),b=t(16),d=t(5),o=t(43),O=t(28),h=t(47),x=t(217),m=t(100),v=t(0),f=r.a.createContext(null);function p(e){var a=Object(o.h)(),t=Object(h.b)(),n=t.queryParams,c=t.setQueryParams,s=Object(O.a)(),l=Object(m.a)(6e4),i=r.a.useState(),p=Object(d.a)(i,2),g=p[0],w=p[1],C=r.a.useCallback(Object(b.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.fetch(a,n);case 3:t=e.sent,w(t.data),t.pagination&&c((function(e){var a;return Object(u.a)(Object(u.a)({},e),{},{pagesCount:null===(a=t.pagination)||void 0===a?void 0:a.pagesCount})})),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),s(e.t0.description,"error"),w([]);case 12:case"end":return e.stop()}}),e,null,[[0,8]])}))),[c,n.currentPage,n.itemsOnPage,n.method,n.userId,s,a]);return r.a.useEffect((function(){C()}),[C,l]),g?Object(v.jsx)(f.Provider,{value:{logs:g},children:e.children}):null}var g=t(3),w=t(260),C=t(263),P=t(345),k=t(342),y=t(264),E=t(162);function T(){var e,a,t=Object(h.b)(),n=t.queryParams,c=t.setQueryParams,s=r.a.useCallback((function(e){e.preventDefault(),c((function(a){return Object(u.a)(Object(u.a)({},a),{},Object(g.a)({},e.target.name,e.target.value))}))}),[c]);return Object(v.jsxs)(w.a,{container:!0,component:"form",spacing:3,children:[Object(v.jsx)(w.a,{item:!0,xs:6,md:2,children:Object(v.jsxs)(C.a,{fullWidth:!0,children:[Object(v.jsx)(P.a,{id:"wybierz-metode",children:"Metoda"}),Object(v.jsxs)(k.a,{size:"small",labelId:"wybierz-metode",id:"metoda",value:n.method,name:"method",label:"wybierz-metode",onChange:s,children:[Object(v.jsx)(y.a,{value:"",children:"brak"}),Object(v.jsx)(y.a,{value:"GET",children:"GET"}),Object(v.jsx)(y.a,{value:"POST",children:"POST"}),Object(v.jsx)(y.a,{value:"PATCH",children:"PATCH"}),Object(v.jsx)(y.a,{value:"DELETE",children:"DELETE"})]})]})}),Object(v.jsx)(w.a,{item:!0,xs:6,md:3,children:Object(v.jsx)(E.a,{label:"id u\u017cytkownika",name:"userId",value:null!==(e=null===(a=n.userId)||void 0===a?void 0:a.toString())&&void 0!==e?e:"",onChange:function(e){return c((function(a){return Object(u.a)(Object(u.a)({},a),{},{userId:e.target.value})}))}})})]})}var z=r.a.memo(T),I=t(447),S=t(449),A=t(149),q=t(446),D=t(448),H=t(262),G=t(87),J=t(210);function L(){var e=r.a.useContext(f).logs;return Object(v.jsx)(q.a,{children:Object(v.jsxs)(I.a,{"aria-label":"tabela log\xf3w",size:"small",children:[Object(v.jsx)(D.a,{children:Object(v.jsxs)(H.a,{children:[Object(v.jsx)(A.a,{}),Object(v.jsx)(A.a,{align:"left",children:"Id"}),Object(v.jsx)(A.a,{align:"left",children:"Cel/endpoint"}),Object(v.jsx)(A.a,{align:"left",children:"Czas wykonania\xa0[ms]"})]})}),Object(v.jsxs)(S.a,{children:[0===e.length&&Object(v.jsx)(H.a,{children:Object(v.jsx)(A.a,{colSpan:6,children:Object(v.jsx)(G.a,{textAlign:"center",p:"15px 0px",children:"Brak element\xf3w do wy\u015bwietlenia"})})}),e.map((function(e){return Object(v.jsx)(J.a,{row:e},e.id)}))]})]})})}function Q(){return Object(v.jsx)(s.a,{name:"logs-query-params",default:{method:"PATCH",itemsOnPage:5},children:Object(v.jsx)(p,{children:Object(v.jsxs)(n.a,{spacing:3,children:[Object(v.jsx)(z,{}),Object(v.jsx)(L,{}),Object(v.jsx)(l.a,{})]})})})}a.default=r.a.memo(Q)}}]);
//# sourceMappingURL=13.0ecb277b.chunk.js.map