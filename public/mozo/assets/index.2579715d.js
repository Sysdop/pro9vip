var qi=Object.defineProperty;var Pr=Object.getOwnPropertySymbols;var Xi=Object.prototype.hasOwnProperty,Ji=Object.prototype.propertyIsEnumerable;var Tr=(t,e,n)=>e in t?qi(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Yn=(t,e)=>{for(var n in e||(e={}))Xi.call(e,n)&&Tr(t,n,e[n]);if(Pr)for(var n of Pr(e))Ji.call(e,n)&&Tr(t,n,e[n]);return t};import{t as Or,a as Qi,q as D,f as U,v as K,w as I,x as Ir,y as Wt,z as Te,F as Yr,A as Er,B as eo,T as to,C as En,D as no,E as ro,G as ao,H as io,I as Cr,J as oo}from"./vendor.27ef54d8.js";function pt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Sr(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function mt(t,e,n){return e&&Sr(t.prototype,e),n&&Sr(t,n),t}function Ge(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function $r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?$r(Object(n),!0).forEach(function(r){Ge(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):$r(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function so(t,e){if(t==null)return{};var n={},r=Object.keys(t),a,i;for(i=0;i<r.length;i++)a=r[i],!(e.indexOf(a)>=0)&&(n[a]=t[a]);return n}function lo(t,e){if(t==null)return{};var n=so(t,e),r,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)r=i[a],!(e.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(t,r)||(n[r]=t[r]))}return n}function Bt(t,e){return uo(t)||vo(t,e)||Ar(t,e)||po()}function Vt(t){return co(t)||fo(t)||Ar(t)||ho()}function co(t){if(Array.isArray(t))return Cn(t)}function uo(t){if(Array.isArray(t))return t}function fo(t){if(typeof Symbol!="undefined"&&Symbol.iterator in Object(t))return Array.from(t)}function vo(t,e){if(!(typeof Symbol=="undefined"||!(Symbol.iterator in Object(t)))){var n=[],r=!0,a=!1,i=void 0;try{for(var o=t[Symbol.iterator](),s;!(r=(s=o.next()).done)&&(n.push(s.value),!(e&&n.length===e));r=!0);}catch(l){a=!0,i=l}finally{try{!r&&o.return!=null&&o.return()}finally{if(a)throw i}}return n}}function Ar(t,e){if(!!t){if(typeof t=="string")return Cn(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Cn(t,e)}}function Cn(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function ho(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function po(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Ut=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function Sn(t,e,n){return n={path:e,exports:{},require:function(r,a){return mo(r,a==null?n.path:a)}},t(n,n.exports),n.exports}function mo(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var go=typeof Ut=="object"&&Ut&&Ut.Object===Object&&Ut,Nr=go,yo=typeof self=="object"&&self&&self.Object===Object&&self,bo=Nr||yo||Function("return this")(),fe=bo,wo=fe.Symbol,ee=wo,Fr=Object.prototype,Do=Fr.hasOwnProperty,ko=Fr.toString,gt=ee?ee.toStringTag:void 0;function xo(t){var e=Do.call(t,gt),n=t[gt];try{t[gt]=void 0;var r=!0}catch{}var a=ko.call(t);return r&&(e?t[gt]=n:delete t[gt]),a}var _o=xo,Mo=Object.prototype,Po=Mo.toString;function To(t){return Po.call(t)}var Oo=To,Io="[object Null]",Yo="[object Undefined]",jr=ee?ee.toStringTag:void 0;function Eo(t){return t==null?t===void 0?Yo:Io:jr&&jr in Object(t)?_o(t):Oo(t)}var oe=Eo;function Co(t){return t!=null&&typeof t=="object"}var W=Co,So=Array.isArray,L=So;function $o(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var H=$o,Ao="[object AsyncFunction]",No="[object Function]",Fo="[object GeneratorFunction]",jo="[object Proxy]";function Lo(t){if(!H(t))return!1;var e=oe(t);return e==No||e==Fo||e==Ao||e==jo}var se=Lo,zo=9007199254740991;function Ho(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=zo}var $n=Ho;function Ro(t){return t!=null&&$n(t.length)&&!se(t)}var Ze=Ro;function Wo(t){return W(t)&&Ze(t)}var G=Wo,Bo="[object Date]";function Vo(t){return W(t)&&oe(t)==Bo}var Uo=Vo;function Ko(t){return function(e){return t(e)}}var Kt=Ko,Oe=Sn(function(t,e){var n=e&&!e.nodeType&&e,r=n&&!0&&t&&!t.nodeType&&t,a=r&&r.exports===n,i=a&&Nr.process,o=function(){try{var s=r&&r.require&&r.require("util").types;return s||i&&i.binding&&i.binding("util")}catch{}}();t.exports=o}),Lr=Oe&&Oe.isDate,Go=Lr?Kt(Lr):Uo,Zo=Go,qo="[object Symbol]";function Xo(t){return typeof t=="symbol"||W(t)&&oe(t)==qo}var Gt=Xo,Jo=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Qo=/^\w*$/;function es(t,e){if(L(t))return!1;var n=typeof t;return n=="number"||n=="symbol"||n=="boolean"||t==null||Gt(t)?!0:Qo.test(t)||!Jo.test(t)||e!=null&&t in Object(e)}var An=es,ts=fe["__core-js_shared__"],Nn=ts,zr=function(){var t=/[^.]+$/.exec(Nn&&Nn.keys&&Nn.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function ns(t){return!!zr&&zr in t}var rs=ns,as=Function.prototype,is=as.toString;function os(t){if(t!=null){try{return is.call(t)}catch{}try{return t+""}catch{}}return""}var Fe=os,ss=/[\\^$.*+?()[\]{}|]/g,ls=/^\[object .+?Constructor\]$/,cs=Function.prototype,us=Object.prototype,fs=cs.toString,ds=us.hasOwnProperty,vs=RegExp("^"+fs.call(ds).replace(ss,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function hs(t){if(!H(t)||rs(t))return!1;var e=se(t)?vs:ls;return e.test(Fe(t))}var ps=hs;function ms(t,e){return t==null?void 0:t[e]}var gs=ms;function ys(t,e){var n=gs(t,e);return ps(n)?n:void 0}var je=ys,bs=je(Object,"create"),yt=bs;function ws(){this.__data__=yt?yt(null):{},this.size=0}var Ds=ws;function ks(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var xs=ks,_s="__lodash_hash_undefined__",Ms=Object.prototype,Ps=Ms.hasOwnProperty;function Ts(t){var e=this.__data__;if(yt){var n=e[t];return n===_s?void 0:n}return Ps.call(e,t)?e[t]:void 0}var Os=Ts,Is=Object.prototype,Ys=Is.hasOwnProperty;function Es(t){var e=this.__data__;return yt?e[t]!==void 0:Ys.call(e,t)}var Cs=Es,Ss="__lodash_hash_undefined__";function $s(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=yt&&e===void 0?Ss:e,this}var As=$s;function qe(t){var e=-1,n=t==null?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}qe.prototype.clear=Ds;qe.prototype.delete=xs;qe.prototype.get=Os;qe.prototype.has=Cs;qe.prototype.set=As;var Hr=qe;function Ns(){this.__data__=[],this.size=0}var Fs=Ns;function js(t,e){return t===e||t!==t&&e!==e}var Xe=js;function Ls(t,e){for(var n=t.length;n--;)if(Xe(t[n][0],e))return n;return-1}var Zt=Ls,zs=Array.prototype,Hs=zs.splice;function Rs(t){var e=this.__data__,n=Zt(e,t);if(n<0)return!1;var r=e.length-1;return n==r?e.pop():Hs.call(e,n,1),--this.size,!0}var Ws=Rs;function Bs(t){var e=this.__data__,n=Zt(e,t);return n<0?void 0:e[n][1]}var Vs=Bs;function Us(t){return Zt(this.__data__,t)>-1}var Ks=Us;function Gs(t,e){var n=this.__data__,r=Zt(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this}var Zs=Gs;function Je(t){var e=-1,n=t==null?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}Je.prototype.clear=Fs;Je.prototype.delete=Ws;Je.prototype.get=Vs;Je.prototype.has=Ks;Je.prototype.set=Zs;var qt=Je,qs=je(fe,"Map"),bt=qs;function Xs(){this.size=0,this.__data__={hash:new Hr,map:new(bt||qt),string:new Hr}}var Js=Xs;function Qs(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var el=Qs;function tl(t,e){var n=t.__data__;return el(e)?n[typeof e=="string"?"string":"hash"]:n.map}var Xt=tl;function nl(t){var e=Xt(this,t).delete(t);return this.size-=e?1:0,e}var rl=nl;function al(t){return Xt(this,t).get(t)}var il=al;function ol(t){return Xt(this,t).has(t)}var sl=ol;function ll(t,e){var n=Xt(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this}var cl=ll;function Qe(t){var e=-1,n=t==null?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}Qe.prototype.clear=Js;Qe.prototype.delete=rl;Qe.prototype.get=il;Qe.prototype.has=sl;Qe.prototype.set=cl;var Jt=Qe,ul="Expected a function";function Fn(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(ul);var n=function(){var r=arguments,a=e?e.apply(this,r):r[0],i=n.cache;if(i.has(a))return i.get(a);var o=t.apply(this,r);return n.cache=i.set(a,o)||i,o};return n.cache=new(Fn.Cache||Jt),n}Fn.Cache=Jt;var fl=Fn,dl=500;function vl(t){var e=fl(t,function(r){return n.size===dl&&n.clear(),r}),n=e.cache;return e}var hl=vl,pl=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,ml=/\\(\\)?/g,gl=hl(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(pl,function(n,r,a,i){e.push(a?i.replace(ml,"$1"):r||n)}),e}),yl=gl;function bl(t,e){for(var n=-1,r=t==null?0:t.length,a=Array(r);++n<r;)a[n]=e(t[n],n,t);return a}var Qt=bl,wl=1/0,Rr=ee?ee.prototype:void 0,Wr=Rr?Rr.toString:void 0;function Br(t){if(typeof t=="string")return t;if(L(t))return Qt(t,Br)+"";if(Gt(t))return Wr?Wr.call(t):"";var e=t+"";return e=="0"&&1/t==-wl?"-0":e}var Dl=Br;function kl(t){return t==null?"":Dl(t)}var xl=kl;function _l(t,e){return L(t)?t:An(t,e)?[t]:yl(xl(t))}var et=_l,Ml=1/0;function Pl(t){if(typeof t=="string"||Gt(t))return t;var e=t+"";return e=="0"&&1/t==-Ml?"-0":e}var tt=Pl;function Tl(t,e){e=et(e,t);for(var n=0,r=e.length;t!=null&&n<r;)t=t[tt(e[n++])];return n&&n==r?t:void 0}var en=Tl;function Ol(t,e,n){var r=t==null?void 0:en(t,e);return r===void 0?n:r}var nt=Ol,Il=function(){try{var t=je(Object,"defineProperty");return t({},"",{}),t}catch{}}(),tn=Il;function Yl(t,e,n){e=="__proto__"&&tn?tn(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}var nn=Yl,El=Object.prototype,Cl=El.hasOwnProperty;function Sl(t,e,n){var r=t[e];(!(Cl.call(t,e)&&Xe(r,n))||n===void 0&&!(e in t))&&nn(t,e,n)}var jn=Sl,$l=9007199254740991,Al=/^(?:0|[1-9]\d*)$/;function Nl(t,e){var n=typeof t;return e=e==null?$l:e,!!e&&(n=="number"||n!="symbol"&&Al.test(t))&&t>-1&&t%1==0&&t<e}var rn=Nl;function Fl(t,e,n,r){if(!H(t))return t;e=et(e,t);for(var a=-1,i=e.length,o=i-1,s=t;s!=null&&++a<i;){var l=tt(e[a]),c=n;if(l==="__proto__"||l==="constructor"||l==="prototype")return t;if(a!=o){var u=s[l];c=r?r(u,l,s):void 0,c===void 0&&(c=H(u)?u:rn(e[a+1])?[]:{})}jn(s,l,c),s=s[l]}return t}var Vr=Fl;function jl(t){return function(e,n,r){for(var a=-1,i=Object(e),o=r(e),s=o.length;s--;){var l=o[t?s:++a];if(n(i[l],l,i)===!1)break}return e}}var Ll=jl,zl=Ll(),Ur=zl;function Hl(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}var Rl=Hl,Wl="[object Arguments]";function Bl(t){return W(t)&&oe(t)==Wl}var Kr=Bl,Gr=Object.prototype,Vl=Gr.hasOwnProperty,Ul=Gr.propertyIsEnumerable,Kl=Kr(function(){return arguments}())?Kr:function(t){return W(t)&&Vl.call(t,"callee")&&!Ul.call(t,"callee")},wt=Kl;function Gl(){return!1}var Zl=Gl,Dt=Sn(function(t,e){var n=e&&!e.nodeType&&e,r=n&&!0&&t&&!t.nodeType&&t,a=r&&r.exports===n,i=a?fe.Buffer:void 0,o=i?i.isBuffer:void 0,s=o||Zl;t.exports=s}),ql="[object Arguments]",Xl="[object Array]",Jl="[object Boolean]",Ql="[object Date]",ec="[object Error]",tc="[object Function]",nc="[object Map]",rc="[object Number]",ac="[object Object]",ic="[object RegExp]",oc="[object Set]",sc="[object String]",lc="[object WeakMap]",cc="[object ArrayBuffer]",uc="[object DataView]",fc="[object Float32Array]",dc="[object Float64Array]",vc="[object Int8Array]",hc="[object Int16Array]",pc="[object Int32Array]",mc="[object Uint8Array]",gc="[object Uint8ClampedArray]",yc="[object Uint16Array]",bc="[object Uint32Array]",C={};C[fc]=C[dc]=C[vc]=C[hc]=C[pc]=C[mc]=C[gc]=C[yc]=C[bc]=!0;C[ql]=C[Xl]=C[cc]=C[Jl]=C[uc]=C[Ql]=C[ec]=C[tc]=C[nc]=C[rc]=C[ac]=C[ic]=C[oc]=C[sc]=C[lc]=!1;function wc(t){return W(t)&&$n(t.length)&&!!C[oe(t)]}var Dc=wc,Zr=Oe&&Oe.isTypedArray,kc=Zr?Kt(Zr):Dc,Ln=kc,xc=Object.prototype,_c=xc.hasOwnProperty;function Mc(t,e){var n=L(t),r=!n&&wt(t),a=!n&&!r&&Dt(t),i=!n&&!r&&!a&&Ln(t),o=n||r||a||i,s=o?Rl(t.length,String):[],l=s.length;for(var c in t)(e||_c.call(t,c))&&!(o&&(c=="length"||a&&(c=="offset"||c=="parent")||i&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||rn(c,l)))&&s.push(c);return s}var qr=Mc,Pc=Object.prototype;function Tc(t){var e=t&&t.constructor,n=typeof e=="function"&&e.prototype||Pc;return t===n}var zn=Tc;function Oc(t,e){return function(n){return t(e(n))}}var Xr=Oc,Ic=Xr(Object.keys,Object),Yc=Ic,Ec=Object.prototype,Cc=Ec.hasOwnProperty;function Sc(t){if(!zn(t))return Yc(t);var e=[];for(var n in Object(t))Cc.call(t,n)&&n!="constructor"&&e.push(n);return e}var $c=Sc;function Ac(t){return Ze(t)?qr(t):$c(t)}var rt=Ac;function Nc(t,e){return t&&Ur(t,e,rt)}var Jr=Nc;function Fc(){this.__data__=new qt,this.size=0}var jc=Fc;function Lc(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n}var zc=Lc;function Hc(t){return this.__data__.get(t)}var Rc=Hc;function Wc(t){return this.__data__.has(t)}var Bc=Wc,Vc=200;function Uc(t,e){var n=this.__data__;if(n instanceof qt){var r=n.__data__;if(!bt||r.length<Vc-1)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new Jt(r)}return n.set(t,e),this.size=n.size,this}var Kc=Uc;function at(t){var e=this.__data__=new qt(t);this.size=e.size}at.prototype.clear=jc;at.prototype.delete=zc;at.prototype.get=Rc;at.prototype.has=Bc;at.prototype.set=Kc;var it=at,Gc="__lodash_hash_undefined__";function Zc(t){return this.__data__.set(t,Gc),this}var qc=Zc;function Xc(t){return this.__data__.has(t)}var Jc=Xc;function an(t){var e=-1,n=t==null?0:t.length;for(this.__data__=new Jt;++e<n;)this.add(t[e])}an.prototype.add=an.prototype.push=qc;an.prototype.has=Jc;var Qc=an;function eu(t,e){for(var n=-1,r=t==null?0:t.length;++n<r;)if(e(t[n],n,t))return!0;return!1}var Qr=eu;function tu(t,e){return t.has(e)}var nu=tu,ru=1,au=2;function iu(t,e,n,r,a,i){var o=n&ru,s=t.length,l=e.length;if(s!=l&&!(o&&l>s))return!1;var c=i.get(t),u=i.get(e);if(c&&u)return c==e&&u==t;var f=-1,d=!0,v=n&au?new Qc:void 0;for(i.set(t,e),i.set(e,t);++f<s;){var h=t[f],m=e[f];if(r)var g=o?r(m,h,f,e,t,i):r(h,m,f,t,e,i);if(g!==void 0){if(g)continue;d=!1;break}if(v){if(!Qr(e,function(w,y){if(!nu(v,y)&&(h===w||a(h,w,n,r,i)))return v.push(y)})){d=!1;break}}else if(!(h===m||a(h,m,n,r,i))){d=!1;break}}return i.delete(t),i.delete(e),d}var ea=iu,ou=fe.Uint8Array,on=ou;function su(t){var e=-1,n=Array(t.size);return t.forEach(function(r,a){n[++e]=[a,r]}),n}var ta=su;function lu(t){var e=-1,n=Array(t.size);return t.forEach(function(r){n[++e]=r}),n}var cu=lu,uu=1,fu=2,du="[object Boolean]",vu="[object Date]",hu="[object Error]",pu="[object Map]",mu="[object Number]",gu="[object RegExp]",yu="[object Set]",bu="[object String]",wu="[object Symbol]",Du="[object ArrayBuffer]",ku="[object DataView]",na=ee?ee.prototype:void 0,Hn=na?na.valueOf:void 0;function xu(t,e,n,r,a,i,o){switch(n){case ku:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case Du:return!(t.byteLength!=e.byteLength||!i(new on(t),new on(e)));case du:case vu:case mu:return Xe(+t,+e);case hu:return t.name==e.name&&t.message==e.message;case gu:case bu:return t==e+"";case pu:var s=ta;case yu:var l=r&uu;if(s||(s=cu),t.size!=e.size&&!l)return!1;var c=o.get(t);if(c)return c==e;r|=fu,o.set(t,e);var u=ea(s(t),s(e),r,a,i,o);return o.delete(t),u;case wu:if(Hn)return Hn.call(t)==Hn.call(e)}return!1}var _u=xu;function Mu(t,e){for(var n=-1,r=e.length,a=t.length;++n<r;)t[a+n]=e[n];return t}var Rn=Mu;function Pu(t,e,n){var r=e(t);return L(t)?r:Rn(r,n(t))}var ra=Pu;function Tu(t,e){for(var n=-1,r=t==null?0:t.length,a=0,i=[];++n<r;){var o=t[n];e(o,n,t)&&(i[a++]=o)}return i}var Ou=Tu;function Iu(){return[]}var aa=Iu,Yu=Object.prototype,Eu=Yu.propertyIsEnumerable,ia=Object.getOwnPropertySymbols,Cu=ia?function(t){return t==null?[]:(t=Object(t),Ou(ia(t),function(e){return Eu.call(t,e)}))}:aa,Wn=Cu;function Su(t){return ra(t,rt,Wn)}var Bn=Su,$u=1,Au=Object.prototype,Nu=Au.hasOwnProperty;function Fu(t,e,n,r,a,i){var o=n&$u,s=Bn(t),l=s.length,c=Bn(e),u=c.length;if(l!=u&&!o)return!1;for(var f=l;f--;){var d=s[f];if(!(o?d in e:Nu.call(e,d)))return!1}var v=i.get(t),h=i.get(e);if(v&&h)return v==e&&h==t;var m=!0;i.set(t,e),i.set(e,t);for(var g=o;++f<l;){d=s[f];var w=t[d],y=e[d];if(r)var _=o?r(y,w,d,e,t,i):r(w,y,d,t,e,i);if(!(_===void 0?w===y||a(w,y,n,r,i):_)){m=!1;break}g||(g=d=="constructor")}if(m&&!g){var b=t.constructor,x=e.constructor;b!=x&&"constructor"in t&&"constructor"in e&&!(typeof b=="function"&&b instanceof b&&typeof x=="function"&&x instanceof x)&&(m=!1)}return i.delete(t),i.delete(e),m}var ju=Fu,Lu=je(fe,"DataView"),Vn=Lu,zu=je(fe,"Promise"),Un=zu,Hu=je(fe,"Set"),Kn=Hu,Ru=je(fe,"WeakMap"),Gn=Ru,oa="[object Map]",Wu="[object Object]",sa="[object Promise]",la="[object Set]",ca="[object WeakMap]",ua="[object DataView]",Bu=Fe(Vn),Vu=Fe(bt),Uu=Fe(Un),Ku=Fe(Kn),Gu=Fe(Gn),Le=oe;(Vn&&Le(new Vn(new ArrayBuffer(1)))!=ua||bt&&Le(new bt)!=oa||Un&&Le(Un.resolve())!=sa||Kn&&Le(new Kn)!=la||Gn&&Le(new Gn)!=ca)&&(Le=function(t){var e=oe(t),n=e==Wu?t.constructor:void 0,r=n?Fe(n):"";if(r)switch(r){case Bu:return ua;case Vu:return oa;case Uu:return sa;case Ku:return la;case Gu:return ca}return e});var ot=Le,Zu=1,fa="[object Arguments]",da="[object Array]",sn="[object Object]",qu=Object.prototype,va=qu.hasOwnProperty;function Xu(t,e,n,r,a,i){var o=L(t),s=L(e),l=o?da:ot(t),c=s?da:ot(e);l=l==fa?sn:l,c=c==fa?sn:c;var u=l==sn,f=c==sn,d=l==c;if(d&&Dt(t)){if(!Dt(e))return!1;o=!0,u=!1}if(d&&!u)return i||(i=new it),o||Ln(t)?ea(t,e,n,r,a,i):_u(t,e,l,n,r,a,i);if(!(n&Zu)){var v=u&&va.call(t,"__wrapped__"),h=f&&va.call(e,"__wrapped__");if(v||h){var m=v?t.value():t,g=h?e.value():e;return i||(i=new it),a(m,g,n,r,i)}}return d?(i||(i=new it),ju(t,e,n,r,a,i)):!1}var Ju=Xu;function ha(t,e,n,r,a){return t===e?!0:t==null||e==null||!W(t)&&!W(e)?t!==t&&e!==e:Ju(t,e,n,r,ha,a)}var pa=ha,Qu=1,ef=2;function tf(t,e,n,r){var a=n.length,i=a,o=!r;if(t==null)return!i;for(t=Object(t);a--;){var s=n[a];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++a<i;){s=n[a];var l=s[0],c=t[l],u=s[1];if(o&&s[2]){if(c===void 0&&!(l in t))return!1}else{var f=new it;if(r)var d=r(c,u,l,t,e,f);if(!(d===void 0?pa(u,c,Qu|ef,r,f):d))return!1}}return!0}var nf=tf;function rf(t){return t===t&&!H(t)}var ma=rf;function af(t){for(var e=rt(t),n=e.length;n--;){var r=e[n],a=t[r];e[n]=[r,a,ma(a)]}return e}var of=af;function sf(t,e){return function(n){return n==null?!1:n[t]===e&&(e!==void 0||t in Object(n))}}var ga=sf;function lf(t){var e=of(t);return e.length==1&&e[0][2]?ga(e[0][0],e[0][1]):function(n){return n===t||nf(n,t,e)}}var cf=lf;function uf(t,e){return t!=null&&e in Object(t)}var ff=uf;function df(t,e,n){e=et(e,t);for(var r=-1,a=e.length,i=!1;++r<a;){var o=tt(e[r]);if(!(i=t!=null&&n(t,o)))break;t=t[o]}return i||++r!=a?i:(a=t==null?0:t.length,!!a&&$n(a)&&rn(o,a)&&(L(t)||wt(t)))}var ya=df;function vf(t,e){return t!=null&&ya(t,e,ff)}var ba=vf,hf=1,pf=2;function mf(t,e){return An(t)&&ma(e)?ga(tt(t),e):function(n){var r=nt(n,t);return r===void 0&&r===e?ba(n,t):pa(e,r,hf|pf)}}var gf=mf;function yf(t){return t}var Zn=yf;function bf(t){return function(e){return e==null?void 0:e[t]}}var wf=bf;function Df(t){return function(e){return en(e,t)}}var kf=Df;function xf(t){return An(t)?wf(tt(t)):kf(t)}var _f=xf;function Mf(t){return typeof t=="function"?t:t==null?Zn:typeof t=="object"?L(t)?gf(t[0],t[1]):cf(t):_f(t)}var qn=Mf;function Pf(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}var wa=Pf,Da=Math.max;function Tf(t,e,n){return e=Da(e===void 0?t.length-1:e,0),function(){for(var r=arguments,a=-1,i=Da(r.length-e,0),o=Array(i);++a<i;)o[a]=r[e+a];a=-1;for(var s=Array(e+1);++a<e;)s[a]=r[a];return s[e]=n(o),wa(t,this,s)}}var ka=Tf;function Of(t){return function(){return t}}var If=Of,Yf=tn?function(t,e){return tn(t,"toString",{configurable:!0,enumerable:!1,value:If(e),writable:!0})}:Zn,Ef=Yf,Cf=800,Sf=16,$f=Date.now;function Af(t){var e=0,n=0;return function(){var r=$f(),a=Sf-(r-n);if(n=r,a>0){if(++e>=Cf)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var Nf=Af,Ff=Nf(Ef),xa=Ff;function jf(t,e){return xa(ka(t,e,Zn),t+"")}var Xn=jf;function Lf(t,e,n){if(!H(n))return!1;var r=typeof e;return(r=="number"?Ze(n)&&rn(e,n.length):r=="string"&&e in n)?Xe(n[e],t):!1}var Jn=Lf;function zf(t){var e=[];if(t!=null)for(var n in Object(t))e.push(n);return e}var Hf=zf,Rf=Object.prototype,Wf=Rf.hasOwnProperty;function Bf(t){if(!H(t))return Hf(t);var e=zn(t),n=[];for(var r in t)r=="constructor"&&(e||!Wf.call(t,r))||n.push(r);return n}var Vf=Bf;function Uf(t){return Ze(t)?qr(t,!0):Vf(t)}var st=Uf,_a=Object.prototype,Kf=_a.hasOwnProperty,Gf=Xn(function(t,e){t=Object(t);var n=-1,r=e.length,a=r>2?e[2]:void 0;for(a&&Jn(e[0],e[1],a)&&(r=1);++n<r;)for(var i=e[n],o=st(i),s=-1,l=o.length;++s<l;){var c=o[s],u=t[c];(u===void 0||Xe(u,_a[c])&&!Kf.call(t,c))&&(t[c]=i[c])}return t}),kt=Gf;function Zf(t,e,n){(n!==void 0&&!Xe(t[e],n)||n===void 0&&!(e in t))&&nn(t,e,n)}var Qn=Zf,Ma=Sn(function(t,e){var n=e&&!e.nodeType&&e,r=n&&!0&&t&&!t.nodeType&&t,a=r&&r.exports===n,i=a?fe.Buffer:void 0,o=i?i.allocUnsafe:void 0;function s(l,c){if(c)return l.slice();var u=l.length,f=o?o(u):new l.constructor(u);return l.copy(f),f}t.exports=s});function qf(t){var e=new t.constructor(t.byteLength);return new on(e).set(new on(t)),e}var er=qf;function Xf(t,e){var n=e?er(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}var Pa=Xf;function Jf(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}var Ta=Jf,Oa=Object.create,Qf=function(){function t(){}return function(e){if(!H(e))return{};if(Oa)return Oa(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}(),ed=Qf,td=Xr(Object.getPrototypeOf,Object),tr=td;function nd(t){return typeof t.constructor=="function"&&!zn(t)?ed(tr(t)):{}}var Ia=nd,rd="[object Object]",ad=Function.prototype,id=Object.prototype,Ya=ad.toString,od=id.hasOwnProperty,sd=Ya.call(Object);function ld(t){if(!W(t)||oe(t)!=rd)return!1;var e=tr(t);if(e===null)return!0;var n=od.call(e,"constructor")&&e.constructor;return typeof n=="function"&&n instanceof n&&Ya.call(n)==sd}var Ea=ld;function cd(t,e){if(!(e==="constructor"&&typeof t[e]=="function")&&e!="__proto__")return t[e]}var nr=cd;function ud(t,e,n,r){var a=!n;n||(n={});for(var i=-1,o=e.length;++i<o;){var s=e[i],l=r?r(n[s],t[s],s,n,t):void 0;l===void 0&&(l=t[s]),a?nn(n,s,l):jn(n,s,l)}return n}var lt=ud;function fd(t){return lt(t,st(t))}var dd=fd;function vd(t,e,n,r,a,i,o){var s=nr(t,n),l=nr(e,n),c=o.get(l);if(c){Qn(t,n,c);return}var u=i?i(s,l,n+"",t,e,o):void 0,f=u===void 0;if(f){var d=L(l),v=!d&&Dt(l),h=!d&&!v&&Ln(l);u=l,d||v||h?L(s)?u=s:G(s)?u=Ta(s):v?(f=!1,u=Ma(l,!0)):h?(f=!1,u=Pa(l,!0)):u=[]:Ea(l)||wt(l)?(u=s,wt(s)?u=dd(s):(!H(s)||se(s))&&(u=Ia(l))):f=!1}f&&(o.set(l,u),a(u,l,r,i,o),o.delete(l)),Qn(t,n,u)}var hd=vd;function Ca(t,e,n,r,a){t!==e&&Ur(e,function(i,o){if(a||(a=new it),H(i))hd(t,e,o,n,Ca,r,a);else{var s=r?r(nr(t,o),i,o+"",t,e,a):void 0;s===void 0&&(s=i),Qn(t,o,s)}},st)}var Sa=Ca;function $a(t,e,n,r,a,i){return H(t)&&H(e)&&(i.set(e,t),Sa(t,e,void 0,$a,i),i.delete(e)),t}var pd=$a;function md(t){return Xn(function(e,n){var r=-1,a=n.length,i=a>1?n[a-1]:void 0,o=a>2?n[2]:void 0;for(i=t.length>3&&typeof i=="function"?(a--,i):void 0,o&&Jn(n[0],n[1],o)&&(i=a<3?void 0:i,a=1),e=Object(e);++r<a;){var s=n[r];s&&t(e,s,r,i)}return e})}var gd=md,yd=gd(function(t,e,n,r){Sa(t,e,n,r)}),bd=yd,wd=Xn(function(t){return t.push(void 0,pd),wa(bd,void 0,t)}),xt=wd;function Dd(t,e,n){for(var r=-1,a=e.length,i={};++r<a;){var o=e[r],s=en(t,o);n(s,o)&&Vr(i,et(o,t),s)}return i}var kd=Dd;function xd(t,e){return kd(t,e,function(n,r){return ba(t,r)})}var _d=xd,Aa=ee?ee.isConcatSpreadable:void 0;function Md(t){return L(t)||wt(t)||!!(Aa&&t&&t[Aa])}var Pd=Md;function Na(t,e,n,r,a){var i=-1,o=t.length;for(n||(n=Pd),a||(a=[]);++i<o;){var s=t[i];e>0&&n(s)?e>1?Na(s,e-1,n,r,a):Rn(a,s):r||(a[a.length]=s)}return a}var Td=Na;function Od(t){var e=t==null?0:t.length;return e?Td(t,1):[]}var Id=Od;function Yd(t){return xa(ka(t,void 0,Id),t+"")}var Fa=Yd,Ed=Fa(function(t,e){return t==null?{}:_d(t,e)}),Cd=Ed;function Sd(t,e){for(var n=-1,r=t==null?0:t.length;++n<r&&e(t[n],n,t)!==!1;);return t}var $d=Sd;function Ad(t,e){return t&&lt(e,rt(e),t)}var Nd=Ad;function Fd(t,e){return t&&lt(e,st(e),t)}var jd=Fd;function Ld(t,e){return lt(t,Wn(t),e)}var zd=Ld,Hd=Object.getOwnPropertySymbols,Rd=Hd?function(t){for(var e=[];t;)Rn(e,Wn(t)),t=tr(t);return e}:aa,ja=Rd;function Wd(t,e){return lt(t,ja(t),e)}var Bd=Wd;function Vd(t){return ra(t,st,ja)}var La=Vd,Ud=Object.prototype,Kd=Ud.hasOwnProperty;function Gd(t){var e=t.length,n=new t.constructor(e);return e&&typeof t[0]=="string"&&Kd.call(t,"index")&&(n.index=t.index,n.input=t.input),n}var Zd=Gd;function qd(t,e){var n=e?er(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}var Xd=qd,Jd=/\w*$/;function Qd(t){var e=new t.constructor(t.source,Jd.exec(t));return e.lastIndex=t.lastIndex,e}var ev=Qd,za=ee?ee.prototype:void 0,Ha=za?za.valueOf:void 0;function tv(t){return Ha?Object(Ha.call(t)):{}}var nv=tv,rv="[object Boolean]",av="[object Date]",iv="[object Map]",ov="[object Number]",sv="[object RegExp]",lv="[object Set]",cv="[object String]",uv="[object Symbol]",fv="[object ArrayBuffer]",dv="[object DataView]",vv="[object Float32Array]",hv="[object Float64Array]",pv="[object Int8Array]",mv="[object Int16Array]",gv="[object Int32Array]",yv="[object Uint8Array]",bv="[object Uint8ClampedArray]",wv="[object Uint16Array]",Dv="[object Uint32Array]";function kv(t,e,n){var r=t.constructor;switch(e){case fv:return er(t);case rv:case av:return new r(+t);case dv:return Xd(t,n);case vv:case hv:case pv:case mv:case gv:case yv:case bv:case wv:case Dv:return Pa(t,n);case iv:return new r;case ov:case cv:return new r(t);case sv:return ev(t);case lv:return new r;case uv:return nv(t)}}var xv=kv,_v="[object Map]";function Mv(t){return W(t)&&ot(t)==_v}var Pv=Mv,Ra=Oe&&Oe.isMap,Tv=Ra?Kt(Ra):Pv,Ov=Tv,Iv="[object Set]";function Yv(t){return W(t)&&ot(t)==Iv}var Ev=Yv,Wa=Oe&&Oe.isSet,Cv=Wa?Kt(Wa):Ev,Sv=Cv,$v=1,Av=2,Nv=4,Ba="[object Arguments]",Fv="[object Array]",jv="[object Boolean]",Lv="[object Date]",zv="[object Error]",Va="[object Function]",Hv="[object GeneratorFunction]",Rv="[object Map]",Wv="[object Number]",Ua="[object Object]",Bv="[object RegExp]",Vv="[object Set]",Uv="[object String]",Kv="[object Symbol]",Gv="[object WeakMap]",Zv="[object ArrayBuffer]",qv="[object DataView]",Xv="[object Float32Array]",Jv="[object Float64Array]",Qv="[object Int8Array]",eh="[object Int16Array]",th="[object Int32Array]",nh="[object Uint8Array]",rh="[object Uint8ClampedArray]",ah="[object Uint16Array]",ih="[object Uint32Array]",E={};E[Ba]=E[Fv]=E[Zv]=E[qv]=E[jv]=E[Lv]=E[Xv]=E[Jv]=E[Qv]=E[eh]=E[th]=E[Rv]=E[Wv]=E[Ua]=E[Bv]=E[Vv]=E[Uv]=E[Kv]=E[nh]=E[rh]=E[ah]=E[ih]=!0;E[zv]=E[Va]=E[Gv]=!1;function ln(t,e,n,r,a,i){var o,s=e&$v,l=e&Av,c=e&Nv;if(n&&(o=a?n(t,r,a,i):n(t)),o!==void 0)return o;if(!H(t))return t;var u=L(t);if(u){if(o=Zd(t),!s)return Ta(t,o)}else{var f=ot(t),d=f==Va||f==Hv;if(Dt(t))return Ma(t,s);if(f==Ua||f==Ba||d&&!a){if(o=l||d?{}:Ia(t),!s)return l?Bd(t,jd(o,t)):zd(t,Nd(o,t))}else{if(!E[f])return a?t:{};o=xv(t,f,s)}}i||(i=new it);var v=i.get(t);if(v)return v;i.set(t,o),Sv(t)?t.forEach(function(g){o.add(ln(g,e,n,g,t,i))}):Ov(t)&&t.forEach(function(g,w){o.set(w,ln(g,e,n,w,t,i))});var h=c?l?La:Bn:l?st:rt,m=u?void 0:h(t);return $d(m||t,function(g,w){m&&(w=g,g=t[w]),jn(o,w,ln(g,e,n,w,t,i))}),o}var oh=ln;function sh(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var _t=sh;function lh(t,e,n){var r=-1,a=t.length;e<0&&(e=-e>a?0:a+e),n=n>a?a:n,n<0&&(n+=a),a=e>n?0:n-e>>>0,e>>>=0;for(var i=Array(a);++r<a;)i[r]=t[r+e];return i}var ch=lh;function uh(t,e){return e.length<2?t:en(t,ch(e,0,-1))}var fh=uh;function dh(t,e){return e=et(e,t),t=fh(t,e),t==null||delete t[tt(_t(e))]}var vh=dh;function hh(t){return Ea(t)?void 0:t}var ph=hh,mh=1,gh=2,yh=4,bh=Fa(function(t,e){var n={};if(t==null)return n;var r=!1;e=Qt(e,function(i){return i=et(i,t),r||(r=i.length>1),i}),lt(t,La(t),n),r&&(n=oh(n,mh|gh|yh,ph));for(var a=e.length;a--;)vh(n,e[a]);return n}),rr=bh,wh=Object.prototype,Dh=wh.hasOwnProperty;function kh(t,e){return t!=null&&Dh.call(t,e)}var xh=kh;function _h(t,e){return t!=null&&ya(t,e,xh)}var Ka=_h;function Mh(t,e){return function(n,r){if(n==null)return n;if(!Ze(n))return t(n,r);for(var a=n.length,i=e?a:-1,o=Object(n);(e?i--:++i<a)&&r(o[i],i,o)!==!1;);return n}}var Ph=Mh,Th=Ph(Jr),Ga=Th;function Oh(t,e){var n;return Ga(t,function(r,a,i){return n=e(r,a,i),!n}),!!n}var Ih=Oh;function Yh(t,e,n){var r=L(t)?Qr:Ih;return n&&Jn(t,e,n)&&(e=void 0),r(t,qn(e))}var Za=Yh;const Eh=t=>Object.prototype.toString.call(t).slice(8,-1),Ie=t=>Zo(t)&&!isNaN(t.getTime()),le=t=>Eh(t)==="Object",Mt=Ka,ar=(t,e)=>Za(e,n=>Ka(t,n)),Ch=Za,M=(t,e,n="0")=>{for(t=t!=null?String(t):"",e=e||2;t.length<e;)t=`${n}${t}`;return t},Sh=(...t)=>{const e={};return t.forEach(n=>Object.entries(n).forEach(([r,a])=>{e[r]?G(e[r])?e[r].push(a):e[r]=[e[r],a]:e[r]=a})),e},Z=t=>!!(t&&t.month&&t.year),Pt=(t,e)=>!Z(t)||!Z(e)?!1:t.year===e.year?t.month<e.month:t.year<e.year,Tt=(t,e)=>!Z(t)||!Z(e)?!1:t.year===e.year?t.month>e.month:t.year>e.year,qa=(t,e,n)=>(t||!1)&&!Pt(t,e)&&!Tt(t,n),ir=(t,e)=>!t&&e||t&&!e?!1:!t&&!e?!0:t.month===e.month&&t.year===e.year,ke=({month:t,year:e},n)=>{const r=n>0?1:-1;for(let a=0;a<Math.abs(n);a++)t+=r,t>12?(t=1,e++):t<1&&(t=12,e--);return{month:t,year:e}},$h=(t,e)=>{if(!Z(t)||!Z(e))return[];const n=[];for(;!Tt(t,e);)n.push(t),t=ke(t,1);return n};function or(t,e){const n=Ie(t),r=Ie(e);return!n&&!r?!0:n!==r?!1:t.getTime()===e.getTime()}const de=t=>G(t)&&t.length>0,Xa=(t,e,n)=>{const r=[];return n.forEach(a=>{const i=a.name||a.toString(),o=a.mixin,s=a.validate;if(Object.prototype.hasOwnProperty.call(t,i)){const l=s?s(t[i]):t[i];e[i]=o&&le(l)?Yn(Yn({},o),l):l,r.push(i)}}),{target:e,assigned:r.length?r:null}},$=(t,e,n,r)=>{t&&e&&n&&t.addEventListener(e,n,r)},A=(t,e,n,r)=>{t&&e&&t.removeEventListener(e,n,r)},Ot=(t,e)=>!!t&&!!e&&(t===e||t.contains(e)),Ja=(t,e)=>{(t.key===" "||t.key==="Enter")&&(e(t),t.preventDefault())},cn=()=>{function t(){return((1+Math.random())*65536|0).toString(16).substring(1)}return`${t()+t()}-${t()}-${t()}-${t()}-${t()}${t()}${t()}`};function Ah(t){let e=0,n=0,r;if(t.length===0)return e;for(n=0;n<t.length;n++)r=t.charCodeAt(n),e=(e<<5)-e+r,e|=0;return e}function ve(t){if(t===null||t===!0||t===!1)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function z(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function xe(t){z(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||typeof t=="object"&&e==="[object Date]"?new Date(t.getTime()):typeof t=="number"||e==="[object Number]"?new Date(t):((typeof t=="string"||e==="[object String]")&&typeof console!="undefined"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn(new Error().stack)),new Date(NaN))}function he(t,e){z(2,arguments);var n=xe(t),r=ve(e);return isNaN(r)?new Date(NaN):(r&&n.setDate(n.getDate()+r),n)}var Nh="[object Number]";function Fh(t){return typeof t=="number"||W(t)&&oe(t)==Nh}var It=Fh,jh="[object String]";function Lh(t){return typeof t=="string"||!L(t)&&W(t)&&oe(t)==jh}var _e=Lh;function zh(t){return t===void 0}var Qa=zh;function Hh(t,e,n){return t===t&&(n!==void 0&&(t=t<=n?t:n),e!==void 0&&(t=t>=e?t:e)),t}var Rh=Hh,ei=0/0,Wh=/^\s+|\s+$/g,Bh=/^[-+]0x[0-9a-f]+$/i,Vh=/^0b[01]+$/i,Uh=/^0o[0-7]+$/i,Kh=parseInt;function Gh(t){if(typeof t=="number")return t;if(Gt(t))return ei;if(H(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=H(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=t.replace(Wh,"");var n=Vh.test(t);return n||Uh.test(t)?Kh(t.slice(2),n?2:8):Bh.test(t)?ei:+t}var sr=Gh;function Zh(t,e,n){return n===void 0&&(n=e,e=void 0),n!==void 0&&(n=sr(n),n=n===n?n:0),e!==void 0&&(e=sr(e),e=e===e?e:0),Rh(sr(t),e,n)}var qh=Zh;function Xh(t,e,n){return t==null?t:Vr(t,e,n)}var Jh=Xh;function Qh(t,e){var n={};return e=qn(e),Jr(t,function(r,a,i){nn(n,a,e(r,a,i))}),n}var ti=Qh;function ep(t,e){return Qt(e,function(n){return[n,t[n]]})}var tp=ep;function np(t){var e=-1,n=Array(t.size);return t.forEach(function(r){n[++e]=[r,r]}),n}var rp=np,ap="[object Map]",ip="[object Set]";function op(t){return function(e){var n=ot(e);return n==ap?ta(e):n==ip?rp(e):tp(e,t(e))}}var sp=op,lp=sp(rt),Yt=lp,cp={inject:["sharedState"],computed:{masks:function(){return this.sharedState.masks},theme:function(){return this.sharedState.theme},locale:function(){return this.sharedState.locale},dayPopoverId:function(){return this.sharedState.dayPopoverId}},methods:{format:function(e,n){return this.locale.format(e,n)},pageForDate:function(e){return this.locale.getDateParts(this.locale.normalizeDate(e))}}},up=["base","start","end","startEnd"],fp=["class","contentClass","style","contentStyle","color","fillMode"],dp={color:"blue",isDark:!1,highlight:{base:{fillMode:"light"},start:{fillMode:"solid"},end:{fillMode:"solid"}},dot:{base:{fillMode:"solid"},start:{fillMode:"solid"},end:{fillMode:"solid"}},bar:{base:{fillMode:"solid"},start:{fillMode:"solid"},end:{fillMode:"solid"}},content:{base:{},start:{},end:{}}},ni=function(){function t(e){pt(this,t),Object.assign(this,dp,e)}return mt(t,[{key:"normalizeAttr",value:function(n){var r=n.config,a=n.type,i=this.color,o={},s=this[a];if(r===!0||_e(r))i=_e(r)?r:i,o=p({},s);else if(le(r))ar(r,up)?o=p({},r):o={base:p({},r),start:p({},r),end:p({},r)};else return null;return kt(o,{start:o.startEnd,end:o.startEnd},s),Yt(o).forEach(function(l){var c=Bt(l,2),u=c[0],f=c[1],d=i;f===!0||_e(f)?(d=_e(f)?f:d,o[u]={color:d}):le(f)&&(ar(f,fp)?o[u]=p({},f):o[u]={}),Mt(o,"".concat(u,".color"))||Jh(o,"".concat(u,".color"),d)}),o}},{key:"normalizeHighlight",value:function(n){var r=this,a=this.normalizeAttr({config:n,type:"highlight"});return Yt(a).forEach(function(i){var o=Bt(i,2);o[0];var s=o[1],l=kt(s,{isDark:r.isDark,color:r.color});s.style=p(p({},r.getHighlightBgStyle(l)),s.style),s.contentStyle=p(p({},r.getHighlightContentStyle(l)),s.contentStyle)}),a}},{key:"getHighlightBgStyle",value:function(n){var r=n.fillMode,a=n.color,i=n.isDark;switch(r){case"outline":case"none":return{backgroundColor:i?"var(--gray-900)":"var(--white)",border:"2px solid",borderColor:i?"var(--".concat(a,"-200)"):"var(--".concat(a,"-700)"),borderRadius:"var(--rounded-full)"};case"light":return{backgroundColor:i?"var(--".concat(a,"-800)"):"var(--".concat(a,"-200)"),opacity:i?.75:1,borderRadius:"var(--rounded-full)"};case"solid":return{backgroundColor:i?"var(--".concat(a,"-500)"):"var(--".concat(a,"-600)"),borderRadius:"var(--rounded-full)"};default:return{borderRadius:"var(--rounded-full)"}}}},{key:"getHighlightContentStyle",value:function(n){var r=n.fillMode,a=n.color,i=n.isDark;switch(r){case"outline":case"none":return{fontWeight:"var(--font-bold)",color:i?"var(--".concat(a,"-100)"):"var(--".concat(a,"-900)")};case"light":return{fontWeight:"var(--font-bold)",color:i?"var(--".concat(a,"-100)"):"var(--".concat(a,"-900)")};case"solid":return{fontWeight:"var(--font-bold)",color:"var(--white)"};default:return""}}},{key:"bgAccentHigh",value:function(n){var r=n.color,a=n.isDark;return{backgroundColor:a?"var(--".concat(r,"-500)"):"var(--".concat(r,"-600)")}}},{key:"contentAccent",value:function(n){var r=n.color,a=n.isDark;return r?{fontWeight:"var(--font-bold)",color:a?"var(--".concat(r,"-100)"):"var(--".concat(r,"-900)")}:null}},{key:"normalizeDot",value:function(n){return this.normalizeNonHighlight("dot",n,this.bgAccentHigh)}},{key:"normalizeBar",value:function(n){return this.normalizeNonHighlight("bar",n,this.bgAccentHigh)}},{key:"normalizeContent",value:function(n){return this.normalizeNonHighlight("content",n,this.contentAccent)}},{key:"normalizeNonHighlight",value:function(n,r,a){var i=this,o=this.normalizeAttr({type:n,config:r});return Yt(o).forEach(function(s){var l=Bt(s,2);l[0];var c=l[1];kt(c,{isDark:i.isDark,color:i.color}),c.style=p(p({},a(c)),c.style)}),o}}]),t}(),un=6e4;function ri(t){return t.getTime()%un}function fn(t){var e=new Date(t.getTime()),n=Math.ceil(e.getTimezoneOffset());e.setSeconds(0,0);var r=n>0,a=r?(un+ri(e))%un:ri(e);return n*un+a}function vp(t,e){var n=gp(e);return n.formatToParts?pp(n,t):mp(n,t)}var hp={year:0,month:1,day:2,hour:3,minute:4,second:5};function pp(t,e){for(var n=t.formatToParts(e),r=[],a=0;a<n.length;a++){var i=hp[n[a].type];i>=0&&(r[i]=parseInt(n[a].value,10))}return r}function mp(t,e){var n=t.format(e).replace(/\u200E/g,""),r=/(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(n);return[r[3],r[1],r[2],r[4],r[5],r[6]]}var lr={};function gp(t){if(!lr[t]){var e=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:"America/New_York",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date("2014-06-25T04:00:00.123Z")),n=e==="06/25/2014, 00:00:00"||e==="\u200E06\u200E/\u200E25\u200E/\u200E2014\u200E \u200E00\u200E:\u200E00\u200E:\u200E00";lr[t]=n?new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}):new Intl.DateTimeFormat("en-US",{hourCycle:"h23",timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})}return lr[t]}var ai=36e5,yp=6e4,dn={timezone:/([Z+-].*)$/,timezoneZ:/^(Z)$/,timezoneHH:/^([+-])(\d{2})$/,timezoneHHMM:/^([+-])(\d{2}):?(\d{2})$/,timezoneIANA:/(UTC|(?:[a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?))$/};function ii(t,e){var n,r;if(n=dn.timezoneZ.exec(t),n)return 0;var a;if(n=dn.timezoneHH.exec(t),n)return a=parseInt(n[2],10),oi()?(r=a*ai,n[1]==="+"?-r:r):NaN;if(n=dn.timezoneHHMM.exec(t),n){a=parseInt(n[2],10);var i=parseInt(n[3],10);return oi(a,i)?(r=a*ai+i*yp,n[1]==="+"?-r:r):NaN}if(n=dn.timezoneIANA.exec(t),n){var o=vp(e,t),s=Date.UTC(o[0],o[1]-1,o[2],o[3],o[4],o[5]),l=e.getTime()-e.getTime()%1e3;return-(s-l)}return 0}function oi(t,e){return!(e!=null&&(e<0||e>59))}var cr=36e5,si=6e4,bp=2,N={dateTimeDelimeter:/[T ]/,plainTime:/:/,timeZoneDelimeter:/[Z ]/i,YY:/^(\d{2})$/,YYY:[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],YYYY:/^(\d{4})/,YYYYY:[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],MM:/^-(\d{2})$/,DDD:/^-?(\d{3})$/,MMDD:/^-?(\d{2})-?(\d{2})$/,Www:/^-?W(\d{2})$/,WwwD:/^-?W(\d{2})-?(\d{1})$/,HH:/^(\d{2}([.,]\d*)?)$/,HHMM:/^(\d{2}):?(\d{2}([.,]\d*)?)$/,HHMMSS:/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,timezone:/([Z+-].*| UTC|(?:[a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?))$/};function li(t,e){if(arguments.length<1)throw new TypeError("1 argument required, but only "+arguments.length+" present");if(t===null)return new Date(NaN);var n=e||{},r=n.additionalDigits==null?bp:ve(n.additionalDigits);if(r!==2&&r!==1&&r!==0)throw new RangeError("additionalDigits must be 0, 1 or 2");if(t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]")return new Date(t.getTime());if(typeof t=="number"||Object.prototype.toString.call(t)==="[object Number]")return new Date(t);if(!(typeof t=="string"||Object.prototype.toString.call(t)==="[object String]"))return new Date(NaN);var a=wp(t),i=Dp(a.date,r),o=i.year,s=i.restDateString,l=kp(s,o);if(isNaN(l))return new Date(NaN);if(l){var c=l.getTime(),u=0,f;if(a.time&&(u=xp(a.time),isNaN(u)))return new Date(NaN);if(a.timezone||n.timeZone){if(f=ii(a.timezone||n.timeZone,new Date(c+u)),isNaN(f))return new Date(NaN);if(f=ii(a.timezone||n.timeZone,new Date(c+u+f)),isNaN(f))return new Date(NaN)}else f=fn(new Date(c+u)),f=fn(new Date(c+u+f));return new Date(c+u+f)}else return new Date(NaN)}function wp(t){var e={},n=t.split(N.dateTimeDelimeter),r;if(N.plainTime.test(n[0])?(e.date=null,r=n[0]):(e.date=n[0],r=n[1],e.timezone=n[2],N.timeZoneDelimeter.test(e.date)&&(e.date=t.split(N.timeZoneDelimeter)[0],r=t.substr(e.date.length,t.length))),r){var a=N.timezone.exec(r);a?(e.time=r.replace(a[1],""),e.timezone=a[1]):e.time=r}return e}function Dp(t,e){var n=N.YYY[e],r=N.YYYYY[e],a;if(a=N.YYYY.exec(t)||r.exec(t),a){var i=a[1];return{year:parseInt(i,10),restDateString:t.slice(i.length)}}if(a=N.YY.exec(t)||n.exec(t),a){var o=a[1];return{year:parseInt(o,10)*100,restDateString:t.slice(o.length)}}return{year:null}}function kp(t,e){if(e===null)return null;var n,r,a,i;if(t.length===0)return r=new Date(0),r.setUTCFullYear(e),r;if(n=N.MM.exec(t),n)return r=new Date(0),a=parseInt(n[1],10)-1,fi(e,a)?(r.setUTCFullYear(e,a),r):new Date(NaN);if(n=N.DDD.exec(t),n){r=new Date(0);var o=parseInt(n[1],10);return Pp(e,o)?(r.setUTCFullYear(e,0,o),r):new Date(NaN)}if(n=N.MMDD.exec(t),n){r=new Date(0),a=parseInt(n[1],10)-1;var s=parseInt(n[2],10);return fi(e,a,s)?(r.setUTCFullYear(e,a,s),r):new Date(NaN)}if(n=N.Www.exec(t),n)return i=parseInt(n[1],10)-1,di(e,i)?ci(e,i):new Date(NaN);if(n=N.WwwD.exec(t),n){i=parseInt(n[1],10)-1;var l=parseInt(n[2],10)-1;return di(e,i,l)?ci(e,i,l):new Date(NaN)}return null}function xp(t){var e,n,r;if(e=N.HH.exec(t),e)return n=parseFloat(e[1].replace(",",".")),ur(n)?n%24*cr:NaN;if(e=N.HHMM.exec(t),e)return n=parseInt(e[1],10),r=parseFloat(e[2].replace(",",".")),ur(n,r)?n%24*cr+r*si:NaN;if(e=N.HHMMSS.exec(t),e){n=parseInt(e[1],10),r=parseInt(e[2],10);var a=parseFloat(e[3].replace(",","."));return ur(n,r,a)?n%24*cr+r*si+a*1e3:NaN}return null}function ci(t,e,n){e=e||0,n=n||0;var r=new Date(0);r.setUTCFullYear(t,0,4);var a=r.getUTCDay()||7,i=e*7+n+1-a;return r.setUTCDate(r.getUTCDate()+i),r}var _p=[31,28,31,30,31,30,31,31,30,31,30,31],Mp=[31,29,31,30,31,30,31,31,30,31,30,31];function ui(t){return t%400==0||t%4==0&&t%100!=0}function fi(t,e,n){if(e<0||e>11)return!1;if(n!=null){if(n<1)return!1;var r=ui(t);if(r&&n>Mp[e]||!r&&n>_p[e])return!1}return!0}function Pp(t,e){if(e<1)return!1;var n=ui(t);return!(n&&e>366||!n&&e>365)}function di(t,e,n){return!(e<0||e>52||n!=null&&(n<0||n>6))}function ur(t,e,n){return!(t!=null&&(t<0||t>=25)||e!=null&&(e<0||e>=60)||n!=null&&(n<0||n>=60))}function ze(t,e){z(1,arguments);var n=e||{},r=n.locale,a=r&&r.options&&r.options.weekStartsOn,i=a==null?0:ve(a),o=n.weekStartsOn==null?i:ve(n.weekStartsOn);if(!(o>=0&&o<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var s=xe(t),l=s.getDay(),c=(l<o?7:0)+l-o;return s.setDate(s.getDate()-c),s.setHours(0,0,0,0),s}function vn(t){return z(1,arguments),ze(t,{weekStartsOn:1})}function Tp(t){z(1,arguments);var e=xe(t),n=e.getFullYear(),r=new Date(0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);var a=vn(r),i=new Date(0);i.setFullYear(n,0,4),i.setHours(0,0,0,0);var o=vn(i);return e.getTime()>=a.getTime()?n+1:e.getTime()>=o.getTime()?n:n-1}function Op(t){z(1,arguments);var e=Tp(t),n=new Date(0);n.setFullYear(e,0,4),n.setHours(0,0,0,0);var r=vn(n);return r}var Ip=6048e5;function Yp(t){z(1,arguments);var e=xe(t),n=vn(e).getTime()-Op(e).getTime();return Math.round(n/Ip)+1}function Ep(t,e){z(1,arguments);var n=xe(t),r=n.getFullYear(),a=e||{},i=a.locale,o=i&&i.options&&i.options.firstWeekContainsDate,s=o==null?1:ve(o),l=a.firstWeekContainsDate==null?s:ve(a.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var c=new Date(0);c.setFullYear(r+1,0,l),c.setHours(0,0,0,0);var u=ze(c,e),f=new Date(0);f.setFullYear(r,0,l),f.setHours(0,0,0,0);var d=ze(f,e);return n.getTime()>=u.getTime()?r+1:n.getTime()>=d.getTime()?r:r-1}function Cp(t,e){z(1,arguments);var n=e||{},r=n.locale,a=r&&r.options&&r.options.firstWeekContainsDate,i=a==null?1:ve(a),o=n.firstWeekContainsDate==null?i:ve(n.firstWeekContainsDate),s=Ep(t,e),l=new Date(0);l.setFullYear(s,0,o),l.setHours(0,0,0,0);var c=ze(l,e);return c}var Sp=6048e5;function $p(t,e){z(1,arguments);var n=xe(t),r=ze(n,e).getTime()-Cp(n,e).getTime();return Math.round(r/Sp)+1}var Ap=6048e5;function Np(t,e,n){z(2,arguments);var r=ze(t,n),a=ze(e,n),i=r.getTime()-fn(r),o=a.getTime()-fn(a);return Math.round((i-o)/Ap)}function Fp(t){z(1,arguments);var e=xe(t),n=e.getMonth();return e.setFullYear(e.getFullYear(),n+1,0),e.setHours(0,0,0,0),e}function jp(t){z(1,arguments);var e=xe(t);return e.setDate(1),e.setHours(0,0,0,0),e}function Lp(t,e){return z(1,arguments),Np(Fp(t),jp(t),e)+1}var zp=24*60*60*1e3,Me=function(){function t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.order,a=r===void 0?0:r,i=n.locale,o=n.isFullDay;if(pt(this,t),this.isDateInfo=!0,this.order=a,this.locale=i instanceof hn?i:new hn(i),this.firstDayOfWeek=this.locale.firstDayOfWeek,!le(e)){var s=this.locale.normalizeDate(e);o?e={start:s,end:s}:e={startOn:s,endOn:s}}var l=null,c=null;if(e.start?l=this.locale.normalizeDate(e.start,p(p({},this.opts),{},{time:"00:00:00"})):e.startOn&&(l=this.locale.normalizeDate(e.startOn,this.opts)),e.end?c=this.locale.normalizeDate(e.end,p(p({},this.opts),{},{time:"23:59:59"})):e.endOn&&(c=this.locale.normalizeDate(e.endOn,this.opts)),l&&c&&l>c){var u=l;l=c,c=u}else l&&e.span>=1&&(c=he(l,e.span-1));this.start=l,this.startTime=l?l.getTime():NaN,this.end=c,this.endTime=c?c.getTime():NaN,this.isDate=this.startTime&&this.startTime===this.endTime,this.isRange=!this.isDate;var f=Xa(e,{},t.patternProps);if(f.assigned&&(this.on={and:f.target}),e.on){var d=(G(e.on)?e.on:[e.on]).map(function(v){if(se(v))return v;var h=Xa(v,{},t.patternProps);return h.assigned?h.target:null}).filter(function(v){return v});d.length&&(this.on=p(p({},this.on),{},{or:d}))}this.isComplex=!!this.on}return mt(t,[{key:"toDateInfo",value:function(n){return n.isDateInfo?n:new t(n,this.opts)}},{key:"startOfWeek",value:function(n){var r=n.getDay()+1,a=r>=this.firstDayOfWeek?this.firstDayOfWeek-r:-(7-(this.firstDayOfWeek-r));return he(n,a)}},{key:"diffInDays",value:function(n,r){return Math.round((r-n)/zp)}},{key:"diffInWeeks",value:function(n,r){return this.diffInDays(this.startOfWeek(n),this.startOfWeek(r))}},{key:"diffInYears",value:function(n,r){return r.getUTCFullYear()-n.getUTCFullYear()}},{key:"diffInMonths",value:function(n,r){return this.diffInYears(n,r)*12+(r.getMonth()-n.getMonth())}},{key:"iterateDatesInRange",value:function(n,r){var a=n.start,i=n.end;if(!a||!i||!se(r))return null;a=this.locale.normalizeDate(a,p(p({},this.opts),{},{time:"00:00:00"}));for(var o={i:0,date:a,day:this.locale.getDateParts(a),finished:!1},s=null;!o.finished&&o.date<=i;o.i++)s=r(o),o.date=he(o.date,1),o.day=this.locale.getDateParts(o.date);return s}},{key:"shallowIntersectingRange",value:function(n){return this.rangeShallowIntersectingRange(this,this.toDateInfo(n))}},{key:"rangeShallowIntersectingRange",value:function(n,r){if(!this.dateShallowIntersectsDate(n,r))return null;var a=n.toRange(),i=r.toRange(),o=null,s=null;return a.start?i.start?o=a.start>i.start?a.start:i.start:o=a.start:i.start&&(o=i.start),a.end?i.end?s=a.end<i.end?a.end:i.end:s=a.end:i.end&&(s=i.end),{start:o,end:s}}},{key:"intersectsDate",value:function(n){var r=this,a=this.toDateInfo(n);if(!this.shallowIntersectsDate(a))return null;if(!this.on)return this;var i=this.rangeShallowIntersectingRange(this,a),o=!1;return this.iterateDatesInRange(i,function(s){r.matchesDay(s.day)&&(o=o||a.matchesDay(s.day),s.finished=o)}),o}},{key:"shallowIntersectsDate",value:function(n){return this.dateShallowIntersectsDate(this,this.toDateInfo(n))}},{key:"dateShallowIntersectsDate",value:function(n,r){return n.isDate?r.isDate?n.startTime===r.startTime:this.dateShallowIncludesDate(r,n):r.isDate?this.dateShallowIncludesDate(n,r):!(n.start&&r.end&&n.start>r.end||n.end&&r.start&&n.end<r.start)}},{key:"includesDate",value:function(n){var r=this,a=this.toDateInfo(n);if(!this.shallowIncludesDate(a))return!1;if(!this.on)return!0;var i=this.rangeShallowIntersectingRange(this,a),o=!0;return this.iterateDatesInRange(i,function(s){r.matchesDay(s.day)&&(o=o&&a.matchesDay(s.day),s.finished=!o)}),o}},{key:"shallowIncludesDate",value:function(n){return this.dateShallowIncludesDate(this,n.isDate?n:new t(n,this.opts))}},{key:"dateShallowIncludesDate",value:function(n,r){return n.isDate?r.isDate?n.startTime===r.startTime:!r.startTime||!r.endTime?!1:n.startTime===r.startTime&&n.startTime===r.endTime:r.isDate?!(n.start&&r.start<n.start||n.end&&r.start>n.end):!(n.start&&(!r.start||r.start<n.start)||n.end&&(!r.end||r.end>n.end))}},{key:"intersectsDay",value:function(n){return this.shallowIntersectsDate(n.range)&&this.matchesDay(n)?this:null}},{key:"matchesDay",value:function(n){var r=this;return this.on?!(this.on.and&&!t.testConfig(this.on.and,n,this)||this.on.or&&!this.on.or.some(function(a){return t.testConfig(a,n,r)})):!0}},{key:"toRange",value:function(){return new t({start:this.start,end:this.end},this.opts)}},{key:"compare",value:function(n){if(this.order!==n.order)return this.order-n.order;if(this.isDate!==n.isDate)return this.isDate?1:-1;if(this.isDate)return 0;var r=this.start-n.start;return r!==0?r:this.end-n.end}},{key:"opts",get:function(){return{order:this.order,locale:this.locale}}}],[{key:"testConfig",value:function(n,r,a){return se(n)?n(r):le(n)?Object.keys(n).every(function(i){return t.patterns[i].test(r,n[i],a)}):null}},{key:"patterns",get:function(){return{dailyInterval:{test:function(r,a,i){return i.diffInDays(i.start||new Date,r.date)%a==0}},weeklyInterval:{test:function(r,a,i){return i.diffInWeeks(i.start||new Date,r.date)%a==0}},monthlyInterval:{test:function(r,a,i){return i.diffInMonths(i.start||new Date,r.date)%a==0}},yearlyInterval:{test:function(){return function(r,a,i){return i.diffInYears(i.start||new Date,r.date)%a==0}}},days:{validate:function(r){return G(r)?r:[parseInt(r,10)]},test:function(r,a){return a.includes(r.day)||a.includes(-r.dayFromEnd)}},weekdays:{validate:function(r){return G(r)?r:[parseInt(r,10)]},test:function(r,a){return a.includes(r.weekday)}},ordinalWeekdays:{validate:function(r){return Object.keys(r).reduce(function(a,i){var o=r[i];return o&&(a[i]=G(o)?o:[parseInt(o,10)]),a},{})},test:function(r,a){return Object.keys(a).map(function(i){return parseInt(i,10)}).find(function(i){return a[i].includes(r.weekday)&&(i===r.weekdayOrdinal||i===-r.weekdayOrdinalFromEnd)})}},weekends:{validate:function(r){return r},test:function(r){return r.weekday===1||r.weekday===7}},workweek:{validate:function(r){return r},test:function(r){return r.weekday>=2&&r.weekday<=6}},weeks:{validate:function(r){return G(r)?r:[parseInt(r,10)]},test:function(r,a){return a.includes(r.week)||a.includes(-r.weekFromEnd)}},months:{validate:function(r){return G(r)?r:[parseInt(r,10)]},test:function(r,a){return a.includes(r.month)}},years:{validate:function(r){return G(r)?r:[parseInt(r,10)]},test:function(r,a){return a.includes(r.year)}}}}},{key:"patternProps",get:function(){return Object.keys(t.patterns).map(function(n){return{name:n,validate:t.patterns[n].validate}})}}]),t}();const te={ar:{dow:7,L:"D/\u200FM/\u200FYYYY"},bg:{dow:2,L:"D.MM.YYYY"},ca:{dow:2,L:"DD/MM/YYYY"},"zh-CN":{dow:2,L:"YYYY/MM/DD"},"zh-TW":{dow:1,L:"YYYY/MM/DD"},hr:{dow:2,L:"DD.MM.YYYY"},cs:{dow:2,L:"DD.MM.YYYY"},da:{dow:2,L:"DD.MM.YYYY"},nl:{dow:2,L:"DD-MM-YYYY"},"en-US":{dow:1,L:"MM/DD/YYYY"},"en-AU":{dow:2,L:"DD/MM/YYYY"},"en-CA":{dow:1,L:"YYYY-MM-DD"},"en-GB":{dow:2,L:"DD/MM/YYYY"},"en-IE":{dow:2,L:"DD-MM-YYYY"},"en-NZ":{dow:2,L:"DD/MM/YYYY"},"en-ZA":{dow:1,L:"YYYY/MM/DD"},eo:{dow:2,L:"YYYY-MM-DD"},et:{dow:2,L:"DD.MM.YYYY"},fi:{dow:2,L:"DD.MM.YYYY"},fr:{dow:2,L:"DD/MM/YYYY"},"fr-CA":{dow:1,L:"YYYY-MM-DD"},"fr-CH":{dow:2,L:"DD.MM.YYYY"},de:{dow:2,L:"DD.MM.YYYY"},he:{dow:1,L:"DD.MM.YYYY"},id:{dow:2,L:"DD/MM/YYYY"},it:{dow:2,L:"DD/MM/YYYY"},ja:{dow:1,L:"YYYY\u5E74M\u6708D\u65E5"},ko:{dow:1,L:"YYYY.MM.DD"},lv:{dow:2,L:"DD.MM.YYYY"},lt:{dow:2,L:"DD.MM.YYYY"},mk:{dow:2,L:"D.MM.YYYY"},nb:{dow:2,L:"D. MMMM YYYY"},nn:{dow:2,L:"D. MMMM YYYY"},pl:{dow:2,L:"DD.MM.YYYY"},pt:{dow:2,L:"DD/MM/YYYY"},ro:{dow:2,L:"DD.MM.YYYY"},ru:{dow:2,L:"DD.MM.YYYY"},sk:{dow:2,L:"DD.MM.YYYY"},"es-ES":{dow:2,L:"DD/MM/YYYY"},"es-MX":{dow:2,L:"DD/MM/YYYY"},sv:{dow:2,L:"YYYY-MM-DD"},th:{dow:1,L:"DD/MM/YYYY"},tr:{dow:2,L:"DD.MM.YYYY"},uk:{dow:2,L:"DD.MM.YYYY"},vi:{dow:2,L:"DD/MM/YYYY"}};te.en=te["en-US"];te.es=te["es-ES"];te.no=te.nb;te.zh=te["zh-CN"];Yt(te).forEach(([t,{dow:e,L:n}])=>{te[t]={id:t,firstDayOfWeek:e,masks:{L:n}}});var He={DATE_TIME:1,DATE:2,TIME:3},Hp={1:["year","month","day","hours","minutes","seconds","milliseconds"],2:["year","month","day"],3:["hours","minutes","seconds","milliseconds"]},vi=/d{1,2}|W{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|Z{1,4}|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,Ye=/\d\d?/,Rp=/\d{3}/,Wp=/\d{4}/,Et=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Bp=/\[([^]*?)\]/gm,hi=function(){},pi=function(e){return function(n,r,a){var i=a[e].indexOf(r.charAt(0).toUpperCase()+r.substr(1).toLowerCase());~i&&(n.month=i)}},Vp=["L","iso"],R=7,Up=[31,28,31,30,31,30,31,31,30,31,30,31],mi={D:function(e){return e.day},DD:function(e){return M(e.day)},Do:function(e,n){return n.DoFn(e.day)},d:function(e){return e.weekday-1},dd:function(e){return M(e.weekday-1)},W:function(e,n){return n.dayNamesNarrow[e.weekday-1]},WW:function(e,n){return n.dayNamesShorter[e.weekday-1]},WWW:function(e,n){return n.dayNamesShort[e.weekday-1]},WWWW:function(e,n){return n.dayNames[e.weekday-1]},M:function(e){return e.month},MM:function(e){return M(e.month)},MMM:function(e,n){return n.monthNamesShort[e.month-1]},MMMM:function(e,n){return n.monthNames[e.month-1]},YY:function(e){return String(e.year).substr(2)},YYYY:function(e){return M(e.year,4)},h:function(e){return e.hours%12||12},hh:function(e){return M(e.hours%12||12)},H:function(e){return e.hours},HH:function(e){return M(e.hours)},m:function(e){return e.minutes},mm:function(e){return M(e.minutes)},s:function(e){return e.seconds},ss:function(e){return M(e.seconds)},S:function(e){return Math.round(e.milliseconds/100)},SS:function(e){return M(Math.round(e.milliseconds/10),2)},SSS:function(e){return M(e.milliseconds,3)},a:function(e,n){return e.hours<12?n.amPm[0]:n.amPm[1]},A:function(e,n){return e.hours<12?n.amPm[0].toUpperCase():n.amPm[1].toUpperCase()},Z:function(){return"Z"},ZZ:function(e){var n=e.timezoneOffset;return"".concat(n>0?"-":"+").concat(M(Math.floor(Math.abs(n)/60),2))},ZZZ:function(e){var n=e.timezoneOffset;return"".concat(n>0?"-":"+").concat(M(Math.floor(Math.abs(n)/60)*100+Math.abs(n)%60,4))},ZZZZ:function(e){var n=e.timezoneOffset;return"".concat(n>0?"-":"+").concat(M(Math.floor(Math.abs(n)/60),2),":").concat(M(Math.abs(n)%60,2))}},Y={D:[Ye,function(t,e){t.day=e}],Do:[new RegExp(Ye.source+Et.source),function(t,e){t.day=parseInt(e,10)}],d:[Ye,hi],W:[Et,hi],M:[Ye,function(t,e){t.month=e-1}],MMM:[Et,pi("monthNamesShort")],MMMM:[Et,pi("monthNames")],YY:[Ye,function(t,e){var n=new Date,r=+n.getFullYear().toString().substr(0,2);t.year="".concat(e>68?r-1:r).concat(e)}],YYYY:[Wp,function(t,e){t.year=e}],S:[/\d/,function(t,e){t.millisecond=e*100}],SS:[/\d{2}/,function(t,e){t.millisecond=e*10}],SSS:[Rp,function(t,e){t.millisecond=e}],h:[Ye,function(t,e){t.hour=e}],m:[Ye,function(t,e){t.minute=e}],s:[Ye,function(t,e){t.second=e}],a:[Et,function(t,e,n){var r=e.toLowerCase();r===n.amPm[0]?t.isPm=!1:r===n.amPm[1]&&(t.isPm=!0)}],Z:[/[^\s]*?[+-]\d\d:?\d\d|[^\s]*?Z?/,function(t,e){e==="Z"&&(e="+00:00");var n="".concat(e).match(/([+-]|\d\d)/gi);if(n){var r=+(n[1]*60)+parseInt(n[2],10);t.timezoneOffset=n[0]==="+"?r:-r}}]};Y.DD=Y.D;Y.dd=Y.d;Y.WWWW=Y.WWW=Y.WW=Y.W;Y.MM=Y.M;Y.mm=Y.m;Y.hh=Y.H=Y.HH=Y.h;Y.ss=Y.s;Y.A=Y.a;Y.ZZZZ=Y.ZZZ=Y.ZZ=Y.Z;function Kp(t,e){var n=new Intl.DateTimeFormat().resolvedOptions().locale,r;_e(t)?r=t:Mt(t,"id")&&(r=t.id),r=(r||n).toLowerCase();var a=Object.keys(e),i=function(l){return a.find(function(c){return c.toLowerCase()===l})};r=i(r)||i(r.substring(0,2))||n;var o=p(p(p({},e["en-IE"]),e[r]),{},{id:r});return t=le(t)?xt(t,o):o,t}var hn=function(){function t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.locales,a=r===void 0?te:r,i=n.timezone;pt(this,t);var o=Kp(e,a),s=o.id,l=o.firstDayOfWeek,c=o.masks;this.id=s,this.daysInWeek=R,this.firstDayOfWeek=qh(l,1,R),this.masks=c,this.timezone=i||void 0,this.dayNames=this.getDayNames("long"),this.dayNamesShort=this.getDayNames("short"),this.dayNamesShorter=this.dayNamesShort.map(function(u){return u.substring(0,2)}),this.dayNamesNarrow=this.getDayNames("narrow"),this.monthNames=this.getMonthNames("long"),this.monthNamesShort=this.getMonthNames("short"),this.amPm=["am","pm"],this.monthData={},this.getMonthComps=this.getMonthComps.bind(this),this.parse=this.parse.bind(this),this.format=this.format.bind(this),this.toPage=this.toPage.bind(this)}return mt(t,[{key:"format",value:function(n,r){var a=this;if(n=this.normalizeDate(n),!n)return"";r=this.normalizeMasks(r)[0];var i=[];r=r.replace(Bp,function(l,c){return i.push(c),"??"});var o=/Z$/.test(r)?"utc":this.timezone,s=this.getDateParts(n,o);return r=r.replace(vi,function(l){return l in mi?mi[l](s,a):l.slice(1,l.length-1)}),r.replace(/\?\?/g,function(){return i.shift()})}},{key:"parse",value:function(n,r){var a=this,i=this.normalizeMasks(r);return i.map(function(o){if(typeof o!="string")throw new Error("Invalid mask in fecha.parse");var s=n;if(s.length>1e3)return!1;var l=!0,c={};if(o.replace(vi,function(d){if(Y[d]){var v=Y[d],h=s.search(v[0]);~h?s.replace(v[0],function(m){return v[1](c,m,a),s=s.substr(h+m.length),m}):l=!1}return Y[d]?"":d.slice(1,d.length-1)}),!l)return!1;var u=new Date;c.isPm===!0&&c.hour!=null&&+c.hour!=12?c.hour=+c.hour+12:c.isPm===!1&&+c.hour==12&&(c.hour=0);var f;return c.timezoneOffset!=null?(c.minute=+(c.minute||0)-+c.timezoneOffset,f=new Date(Date.UTC(c.year||u.getFullYear(),c.month||0,c.day||1,c.hour||0,c.minute||0,c.second||0,c.millisecond||0))):f=a.getDateFromParts({year:c.year||u.getFullYear(),month:(c.month||0)+1,day:c.day||1,hours:c.hour||0,minutes:c.minute||0,seconds:c.second||0,milliseconds:c.millisecond||0}),f}).find(function(o){return o})||new Date(n)}},{key:"normalizeMasks",value:function(n){var r=this;return(de(n)&&n||[_e(n)&&n||"YYYY-MM-DD"]).map(function(a){return Vp.reduce(function(i,o){return i.replace(o,r.masks[o]||"")},a)})}},{key:"normalizeDate",value:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=null,i=r.type,o=r.fillDate,s=r.mask,l=r.patch,c=r.time,u=i==="auto"||!i;if(It(n)?(i="number",a=new Date(+n)):_e(n)?(i="string",a=n?this.parse(n,s||"iso"):null):le(n)?(i="object",a=this.getDateFromParts(n)):(i="date",a=Ie(n)?new Date(n.getTime()):null),a&&l){o=o==null?new Date:this.normalizeDate(o);var f=p(p({},this.getDateParts(o)),Cd(this.getDateParts(a),Hp[l]));a=this.getDateFromParts(f)}return u&&(r.type=i),a&&!isNaN(a.getTime())?(c&&(a=this.adjustTimeForDate(a,{timeAdjust:c})),a):null}},{key:"denormalizeDate",value:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.type,i=r.mask;switch(a){case"number":return n?n.getTime():NaN;case"string":return n?this.format(n,i||"iso"):"";default:return n?new Date(n):null}}},{key:"adjustTimeForDate",value:function(n,r){var a=r.timeAdjust;if(a){var i=this.getDateParts(n);if(a==="now"){var o=this.getDateParts(new Date);i.hours=o.hours,i.minutes=o.minutes,i.seconds=o.seconds,i.milliseconds=o.milliseconds}else{var s=new Date("2000-01-01T".concat(a,"Z"));i.hours=s.getUTCHours(),i.minutes=s.getUTCMinutes(),i.seconds=s.getUTCSeconds(),i.milliseconds=s.getUTCMilliseconds()}n=this.getDateFromParts(i)}return n}},{key:"normalizeDates",value:function(n,r){return r=r||{},r.locale=this,(G(n)?n:[n]).map(function(a){return a&&(a instanceof Me?a:new Me(a,r))}).filter(function(a){return a})}},{key:"getDateParts",value:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.timezone;if(!n)return null;var a=n;if(r){var i=new Date(n.toLocaleString("en-US",{timeZone:r}));i.setMilliseconds(n.getMilliseconds());var o=i.getTime()-n.getTime();a=new Date(n.getTime()+o)}var s=a.getMilliseconds(),l=a.getSeconds(),c=a.getMinutes(),u=a.getHours(),f=a.getMonth()+1,d=a.getFullYear(),v=this.getMonthComps(f,d),h=a.getDate(),m=v.days-h+1,g=a.getDay()+1,w=Math.floor((h-1)/7+1),y=Math.floor((v.days-h)/7+1),_=Math.ceil((h+Math.abs(v.firstWeekday-v.firstDayOfWeek))/7),b=v.weeks-_+1,x={milliseconds:s,seconds:l,minutes:c,hours:u,day:h,dayFromEnd:m,weekday:g,weekdayOrdinal:w,weekdayOrdinalFromEnd:y,week:_,weekFromEnd:b,month:f,year:d,date:n,isValid:!0};return x.timezoneOffset=this.getTimezoneOffset(x),x}},{key:"getDateFromParts",value:function(n){if(!n)return null;var r=new Date,a=n.year,i=a===void 0?r.getFullYear():a,o=n.month,s=o===void 0?r.getMonth()+1:o,l=n.day,c=l===void 0?r.getDate():l,u=n.hours,f=u===void 0?0:u,d=n.minutes,v=d===void 0?0:d,h=n.seconds,m=h===void 0?0:h,g=n.milliseconds,w=g===void 0?0:g;if(this.timezone){var y="".concat(M(i,4),"-").concat(M(s,2),"-").concat(M(c,2),"T").concat(M(f,2),":").concat(M(v,2),":").concat(M(m,2),".").concat(M(w,3));return li(y,{timeZone:this.timezone})}return new Date(i,s-1,c,f,v,m,w)}},{key:"getTimezoneOffset",value:function(n){var r=n.year,a=n.month,i=n.day,o=n.hours,s=o===void 0?0:o,l=n.minutes,c=l===void 0?0:l,u=n.seconds,f=u===void 0?0:u,d=n.milliseconds,v=d===void 0?0:d,h,m=new Date(Date.UTC(r,a-1,i,s,c,f,v));if(this.timezone){var g="".concat(M(r,4),"-").concat(M(a,2),"-").concat(M(i,2),"T").concat(M(s,2),":").concat(M(c,2),":").concat(M(f,2),".").concat(M(v,3));h=li(g,{timeZone:this.timezone})}else h=new Date(r,a-1,i,s,c,f,v);return(h-m)/6e4}},{key:"toPage",value:function(n,r){return It(n)?ke(r,n):_e(n)?this.getDateParts(this.normalizeDate(n)):Ie(n)?this.getDateParts(n):le(n)?n:null}},{key:"getMonthDates",value:function(){for(var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:2e3,r=[],a=0;a<12;a++)r.push(new Date(n,a,15));return r}},{key:"getMonthNames",value:function(n){var r=new Intl.DateTimeFormat(this.id,{month:n,timezome:"UTC"});return this.getMonthDates().map(function(a){return r.format(a)})}},{key:"getWeekdayDates",value:function(){for(var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.firstDayOfWeek,r=[],a=2020,i=1,o=5+n-1,s=0;s<R;s++)r.push(this.getDateFromParts({year:a,month:i,day:o+s,hours:12}));return r}},{key:"getDayNames",value:function(n){var r=new Intl.DateTimeFormat(this.id,{weekday:n,timeZone:this.timezone});return this.getWeekdayDates(1).map(function(a){return r.format(a)})}},{key:"getMonthComps",value:function(n,r){var a="".concat(n,"-").concat(r),i=this.monthData[a];if(!i){for(var o=r%4==0&&r%100!=0||r%400==0,s=new Date(r,n-1,1),l=s.getDay()+1,c=n===2&&o?29:Up[n-1],u=this.firstDayOfWeek-1,f=Lp(s,{weekStartsOn:u}),d=[],v=[],h=0;h<f;h++){var m=he(s,h*7);d.push($p(m,{weekStartsOn:u})),v.push(Yp(m))}i={firstDayOfWeek:this.firstDayOfWeek,inLeapYear:o,firstWeekday:l,days:c,weeks:f,month:n,year:r,weeknumbers:d,isoWeeknumbers:v},this.monthData[a]=i}return i}},{key:"getThisMonthComps",value:function(){var n=this.getDateParts(new Date),r=n.month,a=n.year;return this.getMonthComps(r,a)}},{key:"getPrevMonthComps",value:function(n,r){return n===1?this.getMonthComps(12,r-1):this.getMonthComps(n-1,r)}},{key:"getNextMonthComps",value:function(n,r){return n===12?this.getMonthComps(1,r+1):this.getMonthComps(n+1,r)}},{key:"getDayId",value:function(n){return this.format(n,"YYYY-MM-DD")}},{key:"getCalendarDays",value:function(n){for(var r=this,a=n.weeks,i=n.monthComps,o=n.prevMonthComps,s=n.nextMonthComps,l=[],c=i.firstDayOfWeek,u=i.firstWeekday,f=i.isoWeeknumbers,d=i.weeknumbers,v=u+(u<c?R:0)-c,h=!0,m=!1,g=!1,w=new Intl.DateTimeFormat(this.id,{weekday:"long",year:"numeric",month:"long",day:"numeric"}),y=o.days-v+1,_=o.days-y+1,b=Math.floor((y-1)/R+1),x=1,k=o.weeks,T=1,O=o.month,P=o.year,S=new Date,F=S.getDate(),ye=S.getMonth()+1,j=S.getFullYear(),$e=function(On,In,Ke){return function(zt,Ht,Rt,Zi){return r.normalizeDate({year:On,month:In,day:Ke,hours:zt,minutes:Ht,seconds:Rt,milliseconds:Zi})}},J=1;J<=a;J++){for(var B=1,V=c;B<=R;B++,V+=V===R?1-R:1){h&&V===u&&(y=1,_=i.days,b=Math.floor((y-1)/R+1),x=Math.floor((i.days-y)/R+1),k=1,T=i.weeks,O=i.month,P=i.year,h=!1,m=!0);var Ae=$e(P,O,y),be={start:Ae(0,0,0),end:Ae(23,59,59,999)},Re=be.start,We="".concat(M(P,4),"-").concat(M(O,2),"-").concat(M(y,2)),we=B,Be=R-B,De=d[J-1],Q=f[J-1],Ne=y===F&&O===ye&&P===j,Ve=m&&y===1,ue=m&&y===i.days,Ue=J===1,dt=J===a,vt=B===1,ht=B===R;l.push({id:We,label:y.toString(),ariaLabel:w.format(new Date(P,O-1,y)),day:y,dayFromEnd:_,weekday:V,weekdayPosition:we,weekdayPositionFromEnd:Be,weekdayOrdinal:b,weekdayOrdinalFromEnd:x,week:k,weekFromEnd:T,weeknumber:De,isoWeeknumber:Q,month:O,year:P,dateFromTime:Ae,date:Re,range:be,isToday:Ne,isFirstDay:Ve,isLastDay:ue,inMonth:m,inPrevMonth:h,inNextMonth:g,onTop:Ue,onBottom:dt,onLeft:vt,onRight:ht,classes:["id-".concat(We),"day-".concat(y),"day-from-end-".concat(_),"weekday-".concat(V),"weekday-position-".concat(we),"weekday-ordinal-".concat(b),"weekday-ordinal-from-end-".concat(x),"week-".concat(k),"week-from-end-".concat(T),{"is-today":Ne,"is-first-day":Ve,"is-last-day":ue,"in-month":m,"in-prev-month":h,"in-next-month":g,"on-top":Ue,"on-bottom":dt,"on-left":vt,"on-right":ht}]}),m&&ue?(m=!1,g=!0,y=1,_=s.days,b=1,x=Math.floor((s.days-y)/R+1),k=1,T=s.weeks,O=s.month,P=s.year):(y++,_--,b=Math.floor((y-1)/R+1),x=Math.floor((i.days-y)/R+1))}k++,T--}return l}}]),t}(),gi=function(){function t(e,n,r){var a=e.key,i=e.hashcode,o=e.highlight,s=e.content,l=e.dot,c=e.bar,u=e.popover,f=e.dates,d=e.excludeDates,v=e.excludeMode,h=e.customData,m=e.order,g=e.pinPage;pt(this,t),this.key=Qa(a)?cn():a,this.hashcode=i,this.customData=h,this.order=m||0,this.dateOpts={order:m,locale:r},this.pinPage=g,o&&(this.highlight=n.normalizeHighlight(o)),s&&(this.content=n.normalizeContent(s)),l&&(this.dot=n.normalizeDot(l)),c&&(this.bar=n.normalizeBar(c)),u&&(this.popover=u),this.dates=r.normalizeDates(f,this.dateOpts),this.hasDates=!!de(this.dates),this.excludeDates=r.normalizeDates(d,this.dateOpts),this.hasExcludeDates=!!de(this.excludeDates),this.excludeMode=v||"intersects",this.hasExcludeDates&&!this.hasDates&&(this.dates.push(new Me({},this.dateOpts)),this.hasDates=!0),this.isComplex=Ch(this.dates,function(w){return w.isComplex})}return mt(t,[{key:"intersectsDate",value:function(n){return n=n instanceof Me?n:new Me(n,this.dateOpts),!this.excludesDate(n)&&(this.dates.find(function(r){return r.intersectsDate(n)})||!1)}},{key:"includesDate",value:function(n){return n=n instanceof Me?n:new Me(n,this.dateOpts),!this.excludesDate(n)&&(this.dates.find(function(r){return r.includesDate(n)})||!1)}},{key:"excludesDate",value:function(n){var r=this;return n=n instanceof Me?n:new Me(n,this.dateOpts),this.hasExcludeDates&&this.excludeDates.find(function(a){return r.excludeMode==="intersects"&&a.intersectsDate(n)||r.excludeMode==="includes"&&a.includesDate(n)})}},{key:"intersectsDay",value:function(n){return!this.excludesDay(n)&&(this.dates.find(function(r){return r.intersectsDay(n)})||!1)}},{key:"excludesDay",value:function(n){return this.hasExcludeDates&&this.excludeDates.find(function(r){return r.intersectsDay(n)})}}]),t}(),Gp=300,Zp=60,qp=80,Xp={maxSwipeTime:Gp,minHorizontalSwipeDistance:Zp,maxVerticalSwipeDistance:qp},Jp="MMMM YYYY",Qp="W",em="MMM",tm=["L","YYYY-MM-DD","YYYY/MM/DD"],nm=["L h:mm A","YYYY-MM-DD h:mm A","YYYY/MM/DD h:mm A"],rm=["L HH:mm","YYYY-MM-DD HH:mm","YYYY/MM/DD HH:mm"],am=["h:mm A"],im=["HH:mm"],om="WWW, MMM D, YYYY",sm=["L","YYYY-MM-DD","YYYY/MM/DD"],lm="iso",cm="YYYY-MM-DDTHH:mm:ssXXX",um={title:Jp,weekdays:Qp,navMonths:em,input:tm,inputDateTime:nm,inputDateTime24hr:rm,inputTime:am,inputTime24hr:im,dayPopover:om,data:sm,model:lm,iso:cm},fm="640px",dm="768px",vm="1024px",hm="1280px",yi={sm:fm,md:dm,lg:vm,xl:hm};const pm={componentPrefix:"v",color:"blue",isDark:!1,navVisibility:"click",titlePosition:"center",transition:"slide-h",touch:Xp,masks:um,screens:yi,locales:te,datePicker:{updateOnInput:!0,inputDebounce:1e3,popover:{visibility:"hover-focus",placement:"bottom-start",keepVisibleOnInput:!1,isInteractive:!0}}},pn=Or(pm),mm=Qi(()=>ti(pn.locales,t=>(t.masks=xt(t.masks,pn.masks),t))),Ee=t=>window&&Mt(window.__vcalendar__,t)?nt(window.__vcalendar__,t):nt(pn,t),gm=t=>xt(pn,t);var ym={props:{color:{type:String,default:Ee("color")},isDark:{type:Boolean,default:Ee("isDark")},firstDayOfWeek:Number,masks:Object,locale:[String,Object],timezone:String,minDate:null,maxDate:null,minDateExact:null,maxDateExact:null,disabledDates:null,availableDates:null,theme:null},computed:{$theme:function(){return this.theme instanceof ni?this.theme:new ni({color:this.color,isDark:this.isDark})},$locale:function(){if(this.locale instanceof hn)return this.locale;var e=le(this.locale)?this.locale:{id:this.locale,firstDayOfWeek:this.firstDayOfWeek,masks:this.masks};return new hn(e,{locales:mm.value,timezone:this.timezone})},disabledDates_:function(){var e=this.normalizeDates(this.disabledDates),n=this.minDate,r=this.minDateExact,a=this.maxDate,i=this.maxDateExact;if(r||n){var o=r?this.normalizeDate(r):this.normalizeDate(n,{time:"00:00:00"});e.push({start:null,end:new Date(o.getTime()-1e3)})}if(i||a){var s=i?this.normalizeDate(i):this.normalizeDate(a,{time:"23:59:59"});e.push({start:new Date(s.getTime()+1e3),end:null})}return e},availableDates_:function(){return this.normalizeDates(this.availableDates)},disabledAttribute:function(){return new gi({key:"disabled",dates:this.disabledDates_,excludeDates:this.availableDates_,excludeMode:"includes",order:100},this.$theme,this.$locale)}},methods:{formatDate:function(e,n){return this.$locale?this.$locale.format(e,n):""},parseDate:function(e,n){if(!this.$locale)return null;var r=this.$locale.parse(e,n);return Ie(r)?r:null},normalizeDate:function(e,n){return this.$locale?this.$locale.normalizeDate(e,n):e},normalizeDates:function(e){return this.$locale.normalizeDates(e,{isFullDay:!0})},pageForDate:function(e){return this.$locale.getDateParts(this.normalizeDate(e))},pageForThisMonth:function(){return this.pageForDate(new Date)}}},bm={methods:{safeSlot:function(e,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null;return se(this.$slots[e])?this.$slots[e](n):r}}},mn=cp,bi=ym,fr=bm;function pe(t,e){e===void 0&&(e={});var n=e.insertAt;if(!(!t||typeof document=="undefined")){var r=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",n==="top"&&r.firstChild?r.insertBefore(a,r.firstChild):r.appendChild(a),a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t))}}function dr(t){document&&document.dispatchEvent(new CustomEvent("show-popover",{detail:t}))}function vr(t){document&&document.dispatchEvent(new CustomEvent("hide-popover",{detail:t}))}function wi(t){document&&document.dispatchEvent(new CustomEvent("toggle-popover",{detail:t}))}function wm(t){document&&document.dispatchEvent(new CustomEvent("update-popover",{detail:t}))}function gn(t){var e,n=t.visibility,r=n==="click",a=n==="hover",i=n==="hover-focus",o=n==="focus";t.autoHide=!r;var s=!1,l=!1,c=t.isRenderFn,u={click:c?"onClick":"click",mousemove:c?"onMousemove":"mousemove",mouseleave:c?"onMouseleave":"mouseleave",focusin:c?"onFocusin":"focusin",focusout:c?"onFocusout":"focusout"};return e={},Ge(e,u.click,function(f){r&&(t.ref=f.target,wi(t),f.stopPropagation())}),Ge(e,u.mousemove,function(f){t.ref=f.currentTarget,s||(s=!0,(a||i)&&dr(t))}),Ge(e,u.mouseleave,function(f){t.ref=f.target,s&&(s=!1,(a||i&&!l)&&vr(t))}),Ge(e,u.focusin,function(f){t.ref=f.currentTarget,l||(l=!0,(o||i)&&dr(t))}),Ge(e,u.focusout,function(f){t.ref=f.currentTarget,l&&!Ot(t.ref,f.relatedTarget)&&(l=!1,(o||i&&!s)&&vr(t))}),e}var Dm={name:"CalendarDay",emits:["dayclick","daymouseenter","daymouseleave","dayfocusin","dayfocusout","daykeydown"],mixins:[mn,fr],inheritAttrs:!1,render:function(){var e=this,n=function(){return e.hasBackgrounds&&D("div",{class:"vc-highlights vc-day-layer"},e.backgrounds.map(function(s){var l=s.key,c=s.wrapperClass,u=s.class,f=s.style;return D("div",{key:l,class:c},[D("div",{class:u,style:f})])}))},r=function(){return e.safeSlot("day-content",{day:e.day,attributes:e.day.attributes,attributesMap:e.day.attributesMap,dayProps:e.dayContentProps,dayEvents:e.dayContentEvents})||D("span",p(p(p({},e.dayContentProps),{},{class:e.dayContentClass,style:e.dayContentStyle},e.dayContentEvents),{},{ref:"content"}),[e.day.label])},a=function(){return e.hasDots&&D("div",{class:"vc-day-layer vc-day-box-center-bottom"},[D("div",{class:"vc-dots"},e.dots.map(function(s){var l=s.key,c=s.class,u=s.style;return D("span",{key:l,class:c,style:u})}))])},i=function(){return e.hasBars&&D("div",{class:"vc-day-layer vc-day-box-center-bottom"},[D("div",{class:"vc-bars"},e.bars.map(function(s){var l=s.key,c=s.class,u=s.style;return D("span",{key:l,class:c,style:u})}))])};return D("div",{class:["vc-day"].concat(Vt(this.day.classes),[{"vc-day-box-center-center":!this.$slots["day-content"]},{"is-not-in-month":!this.inMonth}])},[n(),r(),a(),i()])},inject:["sharedState"],props:{day:{type:Object,required:!0}},data:function(){return{glyphs:{},dayContentEvents:{}}},computed:{label:function(){return this.day.label},startTime:function(){return this.day.range.start.getTime()},endTime:function(){return this.day.range.end.getTime()},inMonth:function(){return this.day.inMonth},isDisabled:function(){return this.day.isDisabled},backgrounds:function(){return this.glyphs.backgrounds},hasBackgrounds:function(){return!!de(this.backgrounds)},content:function(){return this.glyphs.content},dots:function(){return this.glyphs.dots},hasDots:function(){return!!de(this.dots)},bars:function(){return this.glyphs.bars},hasBars:function(){return!!de(this.bars)},popovers:function(){return this.glyphs.popovers},hasPopovers:function(){return!!de(this.popovers)},dayContentClass:function(){return["vc-day-content vc-focusable",{"is-disabled":this.isDisabled},nt(_t(this.content),"class")||""]},dayContentStyle:function(){return nt(_t(this.content),"style")},dayContentProps:function(){var e;return this.day.isFocusable?e="0":this.day.inMonth&&(e="-1"),{tabindex:e,"aria-label":this.day.ariaLabel,"aria-disabled":this.day.isDisabled?"true":"false",role:"button"}},dayEvent:function(){return p(p({},this.day),{},{el:this.$refs.content,popovers:this.popovers})}},watch:{theme:function(){this.refresh()},popovers:function(){this.refreshPopovers()},"day.shouldRefresh":function(){this.refresh()}},mounted:function(){this.refreshPopovers(),this.refresh()},methods:{getDayEvent:function(e){return p(p({},this.dayEvent),{},{event:e})},click:function(e){this.$emit("dayclick",this.getDayEvent(e))},mouseenter:function(e){this.$emit("daymouseenter",this.getDayEvent(e))},mouseleave:function(e){this.$emit("daymouseleave",this.getDayEvent(e))},focusin:function(e){this.$emit("dayfocusin",this.getDayEvent(e))},focusout:function(e){this.$emit("dayfocusout",this.getDayEvent(e))},keydown:function(e){this.$emit("daykeydown",this.getDayEvent(e))},refresh:function(){var e=this;if(!!this.day.shouldRefresh){this.day.shouldRefresh=!1;var n={backgrounds:[],dots:[],bars:[],popovers:[],content:[]};this.day.attributes=Object.values(this.day.attributesMap||{}).sort(function(r,a){return r.order-a.order}),this.day.attributes.forEach(function(r){var a=r.targetDate,i=a.isDate,o=a.isComplex,s=a.startTime,l=a.endTime,c=e.startTime<=s,u=e.endTime>=l,f=c&&u,d=c||u,v={isDate:i,isComplex:o,onStart:c,onEnd:u,onStartAndEnd:f,onStartOrEnd:d};e.processHighlight(r,v,n),e.processNonHighlight(r,"content",v,n.content),e.processNonHighlight(r,"dot",v,n.dots),e.processNonHighlight(r,"bar",v,n.bars),e.processPopover(r,n)}),this.glyphs=n}},processHighlight:function(e,n,r){var a=e.key,i=e.highlight,o=n.isDate,s=n.isComplex,l=n.onStart,c=n.onEnd,u=n.onStartAndEnd,f=r.backgrounds,d=r.content;if(!!i){var v=i.base,h=i.start,m=i.end;o||s?(f.push({key:a,wrapperClass:"vc-day-layer vc-day-box-center-center",class:["vc-highlight",h.class],style:h.style}),d.push({key:"".concat(a,"-content"),class:h.contentClass,style:h.contentStyle})):u?(f.push({key:a,wrapperClass:"vc-day-layer vc-day-box-center-center",class:["vc-highlight",h.class],style:h.style}),d.push({key:"".concat(a,"-content"),class:h.contentClass,style:h.contentStyle})):l?(f.push({key:"".concat(a,"-base"),wrapperClass:"vc-day-layer vc-day-box-right-center",class:["vc-highlight vc-highlight-base-start",v.class],style:v.style}),f.push({key:a,wrapperClass:"vc-day-layer vc-day-box-center-center",class:["vc-highlight",h.class],style:h.style}),d.push({key:"".concat(a,"-content"),class:h.contentClass,style:h.contentStyle})):c?(f.push({key:"".concat(a,"-base"),wrapperClass:"vc-day-layer vc-day-box-left-center",class:["vc-highlight vc-highlight-base-end",v.class],style:v.style}),f.push({key:a,wrapperClass:"vc-day-layer vc-day-box-center-center",class:["vc-highlight",m.class],style:m.style}),d.push({key:"".concat(a,"-content"),class:m.contentClass,style:m.contentStyle})):(f.push({key:"".concat(a,"-middle"),wrapperClass:"vc-day-layer vc-day-box-center-center",class:["vc-highlight vc-highlight-base-middle",v.class],style:v.style}),d.push({key:"".concat(a,"-content"),class:v.contentClass,style:v.contentStyle}))}},processNonHighlight:function(e,n,r,a){var i=r.isDate,o=r.onStart,s=r.onEnd;if(!!e[n]){var l=e.key,c="vc-".concat(n),u=e[n],f=u.base,d=u.start,v=u.end;i||o?a.push({key:l,class:[c,d.class],style:d.style}):s?a.push({key:l,class:[c,v.class],style:v.style}):a.push({key:l,class:[c,f.class],style:f.style})}},processPopover:function(e,n){var r=n.popovers,a=e.key,i=e.customData,o=e.popover;if(!!o){var s=kt({key:a,customData:i,attribute:e},p({},o),{visibility:o.label?"hover":"click",placement:"bottom",isInteractive:!o.label});r.splice(0,0,s)}},refreshPopovers:function(){var e={};de(this.popovers)&&(e=gn(kt.apply(void 0,[{id:this.dayPopoverId,data:this.day,isRenderFn:!0}].concat(Vt(this.popovers))))),this.dayContentEvents=Sh({onClick:this.click,onMouseenter:this.mouseenter,onMouseleave:this.mouseleave,onFocusin:this.focusin,onFocusout:this.focusout,onKeydown:this.keydown},e),wm({id:this.dayPopoverId,data:this.day})}}},km=`.vc-day {
  position: relative;
  min-height: 32px;
  z-index: 1;
}
.vc-day.is-not-in-month * {
    opacity: 0;
    pointer-events: none;
}
.vc-day-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}
.vc-day-box-center-center {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
}
.vc-day-box-left-center {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-transform-origin: 0% 50%;
          transform-origin: 0% 50%;
}
.vc-day-box-right-center {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-transform-origin: 100% 50%;
          transform-origin: 100% 50%;
}
.vc-day-box-center-bottom {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: flex-end;
      -ms-flex-align: end;
          align-items: flex-end;
}
.vc-day-content {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: var(--rounded-full);
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
  cursor: pointer;
}
.vc-day-content:hover {
    background-color: hsla(211, 25%, 84%, 0.3);
}
.vc-day-content:focus {
    font-weight: var(--font-bold);
    background-color: hsla(211, 25%, 84%, 0.4);
}
.vc-day-content.is-disabled {
    color: var(--gray-400);
}
.vc-is-dark .vc-day-content:hover {
      background-color: hsla(216, 15%, 52%, 0.3);
}
.vc-is-dark .vc-day-content:focus {
      background-color: hsla(216, 15%, 52%, 0.4);
}
.vc-is-dark .vc-day-content.is-disabled {
      color: var(--gray-600);
}
.vc-highlights {
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}
.vc-highlight {
  width: 28px;
  height: 28px;
}
.vc-highlight.vc-highlight-base-start {
    width: 50% !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
}
.vc-highlight.vc-highlight-base-end {
    width: 50% !important;
    border-radius: 0 !important;
    border-left-width: 0 !important;
}
.vc-highlight.vc-highlight-base-middle {
    width: 100%;
    border-radius: 0 !important;
    border-left-width: 0 !important;
    border-right-width: 0 !important;
    margin: 0 -1px;
}
.vc-dots {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}
.vc-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  transition: all var(--day-content-transition-time);
}
.vc-dot:not(:last-child) {
    margin-right: 3px;
}
.vc-bars {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  width: 75%;
}
.vc-bar {
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
  height: 3px;
  transition: all var(--day-content-transition-time);
}
`;pe(km);var xm="[object Boolean]";function _m(t){return t===!0||t===!1||W(t)&&oe(t)==xm}var Mm=_m,Pm={name:"CalendarPane",emits:["update:page","weeknumberclick"],mixins:[mn,fr],inheritAttrs:!1,render:function(){var e=this,n=this.safeSlot("header",this.page)||D("div",{class:"vc-header align-".concat(this.titlePosition)},[D("div",p({class:"vc-title"},this.navPopoverEvents),[this.safeSlot("header-title",this.page,this.page.title)])]),r=this.weekdayLabels.map(function(u,f){return D("div",{key:f+1,class:"vc-weekday"},[u])}),a=this.showWeeknumbers_.startsWith("left"),i=this.showWeeknumbers_.startsWith("right");a?r.unshift(D("div",{class:"vc-weekday"})):i&&r.push(D("div",{class:"vc-weekday"}));var o=function(f){return D("div",{class:["vc-weeknumber"]},[D("span",{class:["vc-weeknumber-content","is-".concat(e.showWeeknumbers_)],onClick:function(v){e.$emit("weeknumberclick",{weeknumber:f,days:e.page.days.filter(function(h){return h[e.weeknumberKey]===f}),event:v})}},[f])])},s=[],l=this.locale.daysInWeek;this.page.days.forEach(function(u,f){var d=f%l;(a&&d===0||i&&d===l)&&s.push(o(u[e.weeknumberKey])),s.push(D(Dm,p(p({},e.$attrs),{},{day:u}),e.$slots)),i&&d===l-1&&s.push(o(u[e.weeknumberKey]))});var c=D("div",{class:{"vc-weeks":!0,"vc-show-weeknumbers":this.showWeeknumbers_,"is-left":a,"is-right":i}},[r,s]);return D("div",{class:["vc-pane","row-from-end-".concat(this.rowFromEnd),"column-from-end-".concat(this.columnFromEnd)],ref:"pane"},[n,c])},props:{page:Object,position:Number,row:Number,rowFromEnd:Number,column:Number,columnFromEnd:Number,titlePosition:String,navVisibility:{type:String,default:Ee("navVisibility")},showWeeknumbers:[Boolean,String],showIsoWeeknumbers:[Boolean,String]},computed:{weeknumberKey:function(){return this.showWeeknumbers?"weeknumber":"isoWeeknumber"},showWeeknumbers_:function(){var e=this.showWeeknumbers||this.showIsoWeeknumbers;return e==null?"":Mm(e)?e?"left":"":e.startsWith("right")?this.columnFromEnd>1?"right":e:this.column>1?"left":e},navPlacement:function(){switch(this.titlePosition){case"left":return"bottom-start";case"right":return"bottom-end";default:return"bottom"}},navPopoverEvents:function(){var e=this.sharedState,n=this.navVisibility,r=this.navPlacement,a=this.page,i=this.position;return gn({id:e.navPopoverId,visibility:n,placement:r,modifiers:[{name:"flip",options:{fallbackPlacements:["bottom"]}}],data:{page:a,position:i},isInteractive:!0,isRenderFn:!0})},weekdayLabels:function(){var e=this;return this.locale.getWeekdayDates().map(function(n){return e.format(n,e.masks.weekdays)})}}},Tm=`.vc-pane {
  min-width: 250px;
}
.vc-header {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  padding: 10px 16px 0px 16px;
}
.vc-header.align-left {
    -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
            justify-content: flex-start;
}
.vc-header.align-right {
    -webkit-justify-content: flex-end;
        -ms-flex-pack: end;
            justify-content: flex-end;
}
.vc-title {
  font-size: var(--text-lg);
  color: var(--gray-800);
  font-weight: var(--font-semibold);
  line-height: 28px;
  cursor: pointer;
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
  white-space: nowrap;
}
.vc-title:hover {
    opacity: 0.75;
}
.vc-weeknumber {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  position: relative;
}
.vc-weeknumber-content {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  font-style: italic;
  width: 28px;
  height: 28px;
  margin-top: 2px;
  color: var(--gray-500);
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.vc-weeknumber-content.is-left-outside {
    position: absolute;
    left: var(--weeknumber-offset);
}
.vc-weeknumber-content.is-right-outside {
    position: absolute;
    right: var(--weeknumber-offset);
}
.vc-weeks {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  position: relative;
  /* overflow: auto; */
  -webkit-overflow-scrolling: touch;
  padding: 6px;
  min-width: 250px;
}
.vc-weeks.vc-show-weeknumbers {
    grid-template-columns: auto repeat(7, 1fr);
}
.vc-weeks.vc-show-weeknumbers.is-right {
      grid-template-columns: repeat(7, 1fr) auto;
}
.vc-weekday {
  text-align: center;
  color: var(--gray-500);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  line-height: 14px;
  padding-top: 4px;
  padding-bottom: 8px;
  cursor: default;
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.vc-weekdays {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.vc-nav-popover-container {
  color: var(--white);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  background-color: var(--gray-800);
  border: 1px solid;
  border-color: var(--gray-700);
  border-radius: var(--rounded-lg);
  padding: 4px;
  box-shadow: var(--shadow);
}
.vc-is-dark .vc-header {
    color: var(--gray-200);
}
.vc-is-dark .vc-title {
    color: var(--gray-100);
}
.vc-is-dark .vc-weekday {
    color: var(--accent-200);
}
.vc-is-dark .vc-nav-popover-container {
    color: var(--gray-800);
    background-color: var(--white);
    border-color: var(--gray-100);
}
`;pe(Tm);var yn="26px",Om="0 0 32 32",Im={"left-arrow":{viewBox:"0 -1 16 34",path:"M11.196 10c0 0.143-0.071 0.304-0.179 0.411l-7.018 7.018 7.018 7.018c0.107 0.107 0.179 0.268 0.179 0.411s-0.071 0.304-0.179 0.411l-0.893 0.893c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-8.321-8.321c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l8.321-8.321c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l0.893 0.893c0.107 0.107 0.179 0.25 0.179 0.411z"},"right-arrow":{viewBox:"-5 -1 16 34",path:"M10.625 17.429c0 0.143-0.071 0.304-0.179 0.411l-8.321 8.321c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-0.893-0.893c-0.107-0.107-0.179-0.25-0.179-0.411 0-0.143 0.071-0.304 0.179-0.411l7.018-7.018-7.018-7.018c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l0.893-0.893c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l8.321 8.321c0.107 0.107 0.179 0.268 0.179 0.411z"}},hr={props:["name"],data:function(){return{width:yn,height:yn,viewBox:Om,path:"",isBaseline:!1}},mounted:function(){this.updateIcon()},watch:{name:function(){this.updateIcon()}},methods:{updateIcon:function(){var e=Im[this.name];e&&(this.width=e.width||yn,this.height=e.height||yn,this.viewBox=e.viewBox,this.path=e.path)}}};function Ym(t,e,n,r,a,i){return U(),K("svg",{class:"vc-svg-icon",width:a.width,height:a.height,viewBox:a.viewBox},[I("path",{d:a.path},null,8,["d"])],8,["width","height","viewBox"])}var Em=`.vc-svg-icon {
  display: inline-block;
  stroke: currentColor;
  stroke-width: 0;
}
.vc-svg-icon path {
    fill: currentColor;
}
`;pe(Em);hr.render=Ym;function Cm(t){return t&&t.length?t[0]:void 0}var Di=Cm,pr=12,ki={name:"CalendarNav",emits:["input"],components:{SvgIcon:hr},mixins:[mn],props:{value:{type:Object,default:function(){return{month:0,year:0}}},validator:{type:Function,default:function(){return function(){return!0}}}},data:function(){return{monthMode:!0,yearIndex:0,yearGroupIndex:0,onSpaceOrEnter:Ja}},computed:{month:function(){return this.value&&this.value.month||0},year:function(){return this.value&&this.value.year||0},title:function(){return this.monthMode?this.yearIndex:"".concat(this.firstYear," - ").concat(this.lastYear)},monthItems:function(){return this.getMonthItems(this.yearIndex)},yearItems:function(){return this.getYearItems(this.yearGroupIndex)},prevItemsEnabled:function(){return this.monthMode?this.prevMonthItemsEnabled:this.prevYearItemsEnabled},nextItemsEnabled:function(){return this.monthMode?this.nextMonthItemsEnabled:this.nextYearItemsEnabled},prevMonthItemsEnabled:function(){return this.getMonthItems(this.yearIndex-1).some(function(e){return!e.isDisabled})},nextMonthItemsEnabled:function(){return this.getMonthItems(this.yearIndex+1).some(function(e){return!e.isDisabled})},prevYearItemsEnabled:function(){return this.getYearItems(this.yearGroupIndex-1).some(function(e){return!e.isDisabled})},nextYearItemsEnabled:function(){return this.getYearItems(this.yearGroupIndex+1).some(function(e){return!e.isDisabled})},activeItems:function(){return this.monthMode?this.monthItems:this.yearItems},firstYear:function(){return Di(this.yearItems.map(function(e){return e.year}))},lastYear:function(){return _t(this.yearItems.map(function(e){return e.year}))}},watch:{year:function(){this.yearIndex=this.year},yearIndex:function(e){this.yearGroupIndex=this.getYearGroupIndex(e)},value:function(){this.focusFirstItem()}},created:function(){this.yearIndex=this.year},mounted:function(){this.focusFirstItem()},methods:{focusFirstItem:function(){var e=this;this.$nextTick(function(){var n=e.$refs.navContainer.querySelector(".vc-nav-item:not(.is-disabled)");n&&n.focus()})},getItemClasses:function(e){var n=e.isActive,r=e.isCurrent,a=e.isDisabled,i=["vc-nav-item"];return n?i.push("is-active"):r&&i.push("is-current"),a&&i.push("is-disabled"),i},getYearGroupIndex:function(e){return Math.floor(e/pr)},getMonthItems:function(e){var n=this,r=this.pageForDate(new Date),a=r.month,i=r.year;return this.locale.getMonthDates().map(function(o,s){var l=s+1;return{month:l,year:e,id:"".concat(e,".").concat(M(l,2)),label:n.locale.format(o,n.masks.navMonths),ariaLabel:n.locale.format(o,"MMMM YYYY"),isActive:l===n.month&&e===n.year,isCurrent:l===a&&e===i,isDisabled:!n.validator({month:l,year:e}),click:function(){return n.monthClick(l,e)}}})},getYearItems:function(e){var n=this,r=this.pageForDate(new Date);r._;for(var a=r.year,i=e*pr,o=i+pr,s=[],l=function(f){for(var d=!1,v=1;v<12&&(d=n.validator({month:v,year:f}),!d);v++);s.push({year:f,id:f,label:f,ariaLabel:f,isActive:f===n.year,isCurrent:f===a,isDisabled:!d,click:function(){return n.yearClick(f)}})},c=i;c<o;c+=1)l(c);return s},monthClick:function(e,n){this.validator({month:e,year:n})&&this.$emit("input",{month:e,year:n})},yearClick:function(e){this.yearIndex=e,this.monthMode=!0,this.focusFirstItem()},toggleMode:function(){this.monthMode=!this.monthMode},movePrev:function(){!this.prevItemsEnabled||(this.monthMode&&this.movePrevYear(),this.movePrevYearGroup())},moveNext:function(){!this.nextItemsEnabled||(this.monthMode&&this.moveNextYear(),this.moveNextYearGroup())},movePrevYear:function(){this.yearIndex--},moveNextYear:function(){this.yearIndex++},movePrevYearGroup:function(){this.yearGroupIndex--},moveNextYearGroup:function(){this.yearGroupIndex++}}},Sm={class:"vc-nav-container",ref:"navContainer"},$m={class:"vc-nav-header"},Am={class:"vc-nav-items"};function Nm(t,e,n,r,a,i){var o=Ir("svg-icon");return U(),K("div",Sm,[I("div",$m,[I("span",{role:"button",class:["vc-nav-arrow is-left",{"is-disabled":!i.prevItemsEnabled}],tabindex:i.prevItemsEnabled?0:void 0,onClick:e[1]||(e[1]=function(){return i.movePrev.apply(i,arguments)}),onKeydown:e[2]||(e[2]=function(s){return a.onSpaceOrEnter(s,i.movePrev)})},[Wt(t.$slots,"nav-left-button",{},function(){return[I(o,{name:"left-arrow",width:"20px",height:"24px"})]})],42,["tabindex"]),I("span",{role:"button",class:["vc-nav-title vc-grid-focus",{"is-disabled":!i.nextItemsEnabled}],style:{whiteSpace:"nowrap"},tabindex:i.nextItemsEnabled?0:void 0,onClick:e[3]||(e[3]=function(){return i.toggleMode.apply(i,arguments)}),onKeydown:e[4]||(e[4]=function(s){return a.onSpaceOrEnter(s,i.toggleMode)})},Te(i.title),43,["tabindex"]),I("span",{role:"button",class:"vc-nav-arrow is-right",tabindex:"0",onClick:e[5]||(e[5]=function(){return i.moveNext.apply(i,arguments)}),onKeydown:e[6]||(e[6]=function(s){return a.onSpaceOrEnter(s,i.moveNext)})},[Wt(t.$slots,"nav-right-button",{},function(){return[I(o,{name:"right-arrow",width:"20px",height:"24px"})]})],32)]),I("div",Am,[(U(!0),K(Yr,null,Er(i.activeItems,function(s){return U(),K("span",{key:s.label,role:"button","data-id":s.id,"aria-label":s.ariaLabel,class:i.getItemClasses(s),tabindex:s.isDisabled?void 0:0,onClick:s.click,onKeydown:function(c){return a.onSpaceOrEnter(c,s.click)}},Te(s.label),43,["data-id","aria-label","tabindex","onClick","onKeydown"])}),128))])],512)}var Fm=`.vc-nav-header {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.vc-nav-arrow {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
  line-height: var(--leading-snug);
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: var(--rounded);
}
.vc-nav-arrow.is-left {
    margin-right: auto;
}
.vc-nav-arrow.is-right {
    margin-left: auto;
}
.vc-nav-arrow.is-disabled {
    opacity: 0.25;
    pointer-events: none;
    cursor: not-allowed;
}
.vc-nav-arrow:hover {
    background-color: var(--gray-900);
}
.vc-nav-arrow:focus {
    border-color: var(--accent-600);
}
.vc-nav-title {
  color: var(--accent-100);
  font-weight: var(--font-bold);
  line-height: var(--leading-snug);
  padding: 4px 8px;
  border-radius: var(--rounded);
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.vc-nav-title:hover {
    background-color: var(--gray-900);
}
.vc-nav-title:focus {
    border-color: var(--accent-600);
}
.vc-nav-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 2px;
  grid-column-gap: 5px;
}
.vc-nav-item {
  width: 48px;
  text-align: center;
  line-height: var(--leading-snug);
  font-weight: var(--font-semibold);
  padding: 4px 0;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: var(--rounded);
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.vc-nav-item:hover {
    color: var(--white);
    background-color: var(--gray-900);
    box-shadow: var(--shadow-inner);
}
.vc-nav-item.is-active {
    color: var(--accent-900);
    background: var(--accent-100);
    font-weight: var(--font-bold);
    box-shadow: var(--shadow);
}
.vc-nav-item.is-current {
    color: var(--accent-100);
    font-weight: var(--bold);
    border-color: var(--accent-100);
}
.vc-nav-item:focus {
    border-color: var(--accent-600);
}
.vc-nav-item.is-disabled {
    opacity: 0.25;
    pointer-events: none;
}
.vc-is-dark .vc-nav-title {
    color: var(--gray-900);
}
.vc-is-dark .vc-nav-title:hover {
      background-color: var(--gray-200);
}
.vc-is-dark .vc-nav-title:focus {
      border-color: var(--accent-400);
}
.vc-is-dark .vc-nav-arrow:hover {
      background-color: var(--gray-200);
}
.vc-is-dark .vc-nav-arrow:focus {
      border-color: var(--accent-400);
}
.vc-is-dark .vc-nav-item:hover {
      color: var(--gray-900);
      background-color: var(--gray-200);
      box-shadow: none;
}
.vc-is-dark .vc-nav-item.is-active {
      color: var(--white);
      background: var(--accent-500);
}
.vc-is-dark .vc-nav-item.is-current {
      color: var(--accent-600);
      border-color: var(--accent-500);
}
.vc-is-dark .vc-nav-item:focus {
      border-color: var(--accent-400);
}
`;pe(Fm);ki.render=Nm;var q="top",ne="bottom",re="right",X="left",mr="auto",Ct=[q,ne,re,X],ct="start",St="end",jm="clippingParents",xi="viewport",$t="popper",Lm="reference",_i=Ct.reduce(function(t,e){return t.concat([e+"-"+ct,e+"-"+St])},[]),Mi=[].concat(Ct,[mr]).reduce(function(t,e){return t.concat([e,e+"-"+ct,e+"-"+St])},[]),zm="beforeRead",Hm="read",Rm="afterRead",Wm="beforeMain",Bm="main",Vm="afterMain",Um="beforeWrite",Km="write",Gm="afterWrite",Zm=[zm,Hm,Rm,Wm,Bm,Vm,Um,Km,Gm];function me(t){return t?(t.nodeName||"").toLowerCase():null}function ce(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function At(t){var e=ce(t).Element;return t instanceof e||t instanceof Element}function ae(t){var e=ce(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function Pi(t){if(typeof ShadowRoot=="undefined")return!1;var e=ce(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function qm(t){var e=t.state;Object.keys(e.elements).forEach(function(n){var r=e.styles[n]||{},a=e.attributes[n]||{},i=e.elements[n];!ae(i)||!me(i)||(Object.assign(i.style,r),Object.keys(a).forEach(function(o){var s=a[o];s===!1?i.removeAttribute(o):i.setAttribute(o,s===!0?"":s)}))})}function Xm(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,n.popper),e.styles=n,e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow),function(){Object.keys(e.elements).forEach(function(r){var a=e.elements[r],i=e.attributes[r]||{},o=Object.keys(e.styles.hasOwnProperty(r)?e.styles[r]:n[r]),s=o.reduce(function(l,c){return l[c]="",l},{});!ae(a)||!me(a)||(Object.assign(a.style,s),Object.keys(i).forEach(function(l){a.removeAttribute(l)}))})}}var Jm={name:"applyStyles",enabled:!0,phase:"write",fn:qm,effect:Xm,requires:["computeStyles"]};function ge(t){return t.split("-")[0]}function ut(t,e){var n=t.getBoundingClientRect(),r=1,a=1;return{width:n.width/r,height:n.height/a,top:n.top/a,right:n.right/r,bottom:n.bottom/a,left:n.left/r,x:n.left/r,y:n.top/a}}function gr(t){var e=ut(t),n=t.offsetWidth,r=t.offsetHeight;return Math.abs(e.width-n)<=1&&(n=e.width),Math.abs(e.height-r)<=1&&(r=e.height),{x:t.offsetLeft,y:t.offsetTop,width:n,height:r}}function Ti(t,e){var n=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(n&&Pi(n)){var r=e;do{if(r&&t.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Pe(t){return ce(t).getComputedStyle(t)}function Qm(t){return["table","td","th"].indexOf(me(t))>=0}function Ce(t){return((At(t)?t.ownerDocument:t.document)||window.document).documentElement}function bn(t){return me(t)==="html"?t:t.assignedSlot||t.parentNode||(Pi(t)?t.host:null)||Ce(t)}function Oi(t){return!ae(t)||Pe(t).position==="fixed"?null:t.offsetParent}function eg(t){var e=navigator.userAgent.toLowerCase().indexOf("firefox")!==-1,n=navigator.userAgent.indexOf("Trident")!==-1;if(n&&ae(t)){var r=Pe(t);if(r.position==="fixed")return null}for(var a=bn(t);ae(a)&&["html","body"].indexOf(me(a))<0;){var i=Pe(a);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||e&&i.willChange==="filter"||e&&i.filter&&i.filter!=="none")return a;a=a.parentNode}return null}function Nt(t){for(var e=ce(t),n=Oi(t);n&&Qm(n)&&Pe(n).position==="static";)n=Oi(n);return n&&(me(n)==="html"||me(n)==="body"&&Pe(n).position==="static")?e:n||eg(t)||e}function yr(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}var Se=Math.max,Ft=Math.min,wn=Math.round;function Dn(t,e,n){return Se(t,Ft(e,n))}function Ii(){return{top:0,right:0,bottom:0,left:0}}function Yi(t){return Object.assign({},Ii(),t)}function Ei(t,e){return e.reduce(function(n,r){return n[r]=t,n},{})}var tg=function(e,n){return e=typeof e=="function"?e(Object.assign({},n.rects,{placement:n.placement})):e,Yi(typeof e!="number"?e:Ei(e,Ct))};function ng(t){var e,n=t.state,r=t.name,a=t.options,i=n.elements.arrow,o=n.modifiersData.popperOffsets,s=ge(n.placement),l=yr(s),c=[X,re].indexOf(s)>=0,u=c?"height":"width";if(!(!i||!o)){var f=tg(a.padding,n),d=gr(i),v=l==="y"?q:X,h=l==="y"?ne:re,m=n.rects.reference[u]+n.rects.reference[l]-o[l]-n.rects.popper[u],g=o[l]-n.rects.reference[l],w=Nt(i),y=w?l==="y"?w.clientHeight||0:w.clientWidth||0:0,_=m/2-g/2,b=f[v],x=y-d[u]-f[h],k=y/2-d[u]/2+_,T=Dn(b,k,x),O=l;n.modifiersData[r]=(e={},e[O]=T,e.centerOffset=T-k,e)}}function rg(t){var e=t.state,n=t.options,r=n.element,a=r===void 0?"[data-popper-arrow]":r;a!=null&&(typeof a=="string"&&(a=e.elements.popper.querySelector(a),!a)||!Ti(e.elements.popper,a)||(e.elements.arrow=a))}var ag={name:"arrow",enabled:!0,phase:"main",fn:ng,effect:rg,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ft(t){return t.split("-")[1]}var ig={top:"auto",right:"auto",bottom:"auto",left:"auto"};function og(t){var e=t.x,n=t.y,r=window,a=r.devicePixelRatio||1;return{x:wn(wn(e*a)/a)||0,y:wn(wn(n*a)/a)||0}}function Ci(t){var e,n=t.popper,r=t.popperRect,a=t.placement,i=t.variation,o=t.offsets,s=t.position,l=t.gpuAcceleration,c=t.adaptive,u=t.roundOffsets,f=u===!0?og(o):typeof u=="function"?u(o):o,d=f.x,v=d===void 0?0:d,h=f.y,m=h===void 0?0:h,g=o.hasOwnProperty("x"),w=o.hasOwnProperty("y"),y=X,_=q,b=window;if(c){var x=Nt(n),k="clientHeight",T="clientWidth";x===ce(n)&&(x=Ce(n),Pe(x).position!=="static"&&s==="absolute"&&(k="scrollHeight",T="scrollWidth")),x=x,(a===q||(a===X||a===re)&&i===St)&&(_=ne,m-=x[k]-r.height,m*=l?1:-1),(a===X||(a===q||a===ne)&&i===St)&&(y=re,v-=x[T]-r.width,v*=l?1:-1)}var O=Object.assign({position:s},c&&ig);if(l){var P;return Object.assign({},O,(P={},P[_]=w?"0":"",P[y]=g?"0":"",P.transform=(b.devicePixelRatio||1)<=1?"translate("+v+"px, "+m+"px)":"translate3d("+v+"px, "+m+"px, 0)",P))}return Object.assign({},O,(e={},e[_]=w?m+"px":"",e[y]=g?v+"px":"",e.transform="",e))}function sg(t){var e=t.state,n=t.options,r=n.gpuAcceleration,a=r===void 0?!0:r,i=n.adaptive,o=i===void 0?!0:i,s=n.roundOffsets,l=s===void 0?!0:s,c={placement:ge(e.placement),variation:ft(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:a};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,Ci(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:o,roundOffsets:l})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,Ci(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}var lg={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:sg,data:{}},kn={passive:!0};function cg(t){var e=t.state,n=t.instance,r=t.options,a=r.scroll,i=a===void 0?!0:a,o=r.resize,s=o===void 0?!0:o,l=ce(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return i&&c.forEach(function(u){u.addEventListener("scroll",n.update,kn)}),s&&l.addEventListener("resize",n.update,kn),function(){i&&c.forEach(function(u){u.removeEventListener("scroll",n.update,kn)}),s&&l.removeEventListener("resize",n.update,kn)}}var ug={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:cg,data:{}},fg={left:"right",right:"left",bottom:"top",top:"bottom"};function xn(t){return t.replace(/left|right|bottom|top/g,function(e){return fg[e]})}var dg={start:"end",end:"start"};function Si(t){return t.replace(/start|end/g,function(e){return dg[e]})}function br(t){var e=ce(t),n=e.pageXOffset,r=e.pageYOffset;return{scrollLeft:n,scrollTop:r}}function wr(t){return ut(Ce(t)).left+br(t).scrollLeft}function vg(t){var e=ce(t),n=Ce(t),r=e.visualViewport,a=n.clientWidth,i=n.clientHeight,o=0,s=0;return r&&(a=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(o=r.offsetLeft,s=r.offsetTop)),{width:a,height:i,x:o+wr(t),y:s}}function hg(t){var e,n=Ce(t),r=br(t),a=(e=t.ownerDocument)==null?void 0:e.body,i=Se(n.scrollWidth,n.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),o=Se(n.scrollHeight,n.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),s=-r.scrollLeft+wr(t),l=-r.scrollTop;return Pe(a||n).direction==="rtl"&&(s+=Se(n.clientWidth,a?a.clientWidth:0)-i),{width:i,height:o,x:s,y:l}}function Dr(t){var e=Pe(t),n=e.overflow,r=e.overflowX,a=e.overflowY;return/auto|scroll|overlay|hidden/.test(n+a+r)}function $i(t){return["html","body","#document"].indexOf(me(t))>=0?t.ownerDocument.body:ae(t)&&Dr(t)?t:$i(bn(t))}function jt(t,e){var n;e===void 0&&(e=[]);var r=$i(t),a=r===((n=t.ownerDocument)==null?void 0:n.body),i=ce(r),o=a?[i].concat(i.visualViewport||[],Dr(r)?r:[]):r,s=e.concat(o);return a?s:s.concat(jt(bn(o)))}function kr(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function pg(t){var e=ut(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}function Ai(t,e){return e===xi?kr(vg(t)):ae(e)?pg(e):kr(hg(Ce(t)))}function mg(t){var e=jt(bn(t)),n=["absolute","fixed"].indexOf(Pe(t).position)>=0,r=n&&ae(t)?Nt(t):t;return At(r)?e.filter(function(a){return At(a)&&Ti(a,r)&&me(a)!=="body"}):[]}function gg(t,e,n){var r=e==="clippingParents"?mg(t):[].concat(e),a=[].concat(r,[n]),i=a[0],o=a.reduce(function(s,l){var c=Ai(t,l);return s.top=Se(c.top,s.top),s.right=Ft(c.right,s.right),s.bottom=Ft(c.bottom,s.bottom),s.left=Se(c.left,s.left),s},Ai(t,i));return o.width=o.right-o.left,o.height=o.bottom-o.top,o.x=o.left,o.y=o.top,o}function Ni(t){var e=t.reference,n=t.element,r=t.placement,a=r?ge(r):null,i=r?ft(r):null,o=e.x+e.width/2-n.width/2,s=e.y+e.height/2-n.height/2,l;switch(a){case q:l={x:o,y:e.y-n.height};break;case ne:l={x:o,y:e.y+e.height};break;case re:l={x:e.x+e.width,y:s};break;case X:l={x:e.x-n.width,y:s};break;default:l={x:e.x,y:e.y}}var c=a?yr(a):null;if(c!=null){var u=c==="y"?"height":"width";switch(i){case ct:l[c]=l[c]-(e[u]/2-n[u]/2);break;case St:l[c]=l[c]+(e[u]/2-n[u]/2);break}}return l}function Lt(t,e){e===void 0&&(e={});var n=e,r=n.placement,a=r===void 0?t.placement:r,i=n.boundary,o=i===void 0?jm:i,s=n.rootBoundary,l=s===void 0?xi:s,c=n.elementContext,u=c===void 0?$t:c,f=n.altBoundary,d=f===void 0?!1:f,v=n.padding,h=v===void 0?0:v,m=Yi(typeof h!="number"?h:Ei(h,Ct)),g=u===$t?Lm:$t,w=t.rects.popper,y=t.elements[d?g:u],_=gg(At(y)?y:y.contextElement||Ce(t.elements.popper),o,l),b=ut(t.elements.reference),x=Ni({reference:b,element:w,strategy:"absolute",placement:a}),k=kr(Object.assign({},w,x)),T=u===$t?k:b,O={top:_.top-T.top+m.top,bottom:T.bottom-_.bottom+m.bottom,left:_.left-T.left+m.left,right:T.right-_.right+m.right},P=t.modifiersData.offset;if(u===$t&&P){var S=P[a];Object.keys(O).forEach(function(F){var ye=[re,ne].indexOf(F)>=0?1:-1,j=[q,ne].indexOf(F)>=0?"y":"x";O[F]+=S[j]*ye})}return O}function yg(t,e){e===void 0&&(e={});var n=e,r=n.placement,a=n.boundary,i=n.rootBoundary,o=n.padding,s=n.flipVariations,l=n.allowedAutoPlacements,c=l===void 0?Mi:l,u=ft(r),f=u?s?_i:_i.filter(function(h){return ft(h)===u}):Ct,d=f.filter(function(h){return c.indexOf(h)>=0});d.length===0&&(d=f);var v=d.reduce(function(h,m){return h[m]=Lt(t,{placement:m,boundary:a,rootBoundary:i,padding:o})[ge(m)],h},{});return Object.keys(v).sort(function(h,m){return v[h]-v[m]})}function bg(t){if(ge(t)===mr)return[];var e=xn(t);return[Si(t),e,Si(e)]}function wg(t){var e=t.state,n=t.options,r=t.name;if(!e.modifiersData[r]._skip){for(var a=n.mainAxis,i=a===void 0?!0:a,o=n.altAxis,s=o===void 0?!0:o,l=n.fallbackPlacements,c=n.padding,u=n.boundary,f=n.rootBoundary,d=n.altBoundary,v=n.flipVariations,h=v===void 0?!0:v,m=n.allowedAutoPlacements,g=e.options.placement,w=ge(g),y=w===g,_=l||(y||!h?[xn(g)]:bg(g)),b=[g].concat(_).reduce(function(De,Q){return De.concat(ge(Q)===mr?yg(e,{placement:Q,boundary:u,rootBoundary:f,padding:c,flipVariations:h,allowedAutoPlacements:m}):Q)},[]),x=e.rects.reference,k=e.rects.popper,T=new Map,O=!0,P=b[0],S=0;S<b.length;S++){var F=b[S],ye=ge(F),j=ft(F)===ct,$e=[q,ne].indexOf(ye)>=0,J=$e?"width":"height",B=Lt(e,{placement:F,boundary:u,rootBoundary:f,altBoundary:d,padding:c}),V=$e?j?re:X:j?ne:q;x[J]>k[J]&&(V=xn(V));var Ae=xn(V),be=[];if(i&&be.push(B[ye]<=0),s&&be.push(B[V]<=0,B[Ae]<=0),be.every(function(De){return De})){P=F,O=!1;break}T.set(F,be)}if(O)for(var Re=h?3:1,We=function(Q){var Ne=b.find(function(Ve){var ue=T.get(Ve);if(ue)return ue.slice(0,Q).every(function(Ue){return Ue})});if(Ne)return P=Ne,"break"},we=Re;we>0;we--){var Be=We(we);if(Be==="break")break}e.placement!==P&&(e.modifiersData[r]._skip=!0,e.placement=P,e.reset=!0)}}var Dg={name:"flip",enabled:!0,phase:"main",fn:wg,requiresIfExists:["offset"],data:{_skip:!1}};function Fi(t,e,n){return n===void 0&&(n={x:0,y:0}),{top:t.top-e.height-n.y,right:t.right-e.width+n.x,bottom:t.bottom-e.height+n.y,left:t.left-e.width-n.x}}function ji(t){return[q,re,ne,X].some(function(e){return t[e]>=0})}function kg(t){var e=t.state,n=t.name,r=e.rects.reference,a=e.rects.popper,i=e.modifiersData.preventOverflow,o=Lt(e,{elementContext:"reference"}),s=Lt(e,{altBoundary:!0}),l=Fi(o,r),c=Fi(s,a,i),u=ji(l),f=ji(c);e.modifiersData[n]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:f},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}var xg={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:kg};function _g(t,e,n){var r=ge(t),a=[X,q].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},e,{placement:t})):n,o=i[0],s=i[1];return o=o||0,s=(s||0)*a,[X,re].indexOf(r)>=0?{x:s,y:o}:{x:o,y:s}}function Mg(t){var e=t.state,n=t.options,r=t.name,a=n.offset,i=a===void 0?[0,0]:a,o=Mi.reduce(function(u,f){return u[f]=_g(f,e.rects,i),u},{}),s=o[e.placement],l=s.x,c=s.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[r]=o}var Pg={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Mg};function Tg(t){var e=t.state,n=t.name;e.modifiersData[n]=Ni({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}var Og={name:"popperOffsets",enabled:!0,phase:"read",fn:Tg,data:{}};function Ig(t){return t==="x"?"y":"x"}function Yg(t){var e=t.state,n=t.options,r=t.name,a=n.mainAxis,i=a===void 0?!0:a,o=n.altAxis,s=o===void 0?!1:o,l=n.boundary,c=n.rootBoundary,u=n.altBoundary,f=n.padding,d=n.tether,v=d===void 0?!0:d,h=n.tetherOffset,m=h===void 0?0:h,g=Lt(e,{boundary:l,rootBoundary:c,padding:f,altBoundary:u}),w=ge(e.placement),y=ft(e.placement),_=!y,b=yr(w),x=Ig(b),k=e.modifiersData.popperOffsets,T=e.rects.reference,O=e.rects.popper,P=typeof m=="function"?m(Object.assign({},e.rects,{placement:e.placement})):m,S={x:0,y:0};if(!!k){if(i||s){var F=b==="y"?q:X,ye=b==="y"?ne:re,j=b==="y"?"height":"width",$e=k[b],J=k[b]+g[F],B=k[b]-g[ye],V=v?-O[j]/2:0,Ae=y===ct?T[j]:O[j],be=y===ct?-O[j]:-T[j],Re=e.elements.arrow,We=v&&Re?gr(Re):{width:0,height:0},we=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:Ii(),Be=we[F],De=we[ye],Q=Dn(0,T[j],We[j]),Ne=_?T[j]/2-V-Q-Be-P:Ae-Q-Be-P,Ve=_?-T[j]/2+V+Q+De+P:be+Q+De+P,ue=e.elements.arrow&&Nt(e.elements.arrow),Ue=ue?b==="y"?ue.clientTop||0:ue.clientLeft||0:0,dt=e.modifiersData.offset?e.modifiersData.offset[e.placement][b]:0,vt=k[b]+Ne-dt-Ue,ht=k[b]+Ve-dt;if(i){var Tn=Dn(v?Ft(J,vt):J,$e,v?Se(B,ht):B);k[b]=Tn,S[b]=Tn-$e}if(s){var On=b==="x"?q:X,In=b==="x"?ne:re,Ke=k[x],zt=Ke+g[On],Ht=Ke-g[In],Rt=Dn(v?Ft(zt,vt):zt,Ke,v?Se(Ht,ht):Ht);k[x]=Rt,S[x]=Rt-Ke}}e.modifiersData[r]=S}}var Eg={name:"preventOverflow",enabled:!0,phase:"main",fn:Yg,requiresIfExists:["offset"]};function Cg(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function Sg(t){return t===ce(t)||!ae(t)?br(t):Cg(t)}function $g(t){var e=t.getBoundingClientRect(),n=e.width/t.offsetWidth||1,r=e.height/t.offsetHeight||1;return n!==1||r!==1}function Ag(t,e,n){n===void 0&&(n=!1);var r=ae(e);ae(e)&&$g(e);var a=Ce(e),i=ut(t),o={scrollLeft:0,scrollTop:0},s={x:0,y:0};return(r||!r&&!n)&&((me(e)!=="body"||Dr(a))&&(o=Sg(e)),ae(e)?(s=ut(e),s.x+=e.clientLeft,s.y+=e.clientTop):a&&(s.x=wr(a))),{x:i.left+o.scrollLeft-s.x,y:i.top+o.scrollTop-s.y,width:i.width,height:i.height}}function Ng(t){var e=new Map,n=new Set,r=[];t.forEach(function(i){e.set(i.name,i)});function a(i){n.add(i.name);var o=[].concat(i.requires||[],i.requiresIfExists||[]);o.forEach(function(s){if(!n.has(s)){var l=e.get(s);l&&a(l)}}),r.push(i)}return t.forEach(function(i){n.has(i.name)||a(i)}),r}function Fg(t){var e=Ng(t);return Zm.reduce(function(n,r){return n.concat(e.filter(function(a){return a.phase===r}))},[])}function jg(t){var e;return function(){return e||(e=new Promise(function(n){Promise.resolve().then(function(){e=void 0,n(t())})})),e}}function Lg(t){var e=t.reduce(function(n,r){var a=n[r.name];return n[r.name]=a?Object.assign({},a,r,{options:Object.assign({},a.options,r.options),data:Object.assign({},a.data,r.data)}):r,n},{});return Object.keys(e).map(function(n){return e[n]})}var Li={placement:"bottom",modifiers:[],strategy:"absolute"};function zi(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return!e.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function zg(t){t===void 0&&(t={});var e=t,n=e.defaultModifiers,r=n===void 0?[]:n,a=e.defaultOptions,i=a===void 0?Li:a;return function(s,l,c){c===void 0&&(c=i);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},Li,i),modifiersData:{},elements:{reference:s,popper:l},attributes:{},styles:{}},f=[],d=!1,v={state:u,setOptions:function(w){var y=typeof w=="function"?w(u.options):w;m(),u.options=Object.assign({},i,u.options,y),u.scrollParents={reference:At(s)?jt(s):s.contextElement?jt(s.contextElement):[],popper:jt(l)};var _=Fg(Lg([].concat(r,u.options.modifiers)));return u.orderedModifiers=_.filter(function(b){return b.enabled}),h(),v.update()},forceUpdate:function(){if(!d){var w=u.elements,y=w.reference,_=w.popper;if(!!zi(y,_)){u.rects={reference:Ag(y,Nt(_),u.options.strategy==="fixed"),popper:gr(_)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(S){return u.modifiersData[S.name]=Object.assign({},S.data)});for(var b=0;b<u.orderedModifiers.length;b++){if(u.reset===!0){u.reset=!1,b=-1;continue}var x=u.orderedModifiers[b],k=x.fn,T=x.options,O=T===void 0?{}:T,P=x.name;typeof k=="function"&&(u=k({state:u,options:O,name:P,instance:v})||u)}}}},update:jg(function(){return new Promise(function(g){v.forceUpdate(),g(u)})}),destroy:function(){m(),d=!0}};if(!zi(s,l))return v;v.setOptions(c).then(function(g){!d&&c.onFirstUpdate&&c.onFirstUpdate(g)});function h(){u.orderedModifiers.forEach(function(g){var w=g.name,y=g.options,_=y===void 0?{}:y,b=g.effect;if(typeof b=="function"){var x=b({state:u,name:w,instance:v,options:_}),k=function(){};f.push(x||k)}})}function m(){f.forEach(function(g){return g()}),f=[]}return v}}var Hg=[ug,Og,lg,Jm,Pg,Dg,Eg,ag,xg],Rg=zg({defaultModifiers:Hg}),xr={name:"CustomTransition",emits:["before-enter","before-transition","after-enter","after-transition"],props:{name:String,appear:Boolean},computed:{name_:function(){return"vc-".concat(this.name||"none")}},methods:{beforeEnter:function(e){this.$emit("before-enter",e),this.$emit("before-transition",e)},afterEnter:function(e){this.$emit("after-enter",e),this.$emit("after-transition",e)}}};function Wg(t,e,n,r,a,i){return U(),K(to,{name:i.name_,appear:n.appear,onBeforeEnter:i.beforeEnter,onAfterEnter:i.afterEnter},{default:eo(function(){return[Wt(t.$slots,"default")]}),_:3},8,["name","appear","onBeforeEnter","onAfterEnter"])}var Bg=`.vc-none-enter-active,
.vc-none-leave-active {
  transition-duration: 0s;
}
.vc-fade-enter-active,
.vc-fade-leave-active,
.vc-slide-left-enter-active,
.vc-slide-left-leave-active,
.vc-slide-right-enter-active,
.vc-slide-right-leave-active,
.vc-slide-up-enter-active,
.vc-slide-up-leave-active,
.vc-slide-down-enter-active,
.vc-slide-down-leave-active,
.vc-slide-fade-enter-active,
.vc-slide-fade-leave-active {
  transition: opacity var(--slide-duration) var(--slide-timing),
    -webkit-transform var(--slide-duration) var(--slide-timing);
  transition: transform var(--slide-duration) var(--slide-timing),
    opacity var(--slide-duration) var(--slide-timing);
  transition: transform var(--slide-duration) var(--slide-timing),
    opacity var(--slide-duration) var(--slide-timing),
    -webkit-transform var(--slide-duration) var(--slide-timing);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  pointer-events: none;
}
.vc-none-leave-active,
.vc-fade-leave-active,
.vc-slide-left-leave-active,
.vc-slide-right-leave-active,
.vc-slide-up-leave-active,
.vc-slide-down-leave-active {
  position: absolute !important;
  width: 100%;
}
.vc-none-enter-from,
.vc-none-leave-to,
.vc-fade-enter-from,
.vc-fade-leave-to,
.vc-slide-left-enter-from,
.vc-slide-left-leave-to,
.vc-slide-right-enter-from,
.vc-slide-right-leave-to,
.vc-slide-up-enter-from,
.vc-slide-up-leave-to,
.vc-slide-down-enter-from,
.vc-slide-down-leave-to,
.vc-slide-fade-enter-from,
.vc-slide-fade-leave-to {
  opacity: 0;
}
.vc-slide-left-enter-from,
.vc-slide-right-leave-to,
.vc-slide-fade-enter-from.direction-left,
.vc-slide-fade-leave-to.direction-left {
  -webkit-transform: translateX(var(--slide-translate));
          transform: translateX(var(--slide-translate));
}
.vc-slide-right-enter-from,
.vc-slide-left-leave-to,
.vc-slide-fade-enter-from.direction-right,
.vc-slide-fade-leave-to.direction-right {
  -webkit-transform: translateX(calc(-1 * var(--slide-translate)));
          transform: translateX(calc(-1 * var(--slide-translate)));
}
.vc-slide-up-enter-from,
.vc-slide-down-leave-to,
.vc-slide-fade-enter-from.direction-top,
.vc-slide-fade-leave-to.direction-top {
  -webkit-transform: translateY(var(--slide-translate));
          transform: translateY(var(--slide-translate));
}
.vc-slide-down-enter-from,
.vc-slide-up-leave-to,
.vc-slide-fade-enter-from.direction-bottom,
.vc-slide-fade-leave-to.direction-bottom {
  -webkit-transform: translateY(calc(-1 * var(--slide-translate)));
          transform: translateY(calc(-1 * var(--slide-translate)));
}
`;pe(Bg);xr.render=Wg;var Hi=function(e,n){if(!e||!e.addEventListener||!se(n))return null;var r=!1,a=!1,i=function(){return r=!0},o=function(){return r=!1},s=function(c){if(r){r=!1,a=!0,n(c);return}c.type==="click"&&!a&&n(c),a=!1};return $(e,"touchstart",i,{passive:!0}),$(e,"touchmove",o,{passive:!0}),$(e,"click",s,{passive:!0}),$(e,"touchend",s,{passive:!0}),function(){A(e,"touchstart",i),A(e,"touchmove",o),A(e,"click",s),A(e,"touchend",s)}},Vg=function(e,n,r){var a=r.maxSwipeTime,i=r.minHorizontalSwipeDistance,o=r.maxVerticalSwipeDistance;if(!e||!e.addEventListener||!se(n))return null;var s=0,l=0,c=null,u=!1;function f(v){var h=v.changedTouches[0];s=h.screenX,l=h.screenY,c=new Date().getTime(),u=!0}function d(v){if(!!u){u=!1;var h=v.changedTouches[0],m=h.screenX-s,g=h.screenY-l,w=new Date().getTime()-c;if(w<a&&Math.abs(m)>=i&&Math.abs(g)<=o){var y={toLeft:!1,toRight:!1};m<0?y.toLeft=!0:y.toRight=!0,n(y)}}}return $(e,"touchstart",f,{passive:!0}),$(e,"touchend",d,{passive:!0}),function(){A(e,"touchstart",f),A(e,"touchend",d)}},_n={name:"Popover",emits:["before-show","after-show","before-hide","after-hide"],render:function(){var e=this;return D("div",{class:["vc-popover-content-wrapper",{"is-interactive":this.isInteractive}],ref:"popover"},[D(xr,{name:this.transition,appear:!0,"on-before-enter":this.beforeEnter,"on-after-enter":this.afterEnter,"on-before-leave":this.beforeLeave,"on-after-leave":this.afterLeave},{default:function(){return e.isVisible?D("div",{tabindex:-1,class:["vc-popover-content","direction-".concat(e.direction),e.contentClass],style:e.contentStyle},[e.content,D("span",{class:["vc-popover-caret","direction-".concat(e.direction),"align-".concat(e.alignment)]})]):null}})])},props:{id:{type:String,required:!0},contentClass:String},data:function(){return{ref:null,opts:null,data:null,transition:"slide-fade",transitionTranslate:"15px",transitionDuration:"0.15s",placement:"bottom",positionFixed:!1,modifiers:[],isInteractive:!1,isHovered:!1,isFocused:!1,showDelay:0,hideDelay:110,autoHide:!1,popperEl:null}},computed:{content:function(){var e=this;return se(this.$slots.default)&&this.$slots.default({direction:this.direction,alignment:this.alignment,data:this.data,updateLayout:this.setupPopper,hide:function(r){return e.hide(r)}})||this.$slots.default},contentStyle:function(){return{"--slide-translate":this.transitionTranslate,"--slide-duration":this.transitionDuration}},popperOptions:function(){return{placement:this.placement,strategy:this.positionFixed?"fixed":"absolute",modifiers:[{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:this.onPopperUpdate}].concat(Vt(this.modifiers||[])),onFirstUpdate:this.onPopperUpdate}},isVisible:function(){return!!(this.ref&&this.content)},direction:function(){return this.placement&&this.placement.split("-")[0]||"bottom"},alignment:function(){var e=this.direction==="left"||this.direction==="right",n=this.placement.split("-");return n=n.length>1?n[1]:"",["start","top","left"].includes(n)?e?"top":"left":["end","bottom","right"].includes(n)?e?"bottom":"right":e?"middle":"center"}},watch:{opts:function(e,n){n&&n.callback&&n.callback(p(p({},n),{},{completed:!e,reason:e?"Overridden by action":null}))}},mounted:function(){this.popoverEl=this.$refs.popover,this.addEvents()},beforeUnmount:function(){this.removeEvents()},methods:{addEvents:function(){$(this.popoverEl,"click",this.onClick),$(this.popoverEl,"mouseover",this.onMouseOver),$(this.popoverEl,"mouseleave",this.onMouseLeave),$(this.popoverEl,"focusin",this.onFocusIn),$(this.popoverEl,"focusout",this.onFocusOut),$(document,"keydown",this.onDocumentKeydown),this.removeDocHandler=Hi(document,this.onDocumentClick),$(document,"show-popover",this.onDocumentShowPopover),$(document,"hide-popover",this.onDocumentHidePopover),$(document,"toggle-popover",this.onDocumentTogglePopover),$(document,"update-popover",this.onDocumentUpdatePopover)},removeEvents:function(){A(this.popoverEl,"click",this.onClick),A(this.popoverEl,"mouseover",this.onMouseOver),A(this.popoverEl,"mouseleave",this.onMouseLeave),A(this.popoverEl,"focusin",this.onFocusIn),A(this.popoverEl,"focusout",this.onFocusOut),A(document,"keydown",this.onDocumentKeydown),this.removeDocHandler&&this.removeDocHandler(),A(document,"show-popover",this.onDocumentShowPopover),A(document,"hide-popover",this.onDocumentHidePopover),A(document,"toggle-popover",this.onDocumentTogglePopover),A(document,"update-popover",this.onDocumentUpdatePopover)},onClick:function(e){e.stopPropagation()},onMouseOver:function(){this.isHovered=!0,this.isInteractive&&this.show()},onMouseLeave:function(){this.isHovered=!1,this.autoHide&&!this.isFocused&&(!this.ref||this.ref!==document.activeElement)&&this.hide()},onFocusIn:function(){this.isFocused=!0,this.isInteractive&&this.show()},onFocusOut:function(e){(!e.relatedTarget||!Ot(this.popoverEl,e.relatedTarget))&&(this.isFocused=!1,!this.isHovered&&this.autoHide&&this.hide())},onDocumentClick:function(e){!this.$refs.popover||!this.ref||Ot(this.popoverEl,e.target)||Ot(this.ref,e.target)||this.hide()},onDocumentKeydown:function(e){(e.key==="Esc"||e.key==="Escape")&&this.hide()},onDocumentShowPopover:function(e){var n=e.detail;!n.id||n.id!==this.id||this.show(n)},onDocumentHidePopover:function(e){var n=e.detail;!n.id||n.id!==this.id||this.hide(n)},onDocumentTogglePopover:function(e){var n=e.detail;!n.id||n.id!==this.id||this.toggle(n)},onDocumentUpdatePopover:function(e){var n=e.detail;!n.id||n.id!==this.id||this.update(n)},show:function(){var e=this,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};n.action="show";var r=n.ref||this.ref,a=n.showDelay>=0?n.showDelay:this.showDelay;if(!r){n.callback&&n.callback({completed:!1,reason:"Invalid reference element provided"});return}clearTimeout(this.timeout),this.opts=n;var i=function(){Object.assign(e,rr(n,["id"])),e.setupPopper(),e.opts=null};a>0?this.timeout=setTimeout(function(){return i()},a):i()},hide:function(){var e=this,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};n.action="hide";var r=n.ref||this.ref,a=n.hideDelay>=0?n.hideDelay:this.hideDelay;if(!this.ref||r!==this.ref){n.callback&&n.callback(p(p({},n),{},{completed:!1,reason:this.ref?"Invalid reference element provided":"Popover already hidden"}));return}var i=function(){e.ref=null,e.opts=null};clearTimeout(this.timeout),this.opts=n,a>0?this.timeout=setTimeout(i,a):i()},toggle:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.isVisible&&e.ref===this.ref?this.hide(e):this.show(e)},update:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Object.assign(this,rr(e,["id"])),this.setupPopper()},setupPopper:function(){var e=this;this.$nextTick(function(){!e.ref||!e.$refs.popover||(e.popper&&e.popper.reference!==e.ref&&e.destroyPopper(),e.popper?e.popper.update():e.popper=Rg(e.ref,e.popoverEl,e.popperOptions))})},onPopperUpdate:function(e){e.placement?this.placement=e.placement:e.state&&(this.placement=e.state.placement)},beforeEnter:function(e){this.$emit("before-show",e)},afterEnter:function(e){this.$emit("after-show",e)},beforeLeave:function(e){this.$emit("before-hide",e)},afterLeave:function(e){this.destroyPopper(),this.$emit("after-hide",e)},destroyPopper:function(){this.popper&&(this.popper.destroy(),this.popper=null)}}},Ug=`.vc-popover-content-wrapper {
  --popover-horizontal-content-offset: 8px;
  --popover-vertical-content-offset: 10px;
  --popover-caret-horizontal-offset: 18px;
  --popover-caret-vertical-offset: 8px;

  position: absolute;
  display: block;
  outline: none;
  z-index: 10;
}
.vc-popover-content-wrapper:not(.is-interactive) {
    pointer-events: none;
}
.vc-popover-content {
  position: relative;
  outline: none;
  z-index: 10;
  box-shadow: var(--shadow-lg);
}
.vc-popover-content.direction-bottom {
    margin-top: var(--popover-vertical-content-offset);
}
.vc-popover-content.direction-top {
    margin-bottom: var(--popover-vertical-content-offset);
}
.vc-popover-content.direction-left {
    margin-right: var(--popover-horizontal-content-offset);
}
.vc-popover-content.direction-right {
    margin-left: var(--popover-horizontal-content-offset);
}
.vc-popover-caret {
  content: '';
  position: absolute;
  display: block;
  width: 12px;
  height: 12px;
  border-top: inherit;
  border-left: inherit;
  background-color: inherit;
  z-index: -1;
}
.vc-popover-caret.direction-bottom {
    top: 0;
}
.vc-popover-caret.direction-bottom.align-left {
      -webkit-transform: translateY(-50%) rotate(45deg);
              transform: translateY(-50%) rotate(45deg);
}
.vc-popover-caret.direction-bottom.align-center {
      -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
              transform: translateX(-50%) translateY(-50%) rotate(45deg);
}
.vc-popover-caret.direction-bottom.align-right {
      -webkit-transform: translateY(-50%) rotate(45deg);
              transform: translateY(-50%) rotate(45deg);
}
.vc-popover-caret.direction-top {
    top: 100%;
}
.vc-popover-caret.direction-top.align-left {
      -webkit-transform: translateY(-50%) rotate(-135deg);
              transform: translateY(-50%) rotate(-135deg);
}
.vc-popover-caret.direction-top.align-center {
      -webkit-transform: translateX(-50%) translateY(-50%) rotate(-135deg);
              transform: translateX(-50%) translateY(-50%) rotate(-135deg);
}
.vc-popover-caret.direction-top.align-right {
      -webkit-transform: translateY(-50%) rotate(-135deg);
              transform: translateY(-50%) rotate(-135deg);
}
.vc-popover-caret.direction-left {
    left: 100%;
}
.vc-popover-caret.direction-left.align-top {
      -webkit-transform: translateX(-50%) rotate(135deg);
              transform: translateX(-50%) rotate(135deg);
}
.vc-popover-caret.direction-left.align-middle {
      -webkit-transform: translateY(-50%) translateX(-50%) rotate(135deg);
              transform: translateY(-50%) translateX(-50%) rotate(135deg);
}
.vc-popover-caret.direction-left.align-bottom {
      -webkit-transform: translateX(-50%) rotate(135deg);
              transform: translateX(-50%) rotate(135deg);
}
.vc-popover-caret.direction-right {
    left: 0;
}
.vc-popover-caret.direction-right.align-top {
      -webkit-transform: translateX(-50%) rotate(-45deg);
              transform: translateX(-50%) rotate(-45deg);
}
.vc-popover-caret.direction-right.align-middle {
      -webkit-transform: translateY(-50%) translateX(-50%) rotate(-45deg);
              transform: translateY(-50%) translateX(-50%) rotate(-45deg);
}
.vc-popover-caret.direction-right.align-bottom {
      -webkit-transform: translateX(-50%) rotate(-45deg);
              transform: translateX(-50%) rotate(-45deg);
}
.vc-popover-caret.align-left {
    left: var(--popover-caret-horizontal-offset);
}
.vc-popover-caret.align-center {
    left: 50%;
}
.vc-popover-caret.align-right {
    right: var(--popover-caret-horizontal-offset);
}
.vc-popover-caret.align-top {
    top: var(--popover-caret-vertical-offset);
}
.vc-popover-caret.align-middle {
    top: 50%;
}
.vc-popover-caret.align-bottom {
    bottom: var(--popover-caret-vertical-offset);
}
`;pe(Ug);var Ri={name:"PopoverRow",mixins:[mn],props:{attribute:Object},computed:{indicator:function(){var e=this.attribute,n=e.highlight,r=e.dot,a=e.bar,i=e.popover;if(i&&i.hideIndicator)return null;if(n){var o=n.start,s=o.color,l=o.isDark;return{style:p(p({},this.theme.bgAccentHigh({color:s,isDark:!l})),{},{width:"10px",height:"5px",borderRadius:"3px"})}}if(r){var c=r.start,u=c.color,f=c.isDark;return{style:p(p({},this.theme.bgAccentHigh({color:u,isDark:!f})),{},{width:"5px",height:"5px",borderRadius:"50%"})}}if(a){var d=a.start,v=d.color,h=d.isDark;return{style:p(p({},this.theme.bgAccentHigh({color:v,isDark:!h})),{},{width:"10px",height:"3px"})}}return null}}},Kg={class:"vc-day-popover-row"},Gg={key:0,class:"vc-day-popover-row-indicator"},Zg={class:"vc-day-popover-row-content"};function qg(t,e,n,r,a,i){return U(),K("div",Kg,[i.indicator?(U(),K("div",Gg,[I("span",{style:i.indicator.style,class:i.indicator.class},null,6)])):En("",!0),I("div",Zg,[Wt(t.$slots,"default",{},function(){return[no(Te(n.attribute.popover?n.attribute.popover.label:"No content provided"),1)]})])])}var Xg=`.vc-day-popover-row {
  --day-content-transition-time: 0.13s ease-in;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  transition: all var(--day-content-transition-time);
}
.vc-day-popover-row:not(:first-child) {
    margin-top: 3px;
}
.vc-day-popover-row-indicator {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-flex-grow: 0;
      -ms-flex-positive: 0;
          flex-grow: 0;
  width: 15px;
  margin-right: 3px;
}
.vc-day-popover-row-indicator span {
    transition: all var(--day-content-transition-time);
}
.vc-day-popover-row-content {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-flex-wrap: none;
      -ms-flex-wrap: none;
          flex-wrap: none;
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
  width: -webkit-max-content;
  width: max-content;
}
`;pe(Xg);Ri.render=qg;var Wi=Ri;function _r(t,e){z(2,arguments);var n=xe(t),r=ve(e);if(isNaN(r))return new Date(NaN);if(!r)return n;var a=n.getDate(),i=new Date(n.getTime());i.setMonth(n.getMonth()+r+1,0);var o=i.getDate();return a>=o?i:(n.setFullYear(i.getFullYear(),i.getMonth(),a),n)}function Bi(t,e){z(2,arguments);var n=ve(e);return _r(t,n*12)}var Jg=function(){function t(e,n,r){pt(this,t),this.theme=e,this.locale=n,this.map={},this.refresh(r,!0)}return mt(t,[{key:"refresh",value:function(n,r){var a=this,i={},o=[],s=null,l=[],c=r?new Set:new Set(Object.keys(this.map));return de(n)&&n.forEach(function(u,f){if(!(!u||!u.dates)){var d=u.key?u.key.toString():f.toString(),v=u.order||0,h=Ah(JSON.stringify(u)),m=a.map[d];!r&&m&&m.hashcode===h?c.delete(d):(m=new gi(p({key:d,order:v,hashcode:h},u),a.theme,a.locale),l.push(m)),m&&m.pinPage&&(s=m),i[d]=m,o.push(m)}}),this.map=i,this.list=o,this.pinAttr=s,{adds:l,deletes:Array.from(c)}}}]),t}(),Vi={name:"Calendar",emits:["dayfocusin","dayfocusout","transition-start","transition-end","update:from-page","update:to-page"],render:function(){var e=this,n=this.pages.map(function(o,s){var l=s+1,c=Math.ceil((s+1)/e.columns),u=e.rows-c+1,f=l%e.columns||e.columns,d=e.columns-f+1;return D(Pm,p(p({},e.$attrs),{},{key:o.key,attributes:e.store,page:o,position:l,row:c,rowFromEnd:u,column:f,columnFromEnd:d,titlePosition:e.titlePosition,canMove:e.canMove,"onUpdate:page":function(h){return e.move(h,{position:s+1})},onDayfocusin:function(h){e.lastFocusedDay=h,e.$emit("dayfocusin",h)},onDayfocusout:function(h){e.lastFocusedDay=null,e.$emit("dayfocusout",h)}}),e.$slots)}),r=function(s){var l=function(){return e.move(s?-e.step_:e.step_)},c=function(d){return Ja(d,l)},u=s?!e.canMovePrev:!e.canMoveNext;return D("div",{class:["vc-arrow","is-".concat(s?"left":"right"),{"is-disabled":u}],role:"button",onClick:l,onKeydown:c},[(s?e.safeSlot("header-left-button",{click:l}):e.safeSlot("header-right-button",{click:l}))||D(hr,{name:s?"left-arrow":"right-arrow"})])},a=function(){return D(_n,{id:e.sharedState.navPopoverId,contentClass:"vc-nav-popover-container",ref:"navPopover"},{default:function(l){var c=l.data,u=c.position,f=c.page;return D(ki,{value:f,position:u,validator:function(v){return e.canMove(v,{position:u})},onInput:function(v){return e.move(v)}},p({},e.$slots))}})},i=function(){return D(_n,{id:e.sharedState.dayPopoverId,contentClass:"vc-day-popover-container"},{default:function(l){var c=l.data,u=l.updateLayout,f=l.hide,d=Object.values(c.attributes).filter(function(g){return g.popover}),v=e.$locale.masks,h=e.formatDate,m=h(c.date,v.dayPopover);return e.safeSlot("day-popover",{day:c,attributes:d,masks:v,format:h,dayTitle:m,updateLayout:u,hide:f},D("div",[v.dayPopover&&D("div",{class:["vc-day-popover-header"]},[m]),d.map(function(g){return D(Wi,{key:g.key,attribute:g})})]))}})};return D("div",{"data-helptext":"Press the arrow keys to navigate by day, Home and End to navigate to week ends, PageUp and PageDown to navigate by month, Alt+PageUp and Alt+PageDown to navigate by year",class:["vc-container","vc-".concat(this.$theme.color),{"vc-is-expanded":this.isExpanded,"vc-is-dark":this.$theme.isDark}],onKeydown:this.handleKeydown,onMouseup:function(s){return s.preventDefault()},ref:"container"},[a(),D("div",{class:["vc-pane-container",{"in-transition":this.inTransition}]},[D(xr,{name:this.transitionName,"on-before-enter":function(){e.inTransition=!0},"on-after-enter":function(){e.inTransition=!1}},{default:function(){return D("div",p(p({},e.$attrs),{},{class:"vc-pane-layout",style:{gridTemplateColumns:"repeat(".concat(e.columns,", 1fr)")},key:e.firstPage?e.firstPage.key:""}),n)}}),D("div",{class:["vc-arrows-container title-".concat(this.titlePosition)]},[r(!0),r(!1)]),this.$slots.footer&&this.$slots.footer()]),i()])},mixins:[bi,fr],provide:function(){return{sharedState:this.sharedState}},props:{rows:{type:Number,default:1},columns:{type:Number,default:1},step:Number,titlePosition:{type:String,default:Ee("titlePosition")},isExpanded:Boolean,fromDate:Date,toDate:Date,fromPage:Object,toPage:Object,minPage:Object,maxPage:Object,transition:String,attributes:[Object,Array],trimWeeks:Boolean,disablePageSwipe:Boolean},data:function(){return{pages:[],store:null,lastFocusedDay:null,focusableDay:new Date().getDate(),transitionName:"",inTransition:!1,sharedState:{navPopoverId:cn(),dayPopoverId:cn(),theme:{},masks:{},locale:{}}}},computed:{firstPage:function(){return Di(this.pages)},lastPage:function(){return _t(this.pages)},minPage_:function(){return this.minPage||this.pageForDate(this.minDate)},maxPage_:function(){return this.maxPage||this.pageForDate(this.maxDate)},count:function(){return this.rows*this.columns},step_:function(){return this.step||this.count},canMovePrev:function(){return this.canMove(-this.step_)},canMoveNext:function(){return this.canMove(this.step_)}},watch:{$locale:function(){this.refreshLocale(),this.refreshPages({page:this.firstPage,ignoreCache:!0}),this.initStore()},$theme:function(){this.refreshTheme(),this.initStore()},fromDate:function(){this.refreshPages()},fromPage:function(e){var n=this.pages&&this.pages[0];ir(e,n)||this.refreshPages()},toPage:function(e){var n=this.pages&&this.pages[this.pages.length-1];ir(e,n)||this.refreshPages()},count:function(){this.refreshPages()},attributes:function(e){var n=this.store.refresh(e),r=n.adds,a=n.deletes;this.refreshAttrs(this.pages,r,a)},pages:function(e){this.refreshAttrs(e,this.store.list,null,!0)},disabledAttribute:function(){this.refreshDisabledDays()},lastFocusedDay:function(e){e&&(this.focusableDay=e.day,this.refreshFocusableDays())},inTransition:function(e){e?this.$emit("transition-start"):(this.$emit("transition-end"),this.transitionPromise&&(this.transitionPromise.resolve(!0),this.transitionPromise=null))}},created:function(){this.refreshLocale(),this.refreshTheme(),this.initStore(),this.refreshPages()},mounted:function(){var e=this;this.disablePageSwipe||(this.removeHandlers=Vg(this.$refs.container,function(n){var r=n.toLeft,a=n.toRight;r?e.moveNext():a&&e.movePrev()},Ee("touch")))},beforeUnmount:function(){this.removeHandlers&&this.removeHandlers()},methods:{refreshLocale:function(){this.sharedState.locale=this.$locale,this.sharedState.masks=this.$locale.masks},refreshTheme:function(){this.sharedState.theme=this.$theme},canMove:function(e){var n=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=this.firstPage&&this.$locale.toPage(e,this.firstPage);if(!a)return!1;var i=r.position;if(It(e)&&(i=1),!i)if(Pt(a,this.firstPage))i=-1;else if(Tt(a,this.lastPage))i=1;else return!0;return Object.assign(r,this.getTargetPageRange(a,{position:i,force:!0})),$h(r.fromPage,r.toPage).some(function(o){return qa(o,n.minPage_,n.maxPage_)})},movePrev:function(e){return this.move(-this.step_,e)},moveNext:function(e){return this.move(this.step_,e)},move:function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=this.canMove(e,n);return!n.force&&!r?Promise.reject(new Error("Move target is disabled: ".concat(JSON.stringify(n)))):(this.$refs.navPopover.hide({hideDelay:0}),n.fromPage&&!ir(n.fromPage,this.firstPage)?this.refreshPages(p(p({},n),{},{page:n.fromPage,position:1,force:!0})):Promise.resolve(!0))},focusDate:function(e){var n=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.move(e,r).then(function(){var a=n.$el.querySelector(".id-".concat(n.$locale.getDayId(e),".in-month .vc-focusable"));return a?(a.focus(),Promise.resolve(!0)):Promise.resolve(!1)})},showPageRange:function(e,n){var r,a;if(Ie(e))r=this.pageForDate(e);else if(le(e)){var i=e.month,o=e.year,s=e.from,l=e.to;It(i)&&It(o)?r=e:(s||l)&&(r=Ie(s)?this.pageForDate(s):s,a=Ie(l)?this.pageForDate(l):l)}else return Promise.reject(new Error("Invalid page range provided."));var c=this.lastPage,u=r;return Tt(a,c)&&(u=ke(a,-(this.pages.length-1))),Pt(u,r)&&(u=r),this.refreshPages(p(p({},n),{},{page:u}))},getTargetPageRange:function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.position,a=n.force,i=null,o=null;if(Z(e)){var s=0;r=+r,isNaN(r)||(s=r>0?1-r:-(this.count+r)),i=ke(e,s)}else i=this.getDefaultInitialPage();return o=ke(i,this.count-1),a||(Pt(i,this.minPage_)?i=this.minPage_:Tt(o,this.maxPage_)&&(i=ke(this.maxPage_,1-this.count)),o=ke(i,this.count-1)),{fromPage:i,toPage:o}},getDefaultInitialPage:function(){var e=this.fromPage||this.pageForDate(this.fromDate);if(!Z(e)){var n=this.toPage||this.pageForDate(this.toPage);Z(n)&&(e=ke(n,1-this.count))}return Z(e)||(e=this.getPageForAttributes()),Z(e)||(e=this.pageForThisMonth()),e},refreshPages:function(){var e=this,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=n.page,a=n.position,i=a===void 0?1:a,o=n.force,s=n.transition,l=n.ignoreCache;return new Promise(function(c,u){for(var f=e.getTargetPageRange(r,{position:i,force:o}),d=f.fromPage,v=f.toPage,h=[],m=0;m<e.count;m++)h.push(e.buildPage(ke(d,m),l));e.refreshDisabledDays(h),e.refreshFocusableDays(h),e.transitionName=e.getPageTransition(e.pages[0],h[0],s),e.pages=h,e.$emit("update:from-page",d),e.$emit("update:to-page",v),e.transitionName&&e.transitionName!=="none"?e.transitionPromise={resolve:c,reject:u}:c(!0)})},refreshDisabledDays:function(e){var n=this;this.getPageDays(e).forEach(function(r){r.isDisabled=!!n.disabledAttribute&&n.disabledAttribute.intersectsDay(r)})},refreshFocusableDays:function(e){var n=this;this.getPageDays(e).forEach(function(r){r.isFocusable=r.inMonth&&r.day===n.focusableDay})},getPageDays:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.pages;return e.reduce(function(n,r){return n.concat(r.days)},[])},getPageTransition:function(e,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:this.transition;if(r==="none")return r;if(r==="fade"||!r&&this.count>1||!Z(e)||!Z(n))return"fade";var a=Pt(n,e);return r==="slide-v"?a?"slide-down":"slide-up":a?"slide-right":"slide-left"},getPageForAttributes:function(){var e=null,n=this.store.pinAttr;if(n&&n.hasDates){var r=Bt(n.dates,1),a=r[0];a=a.start||a.date,e=this.pageForDate(a)}return e},buildPage:function(e,n){var r=this,a=e.month,i=e.year,o="".concat(i.toString(),"-").concat(a.toString()),s=this.pages.find(function(d){return d.key===o});if(!s||n){var l=new Date(i,a-1,15),c=this.$locale.getMonthComps(a,i),u=this.$locale.getPrevMonthComps(a,i),f=this.$locale.getNextMonthComps(a,i);s={key:o,month:a,year:i,weeks:this.trimWeeks?c.weeks:6,title:this.$locale.format(l,this.$locale.masks.title),shortMonthLabel:this.$locale.format(l,"MMM"),monthLabel:this.$locale.format(l,"MMMM"),shortYearLabel:i.toString().substring(2),yearLabel:i.toString(),monthComps:c,prevMonthComps:u,nextMonthComps:f,canMove:function(v){return r.canMove(v)},move:function(v){return r.move(v)},moveThisMonth:function(){return r.moveThisMonth()},movePrevMonth:function(){return r.move(u)},moveNextMonth:function(){return r.move(f)},refresh:!0},s.days=this.$locale.getCalendarDays(s)}return s},initStore:function(){this.store=new Jg(this.$theme,this.$locale,this.attributes),this.refreshAttrs(this.pages,this.store.list,[],!0)},refreshAttrs:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],a=arguments.length>3?arguments[3]:void 0;!de(e)||e.forEach(function(i){i.days.forEach(function(o){var s=!1,l={};a?s=!0:ar(o.attributesMap,r)?(l=rr(o.attributesMap,r),s=!0):l=o.attributesMap||{},n.forEach(function(c){var u=c.intersectsDay(o);if(u){var f=p(p({},c),{},{targetDate:u});l[c.key]=f,s=!0}}),s&&(o.attributesMap=l,o.shouldRefresh=!0)})})},handleKeydown:function(e){var n=this.lastFocusedDay;n!=null&&(n.event=e,this.handleDayKeydown(n))},handleDayKeydown:function(e){var n=e.dateFromTime,r=e.event,a=n(12),i=null;switch(r.key){case"ArrowLeft":{i=he(a,-1);break}case"ArrowRight":{i=he(a,1);break}case"ArrowUp":{i=he(a,-7);break}case"ArrowDown":{i=he(a,7);break}case"Home":{i=he(a,-e.weekdayPosition+1);break}case"End":{i=he(a,e.weekdayPositionFromEnd);break}case"PageUp":{r.altKey?i=Bi(a,-1):i=_r(a,-1);break}case"PageDown":{r.altKey?i=Bi(a,1):i=_r(a,1);break}}i&&(r.preventDefault(),this.focusDate(i).catch())}}},Qg=`.vc-container {
  --white: #ffffff;
  --black: #000000;

  --gray-100: #f7fafc;
  --gray-200: #edf2f7;
  --gray-300: #e2e8f0;
  --gray-400: #cbd5e0;
  --gray-500: #a0aec0;
  --gray-600: #718096;
  --gray-700: #4a5568;
  --gray-800: #2d3748;
  --gray-900: #1a202c;

  --red-100: #fff5f5;
  --red-200: #fed7d7;
  --red-300: #feb2b2;
  --red-400: #fc8181;
  --red-500: #f56565;
  --red-600: #e53e3e;
  --red-700: #c53030;
  --red-800: #9b2c2c;
  --red-900: #742a2a;

  --orange-100: #fffaf0;
  --orange-200: #feebc8;
  --orange-300: #fbd38d;
  --orange-400: #f6ad55;
  --orange-500: #ed8936;
  --orange-600: #dd6b20;
  --orange-700: #c05621;
  --orange-800: #9c4221;
  --orange-900: #7b341e;

  --yellow-100: #fffff0;
  --yellow-200: #fefcbf;
  --yellow-300: #faf089;
  --yellow-400: #f6e05e;
  --yellow-500: #ecc94b;
  --yellow-600: #d69e2e;
  --yellow-700: #b7791f;
  --yellow-800: #975a16;
  --yellow-900: #744210;

  --green-100: #f0fff4;
  --green-200: #c6f6d5;
  --green-300: #9ae6b4;
  --green-400: #68d391;
  --green-500: #48bb78;
  --green-600: #38a169;
  --green-700: #2f855a;
  --green-800: #276749;
  --green-900: #22543d;

  --teal-100: #e6fffa;
  --teal-200: #b2f5ea;
  --teal-300: #81e6d9;
  --teal-400: #4fd1c5;
  --teal-500: #38b2ac;
  --teal-600: #319795;
  --teal-700: #2c7a7b;
  --teal-800: #285e61;
  --teal-900: #234e52;

  --blue-100: #ebf8ff;
  --blue-200: #bee3f8;
  --blue-300: #90cdf4;
  --blue-400: #63b3ed;
  --blue-500: #4299e1;
  --blue-600: #3182ce;
  --blue-700: #2b6cb0;
  --blue-800: #2c5282;
  --blue-900: #2a4365;

  --indigo-100: #ebf4ff;
  --indigo-200: #c3dafe;
  --indigo-300: #a3bffa;
  --indigo-400: #7f9cf5;
  --indigo-500: #667eea;
  --indigo-600: #5a67d8;
  --indigo-700: #4c51bf;
  --indigo-800: #434190;
  --indigo-900: #3c366b;

  --purple-100: #faf5ff;
  --purple-200: #e9d8fd;
  --purple-300: #d6bcfa;
  --purple-400: #b794f4;
  --purple-500: #9f7aea;
  --purple-600: #805ad5;
  --purple-700: #6b46c1;
  --purple-800: #553c9a;
  --purple-900: #44337a;

  --pink-100: #fff5f7;
  --pink-200: #fed7e2;
  --pink-300: #fbb6ce;
  --pink-400: #f687b3;
  --pink-500: #ed64a6;
  --pink-600: #d53f8c;
  --pink-700: #b83280;
  --pink-800: #97266d;
  --pink-900: #702459;
}
.vc-container.vc-red {
    --accent-100: var(--red-100);
    --accent-200: var(--red-200);
    --accent-300: var(--red-300);
    --accent-400: var(--red-400);
    --accent-500: var(--red-500);
    --accent-600: var(--red-600);
    --accent-700: var(--red-700);
    --accent-800: var(--red-800);
    --accent-900: var(--red-900);
}
.vc-container.vc-orange {
    --accent-100: var(--orange-100);
    --accent-200: var(--orange-200);
    --accent-300: var(--orange-300);
    --accent-400: var(--orange-400);
    --accent-500: var(--orange-500);
    --accent-600: var(--orange-600);
    --accent-700: var(--orange-700);
    --accent-800: var(--orange-800);
    --accent-900: var(--orange-900);
}
.vc-container.vc-yellow {
    --accent-100: var(--yellow-100);
    --accent-200: var(--yellow-200);
    --accent-300: var(--yellow-300);
    --accent-400: var(--yellow-400);
    --accent-500: var(--yellow-500);
    --accent-600: var(--yellow-600);
    --accent-700: var(--yellow-700);
    --accent-800: var(--yellow-800);
    --accent-900: var(--yellow-900);
}
.vc-container.vc-green {
    --accent-100: var(--green-100);
    --accent-200: var(--green-200);
    --accent-300: var(--green-300);
    --accent-400: var(--green-400);
    --accent-500: var(--green-500);
    --accent-600: var(--green-600);
    --accent-700: var(--green-700);
    --accent-800: var(--green-800);
    --accent-900: var(--green-900);
}
.vc-container.vc-teal {
    --accent-100: var(--teal-100);
    --accent-200: var(--teal-200);
    --accent-300: var(--teal-300);
    --accent-400: var(--teal-400);
    --accent-500: var(--teal-500);
    --accent-600: var(--teal-600);
    --accent-700: var(--teal-700);
    --accent-800: var(--teal-800);
    --accent-900: var(--teal-900);
}
.vc-container.vc-blue {
    --accent-100: var(--blue-100);
    --accent-200: var(--blue-200);
    --accent-300: var(--blue-300);
    --accent-400: var(--blue-400);
    --accent-500: var(--blue-500);
    --accent-600: var(--blue-600);
    --accent-700: var(--blue-700);
    --accent-800: var(--blue-800);
    --accent-900: var(--blue-900);
}
.vc-container.vc-indigo {
    --accent-100: var(--indigo-100);
    --accent-200: var(--indigo-200);
    --accent-300: var(--indigo-300);
    --accent-400: var(--indigo-400);
    --accent-500: var(--indigo-500);
    --accent-600: var(--indigo-600);
    --accent-700: var(--indigo-700);
    --accent-800: var(--indigo-800);
    --accent-900: var(--indigo-900);
}
.vc-container.vc-purple {
    --accent-100: var(--purple-100);
    --accent-200: var(--purple-200);
    --accent-300: var(--purple-300);
    --accent-400: var(--purple-400);
    --accent-500: var(--purple-500);
    --accent-600: var(--purple-600);
    --accent-700: var(--purple-700);
    --accent-800: var(--purple-800);
    --accent-900: var(--purple-900);
}
.vc-container.vc-pink {
    --accent-100: var(--pink-100);
    --accent-200: var(--pink-200);
    --accent-300: var(--pink-300);
    --accent-400: var(--pink-400);
    --accent-500: var(--pink-500);
    --accent-600: var(--pink-600);
    --accent-700: var(--pink-700);
    --accent-800: var(--pink-800);
    --accent-900: var(--pink-900);
}
.vc-container {

  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;

  --leading-snug: 1.375;

  --rounded: 0.25rem;
  --rounded-lg: 0.5rem;
  --rounded-full: 9999px;

  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

  --slide-translate: 22px;
  --slide-duration: 0.15s;
  --slide-timing: ease;

  --day-content-transition-time: 0.13s ease-in;
  --weeknumber-offset: -34px;

  position: relative;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  width: -webkit-max-content;
  width: max-content;
  height: -webkit-max-content;
  height: max-content;
  font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  color: var(--gray-900);
  background-color: var(--white);
  border: 1px solid;
  border-color: var(--gray-400);
  border-radius: var(--rounded-lg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}
.vc-container,
  .vc-container * {
    box-sizing: border-box;
}
.vc-container:focus, .vc-container *:focus {
      outline: none;
}
.vc-container button,
  .vc-container [role='button'] {
    cursor: pointer;
}
.vc-container.vc-is-expanded {
    min-width: 100%;
}
/* Hides double border within popovers */
.vc-container .vc-container {
    border: none;
}
.vc-container.vc-is-dark {
    color: var(--gray-100);
    background-color: var(--gray-900);
    border-color: var(--gray-700);
}
.vc-pane-container {
  width: 100%;
  position: relative;
}
.vc-pane-container.in-transition {
    overflow: hidden;
}
.vc-pane-layout {
  display: grid;
}
.vc-arrow {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
  pointer-events: auto;
  color: var(--gray-600);
  border-width: 2px;
  border-style: solid;
  border-radius: var(--rounded);
  border-color: transparent;
}
.vc-arrow:hover {
    background: var(--gray-200);
}
.vc-arrow:focus {
    border-color: var(--gray-300);
}
.vc-arrow.is-disabled {
    opacity: 0.25;
    pointer-events: none;
    cursor: not-allowed;
}
.vc-day-popover-container {
  color: var(--white);
  background-color: var(--gray-800);
  border: 1px solid;
  border-color: var(--gray-700);
  border-radius: var(--rounded);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  padding: 4px 8px;
  box-shadow: var(--shadow);
}
.vc-day-popover-header {
  font-size: var(--text-xs);
  color: var(--gray-300);
  font-weight: var(--font-semibold);
  text-align: center;
}
.vc-arrows-container {
  width: 100%;
  position: absolute;
  top: 0;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding: 8px 10px;
  pointer-events: none;
}
.vc-arrows-container.title-left {
    -webkit-justify-content: flex-end;
        -ms-flex-pack: end;
            justify-content: flex-end;
}
.vc-arrows-container.title-right {
    -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
            justify-content: flex-start;
}
.vc-is-dark .vc-arrow {
    color: var(--white);
}
.vc-is-dark .vc-arrow:hover {
      background: var(--gray-800);
}
.vc-is-dark .vc-arrow:focus {
      border-color: var(--gray-700);
}
.vc-is-dark .vc-day-popover-container {
    color: var(--gray-800);
    background-color: var(--white);
    border-color: var(--gray-100);
}
.vc-is-dark .vc-day-popover-header {
    color: var(--gray-700);
}
`;pe(Qg);var Ui={inheritAttrs:!1,emits:["update:modelValue"],props:{options:Array,modelValue:null}},e0={class:"vc-select"},t0=I("div",{class:"vc-select-arrow"},[I("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},[I("path",{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"})])],-1);function n0(t,e,n,r,a,i){return U(),K("div",e0,[I("select",ro(t.$attrs,{value:n.modelValue,onChange:e[1]||(e[1]=function(o){return t.$emit("update:modelValue",o.target.value)})}),[(U(!0),K(Yr,null,Er(n.options,function(o){return U(),K("option",{key:o.value,value:o.value,disabled:o.disabled},Te(o.label),9,["value","disabled"])}),128))],16,["value"]),t0])}var r0=`.vc-select {
  position: relative;
}
.vc-select select {
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    display: block;
    -webkit-appearance: none;
            appearance: none;
    width: 52px;
    height: 30px;
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    text-align: left;
    background-color: var(--gray-200);
    border: 2px solid;
    border-color: var(--gray-200);
    color: var(--gray-900);
    padding: 0 20px 0 8px;
    border-radius: var(--rounded);
    line-height: var(--leading-tight);
    text-indent: 0px;
    cursor: pointer;
    -moz-padding-start: 3px;
}
.vc-select select:hover {
      color: var(--gray-600);
}
.vc-select select:focus {
      outline: 0;
      border-color: var(--accent-400);
      background-color: var(--white);
}
.vc-select-arrow {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 0 4px 0 0;
  color: var(--gray-500);
}
.vc-select-arrow svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
}
.vc-is-dark select {
    background: var(--gray-700);
    color: var(--gray-100);
    border-color: var(--gray-700);
}
.vc-is-dark select:hover {
      color: var(--gray-400);
}
.vc-is-dark select:focus {
      border-color: var(--accent-500);
      background-color: var(--gray-800);
}
`;pe(r0);Ui.render=n0;var Mr={name:"TimePicker",components:{TimeSelect:Ui},emits:["update:modelValue"],props:{modelValue:{type:Object,required:!0},locale:{type:Object,required:!0},theme:{type:Object,required:!0},is24hr:{type:Boolean,default:!0},minuteIncrement:{type:Number,default:1},showBorder:Boolean},data:function(){return{hours:0,minutes:0,isAM:!0}},computed:{date:function(){var e=this.locale.normalizeDate(this.modelValue);return this.modelValue.hours===24&&(e=new Date(e.getTime()-1)),e},hourOptions:function(){var e=[{value:0,label:"12"},{value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"},{value:4,label:"4"},{value:5,label:"5"},{value:6,label:"6"},{value:7,label:"7"},{value:8,label:"8"},{value:9,label:"9"},{value:10,label:"10"},{value:11,label:"11"}],n=[{value:0,label:"00"},{value:1,label:"01"},{value:2,label:"02"},{value:3,label:"03"},{value:4,label:"04"},{value:5,label:"05"},{value:6,label:"06"},{value:7,label:"07"},{value:8,label:"08"},{value:9,label:"09"},{value:10,label:"10"},{value:11,label:"11"},{value:12,label:"12"},{value:13,label:"13"},{value:14,label:"14"},{value:15,label:"15"},{value:16,label:"16"},{value:17,label:"17"},{value:18,label:"18"},{value:19,label:"19"},{value:20,label:"20"},{value:21,label:"21"},{value:22,label:"22"},{value:23,label:"23"}];return this.is24hr?n:e},minuteOptions:function(){for(var e=[],n=0,r=!1;n<=59;)e.push({value:n,label:M(n,2)}),r=r||n===this.minutes,n+=this.minuteIncrement,!r&&n>this.minutes&&(r=!0,e.push({value:this.minutes,label:M(this.minutes,2),disabled:!0}));return e}},watch:{modelValue:function(){this.setup()},hours:function(){this.updateValue()},minutes:function(){this.updateValue()},isAM:function(){this.updateValue()}},created:function(){this.setup()},methods:{protected:function(e){var n=this;this.busy||(this.busy=!0,e(),this.$nextTick(function(){return n.busy=!1}))},setup:function(){var e=this;this.protected(function(){var n=e.modelValue.hours;n===24&&(n=0);var r=!0;!e.is24hr&&n>=12&&(n-=12,r=!1),e.hours=n,e.minutes=e.modelValue.minutes,e.isAM=r})},updateValue:function(){var e=this;this.protected(function(){var n=e.hours;!e.is24hr&&!e.isAM&&(n+=12),e.$emit("update:modelValue",p(p({},e.modelValue),{},{hours:n,minutes:e.minutes,seconds:0,milliseconds:0}))})}}},a0=oo("data-v-63f66eaa");ao("data-v-63f66eaa");var i0=I("div",null,[I("svg",{fill:"none","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",class:"vc-time-icon",stroke:"currentColor"},[I("path",{d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})])],-1),o0={class:"vc-time-content"},s0={key:0,class:"vc-time-date"},l0={class:"vc-time-weekday"},c0={class:"vc-time-month"},u0={class:"vc-time-day"},f0={class:"vc-time-year"},d0={class:"vc-time-select"},v0=I("span",{style:{margin:"0 4px"}},":",-1),h0={key:0,class:"vc-am-pm"};io();var p0=a0(function(e,n,r,a,i,o){var s=Ir("time-select");return U(),K("div",{class:["vc-time-picker",[{"vc-invalid":!r.modelValue.isValid,"vc-bordered":r.showBorder}]]},[i0,I("div",o0,[o.date?(U(),K("div",s0,[I("span",l0,Te(r.locale.format(o.date,"WWW")),1),I("span",c0,Te(r.locale.format(o.date,"MMM")),1),I("span",u0,Te(r.locale.format(o.date,"D")),1),I("span",f0,Te(r.locale.format(o.date,"YYYY")),1)])):En("",!0),I("div",d0,[I(s,{modelValue:i.hours,"onUpdate:modelValue":n[1]||(n[1]=function(l){return i.hours=l}),modelModifiers:{number:!0},options:o.hourOptions},null,8,["modelValue","options"]),v0,I(s,{modelValue:i.minutes,"onUpdate:modelValue":n[2]||(n[2]=function(l){return i.minutes=l}),modelModifiers:{number:!0},options:o.minuteOptions},null,8,["modelValue","options"]),r.is24hr?En("",!0):(U(),K("div",h0,[I("button",{class:{active:i.isAM},onClick:n[3]||(n[3]=Cr(function(l){return i.isAM=!0},["prevent"])),type:"button"}," AM ",2),I("button",{class:{active:!i.isAM},onClick:n[4]||(n[4]=Cr(function(l){return i.isAM=!1},["prevent"])),type:"button"}," PM ",2)]))])])],2)}),m0=`.vc-time-picker[data-v-63f66eaa] {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  padding: 8px;
}
.vc-time-picker.vc-invalid[data-v-63f66eaa] {
    pointer-events: none;
    opacity: 0.5;
}
.vc-time-picker.vc-bordered[data-v-63f66eaa] {
    border-top: 1px solid var(--gray-400);
}
.vc-time-icon[data-v-63f66eaa] {
  width: 16px;
  height: 16px;
  color: var(--gray-600);
}
.vc-time-content[data-v-63f66eaa] {
  margin-left: 8px;
}
.vc-time-date[data-v-63f66eaa] {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  padding: 0 0 4px 4px;
  margin-top: -4px;
  line-height: 21px;
}
.vc-time-weekday[data-v-63f66eaa] {
  color: var(--gray-700);
  letter-spacing: var(--tracking-wide);
}
.vc-time-month[data-v-63f66eaa] {
  color: var(--accent-600);
  margin-left: 8px;
}
.vc-time-day[data-v-63f66eaa] {
  color: var(--accent-600);
  margin-left: 4px;
}
.vc-time-year[data-v-63f66eaa] {
  color: var(--gray-500);
  margin-left: 8px;
}
.vc-time-select[data-v-63f66eaa] {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}
.vc-am-pm[data-v-63f66eaa] {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  background: var(--gray-200);
  color: var(--gray-800);
  margin-left: 8px;
  padding: 4px;
  border-radius: var(--rounded);
  height: 30px;
}
.vc-am-pm button[data-v-63f66eaa] {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    padding: 0 4px;
    background: transparent;
    border: 2px solid transparent;
    border-radius: var(--rounded);
    line-height: var(--leading-snug);
}
.vc-am-pm button[data-v-63f66eaa]:hover {
      color: var(--gray-600);
}
.vc-am-pm button[data-v-63f66eaa]:focus {
      border-color: var(--accent-400);
}
.vc-am-pm button.active[data-v-63f66eaa] {
      background: var(--accent-600);
      color: var(--white);
}
.vc-am-pm button.active[data-v-63f66eaa]:hover {
        background: var(--accent-500);
}
.vc-am-pm button.active[data-v-63f66eaa]:focus {
        border-color: var(--accent-400);
}
.vc-is-dark .vc-time-picker[data-v-63f66eaa] {
    border-color: var(--gray-700);
}
.vc-is-dark .vc-time-icon[data-v-63f66eaa] {
    color: var(--gray-400);
}
.vc-is-dark .vc-time-weekday[data-v-63f66eaa] {
    color: var(--gray-400);
}
.vc-is-dark .vc-time-month[data-v-63f66eaa] {
    color: var(--accent-400);
}
.vc-is-dark .vc-time-day[data-v-63f66eaa] {
    color: var(--accent-400);
}
.vc-is-dark .vc-time-year[data-v-63f66eaa] {
    color: var(--gray-500);
}
.vc-is-dark .vc-am-pm[data-v-63f66eaa] {
    background: var(--gray-700);
}
.vc-is-dark .vc-am-pm[data-v-63f66eaa]:focus {
      border-color: var(--accent-500);
}
.vc-is-dark .vc-am-pm button[data-v-63f66eaa] {
      color: var(--gray-100);
}
.vc-is-dark .vc-am-pm button[data-v-63f66eaa]:hover {
        color: var(--gray-400);
}
.vc-is-dark .vc-am-pm button[data-v-63f66eaa]:focus {
        border-color: var(--accent-500);
}
.vc-is-dark .vc-am-pm button.active[data-v-63f66eaa] {
        background: var(--accent-500);
        color: var(--white);
}
.vc-is-dark .vc-am-pm button.active[data-v-63f66eaa]:hover {
          background: var(--accent-600);
}
.vc-is-dark .vc-am-pm button.active[data-v-63f66eaa]:focus {
          border-color: var(--accent-500);
}
`;pe(m0);Mr.render=p0;Mr.__scopeId="data-v-63f66eaa";var Mn={type:"auto",mask:"iso",timeAdjust:""},Ki={start:p({},Mn),end:p({},Mn)},Pn={DATE:"date",DATE_TIME:"datetime",TIME:"time"},ie={NONE:0,START:1,END:2,BOTH:3},g0={name:"DatePicker",emits:["update:modelValue","drag","dayclick","daykeydown","popover-will-show","popover-did-show","popover-will-hide","popover-did-hide"],render:function(){var e=this,n=function(s,l){if(!e.$slots.footer)return s;var c=[s,e.$slots.footer()];return l?D(l,c):c},r=function(){if(!e.dateParts)return null;var s=e.isRange?e.dateParts:[e.dateParts[0]];return D("div",{},p(p({},e.$slots),{},{default:function(){return s.map(function(c,u){return D(Mr,{modelValue:c,locale:e.$locale,theme:e.$theme,is24hr:e.is24hr,minuteIncrement:e.minuteIncrement,showBorder:!e.isTime,isDisabled:e.isDateTime&&!c.isValid||e.isDragging,"onUpdate:modelValue":function(d){return e.onTimeInput(d,u===0)}})})}}))},a=function(){return D(Vi,p(p({},e.$attrs),{},{attributes:e.attributes_,theme:e.$theme,locale:e.$locale,minDate:e.minDateExact||e.minDate,maxDate:e.maxDateExact||e.maxDate,disabledDates:e.disabledDates,availableDates:e.availableDates,onDayclick:e.onDayClick,onDaykeydown:e.onDayKeydown,onDaymouseenter:e.onDayMouseEnter,ref:"calendar"}),p(p({},e.$slots),{},{footer:function(){return e.isDateTime?n(r()):n()}}))},i=function(){return e.isTime?D("div",{class:["vc-container","vc-".concat(e.$theme.color),{"vc-is-dark":e.$theme.isDark}]},n(r(),"div")):a()};return this.$slots.default?D("div",[this.$slots.default(this.slotArgs),D(_n,{id:this.datePickerPopoverId,placement:"bottom-start",contentClass:"vc-container".concat(this.isDark?" vc-is-dark":""),"on-before-show":function(s){return e.$emit("popover-will-show",s)},"on-after-show":function(s){return e.$emit("popover-did-show",s)},"on-before-hide":function(s){return e.$emit("popover-will-hide",s)},"on-after-hide":function(s){return e.$emit("popover-did-hide",s)},ref:"popover"},{default:i})]):i()},mixins:[bi],props:{mode:{type:String,default:Pn.DATE},modelValue:{type:null,required:!0},modelConfig:{type:Object,default:function(){return p({},Mn)}},is24hr:Boolean,minuteIncrement:Number,isRequired:Boolean,isRange:Boolean,updateOnInput:{type:Boolean,default:Ee("datePicker.updateOnInput")},inputDebounce:{type:Number,default:Ee("datePicker.inputDebounce")},popover:{type:Object,default:function(){return{}}},dragAttribute:Object,selectAttribute:Object,attributes:Array},data:function(){return{value_:null,dateParts:null,activeDate:"",dragValue:null,inputValues:["",""],updateTimeout:null,watchValue:!0,datePickerPopoverId:cn()}},computed:{isDate:function(){return this.mode.toLowerCase()===Pn.DATE},isDateTime:function(){return this.mode.toLowerCase()===Pn.DATE_TIME},isTime:function(){return this.mode.toLowerCase()===Pn.TIME},isDragging:function(){return!!this.dragValue},modelConfig_:function(){return this.isRange?{start:p(p({},Ki.start),this.modelConfig.start||this.modelConfig),end:p(p({},Ki.end),this.modelConfig.end||this.modelConfig)}:p(p({},Mn),this.modelConfig)},inputMask:function(){var e=this.$locale.masks;return this.isTime?this.is24hr?e.inputTime24hr:e.inputTime:this.isDateTime?this.is24hr?e.inputDateTime24hr:e.inputDateTime:this.$locale.masks.input},inputMaskHasTime:function(){return/[Hh]/g.test(this.inputMask)},inputMaskHasDate:function(){return/[dD]{1,2}|Do|W{1,4}|M{1,4}|YY(?:YY)?/g.test(this.inputMask)},inputMaskPatch:function(){if(this.inputMaskHasTime&&this.inputMaskHasDate)return He.DATE_TIME;if(this.inputMaskHasDate)return He.DATE;if(this.inputMaskHasTime)return He.TIME},slotArgs:function(){var e=this,n=this.isRange,r=this.isDragging,a=this.updateValue,i=this.showPopover,o=this.hidePopover,s=this.togglePopover,l=n?{start:this.inputValues[0],end:this.inputValues[1]}:this.inputValues[0],c=[!0,!1].map(function(f){return p({input:e.onInputInput(f),change:e.onInputChange(f),keyup:e.onInputKeyup},gn(p(p({},e.popover_),{},{id:e.datePickerPopoverId,callback:function(v){v.action==="show"&&v.completed&&e.onInputShow(f)}})))}),u=n?{start:c[0],end:c[1]}:c[0];return{inputValue:l,inputEvents:u,isDragging:r,updateValue:a,showPopover:i,hidePopover:o,togglePopover:s,getPopoverTriggerEvents:gn}},popover_:function(){return xt(this.popover,Ee("datePicker.popover"))},selectAttribute_:function(){if(!this.hasValue(this.value_))return null;var e=p(p({key:"select-drag"},this.selectAttribute),{},{dates:this.value_,pinPage:!0}),n=e.dot,r=e.bar,a=e.highlight,i=e.content;return!n&&!r&&!a&&!i&&(e.highlight=!0),e},dragAttribute_:function(){if(!this.isRange||!this.hasValue(this.dragValue))return null;var e=p(p({key:"select-drag"},this.dragAttribute),{},{dates:this.dragValue}),n=e.dot,r=e.bar,a=e.highlight,i=e.content;return!n&&!r&&!a&&!i&&(e.highlight={startEnd:{fillMode:"outline"}}),e},attributes_:function(){var e=G(this.attributes)?Vt(this.attributes):[];return this.dragAttribute_?e.push(this.dragAttribute_):this.selectAttribute_&&e.push(this.selectAttribute_),e}},watch:{inputMask:function(){this.formatInput()},modelValue:function(e){!this.watchValue||this.forceUpdateValue(e,{config:this.modelConfig,notify:!1,formatInput:!0,hidePopover:!1})},value_:function(){this.refreshDateParts()},dragValue:function(){this.refreshDateParts()},timezone:function(){this.refreshDateParts(),this.forceUpdateValue(this.value_,{notify:!0,formatInput:!0})}},created:function(){this.forceUpdateValue(this.modelValue,{config:this.modelConfig_,notify:!1,formatInput:!0,hidePopover:!1}),this.refreshDateParts()},mounted:function(){var e=this;$(document,"keydown",this.onDocumentKeyDown),this.offTapOrClickHandler=Hi(document,function(n){document.body.contains(n.target)&&!Ot(e.$el,n.target)&&(e.dragValue=null,e.formatInput())})},beforeUnmount:function(){A(document,"keydown",this.onDocumentKeyDown),this.offTapOrClickHandler()},methods:{getDateParts:function(e){return this.$locale.getDateParts(e)},getDateFromParts:function(e){return this.$locale.getDateFromParts(e)},refreshDateParts:function(){var e=this,n=this.dragValue||this.value_,r=[];this.isRange?(n&&n.start?r.push(this.getDateParts(n.start)):r.push({}),n&&n.end?r.push(this.getDateParts(n.end)):r.push({})):n?r.push(this.getDateParts(n)):r.push({}),this.$nextTick(function(){return e.dateParts=r})},onDocumentKeyDown:function(e){this.dragValue&&e.key==="Escape"&&(this.dragValue=null)},onDayClick:function(e){this.handleDayClick(e),this.$emit("dayclick",e)},onDayKeydown:function(e){switch(e.event.key){case" ":case"Enter":{this.handleDayClick(e),e.event.preventDefault();break}case"Escape":this.hidePopover()}this.$emit("daykeydown",e)},handleDayClick:function(e){var n=this.popover_,r=n.keepVisibleOnInput,a=n.visibility,i={patch:He.DATE,adjustTime:!0,formatInput:!0,hidePopover:this.isDate&&!r&&a!=="visible"};this.isRange?(this.isDragging?this.dragTrackingValue.end=e.date:this.dragTrackingValue=p({},e.range),i.isDragging=!this.isDragging,i.rangePriority=i.isDragging?ie.NONE:ie.BOTH,i.hidePopover=i.hidePopover&&!i.isDragging,this.updateValue(this.dragTrackingValue,i)):(i.clearIfEqual=!this.isRequired,this.updateValue(e.date,i))},onDayMouseEnter:function(e){!this.isDragging||(this.dragTrackingValue.end=e.date,this.updateValue(this.dragTrackingValue,{patch:He.DATE,adjustTime:!0,formatInput:!0,hidePriority:!1,rangePriority:ie.NONE}))},onTimeInput:function(e,n){var r=this,a=null;if(this.isRange){var i=n?e:this.dateParts[0],o=n?this.dateParts[1]:e;a={start:i,end:o}}else a=e;this.updateValue(a,{patch:He.TIME,rangePriority:n?ie.START:ie.END}).then(function(){return r.adjustPageRange(n)})},onInputInput:function(e){var n=this;return function(r){!n.updateOnInput||n.onInputUpdate(r.target.value,e,{formatInput:!1,hidePopover:!1,debounce:n.inputDebounce})}},onInputChange:function(e){var n=this;return function(r){n.onInputUpdate(r.target.value,e,{formatInput:!0,hidePopover:!1})}},onInputUpdate:function(e,n,r){var a=this;this.inputValues.splice(n?0:1,1,e);var i=this.isRange?{start:this.inputValues[0],end:this.inputValues[1]||this.inputValues[0]}:e,o={type:"string",mask:this.inputMask};this.updateValue(i,p(p({},r),{},{config:o,patch:this.inputMaskPatch,rangePriority:n?ie.START:ie.END})).then(function(){return a.adjustPageRange(n)})},onInputShow:function(e){this.adjustPageRange(e)},onInputKeyup:function(e){e.key==="Escape"&&this.updateValue(this.value_,{formatInput:!0,hidePopover:!0})},updateValue:function(e){var n=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return clearTimeout(this.updateTimeout),new Promise(function(a){var i=r.debounce,o=lo(r,["debounce"]);i>0?n.updateTimeout=setTimeout(function(){n.forceUpdateValue(e,o),a(n.value_)},i):(n.forceUpdateValue(e,o),a(n.value_))})},forceUpdateValue:function(e){var n=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.config,i=a===void 0?this.modelConfig_:a,o=r.patch,s=o===void 0?He.DATE_TIME:o,l=r.notify,c=l===void 0?!0:l,u=r.clearIfEqual,f=u===void 0?!1:u,d=r.formatInput,v=d===void 0?!0:d,h=r.hidePopover,m=h===void 0?!1:h,g=r.adjustTime,w=g===void 0?!1:g,y=r.isDragging,_=y===void 0?this.isDragging:y,b=r.rangePriority,x=b===void 0?ie.BOTH:b,k=this.normalizeValue(e,i,s,x);!k&&this.isRequired&&(k=this.value_),w&&(k=this.adjustTimeForValue(k,i));var T=this.valueIsDisabled(k);if(T){if(_)return;k=this.value_,m=!1}var O=_?"dragValue":"value_",P=!this.valuesAreEqual(this[O],k);if(!T&&!P&&f&&(k=null,P=!0),P&&(this[O]=k,_||(this.dragValue=null)),c&&P){var S=this.denormalizeValue(k,this.dateConfig),F=this.isDragging?"drag":"update:modelValue";this.watchValue=!1,this.$emit(F,S),this.$nextTick(function(){return n.watchValue=!0})}m&&this.hidePopover(),v&&this.formatInput()},hasValue:function(e){return this.isRange?le(e)&&e.start&&e.end:!!e},normalizeValue:function(e,n,r,a){if(!this.hasValue(e))return null;if(this.isRange){var i={},o=e.start>e.end?e.end:e.start,s=this.value_&&this.value_.start||this.modelConfig_.start.fillDate,l=n.start||n;i.start=this.normalizeDate(o,p(p({},l),{},{fillDate:s,patch:r}));var c=e.start>e.end?e.start:e.end,u=this.value_&&this.value_.end||this.modelConfig_.end.fillDate,f=n.end||n;return i.end=this.normalizeDate(c,p(p({},f),{},{fillDate:u,patch:r})),this.sortRange(i,a)}return this.normalizeDate(e,p(p({},n),{},{fillDate:this.value_||this.modelConfig_.fillDate,patch:r}))},adjustTimeForValue:function(e,n){return this.hasValue(e)?this.isRange?{start:this.$locale.adjustTimeForDate(e.start,n.start||n),end:this.$locale.adjustTimeForDate(e.end,n.end||n)}:this.$locale.adjustTimeForDate(e,n):null},sortRange:function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:ie.NONE,r=e.start,a=e.end;if(r>a)switch(n){case ie.START:return{start:r,end:r};case ie.END:return{start:a,end:a};case ie.BOTH:return{start:a,end:r}}return{start:r,end:a}},denormalizeValue:function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.modelConfig_;return this.isRange?this.hasValue(e)?{start:this.$locale.denormalizeDate(e.start,n.start||n),end:this.$locale.denormalizeDate(e.end,n.end||n)}:null:this.$locale.denormalizeDate(e,n)},valuesAreEqual:function(e,n){if(this.isRange){var r=this.hasValue(e),a=this.hasValue(n);return!r&&!a?!0:r!==a?!1:or(e.start,n.start)&&or(e.end,n.end)}return or(e,n)},valueIsDisabled:function(e){return this.hasValue(e)&&this.disabledAttribute&&this.disabledAttribute.intersectsDate(e)},formatInput:function(){var e=this;this.$nextTick(function(){var n={type:"string",mask:e.inputMask},r=e.denormalizeValue(e.dragValue||e.value_,n);e.isRange?e.inputValues=[r&&r.start,r&&r.end]:e.inputValues=[r,""]})},showPopover:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};dr(p(p(p({ref:this.$el},this.popover_),e),{},{isInteractive:!0,id:this.datePickerPopoverId}))},hidePopover:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};vr(p(p(p({hideDelay:10},this.showPopover_),e),{},{id:this.datePickerPopoverId}))},togglePopover:function(e){wi(p(p(p({ref:this.$el},this.popover_),e),{},{isInteractive:!0,id:this.datePickerPopoverId}))},adjustPageRange:function(e){var n=this;this.$nextTick(function(){var r=n.$refs.calendar,a=n.getPageForValue(e),i=e?1:-1;a&&r&&!qa(a,r.firstPage,r.lastPage)&&r.move(a,{position:i,transition:"fade"})})},getPageForValue:function(e){return this.hasValue(this.value_)?this.pageForDate(this.isRange?this.value_[e?"start":"end"]:this.value_):null},move:function(e,n){return this.$refs.calendar?this.$refs.calendar.move(e,n):Promise.reject(new Error("Navigation disabled while calendar is not yet displayed"))},focusDate:function(e,n){return this.$refs.calendar?this.$refs.calendar.focusDate(e,n):Promise.reject(new Error("Navigation disabled while calendar is not yet displayed"))}}};function y0(t,e){var n=-1,r=Ze(t)?Array(t.length):[];return Ga(t,function(a,i,o){r[++n]=e(a,i,o)}),r}var b0=y0;function w0(t,e){var n=L(t)?Qt:b0;return n(t,qn(e))}var D0=w0,Gi=Object.freeze({__proto__:null,Calendar:Vi,DatePicker:g0,Popover:_n,PopoverRow:Wi});function k0(t){return _e(t)&&(t={min:t}),G(t)||(t=[t]),t.map(e=>Mt(e,"raw")?e.raw:D0(e,(n,r)=>(r=nt({min:"min-width",max:"max-width"},r,r),`(${r}: ${n})`)).join(" and ")).join(", ")}var x0={install:(t,e)=>{e=xt(e,window&&window.__screens__,yi);let n=!0;const r=Or({matches:[],queries:[]}),a=()=>{r.matches=Yt(r.queries).filter(o=>o[1].matches).map(o=>o[0])},i=()=>{!n||!window||!window.matchMedia||(r.queries=ti(e,o=>{const s=window.matchMedia(k0(o));return se(s.addEventListener)?s.addEventListener("change",a):s.addListener(a),s}),n=!1,a())};t.mixin({mounted(){i()},computed:{$screens(){return(o,s)=>r.matches.reduce((l,c)=>Mt(o,c)?o[c]:l,Qa(s)?o.default:s)}}})}},_0=(t,e)=>(e=gm(e),t.use(x0,e.screens),e);const T0=(t,e)=>{e=_0(t,e);for(const n in Gi){const r=Gi[n];t.component(`${e.componentPrefix}${r.name}`,r)}};export{Vi as Calendar,g0 as DatePicker,_n as Popover,Wi as PopoverRow,x0 as Screens,_0 as SetupCalendar,T0 as default};
