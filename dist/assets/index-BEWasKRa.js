(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function d_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var wy={exports:{}},Tc={},Sy={exports:{}},ve={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pa=Symbol.for("react.element"),h_=Symbol.for("react.portal"),f_=Symbol.for("react.fragment"),p_=Symbol.for("react.strict_mode"),m_=Symbol.for("react.profiler"),g_=Symbol.for("react.provider"),y_=Symbol.for("react.context"),v_=Symbol.for("react.forward_ref"),x_=Symbol.for("react.suspense"),__=Symbol.for("react.memo"),b_=Symbol.for("react.lazy"),Qp=Symbol.iterator;function w_(t){return t===null||typeof t!="object"?null:(t=Qp&&t[Qp]||t["@@iterator"],typeof t=="function"?t:null)}var Ey={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ry=Object.assign,Iy={};function Ls(t,e,n){this.props=t,this.context=e,this.refs=Iy,this.updater=n||Ey}Ls.prototype.isReactComponent={};Ls.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ls.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Ty(){}Ty.prototype=Ls.prototype;function Rh(t,e,n){this.props=t,this.context=e,this.refs=Iy,this.updater=n||Ey}var Ih=Rh.prototype=new Ty;Ih.constructor=Rh;Ry(Ih,Ls.prototype);Ih.isPureReactComponent=!0;var Yp=Array.isArray,ky=Object.prototype.hasOwnProperty,Th={current:null},Ay={key:!0,ref:!0,__self:!0,__source:!0};function jy(t,e,n){var r,i={},s=null,a=null;if(e!=null)for(r in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)ky.call(e,r)&&!Ay.hasOwnProperty(r)&&(i[r]=e[r]);var c=arguments.length-2;if(c===1)i.children=n;else if(1<c){for(var d=Array(c),f=0;f<c;f++)d[f]=arguments[f+2];i.children=d}if(t&&t.defaultProps)for(r in c=t.defaultProps,c)i[r]===void 0&&(i[r]=c[r]);return{$$typeof:pa,type:t,key:s,ref:a,props:i,_owner:Th.current}}function S_(t,e){return{$$typeof:pa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function kh(t){return typeof t=="object"&&t!==null&&t.$$typeof===pa}function E_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Xp=/\/+/g;function wu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?E_(""+t.key):e.toString(36)}function xl(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case pa:case h_:a=!0}}if(a)return a=t,i=i(a),t=r===""?"."+wu(a,0):r,Yp(i)?(n="",t!=null&&(n=t.replace(Xp,"$&/")+"/"),xl(i,e,n,"",function(f){return f})):i!=null&&(kh(i)&&(i=S_(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(Xp,"$&/")+"/")+t)),e.push(i)),1;if(a=0,r=r===""?".":r+":",Yp(t))for(var c=0;c<t.length;c++){s=t[c];var d=r+wu(s,c);a+=xl(s,e,n,d,i)}else if(d=w_(t),typeof d=="function")for(t=d.call(t),c=0;!(s=t.next()).done;)s=s.value,d=r+wu(s,c++),a+=xl(s,e,n,d,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function Ya(t,e,n){if(t==null)return t;var r=[],i=0;return xl(t,r,"","",function(s){return e.call(n,s,i++)}),r}function R_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Ft={current:null},_l={transition:null},I_={ReactCurrentDispatcher:Ft,ReactCurrentBatchConfig:_l,ReactCurrentOwner:Th};function Cy(){throw Error("act(...) is not supported in production builds of React.")}ve.Children={map:Ya,forEach:function(t,e,n){Ya(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ya(t,function(){e++}),e},toArray:function(t){return Ya(t,function(e){return e})||[]},only:function(t){if(!kh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ve.Component=Ls;ve.Fragment=f_;ve.Profiler=m_;ve.PureComponent=Rh;ve.StrictMode=p_;ve.Suspense=x_;ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=I_;ve.act=Cy;ve.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Ry({},t.props),i=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Th.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var c=t.type.defaultProps;for(d in e)ky.call(e,d)&&!Ay.hasOwnProperty(d)&&(r[d]=e[d]===void 0&&c!==void 0?c[d]:e[d])}var d=arguments.length-2;if(d===1)r.children=n;else if(1<d){c=Array(d);for(var f=0;f<d;f++)c[f]=arguments[f+2];r.children=c}return{$$typeof:pa,type:t.type,key:i,ref:s,props:r,_owner:a}};ve.createContext=function(t){return t={$$typeof:y_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:g_,_context:t},t.Consumer=t};ve.createElement=jy;ve.createFactory=function(t){var e=jy.bind(null,t);return e.type=t,e};ve.createRef=function(){return{current:null}};ve.forwardRef=function(t){return{$$typeof:v_,render:t}};ve.isValidElement=kh;ve.lazy=function(t){return{$$typeof:b_,_payload:{_status:-1,_result:t},_init:R_}};ve.memo=function(t,e){return{$$typeof:__,type:t,compare:e===void 0?null:e}};ve.startTransition=function(t){var e=_l.transition;_l.transition={};try{t()}finally{_l.transition=e}};ve.unstable_act=Cy;ve.useCallback=function(t,e){return Ft.current.useCallback(t,e)};ve.useContext=function(t){return Ft.current.useContext(t)};ve.useDebugValue=function(){};ve.useDeferredValue=function(t){return Ft.current.useDeferredValue(t)};ve.useEffect=function(t,e){return Ft.current.useEffect(t,e)};ve.useId=function(){return Ft.current.useId()};ve.useImperativeHandle=function(t,e,n){return Ft.current.useImperativeHandle(t,e,n)};ve.useInsertionEffect=function(t,e){return Ft.current.useInsertionEffect(t,e)};ve.useLayoutEffect=function(t,e){return Ft.current.useLayoutEffect(t,e)};ve.useMemo=function(t,e){return Ft.current.useMemo(t,e)};ve.useReducer=function(t,e,n){return Ft.current.useReducer(t,e,n)};ve.useRef=function(t){return Ft.current.useRef(t)};ve.useState=function(t){return Ft.current.useState(t)};ve.useSyncExternalStore=function(t,e,n){return Ft.current.useSyncExternalStore(t,e,n)};ve.useTransition=function(){return Ft.current.useTransition()};ve.version="18.3.1";Sy.exports=ve;var Se=Sy.exports;const T_=d_(Se);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var k_=Se,A_=Symbol.for("react.element"),j_=Symbol.for("react.fragment"),C_=Object.prototype.hasOwnProperty,D_=k_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,P_={key:!0,ref:!0,__self:!0,__source:!0};function Dy(t,e,n){var r,i={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(r in e)C_.call(e,r)&&!P_.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:A_,type:t,key:s,ref:a,props:i,_owner:D_.current}}Tc.Fragment=j_;Tc.jsx=Dy;Tc.jsxs=Dy;wy.exports=Tc;var o=wy.exports,ad={},Py={exports:{}},tn={},Ny={exports:{}},My={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(G,ae){var he=G.length;G.push(ae);e:for(;0<he;){var _e=he-1>>>1,Te=G[_e];if(0<i(Te,ae))G[_e]=ae,G[he]=Te,he=_e;else break e}}function n(G){return G.length===0?null:G[0]}function r(G){if(G.length===0)return null;var ae=G[0],he=G.pop();if(he!==ae){G[0]=he;e:for(var _e=0,Te=G.length,He=Te>>>1;_e<He;){var Tn=2*(_e+1)-1,St=G[Tn],rn=Tn+1,kn=G[rn];if(0>i(St,he))rn<Te&&0>i(kn,St)?(G[_e]=kn,G[rn]=he,_e=rn):(G[_e]=St,G[Tn]=he,_e=Tn);else if(rn<Te&&0>i(kn,he))G[_e]=kn,G[rn]=he,_e=rn;else break e}}return ae}function i(G,ae){var he=G.sortIndex-ae.sortIndex;return he!==0?he:G.id-ae.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,c=a.now();t.unstable_now=function(){return a.now()-c}}var d=[],f=[],g=1,v=null,_=3,A=!1,E=!1,V=!1,z=typeof setTimeout=="function"?setTimeout:null,T=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function I(G){for(var ae=n(f);ae!==null;){if(ae.callback===null)r(f);else if(ae.startTime<=G)r(f),ae.sortIndex=ae.expirationTime,e(d,ae);else break;ae=n(f)}}function M(G){if(V=!1,I(G),!E)if(n(d)!==null)E=!0,ti(F);else{var ae=n(f);ae!==null&&Qe(M,ae.startTime-G)}}function F(G,ae){E=!1,V&&(V=!1,T(x),x=-1),A=!0;var he=_;try{for(I(ae),v=n(d);v!==null&&(!(v.expirationTime>ae)||G&&!k());){var _e=v.callback;if(typeof _e=="function"){v.callback=null,_=v.priorityLevel;var Te=_e(v.expirationTime<=ae);ae=t.unstable_now(),typeof Te=="function"?v.callback=Te:v===n(d)&&r(d),I(ae)}else r(d);v=n(d)}if(v!==null)var He=!0;else{var Tn=n(f);Tn!==null&&Qe(M,Tn.startTime-ae),He=!1}return He}finally{v=null,_=he,A=!1}}var H=!1,w=null,x=-1,b=5,R=-1;function k(){return!(t.unstable_now()-R<b)}function j(){if(w!==null){var G=t.unstable_now();R=G;var ae=!0;try{ae=w(!0,G)}finally{ae?S():(H=!1,w=null)}}else H=!1}var S;if(typeof u=="function")S=function(){u(j)};else if(typeof MessageChannel<"u"){var zt=new MessageChannel,Bn=zt.port2;zt.port1.onmessage=j,S=function(){Bn.postMessage(null)}}else S=function(){z(j,0)};function ti(G){w=G,H||(H=!0,S())}function Qe(G,ae){x=z(function(){G(t.unstable_now())},ae)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(G){G.callback=null},t.unstable_continueExecution=function(){E||A||(E=!0,ti(F))},t.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<G?Math.floor(1e3/G):5},t.unstable_getCurrentPriorityLevel=function(){return _},t.unstable_getFirstCallbackNode=function(){return n(d)},t.unstable_next=function(G){switch(_){case 1:case 2:case 3:var ae=3;break;default:ae=_}var he=_;_=ae;try{return G()}finally{_=he}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(G,ae){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var he=_;_=G;try{return ae()}finally{_=he}},t.unstable_scheduleCallback=function(G,ae,he){var _e=t.unstable_now();switch(typeof he=="object"&&he!==null?(he=he.delay,he=typeof he=="number"&&0<he?_e+he:_e):he=_e,G){case 1:var Te=-1;break;case 2:Te=250;break;case 5:Te=1073741823;break;case 4:Te=1e4;break;default:Te=5e3}return Te=he+Te,G={id:g++,callback:ae,priorityLevel:G,startTime:he,expirationTime:Te,sortIndex:-1},he>_e?(G.sortIndex=he,e(f,G),n(d)===null&&G===n(f)&&(V?(T(x),x=-1):V=!0,Qe(M,he-_e))):(G.sortIndex=Te,e(d,G),E||A||(E=!0,ti(F))),G},t.unstable_shouldYield=k,t.unstable_wrapCallback=function(G){var ae=_;return function(){var he=_;_=ae;try{return G.apply(this,arguments)}finally{_=he}}}})(My);Ny.exports=My;var N_=Ny.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var M_=Se,en=N_;function W(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ly=new Set,zo={};function Ni(t,e){bs(t,e),bs(t+"Capture",e)}function bs(t,e){for(zo[t]=e,t=0;t<e.length;t++)Ly.add(e[t])}var nr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ld=Object.prototype.hasOwnProperty,L_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Jp={},Zp={};function V_(t){return ld.call(Zp,t)?!0:ld.call(Jp,t)?!1:L_.test(t)?Zp[t]=!0:(Jp[t]=!0,!1)}function O_(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function F_(t,e,n,r){if(e===null||typeof e>"u"||O_(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Ut(t,e,n,r,i,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var bt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){bt[t]=new Ut(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];bt[e]=new Ut(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){bt[t]=new Ut(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){bt[t]=new Ut(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){bt[t]=new Ut(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){bt[t]=new Ut(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){bt[t]=new Ut(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){bt[t]=new Ut(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){bt[t]=new Ut(t,5,!1,t.toLowerCase(),null,!1,!1)});var Ah=/[\-:]([a-z])/g;function jh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Ah,jh);bt[e]=new Ut(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Ah,jh);bt[e]=new Ut(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Ah,jh);bt[e]=new Ut(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){bt[t]=new Ut(t,1,!1,t.toLowerCase(),null,!1,!1)});bt.xlinkHref=new Ut("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){bt[t]=new Ut(t,1,!1,t.toLowerCase(),null,!0,!0)});function Ch(t,e,n,r){var i=bt.hasOwnProperty(e)?bt[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(F_(e,n,i,r)&&(n=null),r||i===null?V_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var dr=M_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Xa=Symbol.for("react.element"),Ji=Symbol.for("react.portal"),Zi=Symbol.for("react.fragment"),Dh=Symbol.for("react.strict_mode"),cd=Symbol.for("react.profiler"),Vy=Symbol.for("react.provider"),Oy=Symbol.for("react.context"),Ph=Symbol.for("react.forward_ref"),ud=Symbol.for("react.suspense"),dd=Symbol.for("react.suspense_list"),Nh=Symbol.for("react.memo"),_r=Symbol.for("react.lazy"),Fy=Symbol.for("react.offscreen"),em=Symbol.iterator;function ao(t){return t===null||typeof t!="object"?null:(t=em&&t[em]||t["@@iterator"],typeof t=="function"?t:null)}var $e=Object.assign,Su;function yo(t){if(Su===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Su=e&&e[1]||""}return`
`+Su+t}var Eu=!1;function Ru(t,e){if(!t||Eu)return"";Eu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(f){var r=f}Reflect.construct(t,[],e)}else{try{e.call()}catch(f){r=f}t.call(e.prototype)}else{try{throw Error()}catch(f){r=f}t()}}catch(f){if(f&&r&&typeof f.stack=="string"){for(var i=f.stack.split(`
`),s=r.stack.split(`
`),a=i.length-1,c=s.length-1;1<=a&&0<=c&&i[a]!==s[c];)c--;for(;1<=a&&0<=c;a--,c--)if(i[a]!==s[c]){if(a!==1||c!==1)do if(a--,c--,0>c||i[a]!==s[c]){var d=`
`+i[a].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=a&&0<=c);break}}}finally{Eu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?yo(t):""}function U_(t){switch(t.tag){case 5:return yo(t.type);case 16:return yo("Lazy");case 13:return yo("Suspense");case 19:return yo("SuspenseList");case 0:case 2:case 15:return t=Ru(t.type,!1),t;case 11:return t=Ru(t.type.render,!1),t;case 1:return t=Ru(t.type,!0),t;default:return""}}function hd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Zi:return"Fragment";case Ji:return"Portal";case cd:return"Profiler";case Dh:return"StrictMode";case ud:return"Suspense";case dd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Oy:return(t.displayName||"Context")+".Consumer";case Vy:return(t._context.displayName||"Context")+".Provider";case Ph:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Nh:return e=t.displayName||null,e!==null?e:hd(t.type)||"Memo";case _r:e=t._payload,t=t._init;try{return hd(t(e))}catch{}}return null}function z_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return hd(e);case 8:return e===Dh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Br(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Uy(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function q_(t){var e=Uy(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ja(t){t._valueTracker||(t._valueTracker=q_(t))}function zy(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Uy(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Ul(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function fd(t,e){var n=e.checked;return $e({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function tm(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Br(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function qy(t,e){e=e.checked,e!=null&&Ch(t,"checked",e,!1)}function pd(t,e){qy(t,e);var n=Br(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?md(t,e.type,n):e.hasOwnProperty("defaultValue")&&md(t,e.type,Br(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function nm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function md(t,e,n){(e!=="number"||Ul(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var vo=Array.isArray;function ds(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Br(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function gd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(W(91));return $e({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function rm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(W(92));if(vo(n)){if(1<n.length)throw Error(W(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Br(n)}}function By(t,e){var n=Br(e.value),r=Br(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function im(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function $y(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function yd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?$y(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Za,Wy=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Za=Za||document.createElement("div"),Za.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Za.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function qo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var To={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},B_=["Webkit","ms","Moz","O"];Object.keys(To).forEach(function(t){B_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),To[e]=To[t]})});function Hy(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||To.hasOwnProperty(t)&&To[t]?(""+e).trim():e+"px"}function Ky(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Hy(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var $_=$e({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function vd(t,e){if(e){if($_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(W(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(W(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(W(61))}if(e.style!=null&&typeof e.style!="object")throw Error(W(62))}}function xd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _d=null;function Mh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var bd=null,hs=null,fs=null;function sm(t){if(t=ya(t)){if(typeof bd!="function")throw Error(W(280));var e=t.stateNode;e&&(e=Dc(e),bd(t.stateNode,t.type,e))}}function Gy(t){hs?fs?fs.push(t):fs=[t]:hs=t}function Qy(){if(hs){var t=hs,e=fs;if(fs=hs=null,sm(t),e)for(t=0;t<e.length;t++)sm(e[t])}}function Yy(t,e){return t(e)}function Xy(){}var Iu=!1;function Jy(t,e,n){if(Iu)return t(e,n);Iu=!0;try{return Yy(t,e,n)}finally{Iu=!1,(hs!==null||fs!==null)&&(Xy(),Qy())}}function Bo(t,e){var n=t.stateNode;if(n===null)return null;var r=Dc(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(W(231,e,typeof n));return n}var wd=!1;if(nr)try{var lo={};Object.defineProperty(lo,"passive",{get:function(){wd=!0}}),window.addEventListener("test",lo,lo),window.removeEventListener("test",lo,lo)}catch{wd=!1}function W_(t,e,n,r,i,s,a,c,d){var f=Array.prototype.slice.call(arguments,3);try{e.apply(n,f)}catch(g){this.onError(g)}}var ko=!1,zl=null,ql=!1,Sd=null,H_={onError:function(t){ko=!0,zl=t}};function K_(t,e,n,r,i,s,a,c,d){ko=!1,zl=null,W_.apply(H_,arguments)}function G_(t,e,n,r,i,s,a,c,d){if(K_.apply(this,arguments),ko){if(ko){var f=zl;ko=!1,zl=null}else throw Error(W(198));ql||(ql=!0,Sd=f)}}function Mi(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Zy(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function om(t){if(Mi(t)!==t)throw Error(W(188))}function Q_(t){var e=t.alternate;if(!e){if(e=Mi(t),e===null)throw Error(W(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return om(i),t;if(s===r)return om(i),e;s=s.sibling}throw Error(W(188))}if(n.return!==r.return)n=i,r=s;else{for(var a=!1,c=i.child;c;){if(c===n){a=!0,n=i,r=s;break}if(c===r){a=!0,r=i,n=s;break}c=c.sibling}if(!a){for(c=s.child;c;){if(c===n){a=!0,n=s,r=i;break}if(c===r){a=!0,r=s,n=i;break}c=c.sibling}if(!a)throw Error(W(189))}}if(n.alternate!==r)throw Error(W(190))}if(n.tag!==3)throw Error(W(188));return n.stateNode.current===n?t:e}function ev(t){return t=Q_(t),t!==null?tv(t):null}function tv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=tv(t);if(e!==null)return e;t=t.sibling}return null}var nv=en.unstable_scheduleCallback,am=en.unstable_cancelCallback,Y_=en.unstable_shouldYield,X_=en.unstable_requestPaint,Je=en.unstable_now,J_=en.unstable_getCurrentPriorityLevel,Lh=en.unstable_ImmediatePriority,rv=en.unstable_UserBlockingPriority,Bl=en.unstable_NormalPriority,Z_=en.unstable_LowPriority,iv=en.unstable_IdlePriority,kc=null,Ln=null;function eb(t){if(Ln&&typeof Ln.onCommitFiberRoot=="function")try{Ln.onCommitFiberRoot(kc,t,void 0,(t.current.flags&128)===128)}catch{}}var wn=Math.clz32?Math.clz32:rb,tb=Math.log,nb=Math.LN2;function rb(t){return t>>>=0,t===0?32:31-(tb(t)/nb|0)|0}var el=64,tl=4194304;function xo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function $l(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var c=a&~i;c!==0?r=xo(c):(s&=a,s!==0&&(r=xo(s)))}else a=n&~i,a!==0?r=xo(a):s!==0&&(r=xo(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-wn(e),i=1<<n,r|=t[n],e&=~i;return r}function ib(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function sb(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-wn(s),c=1<<a,d=i[a];d===-1?(!(c&n)||c&r)&&(i[a]=ib(c,e)):d<=e&&(t.expiredLanes|=c),s&=~c}}function Ed(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function sv(){var t=el;return el<<=1,!(el&4194240)&&(el=64),t}function Tu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ma(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-wn(e),t[e]=n}function ob(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-wn(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function Vh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-wn(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ke=0;function ov(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var av,Oh,lv,cv,uv,Rd=!1,nl=[],Cr=null,Dr=null,Pr=null,$o=new Map,Wo=new Map,wr=[],ab="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function lm(t,e){switch(t){case"focusin":case"focusout":Cr=null;break;case"dragenter":case"dragleave":Dr=null;break;case"mouseover":case"mouseout":Pr=null;break;case"pointerover":case"pointerout":$o.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wo.delete(e.pointerId)}}function co(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=ya(e),e!==null&&Oh(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function lb(t,e,n,r,i){switch(e){case"focusin":return Cr=co(Cr,t,e,n,r,i),!0;case"dragenter":return Dr=co(Dr,t,e,n,r,i),!0;case"mouseover":return Pr=co(Pr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return $o.set(s,co($o.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Wo.set(s,co(Wo.get(s)||null,t,e,n,r,i)),!0}return!1}function dv(t){var e=gi(t.target);if(e!==null){var n=Mi(e);if(n!==null){if(e=n.tag,e===13){if(e=Zy(n),e!==null){t.blockedOn=e,uv(t.priority,function(){lv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function bl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Id(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);_d=r,n.target.dispatchEvent(r),_d=null}else return e=ya(n),e!==null&&Oh(e),t.blockedOn=n,!1;e.shift()}return!0}function cm(t,e,n){bl(t)&&n.delete(e)}function cb(){Rd=!1,Cr!==null&&bl(Cr)&&(Cr=null),Dr!==null&&bl(Dr)&&(Dr=null),Pr!==null&&bl(Pr)&&(Pr=null),$o.forEach(cm),Wo.forEach(cm)}function uo(t,e){t.blockedOn===e&&(t.blockedOn=null,Rd||(Rd=!0,en.unstable_scheduleCallback(en.unstable_NormalPriority,cb)))}function Ho(t){function e(i){return uo(i,t)}if(0<nl.length){uo(nl[0],t);for(var n=1;n<nl.length;n++){var r=nl[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Cr!==null&&uo(Cr,t),Dr!==null&&uo(Dr,t),Pr!==null&&uo(Pr,t),$o.forEach(e),Wo.forEach(e),n=0;n<wr.length;n++)r=wr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<wr.length&&(n=wr[0],n.blockedOn===null);)dv(n),n.blockedOn===null&&wr.shift()}var ps=dr.ReactCurrentBatchConfig,Wl=!0;function ub(t,e,n,r){var i=ke,s=ps.transition;ps.transition=null;try{ke=1,Fh(t,e,n,r)}finally{ke=i,ps.transition=s}}function db(t,e,n,r){var i=ke,s=ps.transition;ps.transition=null;try{ke=4,Fh(t,e,n,r)}finally{ke=i,ps.transition=s}}function Fh(t,e,n,r){if(Wl){var i=Id(t,e,n,r);if(i===null)Vu(t,e,r,Hl,n),lm(t,r);else if(lb(i,t,e,n,r))r.stopPropagation();else if(lm(t,r),e&4&&-1<ab.indexOf(t)){for(;i!==null;){var s=ya(i);if(s!==null&&av(s),s=Id(t,e,n,r),s===null&&Vu(t,e,r,Hl,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Vu(t,e,r,null,n)}}var Hl=null;function Id(t,e,n,r){if(Hl=null,t=Mh(r),t=gi(t),t!==null)if(e=Mi(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Zy(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Hl=t,null}function hv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(J_()){case Lh:return 1;case rv:return 4;case Bl:case Z_:return 16;case iv:return 536870912;default:return 16}default:return 16}}var kr=null,Uh=null,wl=null;function fv(){if(wl)return wl;var t,e=Uh,n=e.length,r,i="value"in kr?kr.value:kr.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var a=n-t;for(r=1;r<=a&&e[n-r]===i[s-r];r++);return wl=i.slice(t,1<r?1-r:void 0)}function Sl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function rl(){return!0}function um(){return!1}function nn(t){function e(n,r,i,s,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var c in t)t.hasOwnProperty(c)&&(n=t[c],this[c]=n?n(s):s[c]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?rl:um,this.isPropagationStopped=um,this}return $e(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=rl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=rl)},persist:function(){},isPersistent:rl}),e}var Vs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zh=nn(Vs),ga=$e({},Vs,{view:0,detail:0}),hb=nn(ga),ku,Au,ho,Ac=$e({},ga,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ho&&(ho&&t.type==="mousemove"?(ku=t.screenX-ho.screenX,Au=t.screenY-ho.screenY):Au=ku=0,ho=t),ku)},movementY:function(t){return"movementY"in t?t.movementY:Au}}),dm=nn(Ac),fb=$e({},Ac,{dataTransfer:0}),pb=nn(fb),mb=$e({},ga,{relatedTarget:0}),ju=nn(mb),gb=$e({},Vs,{animationName:0,elapsedTime:0,pseudoElement:0}),yb=nn(gb),vb=$e({},Vs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),xb=nn(vb),_b=$e({},Vs,{data:0}),hm=nn(_b),bb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},wb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Sb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Eb(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Sb[t])?!!e[t]:!1}function qh(){return Eb}var Rb=$e({},ga,{key:function(t){if(t.key){var e=bb[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Sl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?wb[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qh,charCode:function(t){return t.type==="keypress"?Sl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Sl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Ib=nn(Rb),Tb=$e({},Ac,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),fm=nn(Tb),kb=$e({},ga,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qh}),Ab=nn(kb),jb=$e({},Vs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Cb=nn(jb),Db=$e({},Ac,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Pb=nn(Db),Nb=[9,13,27,32],Bh=nr&&"CompositionEvent"in window,Ao=null;nr&&"documentMode"in document&&(Ao=document.documentMode);var Mb=nr&&"TextEvent"in window&&!Ao,pv=nr&&(!Bh||Ao&&8<Ao&&11>=Ao),pm=" ",mm=!1;function mv(t,e){switch(t){case"keyup":return Nb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function gv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var es=!1;function Lb(t,e){switch(t){case"compositionend":return gv(e);case"keypress":return e.which!==32?null:(mm=!0,pm);case"textInput":return t=e.data,t===pm&&mm?null:t;default:return null}}function Vb(t,e){if(es)return t==="compositionend"||!Bh&&mv(t,e)?(t=fv(),wl=Uh=kr=null,es=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return pv&&e.locale!=="ko"?null:e.data;default:return null}}var Ob={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Ob[t.type]:e==="textarea"}function yv(t,e,n,r){Gy(r),e=Kl(e,"onChange"),0<e.length&&(n=new zh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var jo=null,Ko=null;function Fb(t){kv(t,0)}function jc(t){var e=rs(t);if(zy(e))return t}function Ub(t,e){if(t==="change")return e}var vv=!1;if(nr){var Cu;if(nr){var Du="oninput"in document;if(!Du){var ym=document.createElement("div");ym.setAttribute("oninput","return;"),Du=typeof ym.oninput=="function"}Cu=Du}else Cu=!1;vv=Cu&&(!document.documentMode||9<document.documentMode)}function vm(){jo&&(jo.detachEvent("onpropertychange",xv),Ko=jo=null)}function xv(t){if(t.propertyName==="value"&&jc(Ko)){var e=[];yv(e,Ko,t,Mh(t)),Jy(Fb,e)}}function zb(t,e,n){t==="focusin"?(vm(),jo=e,Ko=n,jo.attachEvent("onpropertychange",xv)):t==="focusout"&&vm()}function qb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return jc(Ko)}function Bb(t,e){if(t==="click")return jc(e)}function $b(t,e){if(t==="input"||t==="change")return jc(e)}function Wb(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var En=typeof Object.is=="function"?Object.is:Wb;function Go(t,e){if(En(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ld.call(e,i)||!En(t[i],e[i]))return!1}return!0}function xm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function _m(t,e){var n=xm(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=xm(n)}}function _v(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?_v(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function bv(){for(var t=window,e=Ul();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ul(t.document)}return e}function $h(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Hb(t){var e=bv(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&_v(n.ownerDocument.documentElement,n)){if(r!==null&&$h(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=_m(n,s);var a=_m(n,r);i&&a&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Kb=nr&&"documentMode"in document&&11>=document.documentMode,ts=null,Td=null,Co=null,kd=!1;function bm(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;kd||ts==null||ts!==Ul(r)||(r=ts,"selectionStart"in r&&$h(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Co&&Go(Co,r)||(Co=r,r=Kl(Td,"onSelect"),0<r.length&&(e=new zh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=ts)))}function il(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ns={animationend:il("Animation","AnimationEnd"),animationiteration:il("Animation","AnimationIteration"),animationstart:il("Animation","AnimationStart"),transitionend:il("Transition","TransitionEnd")},Pu={},wv={};nr&&(wv=document.createElement("div").style,"AnimationEvent"in window||(delete ns.animationend.animation,delete ns.animationiteration.animation,delete ns.animationstart.animation),"TransitionEvent"in window||delete ns.transitionend.transition);function Cc(t){if(Pu[t])return Pu[t];if(!ns[t])return t;var e=ns[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in wv)return Pu[t]=e[n];return t}var Sv=Cc("animationend"),Ev=Cc("animationiteration"),Rv=Cc("animationstart"),Iv=Cc("transitionend"),Tv=new Map,wm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Gr(t,e){Tv.set(t,e),Ni(e,[t])}for(var Nu=0;Nu<wm.length;Nu++){var Mu=wm[Nu],Gb=Mu.toLowerCase(),Qb=Mu[0].toUpperCase()+Mu.slice(1);Gr(Gb,"on"+Qb)}Gr(Sv,"onAnimationEnd");Gr(Ev,"onAnimationIteration");Gr(Rv,"onAnimationStart");Gr("dblclick","onDoubleClick");Gr("focusin","onFocus");Gr("focusout","onBlur");Gr(Iv,"onTransitionEnd");bs("onMouseEnter",["mouseout","mouseover"]);bs("onMouseLeave",["mouseout","mouseover"]);bs("onPointerEnter",["pointerout","pointerover"]);bs("onPointerLeave",["pointerout","pointerover"]);Ni("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ni("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ni("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ni("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ni("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ni("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var _o="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Yb=new Set("cancel close invalid load scroll toggle".split(" ").concat(_o));function Sm(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,G_(r,e,void 0,t),t.currentTarget=null}function kv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var a=r.length-1;0<=a;a--){var c=r[a],d=c.instance,f=c.currentTarget;if(c=c.listener,d!==s&&i.isPropagationStopped())break e;Sm(i,c,f),s=d}else for(a=0;a<r.length;a++){if(c=r[a],d=c.instance,f=c.currentTarget,c=c.listener,d!==s&&i.isPropagationStopped())break e;Sm(i,c,f),s=d}}}if(ql)throw t=Sd,ql=!1,Sd=null,t}function Me(t,e){var n=e[Pd];n===void 0&&(n=e[Pd]=new Set);var r=t+"__bubble";n.has(r)||(Av(e,t,2,!1),n.add(r))}function Lu(t,e,n){var r=0;e&&(r|=4),Av(n,t,r,e)}var sl="_reactListening"+Math.random().toString(36).slice(2);function Qo(t){if(!t[sl]){t[sl]=!0,Ly.forEach(function(n){n!=="selectionchange"&&(Yb.has(n)||Lu(n,!1,t),Lu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[sl]||(e[sl]=!0,Lu("selectionchange",!1,e))}}function Av(t,e,n,r){switch(hv(e)){case 1:var i=ub;break;case 4:i=db;break;default:i=Fh}n=i.bind(null,e,n,t),i=void 0,!wd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Vu(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var c=r.stateNode.containerInfo;if(c===i||c.nodeType===8&&c.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var d=a.tag;if((d===3||d===4)&&(d=a.stateNode.containerInfo,d===i||d.nodeType===8&&d.parentNode===i))return;a=a.return}for(;c!==null;){if(a=gi(c),a===null)return;if(d=a.tag,d===5||d===6){r=s=a;continue e}c=c.parentNode}}r=r.return}Jy(function(){var f=s,g=Mh(n),v=[];e:{var _=Tv.get(t);if(_!==void 0){var A=zh,E=t;switch(t){case"keypress":if(Sl(n)===0)break e;case"keydown":case"keyup":A=Ib;break;case"focusin":E="focus",A=ju;break;case"focusout":E="blur",A=ju;break;case"beforeblur":case"afterblur":A=ju;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":A=dm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":A=pb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":A=Ab;break;case Sv:case Ev:case Rv:A=yb;break;case Iv:A=Cb;break;case"scroll":A=hb;break;case"wheel":A=Pb;break;case"copy":case"cut":case"paste":A=xb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":A=fm}var V=(e&4)!==0,z=!V&&t==="scroll",T=V?_!==null?_+"Capture":null:_;V=[];for(var u=f,I;u!==null;){I=u;var M=I.stateNode;if(I.tag===5&&M!==null&&(I=M,T!==null&&(M=Bo(u,T),M!=null&&V.push(Yo(u,M,I)))),z)break;u=u.return}0<V.length&&(_=new A(_,E,null,n,g),v.push({event:_,listeners:V}))}}if(!(e&7)){e:{if(_=t==="mouseover"||t==="pointerover",A=t==="mouseout"||t==="pointerout",_&&n!==_d&&(E=n.relatedTarget||n.fromElement)&&(gi(E)||E[rr]))break e;if((A||_)&&(_=g.window===g?g:(_=g.ownerDocument)?_.defaultView||_.parentWindow:window,A?(E=n.relatedTarget||n.toElement,A=f,E=E?gi(E):null,E!==null&&(z=Mi(E),E!==z||E.tag!==5&&E.tag!==6)&&(E=null)):(A=null,E=f),A!==E)){if(V=dm,M="onMouseLeave",T="onMouseEnter",u="mouse",(t==="pointerout"||t==="pointerover")&&(V=fm,M="onPointerLeave",T="onPointerEnter",u="pointer"),z=A==null?_:rs(A),I=E==null?_:rs(E),_=new V(M,u+"leave",A,n,g),_.target=z,_.relatedTarget=I,M=null,gi(g)===f&&(V=new V(T,u+"enter",E,n,g),V.target=I,V.relatedTarget=z,M=V),z=M,A&&E)t:{for(V=A,T=E,u=0,I=V;I;I=Ki(I))u++;for(I=0,M=T;M;M=Ki(M))I++;for(;0<u-I;)V=Ki(V),u--;for(;0<I-u;)T=Ki(T),I--;for(;u--;){if(V===T||T!==null&&V===T.alternate)break t;V=Ki(V),T=Ki(T)}V=null}else V=null;A!==null&&Em(v,_,A,V,!1),E!==null&&z!==null&&Em(v,z,E,V,!0)}}e:{if(_=f?rs(f):window,A=_.nodeName&&_.nodeName.toLowerCase(),A==="select"||A==="input"&&_.type==="file")var F=Ub;else if(gm(_))if(vv)F=$b;else{F=qb;var H=zb}else(A=_.nodeName)&&A.toLowerCase()==="input"&&(_.type==="checkbox"||_.type==="radio")&&(F=Bb);if(F&&(F=F(t,f))){yv(v,F,n,g);break e}H&&H(t,_,f),t==="focusout"&&(H=_._wrapperState)&&H.controlled&&_.type==="number"&&md(_,"number",_.value)}switch(H=f?rs(f):window,t){case"focusin":(gm(H)||H.contentEditable==="true")&&(ts=H,Td=f,Co=null);break;case"focusout":Co=Td=ts=null;break;case"mousedown":kd=!0;break;case"contextmenu":case"mouseup":case"dragend":kd=!1,bm(v,n,g);break;case"selectionchange":if(Kb)break;case"keydown":case"keyup":bm(v,n,g)}var w;if(Bh)e:{switch(t){case"compositionstart":var x="onCompositionStart";break e;case"compositionend":x="onCompositionEnd";break e;case"compositionupdate":x="onCompositionUpdate";break e}x=void 0}else es?mv(t,n)&&(x="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(x="onCompositionStart");x&&(pv&&n.locale!=="ko"&&(es||x!=="onCompositionStart"?x==="onCompositionEnd"&&es&&(w=fv()):(kr=g,Uh="value"in kr?kr.value:kr.textContent,es=!0)),H=Kl(f,x),0<H.length&&(x=new hm(x,t,null,n,g),v.push({event:x,listeners:H}),w?x.data=w:(w=gv(n),w!==null&&(x.data=w)))),(w=Mb?Lb(t,n):Vb(t,n))&&(f=Kl(f,"onBeforeInput"),0<f.length&&(g=new hm("onBeforeInput","beforeinput",null,n,g),v.push({event:g,listeners:f}),g.data=w))}kv(v,e)})}function Yo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Kl(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Bo(t,n),s!=null&&r.unshift(Yo(t,s,i)),s=Bo(t,e),s!=null&&r.push(Yo(t,s,i))),t=t.return}return r}function Ki(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Em(t,e,n,r,i){for(var s=e._reactName,a=[];n!==null&&n!==r;){var c=n,d=c.alternate,f=c.stateNode;if(d!==null&&d===r)break;c.tag===5&&f!==null&&(c=f,i?(d=Bo(n,s),d!=null&&a.unshift(Yo(n,d,c))):i||(d=Bo(n,s),d!=null&&a.push(Yo(n,d,c)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Xb=/\r\n?/g,Jb=/\u0000|\uFFFD/g;function Rm(t){return(typeof t=="string"?t:""+t).replace(Xb,`
`).replace(Jb,"")}function ol(t,e,n){if(e=Rm(e),Rm(t)!==e&&n)throw Error(W(425))}function Gl(){}var Ad=null,jd=null;function Cd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Dd=typeof setTimeout=="function"?setTimeout:void 0,Zb=typeof clearTimeout=="function"?clearTimeout:void 0,Im=typeof Promise=="function"?Promise:void 0,ew=typeof queueMicrotask=="function"?queueMicrotask:typeof Im<"u"?function(t){return Im.resolve(null).then(t).catch(tw)}:Dd;function tw(t){setTimeout(function(){throw t})}function Ou(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),Ho(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Ho(e)}function Nr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Tm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Os=Math.random().toString(36).slice(2),Nn="__reactFiber$"+Os,Xo="__reactProps$"+Os,rr="__reactContainer$"+Os,Pd="__reactEvents$"+Os,nw="__reactListeners$"+Os,rw="__reactHandles$"+Os;function gi(t){var e=t[Nn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[rr]||n[Nn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Tm(t);t!==null;){if(n=t[Nn])return n;t=Tm(t)}return e}t=n,n=t.parentNode}return null}function ya(t){return t=t[Nn]||t[rr],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function rs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(W(33))}function Dc(t){return t[Xo]||null}var Nd=[],is=-1;function Qr(t){return{current:t}}function Oe(t){0>is||(t.current=Nd[is],Nd[is]=null,is--)}function De(t,e){is++,Nd[is]=t.current,t.current=e}var $r={},Pt=Qr($r),Wt=Qr(!1),Si=$r;function ws(t,e){var n=t.type.contextTypes;if(!n)return $r;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Ht(t){return t=t.childContextTypes,t!=null}function Ql(){Oe(Wt),Oe(Pt)}function km(t,e,n){if(Pt.current!==$r)throw Error(W(168));De(Pt,e),De(Wt,n)}function jv(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(W(108,z_(t)||"Unknown",i));return $e({},n,r)}function Yl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||$r,Si=Pt.current,De(Pt,t),De(Wt,Wt.current),!0}function Am(t,e,n){var r=t.stateNode;if(!r)throw Error(W(169));n?(t=jv(t,e,Si),r.__reactInternalMemoizedMergedChildContext=t,Oe(Wt),Oe(Pt),De(Pt,t)):Oe(Wt),De(Wt,n)}var Kn=null,Pc=!1,Fu=!1;function Cv(t){Kn===null?Kn=[t]:Kn.push(t)}function iw(t){Pc=!0,Cv(t)}function Yr(){if(!Fu&&Kn!==null){Fu=!0;var t=0,e=ke;try{var n=Kn;for(ke=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Kn=null,Pc=!1}catch(i){throw Kn!==null&&(Kn=Kn.slice(t+1)),nv(Lh,Yr),i}finally{ke=e,Fu=!1}}return null}var ss=[],os=0,Xl=null,Jl=0,an=[],ln=0,Ei=null,Gn=1,Qn="";function fi(t,e){ss[os++]=Jl,ss[os++]=Xl,Xl=t,Jl=e}function Dv(t,e,n){an[ln++]=Gn,an[ln++]=Qn,an[ln++]=Ei,Ei=t;var r=Gn;t=Qn;var i=32-wn(r)-1;r&=~(1<<i),n+=1;var s=32-wn(e)+i;if(30<s){var a=i-i%5;s=(r&(1<<a)-1).toString(32),r>>=a,i-=a,Gn=1<<32-wn(e)+i|n<<i|r,Qn=s+t}else Gn=1<<s|n<<i|r,Qn=t}function Wh(t){t.return!==null&&(fi(t,1),Dv(t,1,0))}function Hh(t){for(;t===Xl;)Xl=ss[--os],ss[os]=null,Jl=ss[--os],ss[os]=null;for(;t===Ei;)Ei=an[--ln],an[ln]=null,Qn=an[--ln],an[ln]=null,Gn=an[--ln],an[ln]=null}var Zt=null,Xt=null,ze=!1,bn=null;function Pv(t,e){var n=cn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function jm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Zt=t,Xt=Nr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Zt=t,Xt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ei!==null?{id:Gn,overflow:Qn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=cn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Zt=t,Xt=null,!0):!1;default:return!1}}function Md(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ld(t){if(ze){var e=Xt;if(e){var n=e;if(!jm(t,e)){if(Md(t))throw Error(W(418));e=Nr(n.nextSibling);var r=Zt;e&&jm(t,e)?Pv(r,n):(t.flags=t.flags&-4097|2,ze=!1,Zt=t)}}else{if(Md(t))throw Error(W(418));t.flags=t.flags&-4097|2,ze=!1,Zt=t}}}function Cm(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Zt=t}function al(t){if(t!==Zt)return!1;if(!ze)return Cm(t),ze=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Cd(t.type,t.memoizedProps)),e&&(e=Xt)){if(Md(t))throw Nv(),Error(W(418));for(;e;)Pv(t,e),e=Nr(e.nextSibling)}if(Cm(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(W(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Xt=Nr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Xt=null}}else Xt=Zt?Nr(t.stateNode.nextSibling):null;return!0}function Nv(){for(var t=Xt;t;)t=Nr(t.nextSibling)}function Ss(){Xt=Zt=null,ze=!1}function Kh(t){bn===null?bn=[t]:bn.push(t)}var sw=dr.ReactCurrentBatchConfig;function fo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(W(309));var r=n.stateNode}if(!r)throw Error(W(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var c=i.refs;a===null?delete c[s]:c[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(W(284));if(!n._owner)throw Error(W(290,t))}return t}function ll(t,e){throw t=Object.prototype.toString.call(e),Error(W(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Dm(t){var e=t._init;return e(t._payload)}function Mv(t){function e(T,u){if(t){var I=T.deletions;I===null?(T.deletions=[u],T.flags|=16):I.push(u)}}function n(T,u){if(!t)return null;for(;u!==null;)e(T,u),u=u.sibling;return null}function r(T,u){for(T=new Map;u!==null;)u.key!==null?T.set(u.key,u):T.set(u.index,u),u=u.sibling;return T}function i(T,u){return T=Or(T,u),T.index=0,T.sibling=null,T}function s(T,u,I){return T.index=I,t?(I=T.alternate,I!==null?(I=I.index,I<u?(T.flags|=2,u):I):(T.flags|=2,u)):(T.flags|=1048576,u)}function a(T){return t&&T.alternate===null&&(T.flags|=2),T}function c(T,u,I,M){return u===null||u.tag!==6?(u=Hu(I,T.mode,M),u.return=T,u):(u=i(u,I),u.return=T,u)}function d(T,u,I,M){var F=I.type;return F===Zi?g(T,u,I.props.children,M,I.key):u!==null&&(u.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===_r&&Dm(F)===u.type)?(M=i(u,I.props),M.ref=fo(T,u,I),M.return=T,M):(M=jl(I.type,I.key,I.props,null,T.mode,M),M.ref=fo(T,u,I),M.return=T,M)}function f(T,u,I,M){return u===null||u.tag!==4||u.stateNode.containerInfo!==I.containerInfo||u.stateNode.implementation!==I.implementation?(u=Ku(I,T.mode,M),u.return=T,u):(u=i(u,I.children||[]),u.return=T,u)}function g(T,u,I,M,F){return u===null||u.tag!==7?(u=bi(I,T.mode,M,F),u.return=T,u):(u=i(u,I),u.return=T,u)}function v(T,u,I){if(typeof u=="string"&&u!==""||typeof u=="number")return u=Hu(""+u,T.mode,I),u.return=T,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Xa:return I=jl(u.type,u.key,u.props,null,T.mode,I),I.ref=fo(T,null,u),I.return=T,I;case Ji:return u=Ku(u,T.mode,I),u.return=T,u;case _r:var M=u._init;return v(T,M(u._payload),I)}if(vo(u)||ao(u))return u=bi(u,T.mode,I,null),u.return=T,u;ll(T,u)}return null}function _(T,u,I,M){var F=u!==null?u.key:null;if(typeof I=="string"&&I!==""||typeof I=="number")return F!==null?null:c(T,u,""+I,M);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case Xa:return I.key===F?d(T,u,I,M):null;case Ji:return I.key===F?f(T,u,I,M):null;case _r:return F=I._init,_(T,u,F(I._payload),M)}if(vo(I)||ao(I))return F!==null?null:g(T,u,I,M,null);ll(T,I)}return null}function A(T,u,I,M,F){if(typeof M=="string"&&M!==""||typeof M=="number")return T=T.get(I)||null,c(u,T,""+M,F);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Xa:return T=T.get(M.key===null?I:M.key)||null,d(u,T,M,F);case Ji:return T=T.get(M.key===null?I:M.key)||null,f(u,T,M,F);case _r:var H=M._init;return A(T,u,I,H(M._payload),F)}if(vo(M)||ao(M))return T=T.get(I)||null,g(u,T,M,F,null);ll(u,M)}return null}function E(T,u,I,M){for(var F=null,H=null,w=u,x=u=0,b=null;w!==null&&x<I.length;x++){w.index>x?(b=w,w=null):b=w.sibling;var R=_(T,w,I[x],M);if(R===null){w===null&&(w=b);break}t&&w&&R.alternate===null&&e(T,w),u=s(R,u,x),H===null?F=R:H.sibling=R,H=R,w=b}if(x===I.length)return n(T,w),ze&&fi(T,x),F;if(w===null){for(;x<I.length;x++)w=v(T,I[x],M),w!==null&&(u=s(w,u,x),H===null?F=w:H.sibling=w,H=w);return ze&&fi(T,x),F}for(w=r(T,w);x<I.length;x++)b=A(w,T,x,I[x],M),b!==null&&(t&&b.alternate!==null&&w.delete(b.key===null?x:b.key),u=s(b,u,x),H===null?F=b:H.sibling=b,H=b);return t&&w.forEach(function(k){return e(T,k)}),ze&&fi(T,x),F}function V(T,u,I,M){var F=ao(I);if(typeof F!="function")throw Error(W(150));if(I=F.call(I),I==null)throw Error(W(151));for(var H=F=null,w=u,x=u=0,b=null,R=I.next();w!==null&&!R.done;x++,R=I.next()){w.index>x?(b=w,w=null):b=w.sibling;var k=_(T,w,R.value,M);if(k===null){w===null&&(w=b);break}t&&w&&k.alternate===null&&e(T,w),u=s(k,u,x),H===null?F=k:H.sibling=k,H=k,w=b}if(R.done)return n(T,w),ze&&fi(T,x),F;if(w===null){for(;!R.done;x++,R=I.next())R=v(T,R.value,M),R!==null&&(u=s(R,u,x),H===null?F=R:H.sibling=R,H=R);return ze&&fi(T,x),F}for(w=r(T,w);!R.done;x++,R=I.next())R=A(w,T,x,R.value,M),R!==null&&(t&&R.alternate!==null&&w.delete(R.key===null?x:R.key),u=s(R,u,x),H===null?F=R:H.sibling=R,H=R);return t&&w.forEach(function(j){return e(T,j)}),ze&&fi(T,x),F}function z(T,u,I,M){if(typeof I=="object"&&I!==null&&I.type===Zi&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case Xa:e:{for(var F=I.key,H=u;H!==null;){if(H.key===F){if(F=I.type,F===Zi){if(H.tag===7){n(T,H.sibling),u=i(H,I.props.children),u.return=T,T=u;break e}}else if(H.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===_r&&Dm(F)===H.type){n(T,H.sibling),u=i(H,I.props),u.ref=fo(T,H,I),u.return=T,T=u;break e}n(T,H);break}else e(T,H);H=H.sibling}I.type===Zi?(u=bi(I.props.children,T.mode,M,I.key),u.return=T,T=u):(M=jl(I.type,I.key,I.props,null,T.mode,M),M.ref=fo(T,u,I),M.return=T,T=M)}return a(T);case Ji:e:{for(H=I.key;u!==null;){if(u.key===H)if(u.tag===4&&u.stateNode.containerInfo===I.containerInfo&&u.stateNode.implementation===I.implementation){n(T,u.sibling),u=i(u,I.children||[]),u.return=T,T=u;break e}else{n(T,u);break}else e(T,u);u=u.sibling}u=Ku(I,T.mode,M),u.return=T,T=u}return a(T);case _r:return H=I._init,z(T,u,H(I._payload),M)}if(vo(I))return E(T,u,I,M);if(ao(I))return V(T,u,I,M);ll(T,I)}return typeof I=="string"&&I!==""||typeof I=="number"?(I=""+I,u!==null&&u.tag===6?(n(T,u.sibling),u=i(u,I),u.return=T,T=u):(n(T,u),u=Hu(I,T.mode,M),u.return=T,T=u),a(T)):n(T,u)}return z}var Es=Mv(!0),Lv=Mv(!1),Zl=Qr(null),ec=null,as=null,Gh=null;function Qh(){Gh=as=ec=null}function Yh(t){var e=Zl.current;Oe(Zl),t._currentValue=e}function Vd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function ms(t,e){ec=t,Gh=as=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&($t=!0),t.firstContext=null)}function hn(t){var e=t._currentValue;if(Gh!==t)if(t={context:t,memoizedValue:e,next:null},as===null){if(ec===null)throw Error(W(308));as=t,ec.dependencies={lanes:0,firstContext:t}}else as=as.next=t;return e}var yi=null;function Xh(t){yi===null?yi=[t]:yi.push(t)}function Vv(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Xh(e)):(n.next=i.next,i.next=n),e.interleaved=n,ir(t,r)}function ir(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var br=!1;function Jh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ov(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Zn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Mr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,Ee&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,ir(t,n)}return i=r.interleaved,i===null?(e.next=e,Xh(r)):(e.next=i.next,i.next=e),r.interleaved=e,ir(t,n)}function El(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Vh(t,n)}}function Pm(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function tc(t,e,n,r){var i=t.updateQueue;br=!1;var s=i.firstBaseUpdate,a=i.lastBaseUpdate,c=i.shared.pending;if(c!==null){i.shared.pending=null;var d=c,f=d.next;d.next=null,a===null?s=f:a.next=f,a=d;var g=t.alternate;g!==null&&(g=g.updateQueue,c=g.lastBaseUpdate,c!==a&&(c===null?g.firstBaseUpdate=f:c.next=f,g.lastBaseUpdate=d))}if(s!==null){var v=i.baseState;a=0,g=f=d=null,c=s;do{var _=c.lane,A=c.eventTime;if((r&_)===_){g!==null&&(g=g.next={eventTime:A,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var E=t,V=c;switch(_=e,A=n,V.tag){case 1:if(E=V.payload,typeof E=="function"){v=E.call(A,v,_);break e}v=E;break e;case 3:E.flags=E.flags&-65537|128;case 0:if(E=V.payload,_=typeof E=="function"?E.call(A,v,_):E,_==null)break e;v=$e({},v,_);break e;case 2:br=!0}}c.callback!==null&&c.lane!==0&&(t.flags|=64,_=i.effects,_===null?i.effects=[c]:_.push(c))}else A={eventTime:A,lane:_,tag:c.tag,payload:c.payload,callback:c.callback,next:null},g===null?(f=g=A,d=v):g=g.next=A,a|=_;if(c=c.next,c===null){if(c=i.shared.pending,c===null)break;_=c,c=_.next,_.next=null,i.lastBaseUpdate=_,i.shared.pending=null}}while(!0);if(g===null&&(d=v),i.baseState=d,i.firstBaseUpdate=f,i.lastBaseUpdate=g,e=i.shared.interleaved,e!==null){i=e;do a|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Ii|=a,t.lanes=a,t.memoizedState=v}}function Nm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(W(191,i));i.call(r)}}}var va={},Vn=Qr(va),Jo=Qr(va),Zo=Qr(va);function vi(t){if(t===va)throw Error(W(174));return t}function Zh(t,e){switch(De(Zo,e),De(Jo,t),De(Vn,va),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:yd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=yd(e,t)}Oe(Vn),De(Vn,e)}function Rs(){Oe(Vn),Oe(Jo),Oe(Zo)}function Fv(t){vi(Zo.current);var e=vi(Vn.current),n=yd(e,t.type);e!==n&&(De(Jo,t),De(Vn,n))}function ef(t){Jo.current===t&&(Oe(Vn),Oe(Jo))}var qe=Qr(0);function nc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Uu=[];function tf(){for(var t=0;t<Uu.length;t++)Uu[t]._workInProgressVersionPrimary=null;Uu.length=0}var Rl=dr.ReactCurrentDispatcher,zu=dr.ReactCurrentBatchConfig,Ri=0,Be=null,it=null,ut=null,rc=!1,Do=!1,ea=0,ow=0;function It(){throw Error(W(321))}function nf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!En(t[n],e[n]))return!1;return!0}function rf(t,e,n,r,i,s){if(Ri=s,Be=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Rl.current=t===null||t.memoizedState===null?uw:dw,t=n(r,i),Do){s=0;do{if(Do=!1,ea=0,25<=s)throw Error(W(301));s+=1,ut=it=null,e.updateQueue=null,Rl.current=hw,t=n(r,i)}while(Do)}if(Rl.current=ic,e=it!==null&&it.next!==null,Ri=0,ut=it=Be=null,rc=!1,e)throw Error(W(300));return t}function sf(){var t=ea!==0;return ea=0,t}function Pn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ut===null?Be.memoizedState=ut=t:ut=ut.next=t,ut}function fn(){if(it===null){var t=Be.alternate;t=t!==null?t.memoizedState:null}else t=it.next;var e=ut===null?Be.memoizedState:ut.next;if(e!==null)ut=e,it=t;else{if(t===null)throw Error(W(310));it=t,t={memoizedState:it.memoizedState,baseState:it.baseState,baseQueue:it.baseQueue,queue:it.queue,next:null},ut===null?Be.memoizedState=ut=t:ut=ut.next=t}return ut}function ta(t,e){return typeof e=="function"?e(t):e}function qu(t){var e=fn(),n=e.queue;if(n===null)throw Error(W(311));n.lastRenderedReducer=t;var r=it,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var a=i.next;i.next=s.next,s.next=a}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var c=a=null,d=null,f=s;do{var g=f.lane;if((Ri&g)===g)d!==null&&(d=d.next={lane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),r=f.hasEagerState?f.eagerState:t(r,f.action);else{var v={lane:g,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null};d===null?(c=d=v,a=r):d=d.next=v,Be.lanes|=g,Ii|=g}f=f.next}while(f!==null&&f!==s);d===null?a=r:d.next=c,En(r,e.memoizedState)||($t=!0),e.memoizedState=r,e.baseState=a,e.baseQueue=d,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,Be.lanes|=s,Ii|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Bu(t){var e=fn(),n=e.queue;if(n===null)throw Error(W(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do s=t(s,a.action),a=a.next;while(a!==i);En(s,e.memoizedState)||($t=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function Uv(){}function zv(t,e){var n=Be,r=fn(),i=e(),s=!En(r.memoizedState,i);if(s&&(r.memoizedState=i,$t=!0),r=r.queue,of($v.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||ut!==null&&ut.memoizedState.tag&1){if(n.flags|=2048,na(9,Bv.bind(null,n,r,i,e),void 0,null),dt===null)throw Error(W(349));Ri&30||qv(n,e,i)}return i}function qv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Be.updateQueue,e===null?(e={lastEffect:null,stores:null},Be.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Bv(t,e,n,r){e.value=n,e.getSnapshot=r,Wv(e)&&Hv(t)}function $v(t,e,n){return n(function(){Wv(e)&&Hv(t)})}function Wv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!En(t,n)}catch{return!0}}function Hv(t){var e=ir(t,1);e!==null&&Sn(e,t,1,-1)}function Mm(t){var e=Pn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ta,lastRenderedState:t},e.queue=t,t=t.dispatch=cw.bind(null,Be,t),[e.memoizedState,t]}function na(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Be.updateQueue,e===null?(e={lastEffect:null,stores:null},Be.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Kv(){return fn().memoizedState}function Il(t,e,n,r){var i=Pn();Be.flags|=t,i.memoizedState=na(1|e,n,void 0,r===void 0?null:r)}function Nc(t,e,n,r){var i=fn();r=r===void 0?null:r;var s=void 0;if(it!==null){var a=it.memoizedState;if(s=a.destroy,r!==null&&nf(r,a.deps)){i.memoizedState=na(e,n,s,r);return}}Be.flags|=t,i.memoizedState=na(1|e,n,s,r)}function Lm(t,e){return Il(8390656,8,t,e)}function of(t,e){return Nc(2048,8,t,e)}function Gv(t,e){return Nc(4,2,t,e)}function Qv(t,e){return Nc(4,4,t,e)}function Yv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Xv(t,e,n){return n=n!=null?n.concat([t]):null,Nc(4,4,Yv.bind(null,e,t),n)}function af(){}function Jv(t,e){var n=fn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&nf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Zv(t,e){var n=fn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&nf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function e0(t,e,n){return Ri&21?(En(n,e)||(n=sv(),Be.lanes|=n,Ii|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,$t=!0),t.memoizedState=n)}function aw(t,e){var n=ke;ke=n!==0&&4>n?n:4,t(!0);var r=zu.transition;zu.transition={};try{t(!1),e()}finally{ke=n,zu.transition=r}}function t0(){return fn().memoizedState}function lw(t,e,n){var r=Vr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},n0(t))r0(e,n);else if(n=Vv(t,e,n,r),n!==null){var i=Ot();Sn(n,t,r,i),i0(n,e,r)}}function cw(t,e,n){var r=Vr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(n0(t))r0(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,c=s(a,n);if(i.hasEagerState=!0,i.eagerState=c,En(c,a)){var d=e.interleaved;d===null?(i.next=i,Xh(e)):(i.next=d.next,d.next=i),e.interleaved=i;return}}catch{}finally{}n=Vv(t,e,i,r),n!==null&&(i=Ot(),Sn(n,t,r,i),i0(n,e,r))}}function n0(t){var e=t.alternate;return t===Be||e!==null&&e===Be}function r0(t,e){Do=rc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function i0(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Vh(t,n)}}var ic={readContext:hn,useCallback:It,useContext:It,useEffect:It,useImperativeHandle:It,useInsertionEffect:It,useLayoutEffect:It,useMemo:It,useReducer:It,useRef:It,useState:It,useDebugValue:It,useDeferredValue:It,useTransition:It,useMutableSource:It,useSyncExternalStore:It,useId:It,unstable_isNewReconciler:!1},uw={readContext:hn,useCallback:function(t,e){return Pn().memoizedState=[t,e===void 0?null:e],t},useContext:hn,useEffect:Lm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Il(4194308,4,Yv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Il(4194308,4,t,e)},useInsertionEffect:function(t,e){return Il(4,2,t,e)},useMemo:function(t,e){var n=Pn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Pn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=lw.bind(null,Be,t),[r.memoizedState,t]},useRef:function(t){var e=Pn();return t={current:t},e.memoizedState=t},useState:Mm,useDebugValue:af,useDeferredValue:function(t){return Pn().memoizedState=t},useTransition:function(){var t=Mm(!1),e=t[0];return t=aw.bind(null,t[1]),Pn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Be,i=Pn();if(ze){if(n===void 0)throw Error(W(407));n=n()}else{if(n=e(),dt===null)throw Error(W(349));Ri&30||qv(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Lm($v.bind(null,r,s,t),[t]),r.flags|=2048,na(9,Bv.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=Pn(),e=dt.identifierPrefix;if(ze){var n=Qn,r=Gn;n=(r&~(1<<32-wn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=ea++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=ow++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},dw={readContext:hn,useCallback:Jv,useContext:hn,useEffect:of,useImperativeHandle:Xv,useInsertionEffect:Gv,useLayoutEffect:Qv,useMemo:Zv,useReducer:qu,useRef:Kv,useState:function(){return qu(ta)},useDebugValue:af,useDeferredValue:function(t){var e=fn();return e0(e,it.memoizedState,t)},useTransition:function(){var t=qu(ta)[0],e=fn().memoizedState;return[t,e]},useMutableSource:Uv,useSyncExternalStore:zv,useId:t0,unstable_isNewReconciler:!1},hw={readContext:hn,useCallback:Jv,useContext:hn,useEffect:of,useImperativeHandle:Xv,useInsertionEffect:Gv,useLayoutEffect:Qv,useMemo:Zv,useReducer:Bu,useRef:Kv,useState:function(){return Bu(ta)},useDebugValue:af,useDeferredValue:function(t){var e=fn();return it===null?e.memoizedState=t:e0(e,it.memoizedState,t)},useTransition:function(){var t=Bu(ta)[0],e=fn().memoizedState;return[t,e]},useMutableSource:Uv,useSyncExternalStore:zv,useId:t0,unstable_isNewReconciler:!1};function xn(t,e){if(t&&t.defaultProps){e=$e({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Od(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:$e({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Mc={isMounted:function(t){return(t=t._reactInternals)?Mi(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=Ot(),i=Vr(t),s=Zn(r,i);s.payload=e,n!=null&&(s.callback=n),e=Mr(t,s,i),e!==null&&(Sn(e,t,i,r),El(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=Ot(),i=Vr(t),s=Zn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Mr(t,s,i),e!==null&&(Sn(e,t,i,r),El(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Ot(),r=Vr(t),i=Zn(n,r);i.tag=2,e!=null&&(i.callback=e),e=Mr(t,i,r),e!==null&&(Sn(e,t,r,n),El(e,t,r))}};function Vm(t,e,n,r,i,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,a):e.prototype&&e.prototype.isPureReactComponent?!Go(n,r)||!Go(i,s):!0}function s0(t,e,n){var r=!1,i=$r,s=e.contextType;return typeof s=="object"&&s!==null?s=hn(s):(i=Ht(e)?Si:Pt.current,r=e.contextTypes,s=(r=r!=null)?ws(t,i):$r),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Mc,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Om(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Mc.enqueueReplaceState(e,e.state,null)}function Fd(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Jh(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=hn(s):(s=Ht(e)?Si:Pt.current,i.context=ws(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Od(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Mc.enqueueReplaceState(i,i.state,null),tc(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function Is(t,e){try{var n="",r=e;do n+=U_(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function $u(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Ud(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var fw=typeof WeakMap=="function"?WeakMap:Map;function o0(t,e,n){n=Zn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){oc||(oc=!0,Yd=r),Ud(t,e)},n}function a0(t,e,n){n=Zn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Ud(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Ud(t,e),typeof r!="function"&&(Lr===null?Lr=new Set([this]):Lr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Fm(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new fw;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=Tw.bind(null,t,e,n),e.then(t,t))}function Um(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function zm(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Zn(-1,1),e.tag=2,Mr(n,e,1))),n.lanes|=1),t)}var pw=dr.ReactCurrentOwner,$t=!1;function Vt(t,e,n,r){e.child=t===null?Lv(e,null,n,r):Es(e,t.child,n,r)}function qm(t,e,n,r,i){n=n.render;var s=e.ref;return ms(e,i),r=rf(t,e,n,r,s,i),n=sf(),t!==null&&!$t?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,sr(t,e,i)):(ze&&n&&Wh(e),e.flags|=1,Vt(t,e,r,i),e.child)}function Bm(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!mf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,l0(t,e,s,r,i)):(t=jl(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Go,n(a,r)&&t.ref===e.ref)return sr(t,e,i)}return e.flags|=1,t=Or(s,r),t.ref=e.ref,t.return=e,e.child=t}function l0(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(Go(s,r)&&t.ref===e.ref)if($t=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&($t=!0);else return e.lanes=t.lanes,sr(t,e,i)}return zd(t,e,n,r,i)}function c0(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},De(cs,Yt),Yt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,De(cs,Yt),Yt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,De(cs,Yt),Yt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,De(cs,Yt),Yt|=r;return Vt(t,e,i,n),e.child}function u0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function zd(t,e,n,r,i){var s=Ht(n)?Si:Pt.current;return s=ws(e,s),ms(e,i),n=rf(t,e,n,r,s,i),r=sf(),t!==null&&!$t?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,sr(t,e,i)):(ze&&r&&Wh(e),e.flags|=1,Vt(t,e,n,i),e.child)}function $m(t,e,n,r,i){if(Ht(n)){var s=!0;Yl(e)}else s=!1;if(ms(e,i),e.stateNode===null)Tl(t,e),s0(e,n,r),Fd(e,n,r,i),r=!0;else if(t===null){var a=e.stateNode,c=e.memoizedProps;a.props=c;var d=a.context,f=n.contextType;typeof f=="object"&&f!==null?f=hn(f):(f=Ht(n)?Si:Pt.current,f=ws(e,f));var g=n.getDerivedStateFromProps,v=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function";v||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(c!==r||d!==f)&&Om(e,a,r,f),br=!1;var _=e.memoizedState;a.state=_,tc(e,r,a,i),d=e.memoizedState,c!==r||_!==d||Wt.current||br?(typeof g=="function"&&(Od(e,n,g,r),d=e.memoizedState),(c=br||Vm(e,n,c,r,_,d,f))?(v||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=d),a.props=r,a.state=d,a.context=f,r=c):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{a=e.stateNode,Ov(t,e),c=e.memoizedProps,f=e.type===e.elementType?c:xn(e.type,c),a.props=f,v=e.pendingProps,_=a.context,d=n.contextType,typeof d=="object"&&d!==null?d=hn(d):(d=Ht(n)?Si:Pt.current,d=ws(e,d));var A=n.getDerivedStateFromProps;(g=typeof A=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(c!==v||_!==d)&&Om(e,a,r,d),br=!1,_=e.memoizedState,a.state=_,tc(e,r,a,i);var E=e.memoizedState;c!==v||_!==E||Wt.current||br?(typeof A=="function"&&(Od(e,n,A,r),E=e.memoizedState),(f=br||Vm(e,n,f,r,_,E,d)||!1)?(g||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,E,d),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,E,d)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||c===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=E),a.props=r,a.state=E,a.context=d,r=f):(typeof a.componentDidUpdate!="function"||c===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),r=!1)}return qd(t,e,n,r,s,i)}function qd(t,e,n,r,i,s){u0(t,e);var a=(e.flags&128)!==0;if(!r&&!a)return i&&Am(e,n,!1),sr(t,e,s);r=e.stateNode,pw.current=e;var c=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&a?(e.child=Es(e,t.child,null,s),e.child=Es(e,null,c,s)):Vt(t,e,c,s),e.memoizedState=r.state,i&&Am(e,n,!0),e.child}function d0(t){var e=t.stateNode;e.pendingContext?km(t,e.pendingContext,e.pendingContext!==e.context):e.context&&km(t,e.context,!1),Zh(t,e.containerInfo)}function Wm(t,e,n,r,i){return Ss(),Kh(i),e.flags|=256,Vt(t,e,n,r),e.child}var Bd={dehydrated:null,treeContext:null,retryLane:0};function $d(t){return{baseLanes:t,cachePool:null,transitions:null}}function h0(t,e,n){var r=e.pendingProps,i=qe.current,s=!1,a=(e.flags&128)!==0,c;if((c=a)||(c=t!==null&&t.memoizedState===null?!1:(i&2)!==0),c?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),De(qe,i&1),t===null)return Ld(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=r.children,t=r.fallback,s?(r=e.mode,s=e.child,a={mode:"hidden",children:a},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Oc(a,r,0,null),t=bi(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=$d(n),e.memoizedState=Bd,t):lf(e,a));if(i=t.memoizedState,i!==null&&(c=i.dehydrated,c!==null))return mw(t,e,a,r,c,i,n);if(s){s=r.fallback,a=e.mode,i=t.child,c=i.sibling;var d={mode:"hidden",children:r.children};return!(a&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=d,e.deletions=null):(r=Or(i,d),r.subtreeFlags=i.subtreeFlags&14680064),c!==null?s=Or(c,s):(s=bi(s,a,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,a=t.child.memoizedState,a=a===null?$d(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Bd,r}return s=t.child,t=s.sibling,r=Or(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function lf(t,e){return e=Oc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function cl(t,e,n,r){return r!==null&&Kh(r),Es(e,t.child,null,n),t=lf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function mw(t,e,n,r,i,s,a){if(n)return e.flags&256?(e.flags&=-257,r=$u(Error(W(422))),cl(t,e,a,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Oc({mode:"visible",children:r.children},i,0,null),s=bi(s,i,a,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Es(e,t.child,null,a),e.child.memoizedState=$d(a),e.memoizedState=Bd,s);if(!(e.mode&1))return cl(t,e,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var c=r.dgst;return r=c,s=Error(W(419)),r=$u(s,r,void 0),cl(t,e,a,r)}if(c=(a&t.childLanes)!==0,$t||c){if(r=dt,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,ir(t,i),Sn(r,t,i,-1))}return pf(),r=$u(Error(W(421))),cl(t,e,a,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=kw.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Xt=Nr(i.nextSibling),Zt=e,ze=!0,bn=null,t!==null&&(an[ln++]=Gn,an[ln++]=Qn,an[ln++]=Ei,Gn=t.id,Qn=t.overflow,Ei=e),e=lf(e,r.children),e.flags|=4096,e)}function Hm(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Vd(t.return,e,n)}function Wu(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function f0(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(Vt(t,e,r.children,n),r=qe.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Hm(t,n,e);else if(t.tag===19)Hm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(De(qe,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&nc(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Wu(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&nc(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Wu(e,!0,n,null,s);break;case"together":Wu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Tl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function sr(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ii|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(W(153));if(e.child!==null){for(t=e.child,n=Or(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Or(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function gw(t,e,n){switch(e.tag){case 3:d0(e),Ss();break;case 5:Fv(e);break;case 1:Ht(e.type)&&Yl(e);break;case 4:Zh(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;De(Zl,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(De(qe,qe.current&1),e.flags|=128,null):n&e.child.childLanes?h0(t,e,n):(De(qe,qe.current&1),t=sr(t,e,n),t!==null?t.sibling:null);De(qe,qe.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return f0(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),De(qe,qe.current),r)break;return null;case 22:case 23:return e.lanes=0,c0(t,e,n)}return sr(t,e,n)}var p0,Wd,m0,g0;p0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Wd=function(){};m0=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,vi(Vn.current);var s=null;switch(n){case"input":i=fd(t,i),r=fd(t,r),s=[];break;case"select":i=$e({},i,{value:void 0}),r=$e({},r,{value:void 0}),s=[];break;case"textarea":i=gd(t,i),r=gd(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Gl)}vd(n,r);var a;n=null;for(f in i)if(!r.hasOwnProperty(f)&&i.hasOwnProperty(f)&&i[f]!=null)if(f==="style"){var c=i[f];for(a in c)c.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else f!=="dangerouslySetInnerHTML"&&f!=="children"&&f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(zo.hasOwnProperty(f)?s||(s=[]):(s=s||[]).push(f,null));for(f in r){var d=r[f];if(c=i!=null?i[f]:void 0,r.hasOwnProperty(f)&&d!==c&&(d!=null||c!=null))if(f==="style")if(c){for(a in c)!c.hasOwnProperty(a)||d&&d.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in d)d.hasOwnProperty(a)&&c[a]!==d[a]&&(n||(n={}),n[a]=d[a])}else n||(s||(s=[]),s.push(f,n)),n=d;else f==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,c=c?c.__html:void 0,d!=null&&c!==d&&(s=s||[]).push(f,d)):f==="children"?typeof d!="string"&&typeof d!="number"||(s=s||[]).push(f,""+d):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&(zo.hasOwnProperty(f)?(d!=null&&f==="onScroll"&&Me("scroll",t),s||c===d||(s=[])):(s=s||[]).push(f,d))}n&&(s=s||[]).push("style",n);var f=s;(e.updateQueue=f)&&(e.flags|=4)}};g0=function(t,e,n,r){n!==r&&(e.flags|=4)};function po(t,e){if(!ze)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Tt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function yw(t,e,n){var r=e.pendingProps;switch(Hh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Tt(e),null;case 1:return Ht(e.type)&&Ql(),Tt(e),null;case 3:return r=e.stateNode,Rs(),Oe(Wt),Oe(Pt),tf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(al(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,bn!==null&&(Zd(bn),bn=null))),Wd(t,e),Tt(e),null;case 5:ef(e);var i=vi(Zo.current);if(n=e.type,t!==null&&e.stateNode!=null)m0(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(W(166));return Tt(e),null}if(t=vi(Vn.current),al(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[Nn]=e,r[Xo]=s,t=(e.mode&1)!==0,n){case"dialog":Me("cancel",r),Me("close",r);break;case"iframe":case"object":case"embed":Me("load",r);break;case"video":case"audio":for(i=0;i<_o.length;i++)Me(_o[i],r);break;case"source":Me("error",r);break;case"img":case"image":case"link":Me("error",r),Me("load",r);break;case"details":Me("toggle",r);break;case"input":tm(r,s),Me("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Me("invalid",r);break;case"textarea":rm(r,s),Me("invalid",r)}vd(n,s),i=null;for(var a in s)if(s.hasOwnProperty(a)){var c=s[a];a==="children"?typeof c=="string"?r.textContent!==c&&(s.suppressHydrationWarning!==!0&&ol(r.textContent,c,t),i=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(s.suppressHydrationWarning!==!0&&ol(r.textContent,c,t),i=["children",""+c]):zo.hasOwnProperty(a)&&c!=null&&a==="onScroll"&&Me("scroll",r)}switch(n){case"input":Ja(r),nm(r,s,!0);break;case"textarea":Ja(r),im(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Gl)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=$y(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=a.createElement(n,{is:r.is}):(t=a.createElement(n),n==="select"&&(a=t,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):t=a.createElementNS(t,n),t[Nn]=e,t[Xo]=r,p0(t,e,!1,!1),e.stateNode=t;e:{switch(a=xd(n,r),n){case"dialog":Me("cancel",t),Me("close",t),i=r;break;case"iframe":case"object":case"embed":Me("load",t),i=r;break;case"video":case"audio":for(i=0;i<_o.length;i++)Me(_o[i],t);i=r;break;case"source":Me("error",t),i=r;break;case"img":case"image":case"link":Me("error",t),Me("load",t),i=r;break;case"details":Me("toggle",t),i=r;break;case"input":tm(t,r),i=fd(t,r),Me("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=$e({},r,{value:void 0}),Me("invalid",t);break;case"textarea":rm(t,r),i=gd(t,r),Me("invalid",t);break;default:i=r}vd(n,i),c=i;for(s in c)if(c.hasOwnProperty(s)){var d=c[s];s==="style"?Ky(t,d):s==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&Wy(t,d)):s==="children"?typeof d=="string"?(n!=="textarea"||d!=="")&&qo(t,d):typeof d=="number"&&qo(t,""+d):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(zo.hasOwnProperty(s)?d!=null&&s==="onScroll"&&Me("scroll",t):d!=null&&Ch(t,s,d,a))}switch(n){case"input":Ja(t),nm(t,r,!1);break;case"textarea":Ja(t),im(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Br(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?ds(t,!!r.multiple,s,!1):r.defaultValue!=null&&ds(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Gl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Tt(e),null;case 6:if(t&&e.stateNode!=null)g0(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(W(166));if(n=vi(Zo.current),vi(Vn.current),al(e)){if(r=e.stateNode,n=e.memoizedProps,r[Nn]=e,(s=r.nodeValue!==n)&&(t=Zt,t!==null))switch(t.tag){case 3:ol(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ol(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Nn]=e,e.stateNode=r}return Tt(e),null;case 13:if(Oe(qe),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ze&&Xt!==null&&e.mode&1&&!(e.flags&128))Nv(),Ss(),e.flags|=98560,s=!1;else if(s=al(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(W(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(W(317));s[Nn]=e}else Ss(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Tt(e),s=!1}else bn!==null&&(Zd(bn),bn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||qe.current&1?st===0&&(st=3):pf())),e.updateQueue!==null&&(e.flags|=4),Tt(e),null);case 4:return Rs(),Wd(t,e),t===null&&Qo(e.stateNode.containerInfo),Tt(e),null;case 10:return Yh(e.type._context),Tt(e),null;case 17:return Ht(e.type)&&Ql(),Tt(e),null;case 19:if(Oe(qe),s=e.memoizedState,s===null)return Tt(e),null;if(r=(e.flags&128)!==0,a=s.rendering,a===null)if(r)po(s,!1);else{if(st!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=nc(t),a!==null){for(e.flags|=128,po(s,!1),r=a.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return De(qe,qe.current&1|2),e.child}t=t.sibling}s.tail!==null&&Je()>Ts&&(e.flags|=128,r=!0,po(s,!1),e.lanes=4194304)}else{if(!r)if(t=nc(a),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),po(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!ze)return Tt(e),null}else 2*Je()-s.renderingStartTime>Ts&&n!==1073741824&&(e.flags|=128,r=!0,po(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Je(),e.sibling=null,n=qe.current,De(qe,r?n&1|2:n&1),e):(Tt(e),null);case 22:case 23:return ff(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Yt&1073741824&&(Tt(e),e.subtreeFlags&6&&(e.flags|=8192)):Tt(e),null;case 24:return null;case 25:return null}throw Error(W(156,e.tag))}function vw(t,e){switch(Hh(e),e.tag){case 1:return Ht(e.type)&&Ql(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Rs(),Oe(Wt),Oe(Pt),tf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return ef(e),null;case 13:if(Oe(qe),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(W(340));Ss()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Oe(qe),null;case 4:return Rs(),null;case 10:return Yh(e.type._context),null;case 22:case 23:return ff(),null;case 24:return null;default:return null}}var ul=!1,jt=!1,xw=typeof WeakSet=="function"?WeakSet:Set,J=null;function ls(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ge(t,e,r)}else n.current=null}function Hd(t,e,n){try{n()}catch(r){Ge(t,e,r)}}var Km=!1;function _w(t,e){if(Ad=Wl,t=bv(),$h(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,c=-1,d=-1,f=0,g=0,v=t,_=null;t:for(;;){for(var A;v!==n||i!==0&&v.nodeType!==3||(c=a+i),v!==s||r!==0&&v.nodeType!==3||(d=a+r),v.nodeType===3&&(a+=v.nodeValue.length),(A=v.firstChild)!==null;)_=v,v=A;for(;;){if(v===t)break t;if(_===n&&++f===i&&(c=a),_===s&&++g===r&&(d=a),(A=v.nextSibling)!==null)break;v=_,_=v.parentNode}v=A}n=c===-1||d===-1?null:{start:c,end:d}}else n=null}n=n||{start:0,end:0}}else n=null;for(jd={focusedElem:t,selectionRange:n},Wl=!1,J=e;J!==null;)if(e=J,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,J=t;else for(;J!==null;){e=J;try{var E=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(E!==null){var V=E.memoizedProps,z=E.memoizedState,T=e.stateNode,u=T.getSnapshotBeforeUpdate(e.elementType===e.type?V:xn(e.type,V),z);T.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var I=e.stateNode.containerInfo;I.nodeType===1?I.textContent="":I.nodeType===9&&I.documentElement&&I.removeChild(I.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(W(163))}}catch(M){Ge(e,e.return,M)}if(t=e.sibling,t!==null){t.return=e.return,J=t;break}J=e.return}return E=Km,Km=!1,E}function Po(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Hd(e,n,s)}i=i.next}while(i!==r)}}function Lc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Kd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function y0(t){var e=t.alternate;e!==null&&(t.alternate=null,y0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Nn],delete e[Xo],delete e[Pd],delete e[nw],delete e[rw])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function v0(t){return t.tag===5||t.tag===3||t.tag===4}function Gm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||v0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Gd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Gl));else if(r!==4&&(t=t.child,t!==null))for(Gd(t,e,n),t=t.sibling;t!==null;)Gd(t,e,n),t=t.sibling}function Qd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Qd(t,e,n),t=t.sibling;t!==null;)Qd(t,e,n),t=t.sibling}var gt=null,_n=!1;function yr(t,e,n){for(n=n.child;n!==null;)x0(t,e,n),n=n.sibling}function x0(t,e,n){if(Ln&&typeof Ln.onCommitFiberUnmount=="function")try{Ln.onCommitFiberUnmount(kc,n)}catch{}switch(n.tag){case 5:jt||ls(n,e);case 6:var r=gt,i=_n;gt=null,yr(t,e,n),gt=r,_n=i,gt!==null&&(_n?(t=gt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):gt.removeChild(n.stateNode));break;case 18:gt!==null&&(_n?(t=gt,n=n.stateNode,t.nodeType===8?Ou(t.parentNode,n):t.nodeType===1&&Ou(t,n),Ho(t)):Ou(gt,n.stateNode));break;case 4:r=gt,i=_n,gt=n.stateNode.containerInfo,_n=!0,yr(t,e,n),gt=r,_n=i;break;case 0:case 11:case 14:case 15:if(!jt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Hd(n,e,a),i=i.next}while(i!==r)}yr(t,e,n);break;case 1:if(!jt&&(ls(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){Ge(n,e,c)}yr(t,e,n);break;case 21:yr(t,e,n);break;case 22:n.mode&1?(jt=(r=jt)||n.memoizedState!==null,yr(t,e,n),jt=r):yr(t,e,n);break;default:yr(t,e,n)}}function Qm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new xw),e.forEach(function(r){var i=Aw.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function yn(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,a=e,c=a;e:for(;c!==null;){switch(c.tag){case 5:gt=c.stateNode,_n=!1;break e;case 3:gt=c.stateNode.containerInfo,_n=!0;break e;case 4:gt=c.stateNode.containerInfo,_n=!0;break e}c=c.return}if(gt===null)throw Error(W(160));x0(s,a,i),gt=null,_n=!1;var d=i.alternate;d!==null&&(d.return=null),i.return=null}catch(f){Ge(i,e,f)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)_0(e,t),e=e.sibling}function _0(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(yn(e,t),Dn(t),r&4){try{Po(3,t,t.return),Lc(3,t)}catch(V){Ge(t,t.return,V)}try{Po(5,t,t.return)}catch(V){Ge(t,t.return,V)}}break;case 1:yn(e,t),Dn(t),r&512&&n!==null&&ls(n,n.return);break;case 5:if(yn(e,t),Dn(t),r&512&&n!==null&&ls(n,n.return),t.flags&32){var i=t.stateNode;try{qo(i,"")}catch(V){Ge(t,t.return,V)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,c=t.type,d=t.updateQueue;if(t.updateQueue=null,d!==null)try{c==="input"&&s.type==="radio"&&s.name!=null&&qy(i,s),xd(c,a);var f=xd(c,s);for(a=0;a<d.length;a+=2){var g=d[a],v=d[a+1];g==="style"?Ky(i,v):g==="dangerouslySetInnerHTML"?Wy(i,v):g==="children"?qo(i,v):Ch(i,g,v,f)}switch(c){case"input":pd(i,s);break;case"textarea":By(i,s);break;case"select":var _=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var A=s.value;A!=null?ds(i,!!s.multiple,A,!1):_!==!!s.multiple&&(s.defaultValue!=null?ds(i,!!s.multiple,s.defaultValue,!0):ds(i,!!s.multiple,s.multiple?[]:"",!1))}i[Xo]=s}catch(V){Ge(t,t.return,V)}}break;case 6:if(yn(e,t),Dn(t),r&4){if(t.stateNode===null)throw Error(W(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(V){Ge(t,t.return,V)}}break;case 3:if(yn(e,t),Dn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ho(e.containerInfo)}catch(V){Ge(t,t.return,V)}break;case 4:yn(e,t),Dn(t);break;case 13:yn(e,t),Dn(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(df=Je())),r&4&&Qm(t);break;case 22:if(g=n!==null&&n.memoizedState!==null,t.mode&1?(jt=(f=jt)||g,yn(e,t),jt=f):yn(e,t),Dn(t),r&8192){if(f=t.memoizedState!==null,(t.stateNode.isHidden=f)&&!g&&t.mode&1)for(J=t,g=t.child;g!==null;){for(v=J=g;J!==null;){switch(_=J,A=_.child,_.tag){case 0:case 11:case 14:case 15:Po(4,_,_.return);break;case 1:ls(_,_.return);var E=_.stateNode;if(typeof E.componentWillUnmount=="function"){r=_,n=_.return;try{e=r,E.props=e.memoizedProps,E.state=e.memoizedState,E.componentWillUnmount()}catch(V){Ge(r,n,V)}}break;case 5:ls(_,_.return);break;case 22:if(_.memoizedState!==null){Xm(v);continue}}A!==null?(A.return=_,J=A):Xm(v)}g=g.sibling}e:for(g=null,v=t;;){if(v.tag===5){if(g===null){g=v;try{i=v.stateNode,f?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(c=v.stateNode,d=v.memoizedProps.style,a=d!=null&&d.hasOwnProperty("display")?d.display:null,c.style.display=Hy("display",a))}catch(V){Ge(t,t.return,V)}}}else if(v.tag===6){if(g===null)try{v.stateNode.nodeValue=f?"":v.memoizedProps}catch(V){Ge(t,t.return,V)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===t)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===t)break e;for(;v.sibling===null;){if(v.return===null||v.return===t)break e;g===v&&(g=null),v=v.return}g===v&&(g=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:yn(e,t),Dn(t),r&4&&Qm(t);break;case 21:break;default:yn(e,t),Dn(t)}}function Dn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(v0(n)){var r=n;break e}n=n.return}throw Error(W(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(qo(i,""),r.flags&=-33);var s=Gm(t);Qd(t,s,i);break;case 3:case 4:var a=r.stateNode.containerInfo,c=Gm(t);Gd(t,c,a);break;default:throw Error(W(161))}}catch(d){Ge(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function bw(t,e,n){J=t,b0(t)}function b0(t,e,n){for(var r=(t.mode&1)!==0;J!==null;){var i=J,s=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||ul;if(!a){var c=i.alternate,d=c!==null&&c.memoizedState!==null||jt;c=ul;var f=jt;if(ul=a,(jt=d)&&!f)for(J=i;J!==null;)a=J,d=a.child,a.tag===22&&a.memoizedState!==null?Jm(i):d!==null?(d.return=a,J=d):Jm(i);for(;s!==null;)J=s,b0(s),s=s.sibling;J=i,ul=c,jt=f}Ym(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,J=s):Ym(t)}}function Ym(t){for(;J!==null;){var e=J;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:jt||Lc(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!jt)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:xn(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Nm(e,s,r);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Nm(e,a,n)}break;case 5:var c=e.stateNode;if(n===null&&e.flags&4){n=c;var d=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&n.focus();break;case"img":d.src&&(n.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var f=e.alternate;if(f!==null){var g=f.memoizedState;if(g!==null){var v=g.dehydrated;v!==null&&Ho(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(W(163))}jt||e.flags&512&&Kd(e)}catch(_){Ge(e,e.return,_)}}if(e===t){J=null;break}if(n=e.sibling,n!==null){n.return=e.return,J=n;break}J=e.return}}function Xm(t){for(;J!==null;){var e=J;if(e===t){J=null;break}var n=e.sibling;if(n!==null){n.return=e.return,J=n;break}J=e.return}}function Jm(t){for(;J!==null;){var e=J;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Lc(4,e)}catch(d){Ge(e,n,d)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(d){Ge(e,i,d)}}var s=e.return;try{Kd(e)}catch(d){Ge(e,s,d)}break;case 5:var a=e.return;try{Kd(e)}catch(d){Ge(e,a,d)}}}catch(d){Ge(e,e.return,d)}if(e===t){J=null;break}var c=e.sibling;if(c!==null){c.return=e.return,J=c;break}J=e.return}}var ww=Math.ceil,sc=dr.ReactCurrentDispatcher,cf=dr.ReactCurrentOwner,un=dr.ReactCurrentBatchConfig,Ee=0,dt=null,et=null,xt=0,Yt=0,cs=Qr(0),st=0,ra=null,Ii=0,Vc=0,uf=0,No=null,qt=null,df=0,Ts=1/0,Hn=null,oc=!1,Yd=null,Lr=null,dl=!1,Ar=null,ac=0,Mo=0,Xd=null,kl=-1,Al=0;function Ot(){return Ee&6?Je():kl!==-1?kl:kl=Je()}function Vr(t){return t.mode&1?Ee&2&&xt!==0?xt&-xt:sw.transition!==null?(Al===0&&(Al=sv()),Al):(t=ke,t!==0||(t=window.event,t=t===void 0?16:hv(t.type)),t):1}function Sn(t,e,n,r){if(50<Mo)throw Mo=0,Xd=null,Error(W(185));ma(t,n,r),(!(Ee&2)||t!==dt)&&(t===dt&&(!(Ee&2)&&(Vc|=n),st===4&&Sr(t,xt)),Kt(t,r),n===1&&Ee===0&&!(e.mode&1)&&(Ts=Je()+500,Pc&&Yr()))}function Kt(t,e){var n=t.callbackNode;sb(t,e);var r=$l(t,t===dt?xt:0);if(r===0)n!==null&&am(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&am(n),e===1)t.tag===0?iw(Zm.bind(null,t)):Cv(Zm.bind(null,t)),ew(function(){!(Ee&6)&&Yr()}),n=null;else{switch(ov(r)){case 1:n=Lh;break;case 4:n=rv;break;case 16:n=Bl;break;case 536870912:n=iv;break;default:n=Bl}n=A0(n,w0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function w0(t,e){if(kl=-1,Al=0,Ee&6)throw Error(W(327));var n=t.callbackNode;if(gs()&&t.callbackNode!==n)return null;var r=$l(t,t===dt?xt:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=lc(t,r);else{e=r;var i=Ee;Ee|=2;var s=E0();(dt!==t||xt!==e)&&(Hn=null,Ts=Je()+500,_i(t,e));do try{Rw();break}catch(c){S0(t,c)}while(!0);Qh(),sc.current=s,Ee=i,et!==null?e=0:(dt=null,xt=0,e=st)}if(e!==0){if(e===2&&(i=Ed(t),i!==0&&(r=i,e=Jd(t,i))),e===1)throw n=ra,_i(t,0),Sr(t,r),Kt(t,Je()),n;if(e===6)Sr(t,r);else{if(i=t.current.alternate,!(r&30)&&!Sw(i)&&(e=lc(t,r),e===2&&(s=Ed(t),s!==0&&(r=s,e=Jd(t,s))),e===1))throw n=ra,_i(t,0),Sr(t,r),Kt(t,Je()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(W(345));case 2:pi(t,qt,Hn);break;case 3:if(Sr(t,r),(r&130023424)===r&&(e=df+500-Je(),10<e)){if($l(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){Ot(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Dd(pi.bind(null,t,qt,Hn),e);break}pi(t,qt,Hn);break;case 4:if(Sr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var a=31-wn(r);s=1<<a,a=e[a],a>i&&(i=a),r&=~s}if(r=i,r=Je()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ww(r/1960))-r,10<r){t.timeoutHandle=Dd(pi.bind(null,t,qt,Hn),r);break}pi(t,qt,Hn);break;case 5:pi(t,qt,Hn);break;default:throw Error(W(329))}}}return Kt(t,Je()),t.callbackNode===n?w0.bind(null,t):null}function Jd(t,e){var n=No;return t.current.memoizedState.isDehydrated&&(_i(t,e).flags|=256),t=lc(t,e),t!==2&&(e=qt,qt=n,e!==null&&Zd(e)),t}function Zd(t){qt===null?qt=t:qt.push.apply(qt,t)}function Sw(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!En(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Sr(t,e){for(e&=~uf,e&=~Vc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-wn(e),r=1<<n;t[n]=-1,e&=~r}}function Zm(t){if(Ee&6)throw Error(W(327));gs();var e=$l(t,0);if(!(e&1))return Kt(t,Je()),null;var n=lc(t,e);if(t.tag!==0&&n===2){var r=Ed(t);r!==0&&(e=r,n=Jd(t,r))}if(n===1)throw n=ra,_i(t,0),Sr(t,e),Kt(t,Je()),n;if(n===6)throw Error(W(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,pi(t,qt,Hn),Kt(t,Je()),null}function hf(t,e){var n=Ee;Ee|=1;try{return t(e)}finally{Ee=n,Ee===0&&(Ts=Je()+500,Pc&&Yr())}}function Ti(t){Ar!==null&&Ar.tag===0&&!(Ee&6)&&gs();var e=Ee;Ee|=1;var n=un.transition,r=ke;try{if(un.transition=null,ke=1,t)return t()}finally{ke=r,un.transition=n,Ee=e,!(Ee&6)&&Yr()}}function ff(){Yt=cs.current,Oe(cs)}function _i(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Zb(n)),et!==null)for(n=et.return;n!==null;){var r=n;switch(Hh(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ql();break;case 3:Rs(),Oe(Wt),Oe(Pt),tf();break;case 5:ef(r);break;case 4:Rs();break;case 13:Oe(qe);break;case 19:Oe(qe);break;case 10:Yh(r.type._context);break;case 22:case 23:ff()}n=n.return}if(dt=t,et=t=Or(t.current,null),xt=Yt=e,st=0,ra=null,uf=Vc=Ii=0,qt=No=null,yi!==null){for(e=0;e<yi.length;e++)if(n=yi[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var a=s.next;s.next=i,r.next=a}n.pending=r}yi=null}return t}function S0(t,e){do{var n=et;try{if(Qh(),Rl.current=ic,rc){for(var r=Be.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}rc=!1}if(Ri=0,ut=it=Be=null,Do=!1,ea=0,cf.current=null,n===null||n.return===null){st=1,ra=e,et=null;break}e:{var s=t,a=n.return,c=n,d=e;if(e=xt,c.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var f=d,g=c,v=g.tag;if(!(g.mode&1)&&(v===0||v===11||v===15)){var _=g.alternate;_?(g.updateQueue=_.updateQueue,g.memoizedState=_.memoizedState,g.lanes=_.lanes):(g.updateQueue=null,g.memoizedState=null)}var A=Um(a);if(A!==null){A.flags&=-257,zm(A,a,c,s,e),A.mode&1&&Fm(s,f,e),e=A,d=f;var E=e.updateQueue;if(E===null){var V=new Set;V.add(d),e.updateQueue=V}else E.add(d);break e}else{if(!(e&1)){Fm(s,f,e),pf();break e}d=Error(W(426))}}else if(ze&&c.mode&1){var z=Um(a);if(z!==null){!(z.flags&65536)&&(z.flags|=256),zm(z,a,c,s,e),Kh(Is(d,c));break e}}s=d=Is(d,c),st!==4&&(st=2),No===null?No=[s]:No.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var T=o0(s,d,e);Pm(s,T);break e;case 1:c=d;var u=s.type,I=s.stateNode;if(!(s.flags&128)&&(typeof u.getDerivedStateFromError=="function"||I!==null&&typeof I.componentDidCatch=="function"&&(Lr===null||!Lr.has(I)))){s.flags|=65536,e&=-e,s.lanes|=e;var M=a0(s,c,e);Pm(s,M);break e}}s=s.return}while(s!==null)}I0(n)}catch(F){e=F,et===n&&n!==null&&(et=n=n.return);continue}break}while(!0)}function E0(){var t=sc.current;return sc.current=ic,t===null?ic:t}function pf(){(st===0||st===3||st===2)&&(st=4),dt===null||!(Ii&268435455)&&!(Vc&268435455)||Sr(dt,xt)}function lc(t,e){var n=Ee;Ee|=2;var r=E0();(dt!==t||xt!==e)&&(Hn=null,_i(t,e));do try{Ew();break}catch(i){S0(t,i)}while(!0);if(Qh(),Ee=n,sc.current=r,et!==null)throw Error(W(261));return dt=null,xt=0,st}function Ew(){for(;et!==null;)R0(et)}function Rw(){for(;et!==null&&!Y_();)R0(et)}function R0(t){var e=k0(t.alternate,t,Yt);t.memoizedProps=t.pendingProps,e===null?I0(t):et=e,cf.current=null}function I0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=vw(n,e),n!==null){n.flags&=32767,et=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{st=6,et=null;return}}else if(n=yw(n,e,Yt),n!==null){et=n;return}if(e=e.sibling,e!==null){et=e;return}et=e=t}while(e!==null);st===0&&(st=5)}function pi(t,e,n){var r=ke,i=un.transition;try{un.transition=null,ke=1,Iw(t,e,n,r)}finally{un.transition=i,ke=r}return null}function Iw(t,e,n,r){do gs();while(Ar!==null);if(Ee&6)throw Error(W(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(W(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(ob(t,s),t===dt&&(et=dt=null,xt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||dl||(dl=!0,A0(Bl,function(){return gs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=un.transition,un.transition=null;var a=ke;ke=1;var c=Ee;Ee|=4,cf.current=null,_w(t,n),_0(n,t),Hb(jd),Wl=!!Ad,jd=Ad=null,t.current=n,bw(n),X_(),Ee=c,ke=a,un.transition=s}else t.current=n;if(dl&&(dl=!1,Ar=t,ac=i),s=t.pendingLanes,s===0&&(Lr=null),eb(n.stateNode),Kt(t,Je()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(oc)throw oc=!1,t=Yd,Yd=null,t;return ac&1&&t.tag!==0&&gs(),s=t.pendingLanes,s&1?t===Xd?Mo++:(Mo=0,Xd=t):Mo=0,Yr(),null}function gs(){if(Ar!==null){var t=ov(ac),e=un.transition,n=ke;try{if(un.transition=null,ke=16>t?16:t,Ar===null)var r=!1;else{if(t=Ar,Ar=null,ac=0,Ee&6)throw Error(W(331));var i=Ee;for(Ee|=4,J=t.current;J!==null;){var s=J,a=s.child;if(J.flags&16){var c=s.deletions;if(c!==null){for(var d=0;d<c.length;d++){var f=c[d];for(J=f;J!==null;){var g=J;switch(g.tag){case 0:case 11:case 15:Po(8,g,s)}var v=g.child;if(v!==null)v.return=g,J=v;else for(;J!==null;){g=J;var _=g.sibling,A=g.return;if(y0(g),g===f){J=null;break}if(_!==null){_.return=A,J=_;break}J=A}}}var E=s.alternate;if(E!==null){var V=E.child;if(V!==null){E.child=null;do{var z=V.sibling;V.sibling=null,V=z}while(V!==null)}}J=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,J=a;else e:for(;J!==null;){if(s=J,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Po(9,s,s.return)}var T=s.sibling;if(T!==null){T.return=s.return,J=T;break e}J=s.return}}var u=t.current;for(J=u;J!==null;){a=J;var I=a.child;if(a.subtreeFlags&2064&&I!==null)I.return=a,J=I;else e:for(a=u;J!==null;){if(c=J,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Lc(9,c)}}catch(F){Ge(c,c.return,F)}if(c===a){J=null;break e}var M=c.sibling;if(M!==null){M.return=c.return,J=M;break e}J=c.return}}if(Ee=i,Yr(),Ln&&typeof Ln.onPostCommitFiberRoot=="function")try{Ln.onPostCommitFiberRoot(kc,t)}catch{}r=!0}return r}finally{ke=n,un.transition=e}}return!1}function eg(t,e,n){e=Is(n,e),e=o0(t,e,1),t=Mr(t,e,1),e=Ot(),t!==null&&(ma(t,1,e),Kt(t,e))}function Ge(t,e,n){if(t.tag===3)eg(t,t,n);else for(;e!==null;){if(e.tag===3){eg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Lr===null||!Lr.has(r))){t=Is(n,t),t=a0(e,t,1),e=Mr(e,t,1),t=Ot(),e!==null&&(ma(e,1,t),Kt(e,t));break}}e=e.return}}function Tw(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=Ot(),t.pingedLanes|=t.suspendedLanes&n,dt===t&&(xt&n)===n&&(st===4||st===3&&(xt&130023424)===xt&&500>Je()-df?_i(t,0):uf|=n),Kt(t,e)}function T0(t,e){e===0&&(t.mode&1?(e=tl,tl<<=1,!(tl&130023424)&&(tl=4194304)):e=1);var n=Ot();t=ir(t,e),t!==null&&(ma(t,e,n),Kt(t,n))}function kw(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),T0(t,n)}function Aw(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(W(314))}r!==null&&r.delete(e),T0(t,n)}var k0;k0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Wt.current)$t=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return $t=!1,gw(t,e,n);$t=!!(t.flags&131072)}else $t=!1,ze&&e.flags&1048576&&Dv(e,Jl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Tl(t,e),t=e.pendingProps;var i=ws(e,Pt.current);ms(e,n),i=rf(null,e,r,t,i,n);var s=sf();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Ht(r)?(s=!0,Yl(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Jh(e),i.updater=Mc,e.stateNode=i,i._reactInternals=e,Fd(e,r,t,n),e=qd(null,e,r,!0,s,n)):(e.tag=0,ze&&s&&Wh(e),Vt(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Tl(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=Cw(r),t=xn(r,t),i){case 0:e=zd(null,e,r,t,n);break e;case 1:e=$m(null,e,r,t,n);break e;case 11:e=qm(null,e,r,t,n);break e;case 14:e=Bm(null,e,r,xn(r.type,t),n);break e}throw Error(W(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:xn(r,i),zd(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:xn(r,i),$m(t,e,r,i,n);case 3:e:{if(d0(e),t===null)throw Error(W(387));r=e.pendingProps,s=e.memoizedState,i=s.element,Ov(t,e),tc(e,r,null,n);var a=e.memoizedState;if(r=a.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Is(Error(W(423)),e),e=Wm(t,e,r,n,i);break e}else if(r!==i){i=Is(Error(W(424)),e),e=Wm(t,e,r,n,i);break e}else for(Xt=Nr(e.stateNode.containerInfo.firstChild),Zt=e,ze=!0,bn=null,n=Lv(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ss(),r===i){e=sr(t,e,n);break e}Vt(t,e,r,n)}e=e.child}return e;case 5:return Fv(e),t===null&&Ld(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,a=i.children,Cd(r,i)?a=null:s!==null&&Cd(r,s)&&(e.flags|=32),u0(t,e),Vt(t,e,a,n),e.child;case 6:return t===null&&Ld(e),null;case 13:return h0(t,e,n);case 4:return Zh(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Es(e,null,r,n):Vt(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:xn(r,i),qm(t,e,r,i,n);case 7:return Vt(t,e,e.pendingProps,n),e.child;case 8:return Vt(t,e,e.pendingProps.children,n),e.child;case 12:return Vt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,a=i.value,De(Zl,r._currentValue),r._currentValue=a,s!==null)if(En(s.value,a)){if(s.children===i.children&&!Wt.current){e=sr(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var c=s.dependencies;if(c!==null){a=s.child;for(var d=c.firstContext;d!==null;){if(d.context===r){if(s.tag===1){d=Zn(-1,n&-n),d.tag=2;var f=s.updateQueue;if(f!==null){f=f.shared;var g=f.pending;g===null?d.next=d:(d.next=g.next,g.next=d),f.pending=d}}s.lanes|=n,d=s.alternate,d!==null&&(d.lanes|=n),Vd(s.return,n,e),c.lanes|=n;break}d=d.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(W(341));a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),Vd(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}Vt(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,ms(e,n),i=hn(i),r=r(i),e.flags|=1,Vt(t,e,r,n),e.child;case 14:return r=e.type,i=xn(r,e.pendingProps),i=xn(r.type,i),Bm(t,e,r,i,n);case 15:return l0(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:xn(r,i),Tl(t,e),e.tag=1,Ht(r)?(t=!0,Yl(e)):t=!1,ms(e,n),s0(e,r,i),Fd(e,r,i,n),qd(null,e,r,!0,t,n);case 19:return f0(t,e,n);case 22:return c0(t,e,n)}throw Error(W(156,e.tag))};function A0(t,e){return nv(t,e)}function jw(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function cn(t,e,n,r){return new jw(t,e,n,r)}function mf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Cw(t){if(typeof t=="function")return mf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Ph)return 11;if(t===Nh)return 14}return 2}function Or(t,e){var n=t.alternate;return n===null?(n=cn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function jl(t,e,n,r,i,s){var a=2;if(r=t,typeof t=="function")mf(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case Zi:return bi(n.children,i,s,e);case Dh:a=8,i|=8;break;case cd:return t=cn(12,n,e,i|2),t.elementType=cd,t.lanes=s,t;case ud:return t=cn(13,n,e,i),t.elementType=ud,t.lanes=s,t;case dd:return t=cn(19,n,e,i),t.elementType=dd,t.lanes=s,t;case Fy:return Oc(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Vy:a=10;break e;case Oy:a=9;break e;case Ph:a=11;break e;case Nh:a=14;break e;case _r:a=16,r=null;break e}throw Error(W(130,t==null?t:typeof t,""))}return e=cn(a,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function bi(t,e,n,r){return t=cn(7,t,r,e),t.lanes=n,t}function Oc(t,e,n,r){return t=cn(22,t,r,e),t.elementType=Fy,t.lanes=n,t.stateNode={isHidden:!1},t}function Hu(t,e,n){return t=cn(6,t,null,e),t.lanes=n,t}function Ku(t,e,n){return e=cn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Dw(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Tu(0),this.expirationTimes=Tu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Tu(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function gf(t,e,n,r,i,s,a,c,d){return t=new Dw(t,e,n,c,d),e===1?(e=1,s===!0&&(e|=8)):e=0,s=cn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Jh(s),t}function Pw(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ji,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function j0(t){if(!t)return $r;t=t._reactInternals;e:{if(Mi(t)!==t||t.tag!==1)throw Error(W(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Ht(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(W(171))}if(t.tag===1){var n=t.type;if(Ht(n))return jv(t,n,e)}return e}function C0(t,e,n,r,i,s,a,c,d){return t=gf(n,r,!0,t,i,s,a,c,d),t.context=j0(null),n=t.current,r=Ot(),i=Vr(n),s=Zn(r,i),s.callback=e??null,Mr(n,s,i),t.current.lanes=i,ma(t,i,r),Kt(t,r),t}function Fc(t,e,n,r){var i=e.current,s=Ot(),a=Vr(i);return n=j0(n),e.context===null?e.context=n:e.pendingContext=n,e=Zn(s,a),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Mr(i,e,a),t!==null&&(Sn(t,i,a,s),El(t,i,a)),a}function cc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function tg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function yf(t,e){tg(t,e),(t=t.alternate)&&tg(t,e)}function Nw(){return null}var D0=typeof reportError=="function"?reportError:function(t){console.error(t)};function vf(t){this._internalRoot=t}Uc.prototype.render=vf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(W(409));Fc(t,e,null,null)};Uc.prototype.unmount=vf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Ti(function(){Fc(null,t,null,null)}),e[rr]=null}};function Uc(t){this._internalRoot=t}Uc.prototype.unstable_scheduleHydration=function(t){if(t){var e=cv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<wr.length&&e!==0&&e<wr[n].priority;n++);wr.splice(n,0,t),n===0&&dv(t)}};function xf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function zc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function ng(){}function Mw(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var f=cc(a);s.call(f)}}var a=C0(e,r,t,0,null,!1,!1,"",ng);return t._reactRootContainer=a,t[rr]=a.current,Qo(t.nodeType===8?t.parentNode:t),Ti(),a}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var c=r;r=function(){var f=cc(d);c.call(f)}}var d=gf(t,0,!1,null,null,!1,!1,"",ng);return t._reactRootContainer=d,t[rr]=d.current,Qo(t.nodeType===8?t.parentNode:t),Ti(function(){Fc(e,d,n,r)}),d}function qc(t,e,n,r,i){var s=n._reactRootContainer;if(s){var a=s;if(typeof i=="function"){var c=i;i=function(){var d=cc(a);c.call(d)}}Fc(e,a,t,i)}else a=Mw(n,e,t,i,r);return cc(a)}av=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=xo(e.pendingLanes);n!==0&&(Vh(e,n|1),Kt(e,Je()),!(Ee&6)&&(Ts=Je()+500,Yr()))}break;case 13:Ti(function(){var r=ir(t,1);if(r!==null){var i=Ot();Sn(r,t,1,i)}}),yf(t,1)}};Oh=function(t){if(t.tag===13){var e=ir(t,134217728);if(e!==null){var n=Ot();Sn(e,t,134217728,n)}yf(t,134217728)}};lv=function(t){if(t.tag===13){var e=Vr(t),n=ir(t,e);if(n!==null){var r=Ot();Sn(n,t,e,r)}yf(t,e)}};cv=function(){return ke};uv=function(t,e){var n=ke;try{return ke=t,e()}finally{ke=n}};bd=function(t,e,n){switch(e){case"input":if(pd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Dc(r);if(!i)throw Error(W(90));zy(r),pd(r,i)}}}break;case"textarea":By(t,n);break;case"select":e=n.value,e!=null&&ds(t,!!n.multiple,e,!1)}};Yy=hf;Xy=Ti;var Lw={usingClientEntryPoint:!1,Events:[ya,rs,Dc,Gy,Qy,hf]},mo={findFiberByHostInstance:gi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Vw={bundleType:mo.bundleType,version:mo.version,rendererPackageName:mo.rendererPackageName,rendererConfig:mo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:dr.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=ev(t),t===null?null:t.stateNode},findFiberByHostInstance:mo.findFiberByHostInstance||Nw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var hl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hl.isDisabled&&hl.supportsFiber)try{kc=hl.inject(Vw),Ln=hl}catch{}}tn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Lw;tn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!xf(e))throw Error(W(200));return Pw(t,e,null,n)};tn.createRoot=function(t,e){if(!xf(t))throw Error(W(299));var n=!1,r="",i=D0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=gf(t,1,!1,null,null,n,!1,r,i),t[rr]=e.current,Qo(t.nodeType===8?t.parentNode:t),new vf(e)};tn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(W(188)):(t=Object.keys(t).join(","),Error(W(268,t)));return t=ev(e),t=t===null?null:t.stateNode,t};tn.flushSync=function(t){return Ti(t)};tn.hydrate=function(t,e,n){if(!zc(e))throw Error(W(200));return qc(null,t,e,!0,n)};tn.hydrateRoot=function(t,e,n){if(!xf(t))throw Error(W(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",a=D0;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=C0(e,null,t,1,n??null,i,!1,s,a),t[rr]=e.current,Qo(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Uc(e)};tn.render=function(t,e,n){if(!zc(e))throw Error(W(200));return qc(null,t,e,!1,n)};tn.unmountComponentAtNode=function(t){if(!zc(t))throw Error(W(40));return t._reactRootContainer?(Ti(function(){qc(null,null,t,!1,function(){t._reactRootContainer=null,t[rr]=null})}),!0):!1};tn.unstable_batchedUpdates=hf;tn.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!zc(n))throw Error(W(200));if(t==null||t._reactInternals===void 0)throw Error(W(38));return qc(t,e,n,!1,r)};tn.version="18.3.1-next-f1338f8080-20240426";function P0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(P0)}catch(t){console.error(t)}}P0(),Py.exports=tn;var Ow=Py.exports,rg=Ow;ad.createRoot=rg.createRoot,ad.hydrateRoot=rg.hydrateRoot;const Fw={es:{login:{title:"LabReserve",createAccount:"Crear Cuenta",subtitle:"Sistema de Reservas del Laboratorio",email:"Correo electrónico",password:"Contraseña",btnLogin:"Ingresar",btnRegister:"Registrarse",switchToRegister:"¿No tienes cuenta? Regístrate",switchToLogin:"¿Ya tienes cuenta? Inicia sesión",noAccount:"¿No tienes cuenta?",alreadyHaveAccount:"¿Ya tienes cuenta?",loggingIn:"Ingresando...",creatingAccount:"Creando cuenta y verificando permisos...",errorCredentials:"Error: Credenciales incorrectas.",feature1Title:"Gestión Inteligente",feature1Desc:"Administra tus reservas de laboratorios eficientemente",feature2Title:"Optimización de Recursos",feature2Desc:"Maximiza el uso de tus equipos y aulas educativas",feature3Title:"Colaboración Educativa",feature3Desc:"Facilita la colaboración entre estudiantes y docentes"},topbar:{systemName:"Sistema de Reservas del Laboratorio",langButton:"EN",langLabel:"Idioma"},nav:{home:"Inicio",roles:"Gestión de Roles",classrooms:"Aulas",inventory:"Inventario",reservedRooms:"Aulas Reservadas",availableRooms:"Aulas Disponibles",myRequests:"Mis Solicitudes",inventoryView:"Inventario",requests:"Solicitudes",allReservations:"Todas las Reservas",logout:"Cerrar Sesión"},roles:{admin:"ADMIN",maestro:"MAESTRO",alumno:"ALUMNO"},notifications:{title:"Mis Notificaciones",empty:"Bandeja vacía",unread:"sin leer",markRead:"✔ Leída",newMaterialRequest:"Nueva Solicitud de Material",materialApproved:"Material Aprobado",materialRejected:"Material Rechazado",successfulReturn:"Devolución Exitosa",overdueReminder:"⚠️ Material Atrasado",permissionsUpdated:"🛡️ Permisos Actualizados",newRoomRequest:"Nueva Solicitud de Aula",directReservationCreated:"Reserva Directa Creada",roomReservationConfirmed:"Reserva Confirmada",roomReservationRejected:"Reserva Rechazada",scheduleReleased:"Horario Liberado / Cancelación"},overdueAlert:{title:"¡ATENCIÓN! Tienes material vencido",subtitle:"Debes devolver el siguiente material al administrador inmediatamente:"},status:{approved:"Aprobada",rejected:"Rechazada",pending:"Pendiente",confirmed:"Confirmada",available:"Disponible",maintenance:"Mantenimiento",returned:"Devuelto",noStock:"Sin Stock",inactive:"Inactivo",cancelled:"Cancelada"},home:{panelLabel:"Panel de Control",welcome:"Bienvenido,",systemName:"Sistema de Gestión de Laboratorio — LabReserve",accessLevel:"Nivel de Acceso",systemOnline:"Sistema en línea",registeredRooms:"Aulas Registradas",spaces:"espacios disponibles",stockUnits:"Unidades en Stock",equipmentMaterials:"equipos y materiales",confirmedReservations:"Reservas Confirmadas",activeReservations:"reservas activas",pendingRequests:"Solicitudes Pendientes",needAttention:"requieren atención",myRequestsStat:"Mis Solicitudes",sentRequests:"trámites enviados",quickAccess:"Acceso Directo",checkAvailability:"Consultar Disponibilidad",checkAvailabilitySub:"Ver horarios de aulas",requestMaterial:"Solicitar Material",requestMaterialSub:"Préstamo de equipos",manageRequests:"Gestionar Solicitudes",pending:"pendiente(s) de revisión",userManagement:"Gestión de Usuarios",registered:"usuario(s) registrado(s)",allReservations:"Todas las Reservas",fullHistory:"Historial completo",recentActivity:"Actividad Reciente",noActivity:"Sin actividad reciente"},rolesPage:{adminLabel:"Administración del Sistema",title:"Gestión de",titleItalic:"Usuarios y Roles",subtitle:"Asigna niveles de acceso y administra los permisos del sistema",totalUsers:"Total usuarios",admins:"Administradores",teachers:"Maestros",students:"Alumnos",formTitle:"Asignar Nivel de Acceso",formSubtitle:"Si el usuario ya tiene cuenta, su rol se actualiza de inmediato. Si aún no se registra, el rol se aplicará al momento de crear su cuenta.",emailLabel:"Correo Electrónico",emailPlaceholder:"usuario@institucion.edu",accessLevel:"Nivel de Acceso",selectRole:"Seleccionar rol...",roleTeacher:"Maestro / Profesor",roleAdmin:"Administrador",roleStudent:"Alumno (sin privilegios)",assignBtn:"Asignar Permisos",tableTitle:"Usuarios Registrados",tableSubtitle:"cuenta(s) en el sistema",colUser:"Usuario",colAccess:"Nivel de Acceso",colDate:"Registro",colActions:"Acciones",you:"(tú)",revokeBtn:"Revocar acceso",showing:"Mostrando",users:"usuario(s)",changesApply:"Los cambios de rol se aplican de inmediato",loadingUsers:"Cargando usuarios..."},classrooms:{sectionLabel:"Gestión de Espacios",title:"Control de",titleItalic:"Aulas",subtitle:"Registra espacios, define capacidad y administra el equipamiento disponible",totalRooms:"Aulas totales",available:"Disponibles",maintenance:"Mantenimiento",activeReservations:"Reservas activas",newRoomTitle:"Registrar Nueva Aula",newRoomSubtitle:"Agrega un nuevo espacio al sistema con su equipamiento y capacidad",cancelBtn:"× Cancelar",newRoomBtn:"+ Nueva Aula",nameLabel:"Nombre del aula",namePlaceholder:"Ej: Laboratorio A / Sala de Videoconferencia",capacityLabel:"Capacidad",equipmentLabel:"Equipo principal",selectEquip:"Seleccionar...",registerBtn:"Registrar aula",cancel:"Cancelar",tableSummary:"aula(s) registrada(s) · capacidad total:",people:"personas",colRoom:"Aula",colCapacity:"Capacidad",colEquipment:"Equipo disponible",colStatus:"Estado",colActiveRes:"Reservas activas",colCreated:"Creada",colActions:"Acciones",statusAvailable:"Disponible",statusMaintenance:"Mantenimiento",deleteBtn:"Eliminar",reservations:"reserva(s)",noRooms:"Sin aulas registradas",noRoomsHint:"Usa el formulario de arriba para agregar la primera aula",footerNote:"Los cambios son inmediatos y se reflejan para todos los usuarios",vrGlasses:"Gafas RV",cameras:"Cámaras",laptops:"Laptops",projector:"Proyector",interactiveScreen:"Pantalla interactiva",multiple:"Múltiple",noEquip:"Sin equipo"},inventoryAdmin:{sectionLabel:"Gestión de Recursos",title:"Control de",titleItalic:"Inventario",subtitle:"Registra equipos, administra stock y gestiona préstamos",equipmentTypes:"Tipos de equipo",stockUnits:"Unidades en stock",noStock:"Sin stock",activeLoans:"Préstamos activos",overdue:"Atrasados",addTitle:"Registrar Nuevo Equipo",addSubtitle:"Agrega equipos o materiales al inventario del laboratorio",cancelAdd:"× Cancelar",addBtn:"+ Agregar equipo",nameLabel:"Nombre del equipo",namePlaceholder:"Ej: Cámara Sony ZV-E10",categoryLabel:"Categoría",selectCategory:"Seleccionar...",qtyLabel:"Cantidad",statusLabel:"Estado inicial",registerBtn:"Registrar en inventario",cancel:"Cancelar",tabCatalog:"Catálogo de Equipos",tabRequests:"Solicitudes",tabLoans:"Préstamos Activos",sendReminders:"Enviar recordatorios de atraso",withStock:"Con stock",noStockLabel:"Sin stock",maintenanceLabel:"Mantenimiento",colEquipment:"Equipo",colCategory:"Categoría",colStock:"Stock actual",colOnLoan:"En préstamo",colStatus:"Estado",colRegisteredBy:"Registrado por",colActions:"Acciones",units:"uds.",deleteBtn:"Eliminar",noEquipment:"Sin equipos registrados",noEquipmentHint:"Usa el formulario de arriba para agregar el primer equipo",editHint:"Click en la cantidad para editar · Enter para guardar",noPendingRequests:"Sin solicitudes pendientes",colRequester:"Solicitante",colMaterial:"Material",colQty:"Cantidad",colReason:"Motivo",colDuration:"Duración",colDueDate:"Devolución esperada",hours:"h",overdueBadge:"Vencido",approveBtn:"Aprobar",rejectBtn:"Rechazar",onTime:"En tiempo",overdueLabel:"Atrasados",allReturned:"Todo devuelto",noActiveLoans:"No hay materiales en préstamo activo",colLoanedTo:"Prestado a",colDueTime:"Vencimiento",colDelivery:"Estado de entrega",confirmReturn:"Confirmar devolución",notifyOverdue:"Notificar a",overdueUsers:"usuario(s) atrasado(s)"},reservedRooms:{sectionLabel:"Gestión de Reservas",title:"Aulas",titleItalic:"Reservadas",subtitle:"Consulta el estado de ocupación, horarios activos y reservas del sistema",totalRooms:"Aulas totales",withReservations:"Con reservas",withoutReservations:"Sin reservas",totalConfirmed:"Total confirmadas",viewByRoom:"Vista por Aulas",reservationList:"Lista de Reservas",confirmed:"Confirmadas",cancelled:"Canceladas",newReservation:"+ Nueva reserva",occupancyToday:"Ocupación hoy",slotsOf:"de",slots:"bloques",availableToReserve:"Disponible para reservar",viewSchedule:"Ver horarios",reserve:"+ Reservar",today:"hoy",cancelBtn:"Cancelar",noRooms:"No hay aulas registradas",noRoomsHint:'Ve a "Aulas" para agregar espacios al sistema',colRoom:"Aula",colReservedBy:"Reservado por",colDate:"Fecha",colSchedule:"Horario",colRole:"Rol",colDesc:"Descripción",colStatus:"Estado",colActions:"Acciones",noReservations:"Sin reservas registradas",noReservationsHint:"Las reservas confirmadas aparecerán aquí",statusConfirmed:"Confirmada",cap:"Cap.",adminOnly:"Solo administradores y maestros pueden cancelar reservas",free:"Libre",maintenance:"Mantenimiento"},availableRooms:{sectionLabel:"Gestión de Espacios",title:"Aulas",titleItalic:"Disponibles",subtitle:"Consulta horarios en tiempo real y reserva o solicita tu espacio",totalRooms:"Aulas totales",availableToday:"Disponibles hoy",freeSlots:"Bloques libres",dateLabel:"Fecha",selectRoom:"Selecciona un Aula",noRooms:"Sin aulas registradas",cap:"Cap.",noEquip:"Sin equipo",free:"libre(s)",legend:"Leyenda",legendFree:"Disponible",legendSelected:"Seleccionado",legendOccupied:"Ocupado",legendPending:"En solicitud",legendPast:"Pasado",maintenance:"Mant.",selectRoomPrompt:"Selecciona un aula para ver sus horarios",selectRoomHint:"Elige una opción en el panel de la izquierda para consultar la disponibilidad",people:"personas",noSpecialEquip:"Sin equipo especial",availableSlots:"bloque(s) disponibles",statusAvailable:"Disponible",statusNoSlots:"Sin horarios libres",statusMaintenance:"En mantenimiento",slotsHeader:"Bloques Horarios — 7:00 a 18:00",slotSelected:"Bloque seleccionado",pastDateWarning:"Esta fecha ya pasó — no es posible reservar en fechas anteriores al día de hoy",past:"Pasado",pending:"Pendiente",seeDetail:"Ver detalle",occupiedSlot:"Bloque Reservado",reservedBy:"Reservado por",roleLabel:"Rol",schedule:"Horario",description:"Descripción",sendRequest:"Enviar Solicitud de Reserva",directReserve:"Confirmar Reserva Directa",room:"Aula",date:"Fecha",time:"Horario",mode:"Modo",modeRequest:"Solicitud",modeDirectReserve:"Reserva directa",reasonLabel:"Motivo de la solicitud",descLabel:"Descripción del uso del aula",reasonPlaceholder:"Describe el motivo de tu solicitud al administrador...",descPlaceholder:"Describe el uso del aula para esta clase o actividad...",infoStudent:"Tu solicitud quedará pendiente hasta que un administrador la apruebe. Recibirás una notificación con la respuesta.",infoTeacher:"Como maestro/admin, tu reserva se confirma de inmediato y el horario quedará bloqueado.",cancelBtn:"Cancelar",submitRequest:"Enviar Solicitud",submitReserve:"Reservar Ahora"},myRequests:{title:"Estado de Mis Solicitudes",pendingRooms:"Aulas Pendientes",colRoom:"Aula",colDateTime:"Fecha y Hora",colReason:"Motivo",colStatus:"Estado",colActions:"Acciones",noRoomRequests:"No tienes solicitudes de aulas",withdrawBtn:"Retirar",materials:"Materiales Solicitados",colMaterial:"Material",colQty:"Cant",colDueDate:"Vencimiento",colStatusReturn:"Estado / Devolución",noMaterialRequests:"No tienes solicitudes de materiales",cancelBtn:"Cancelar",returned:"Devuelto"},adminRequests:{title:"Gestión de Solicitudes",tabRooms:"Aulas",tabMaterials:"Materiales",tabReturns:"Devoluciones",colRequester:"Solicitado por",colType:"Tipo",colDesc:"Descripción",colStatus:"Estado",colActions:"Acciones",noRequests:"No hay solicitudes",approveBtn:"Aprobar",rejectBtn:"Rechazar",colMaterial:"Material (cantidad)",colReason:"Motivo",colTime:"Tiempo",colDueDate:"Vencimiento",noMaterial:"No hay solicitudes de material",sendReminders:"🔔 Enviar Recordatorios de Atraso a Alumnos",sendDelayNotifications:"Enviar Recordatorios de Atraso a Alumnos",colUser:"Usuario",colQty:"Cantidad",colDueStatus:"Vencimiento",colDelivery:"Estado",allReturned:"Todos los materiales han sido devueltos ✅",returnConfirmed:"✅ Devolución Confirmada",confirmReturnBtn:"Devolución Confirmada",overdue:"ATRASADO",onTime:"EN TIEMPO",overdueHours:"Atrasado",hours:"h",delayedStatus:"Atrasado",onTimeStatus:"A tiempo",delayedBadge:"ATRASADO",onTimeBadge:"EN TIEMPO",unknown:"Desconocido",notSpecified:"No especificado"},allReservations:{title:"Todas las Reservas",active:"Activas",colRoom:"Aula",colReservedBy:"Reservado por",colDate:"Fecha",colSchedule:"Horario",colDesc:"Descripción",colStatus:"Estado",colActions:"Acciones",noReservations:"No hay reservas",cancelBtn:"Cancelar"},inventoryUser:{sectionLabel:"Consulta de Recursos",title:"Inventario de",titleItalic:"Materiales y Equipos",subtitle:"Consulta disponibilidad y solicita préstamos de equipos",equipmentTypes:"Tipos de equipo",totalStock:"Total en stock",noStock:"Sin stock",activeLoans:"Préstamos activos",registerEquipment:"Registrar Nuevo Equipo",registerEquipmentDesc:"Agrega equipos o materiales al inventario del laboratorio",cancelBtn:"Cancelar",addEquipmentBtn:"Agregar equipo",equipmentName:"Nombre del equipo",equipmentNamePlaceholder:"Ej: Cámara Sony A7",selectOption:"Seleccionar...",category:"Categoría",quantity:"Cantidad",status:"Estado",available:"Disponible",maintenance:"Mantenimiento",inactive:"Inactivo",registerBtn:"Registrar en inventario",requestLoan:"Solicitar Material en Préstamo",requestLoanDesc:"Completa el formulario y el administrador aprobará tu solicitud",newRequestBtn:"Nueva solicitud",material:"Material",selectMaterial:"Selecciona un material...",availablePlural:"disponibles",usageTime:"Tiempo de uso",selectDuration:"Seleccionar duración...",reasonLoan:"Motivo del préstamo",reasonLoanPlaceholder:"¿Para qué clase o proyecto necesitas este material?",submitRequestBtn:"Enviar solicitud al administrador",catalogTitle:"Catálogo de Equipos",equipmentRegistered:"tipo(s) registrado(s) en el inventario",colEquipment:"Equipo / Material",colCategory:"Categoría",colStock:"Stock",colAvailability:"Disponibilidad",colRegisteredBy:"Registrado por",colActions:"Acciones",deleteBtn:"Eliminar",typesLabel:"tipo(s)",unitsLabel:"unidades totales",editDirectlyMsg:"Edita las cantidades directamente en la celda y presiona Enter",myMaterialRequests:"Mis Solicitudes de Material",historyBorrowedByYou:"Historial de préstamos solicitados por ti",pendingLabel:"pendiente(s)",colMaterial:"Material",colQuantity:"Cantidad",colReason:"Motivo",colExpectedReturn:"Devolución esperada",colStatus:"Estado",colReturned:"Devuelto",returned:"Devuelto",notReturned:"No",allCategories:"Todas las categorías",searchEquipment:"Buscar equipo...",colName:"Nombre",colAvailable:"Disponibles",noEquipmentRegistered:"Sin equipos registrados",requestTitle:"Solicitar Material en Préstamo",requestSubtitle:"Completa el formulario y el administrador aprobará tu solicitud",cancelRequest:"Cancelar",newRequest:"Nueva solicitud",materialLabel:"Material",selectMaterialLabel:"Selecciona un material...",qtyLabel:"Cantidad",durationLabel:"Tiempo de uso",selectDurationLabel:"Seleccionar duración...",hour1:"1 hora",hour2:"2 horas",day1:"1 día completo",week1:"1 semana",testOverdue:"TEST: Simular Atraso",reasonLabel:"Motivo del préstamo",reasonPlaceholderLabel:"¿Para qué clase o proyecto necesitas este material?",submitBtn:"Enviar solicitud al administrador",catalogTitleLabel:"Catálogo de Equipos",catalogSubtitle:"tipo(s) registrado(s) en el inventario",colEquip:"Equipo / Material",colCategoryLabel:"Categoría",colStockLabel:"Stock",statusAvailable:"Disponible",statusNoStock:"Sin stock",statusMaintenance:"Mantenimiento",editHint:"Edita las cantidades directamente en la celda y presiona Enter",noEquipment:"Sin equipos registrados",myRequestsTitle:"Mis Solicitudes de Material",myRequestsSubtitle:"Historial de préstamos solicitados por ti",pending:"pendiente(s)",colMaterialLabel:"Material",colQtyLabel:"Cantidad",colReasonLabel:"Motivo",colDueDateLabel:"Devolución esperada",colStatusLabel:"Estado",colReturnedLabel:"Devuelto",overdueLabel:"Vencido",yes:"Sí",no:"No"},messages:{roomRegistered:"Aula registrada correctamente",roomDeleted:"Aula eliminada",errorRegisterRoom:"Error al registrar aula: ",errorDeleteRoom:"Error al eliminar aula",equipRegistered:"Equipo registrado correctamente",errorRegisterEquip:"Error al registrar equipo",reservationMade:"Aula reservada correctamente",errorReservation:"Error al reservar aula",reservationCancelled:"Reserva cancelada y horario liberado",errorCancelReservation:"Error al cancelar reserva",equipDeleted:"Equipo eliminado correctamente",errorDeleteEquip:"Error al eliminar equipo",qtyUpdated:"Cantidad actualizada",errorUpdateQty:"Error al actualizar cantidad",noOverdue:"No hay materiales atrasados",remindersSent:"Se enviaron",remindersEnd:"recordatorios a los alumnos morosos",errorReminders:"Error al enviar notificaciones",requestSent:"Solicitud enviada al administrador.",errorRequest:"Error al procesar la petición",requestApproved:"Solicitud aprobada y reserva creada",errorApprove:"Error al aprobar solicitud: ",requestRejected:"Solicitud rechazada",errorReject:"Error al rechazar solicitud",materialRequestSent:"Solicitud enviada al administrador.",materialApproved:"Solicitud aprobada y stock restado.",insufficientStock:"No hay suficiente stock. Disponibles: ",materialRejected:"Solicitud rechazada",errorMaterialReject:"Error al rechazar solicitud",returnRegistered:"Material devuelto y stock actualizado.",errorReturn:"Error al registrar devolución",directReserveCreated:"Reserva confirmada exitosamente.",rolAssigned:"Rol asignado a",errorRolAssign:"Error al asignar rol: ",permissionsUpdated:"Permisos de",permissionsUpdatedEnd:"actualizados a",accessRevoked:"Acceso revocado a",errorRevoke:"Error al eliminar: ",requestCancelled:"Solicitud cancelada correctamente",errorCancel:"Error al cancelar",insufficientStockRequest:"Error: Solo hay",units:"unidades de",confirmDeleteRoom:"¿Estás seguro de que quieres eliminar esta aula?",confirmRevokeAccess:"¿Estás seguro de que deseas revocar el acceso a",confirmCancelReservation:"¿Estás seguro de cancelar esta reserva? El horario quedará liberado.",confirmCancelRequest:"¿Deseas cancelar esta solicitud?",confirmDeleteEquip:"¿Estás seguro que deseas eliminar este equipo del inventario?",confirmRevokeExtra:"Esto borrará sus permisos de la base de datos.",errorUpdate:"Error al actualizar: ",viewNotSelected:"Error: Vista no seleccionada. Por favor, recarga la página.",requestedItemMsg:"solicitó",reasonMsg:"Motivo",yourRequestMsg:"Tu solicitud",wasApprovedMsg:"fue aprobada",forMsg:"para",materialMsg:"el material",wasRejectedMsg:"fue rechazada",adminConfirmedMsg:"El admin confirmó la devolución de",attentionMsg:"Atención",notReturnedMsg:"No has devuelto el material",loanExpiredMsg:"Su préstamo venció el",reservationCancelledMsg:"Se canceló la reserva de",onMsg:"el",wasCancelledMsg:"fue cancelada",readyMsg:"¡Listo",yourReservationMsg:"Tu reserva",roomMsg:"el aula",hasBeenApprovedMsg:"ha sido aprobada",sorryMsg:"Lo sentimos",byAdminMsg:"por el administrador",reservedMsg:"reservó",asksForMsg:"pide",adminChangedMsg:"Un administrador ha cambiado",yourAccessLevelMsg:"tu nivel de acceso a",signOutAndSignInMsg:"Cierra sesión y vuelve a entrar para ver los cambios"}},en:{login:{title:"LabReserve",createAccount:"Create Account",subtitle:"Laboratory Reservation System",email:"Email address",password:"Password",btnLogin:"Sign In",btnRegister:"Register",switchToRegister:"Don't have an account? Register",switchToLogin:"Already have an account? Sign in",noAccount:"Don't have an account?",alreadyHaveAccount:"Already have an account?",loggingIn:"Signing in...",creatingAccount:"Creating account and verifying permissions...",errorCredentials:"Error: Invalid credentials.",feature1Title:"Smart Management",feature1Desc:"Manage your laboratory reservations efficiently",feature2Title:"Resource Optimization",feature2Desc:"Maximize the use of your equipment and educational facilities",feature3Title:"Educational Collaboration",feature3Desc:"Facilitate collaboration between students and teachers"},topbar:{systemName:"Laboratory Reservation System",langButton:"ES",langLabel:"Language"},nav:{home:"Home",roles:"Role Management",classrooms:"Classrooms",inventory:"Inventory",reservedRooms:"Reserved Rooms",availableRooms:"Available Rooms",myRequests:"My Requests",inventoryView:"Inventory",requests:"Requests",allReservations:"All Reservations",logout:"Log Out"},roles:{admin:"ADMIN",maestro:"TEACHER",alumno:"STUDENT"},notifications:{title:"My Notifications",empty:"Inbox empty",unread:"unread",markRead:"✔ Read",newMaterialRequest:"New Material Request",materialApproved:"Material Approved",materialRejected:"Material Rejected",successfulReturn:"Successful Return",overdueReminder:"⚠️ Overdue Material",permissionsUpdated:"🛡️ Permissions Updated",newRoomRequest:"New Room Request",directReservationCreated:"Direct Reservation Created",roomReservationConfirmed:"Reservation Confirmed",roomReservationRejected:"Reservation Rejected",scheduleReleased:"Schedule Released / Cancellation"},overdueAlert:{title:"ATTENTION! You have overdue materials",subtitle:"You must return the following materials to the administrator immediately:"},status:{approved:"Approved",rejected:"Rejected",pending:"Pending",confirmed:"Confirmed",available:"Available",maintenance:"Maintenance",returned:"Returned",noStock:"No Stock",inactive:"Inactive",cancelled:"Cancelled"},home:{panelLabel:"Control Panel",welcome:"Welcome,",systemName:"Laboratory Management System — LabReserve",accessLevel:"Access Level",systemOnline:"System online",registeredRooms:"Registered Rooms",spaces:"available spaces",stockUnits:"Units in Stock",equipmentMaterials:"equipment and materials",confirmedReservations:"Confirmed Reservations",activeReservations:"active reservations",pendingRequests:"Pending Requests",needAttention:"need attention",myRequestsStat:"My Requests",sentRequests:"submitted requests",quickAccess:"Quick Access",checkAvailability:"Check Availability",checkAvailabilitySub:"View classroom schedules",requestMaterial:"Request Material",requestMaterialSub:"Equipment loan",manageRequests:"Manage Requests",pending:"pending review",userManagement:"User Management",registered:"registered user(s)",allReservations:"All Reservations",fullHistory:"Complete history",recentActivity:"Recent Activity",noActivity:"No recent activity"},rolesPage:{adminLabel:"System Administration",title:"User &",titleItalic:"Role Management",subtitle:"Assign access levels and manage system permissions",totalUsers:"Total users",admins:"Administrators",teachers:"Teachers",students:"Students",formTitle:"Assign Access Level",formSubtitle:"If the user already has an account, their role is updated immediately. If they haven't registered yet, the role will be applied when they create their account.",emailLabel:"Email Address",emailPlaceholder:"user@institution.edu",accessLevel:"Access Level",selectRole:"Select role...",roleTeacher:"Teacher / Professor",roleAdmin:"Administrator",roleStudent:"Student (no privileges)",assignBtn:"Assign Permissions",tableTitle:"Registered Users",tableSubtitle:"account(s) in the system",colUser:"User",colAccess:"Access Level",colDate:"Registered",colActions:"Actions",you:"(you)",revokeBtn:"Revoke access",showing:"Showing",users:"user(s)",changesApply:"Role changes are applied immediately",loadingUsers:"Loading users..."},classrooms:{sectionLabel:"Space Management",title:"Classroom",titleItalic:"Control",subtitle:"Register spaces, define capacity and manage available equipment",totalRooms:"Total rooms",available:"Available",maintenance:"Maintenance",activeReservations:"Active reservations",newRoomTitle:"Register New Classroom",newRoomSubtitle:"Add a new space to the system with its equipment and capacity",cancelBtn:"× Cancel",newRoomBtn:"+ New Classroom",nameLabel:"Classroom name",namePlaceholder:"E.g: Lab A / Conference Room",capacityLabel:"Capacity",equipmentLabel:"Main equipment",selectEquip:"Select...",registerBtn:"Register classroom",cancel:"Cancel",tableSummary:"registered classroom(s) · total capacity:",people:"people",colRoom:"Classroom",colCapacity:"Capacity",colEquipment:"Available equipment",colStatus:"Status",colActiveRes:"Active reservations",colCreated:"Created",colActions:"Actions",statusAvailable:"Available",statusMaintenance:"Maintenance",deleteBtn:"Delete",reservations:"reservation(s)",noRooms:"No classrooms registered",noRoomsHint:"Use the form above to add the first classroom",footerNote:"Changes are immediate and reflected for all users",vrGlasses:"VR Glasses",cameras:"Cameras",laptops:"Laptops",projector:"Projector",interactiveScreen:"Interactive Screen",multiple:"Multiple",noEquip:"No equipment"},inventoryAdmin:{sectionLabel:"Resource Management",title:"Inventory",titleItalic:"Control",subtitle:"Register equipment, manage stock and handle loans",equipmentTypes:"Equipment types",stockUnits:"Units in stock",noStock:"Out of stock",activeLoans:"Active loans",overdue:"Overdue",addTitle:"Register New Equipment",addSubtitle:"Add equipment or materials to the lab inventory",cancelAdd:"× Cancel",addBtn:"+ Add equipment",nameLabel:"Equipment name",namePlaceholder:"E.g: Sony ZV-E10 Camera",categoryLabel:"Category",selectCategory:"Select...",qtyLabel:"Quantity",statusLabel:"Initial status",registerBtn:"Register in inventory",cancel:"Cancel",tabCatalog:"Equipment Catalog",tabRequests:"Requests",tabLoans:"Active Loans",sendReminders:"Send overdue reminders",withStock:"With stock",noStockLabel:"Out of stock",maintenanceLabel:"Maintenance",colEquipment:"Equipment",colCategory:"Category",colStock:"Current stock",colOnLoan:"On loan",colStatus:"Status",colRegisteredBy:"Registered by",colActions:"Actions",units:"units",deleteBtn:"Delete",noEquipment:"No equipment registered",noEquipmentHint:"Use the form above to add the first equipment item",editHint:"Click on the quantity to edit · Press Enter to save",noPendingRequests:"No pending requests",colRequester:"Requester",colMaterial:"Material",colQty:"Quantity",colReason:"Reason",colDuration:"Duration",colDueDate:"Expected return",hours:"h",overdueBadge:"Overdue",approveBtn:"Approve",rejectBtn:"Reject",onTime:"On time",overdueLabel:"Overdue",allReturned:"All returned",noActiveLoans:"No materials currently on loan",colLoanedTo:"Loaned to",colDueTime:"Due time",colDelivery:"Delivery status",confirmReturn:"Confirm return",notifyOverdue:"Notify",overdueUsers:"overdue user(s)"},reservedRooms:{sectionLabel:"Reservation Management",title:"Reserved",titleItalic:"Rooms",subtitle:"Check occupancy status, active schedules and system reservations",totalRooms:"Total rooms",withReservations:"With reservations",withoutReservations:"Without reservations",totalConfirmed:"Total confirmed",viewByRoom:"Room View",reservationList:"Reservation List",confirmed:"Confirmed",cancelled:"Cancelled",newReservation:"+ New reservation",occupancyToday:"Today's occupancy",slotsOf:"of",slots:"slots",availableToReserve:"Available to reserve",viewSchedule:"View schedule",reserve:"+ Reserve",today:"today",cancelBtn:"Cancel",noRooms:"No classrooms registered",noRoomsHint:'Go to "Classrooms" to add spaces to the system',colRoom:"Room",colReservedBy:"Reserved by",colDate:"Date",colSchedule:"Schedule",colRole:"Role",colDesc:"Description",colStatus:"Status",colActions:"Actions",noReservations:"No reservations registered",noReservationsHint:"Confirmed reservations will appear here",statusConfirmed:"Confirmed",cap:"Cap.",adminOnly:"Only administrators and teachers can cancel reservations",free:"Free",maintenance:"Maintenance"},availableRooms:{sectionLabel:"Space Management",title:"Available",titleItalic:"Rooms",subtitle:"Check real-time schedules and reserve or request your space",totalRooms:"Total rooms",availableToday:"Available today",freeSlots:"Free slots",dateLabel:"Date",selectRoom:"Select a Room",noRooms:"No classrooms registered",cap:"Cap.",noEquip:"No equipment",free:"free slot(s)",legend:"Legend",legendFree:"Available",legendSelected:"Selected",legendOccupied:"Occupied",legendPending:"In request",legendPast:"Past",maintenance:"Maint.",selectRoomPrompt:"Select a classroom to view its schedule",selectRoomHint:"Choose an option from the left panel to check availability",people:"people",noSpecialEquip:"No special equipment",availableSlots:"available slot(s)",statusAvailable:"Available",statusNoSlots:"No free slots",statusMaintenance:"Under maintenance",slotsHeader:"Time Slots — 7:00 to 18:00",slotSelected:"Slot selected",pastDateWarning:"This date has already passed — it's not possible to book dates before today",past:"Past",pending:"Pending",seeDetail:"See detail",occupiedSlot:"Reserved Slot",reservedBy:"Reserved by",roleLabel:"Role",schedule:"Schedule",description:"Description",sendRequest:"Send Reservation Request",directReserve:"Confirm Direct Reservation",room:"Room",date:"Date",time:"Schedule",mode:"Mode",modeRequest:"Request",modeDirectReserve:"Direct reservation",reasonLabel:"Reason for the request",descLabel:"Description of classroom use",reasonPlaceholder:"Describe the reason for your request to the administrator...",descPlaceholder:"Describe how you will use the classroom for this class or activity...",infoStudent:"Your request will remain pending until an administrator approves it. You will receive a notification with the response.",infoTeacher:"As a teacher/admin, your reservation is confirmed immediately and the slot will be blocked.",cancelBtn:"Cancel",submitRequest:"Send Request",submitReserve:"Reserve Now"},myRequests:{title:"My Requests Status",pendingRooms:"Room Requests",colRoom:"Room",colDateTime:"Date & Time",colReason:"Reason",colStatus:"Status",colActions:"Actions",noRoomRequests:"You have no room requests",withdrawBtn:"Withdraw",materials:"Requested Materials",colMaterial:"Material",colQty:"Qty",colDueDate:"Due Date",colStatusReturn:"Status / Return",noMaterialRequests:"You have no material requests",cancelBtn:"Cancel",returned:"Returned"},adminRequests:{title:"Request Management",tabRooms:"Rooms",tabMaterials:"Materials",tabReturns:"Returns",colRequester:"Requested by",colType:"Type",colDesc:"Description",colStatus:"Status",colActions:"Actions",noRequests:"No requests",approveBtn:"Approve",rejectBtn:"Reject",colMaterial:"Material (quantity)",colReason:"Reason",colTime:"Duration",colDueDate:"Due Date",noMaterial:"No material requests",sendReminders:"🔔 Send Overdue Reminders to Students",sendDelayNotifications:"Send Overdue Reminders to Students",colUser:"User",colQty:"Quantity",colDueStatus:"Due Status",colDelivery:"Status",allReturned:"All materials have been returned ✅",returnConfirmed:"✅ Return Confirmed",confirmReturnBtn:"Return Confirmed",overdue:"OVERDUE",onTime:"ON TIME",overdueHours:"Overdue",hours:"h",delayedStatus:"Overdue",onTimeStatus:"On time",delayedBadge:"OVERDUE",onTimeBadge:"ON TIME",unknown:"Unknown",notSpecified:"Not specified"},allReservations:{title:"All Reservations",active:"Active",colRoom:"Room",colReservedBy:"Reserved by",colDate:"Date",colSchedule:"Schedule",colDesc:"Description",colStatus:"Status",colActions:"Actions",noReservations:"No reservations",cancelBtn:"Cancel"},inventoryUser:{sectionLabel:"Resource Lookup",title:"Materials &",titleItalic:"Equipment Inventory",subtitle:"Check availability and request equipment loans",equipmentTypes:"Equipment types",totalStock:"Total in stock",noStock:"Out of stock",activeLoans:"Active loans",registerEquipment:"Register New Equipment",registerEquipmentDesc:"Add equipment or materials to the lab inventory",cancelBtn:"Cancel",addEquipmentBtn:"Add equipment",equipmentName:"Equipment name",equipmentNamePlaceholder:"E.g: Sony A7 Camera",selectOption:"Select...",category:"Category",quantity:"Quantity",status:"Status",available:"Available",maintenance:"Maintenance",inactive:"Inactive",registerBtn:"Register in inventory",requestLoan:"Request Equipment Loan",requestLoanDesc:"Fill out the form and the administrator will approve your request",newRequestBtn:"New request",material:"Material",selectMaterial:"Select a material...",availablePlural:"available",usageTime:"Usage time",selectDuration:"Select duration...",reasonLoan:"Reason for loan",reasonLoanPlaceholder:"For what class or project do you need this material?",submitRequestBtn:"Send request to administrator",catalogTitle:"Equipment Catalog",equipmentRegistered:"type(s) registered in inventory",colEquipment:"Equipment / Material",colCategory:"Category",colStock:"Stock",colAvailability:"Availability",colRegisteredBy:"Registered by",colActions:"Actions",deleteBtn:"Delete",typesLabel:"type(s)",unitsLabel:"total units",editDirectlyMsg:"Edit quantities directly in the cell and press Enter",myMaterialRequests:"My Material Requests",historyBorrowedByYou:"History of loans requested by you",pendingLabel:"pending",colMaterial:"Material",colQuantity:"Quantity",colReason:"Reason",colExpectedReturn:"Expected return",colStatus:"Status",colReturned:"Returned",returned:"Returned",notReturned:"No",allCategories:"All categories",searchEquipment:"Search equipment...",colName:"Name",colAvailable:"Available",noEquipmentRegistered:"No equipment registered",requestTitle:"Request Equipment Loan",requestSubtitle:"Fill out the form and the administrator will approve your request",cancelRequest:"Cancel",newRequest:"New request",materialLabel:"Material",selectMaterialLabel:"Select a material...",qtyLabel:"Quantity",durationLabel:"Usage time",selectDurationLabel:"Select duration...",hour1:"1 hour",hour2:"2 hours",day1:"Full day",week1:"1 week",testOverdue:"TEST: Simulate Overdue",reasonLabel:"Reason for loan",reasonPlaceholderLabel:"For what class or project do you need this material?",submitBtn:"Send request to administrator",catalogTitleLabel:"Equipment Catalog",catalogSubtitle:"type(s) registered in inventory",colEquip:"Equipment / Material",colCategoryLabel:"Category",colStockLabel:"Stock",statusAvailable:"Available",statusNoStock:"Out of stock",statusMaintenance:"Maintenance",editHint:"Edit quantities directly in the cell and press Enter",noEquipment:"No equipment registered",myRequestsTitle:"My Material Requests",myRequestsSubtitle:"History of loans requested by you",pending:"pending",colMaterialLabel:"Material",colQtyLabel:"Quantity",colReasonLabel:"Reason",colDueDateLabel:"Expected return",colStatusLabel:"Status",colReturnedLabel:"Returned",overdueLabel:"Overdue",yes:"Yes",no:"No"},messages:{roomRegistered:"Classroom registered successfully",roomDeleted:"Classroom deleted",errorRegisterRoom:"Error registering classroom: ",errorDeleteRoom:"Error deleting classroom",equipRegistered:"Equipment registered successfully",errorRegisterEquip:"Error registering equipment",reservationMade:"Classroom reserved successfully",errorReservation:"Error reserving classroom",reservationCancelled:"Reservation cancelled and slot freed",errorCancelReservation:"Error cancelling reservation",equipDeleted:"Equipment deleted successfully",errorDeleteEquip:"Error deleting equipment",qtyUpdated:"Quantity updated",errorUpdateQty:"Error updating quantity",noOverdue:"No overdue materials",remindersSent:"Sent",remindersEnd:"reminders to overdue students",errorReminders:"Error sending notifications",requestSent:"Request sent to administrator.",errorRequest:"Error processing the request",requestApproved:"Request approved and reservation created",errorApprove:"Error approving request: ",requestRejected:"Request rejected",errorReject:"Error rejecting request",materialRequestSent:"Request sent to administrator.",materialApproved:"Request approved and stock deducted.",insufficientStock:"Not enough stock. Available: ",materialRejected:"Request rejected",errorMaterialReject:"Error rejecting request",returnRegistered:"Material returned and stock updated.",errorReturn:"Error registering return",directReserveCreated:"Reservation confirmed successfully.",rolAssigned:"Role assigned to",errorRolAssign:"Error assigning role: ",permissionsUpdated:"Permissions for",permissionsUpdatedEnd:"updated to",accessRevoked:"Access revoked for",errorRevoke:"Error deleting: ",requestCancelled:"Request cancelled successfully",errorCancel:"Error cancelling",insufficientStockRequest:"Error: Only",units:"units of",confirmDeleteRoom:"Are you sure you want to delete this classroom?",confirmRevokeAccess:"Are you sure you want to revoke access for",confirmCancelReservation:"Are you sure you want to cancel this reservation? The slot will be freed.",confirmCancelRequest:"Do you want to cancel this request?",confirmDeleteEquip:"Are you sure you want to remove this equipment from inventory?",confirmRevokeExtra:"This will delete their permissions from the database.",errorUpdate:"Error updating: ",viewNotSelected:"Error: View not selected. Please refresh the page.",requestedItemMsg:"requested",reasonMsg:"Reason",yourRequestMsg:"Your request",wasApprovedMsg:"was approved",forMsg:"for",materialMsg:"the material",wasRejectedMsg:"was rejected",adminConfirmedMsg:"The admin confirmed the return of",attentionMsg:"Attention",notReturnedMsg:"You haven't returned the material",loanExpiredMsg:"Your loan expired on",reservationCancelledMsg:"The reservation for",onMsg:"on",wasCancelledMsg:"was cancelled",readyMsg:"Ready",yourReservationMsg:"Your reservation",roomMsg:"the room",hasBeenApprovedMsg:"has been approved",sorryMsg:"Sorry",byAdminMsg:"by the administrator",reservedMsg:"reserved",asksForMsg:"asks for",adminChangedMsg:"An administrator has changed",yourAccessLevelMsg:"your access level to",signOutAndSignInMsg:"Sign out and sign back in to see the changes"}}};var ig={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N0=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Uw=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],a=t[n++],c=t[n++],d=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{const s=t[n++],a=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},M0={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],a=i+1<t.length,c=a?t[i+1]:0,d=i+2<t.length,f=d?t[i+2]:0,g=s>>2,v=(s&3)<<4|c>>4;let _=(c&15)<<2|f>>6,A=f&63;d||(A=64,a||(_=64)),r.push(n[g],n[v],n[_],n[A])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(N0(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Uw(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],c=i<t.length?n[t.charAt(i)]:0;++i;const f=i<t.length?n[t.charAt(i)]:64;++i;const v=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||c==null||f==null||v==null)throw new zw;const _=s<<2|c>>4;if(r.push(_),f!==64){const A=c<<4&240|f>>2;if(r.push(A),v!==64){const E=f<<6&192|v;r.push(E)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class zw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qw=function(t){const e=N0(t);return M0.encodeByteArray(e,!0)},uc=function(t){return qw(t).replace(/\./g,"")},L0=function(t){try{return M0.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $w=()=>Bw().__FIREBASE_DEFAULTS__,Ww=()=>{if(typeof process>"u"||typeof ig>"u")return;const t=ig.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Hw=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&L0(t[1]);return e&&JSON.parse(e)},Bc=()=>{try{return $w()||Ww()||Hw()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},V0=t=>{var e,n;return(n=(e=Bc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Kw=t=>{const e=V0(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},O0=()=>{var t;return(t=Bc())===null||t===void 0?void 0:t.config},F0=t=>{var e;return(e=Bc())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[uc(JSON.stringify(n)),uc(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Yw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Nt())}function Xw(){var t;const e=(t=Bc())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Jw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Zw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function eS(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function tS(){const t=Nt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function nS(){return!Xw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function rS(){try{return typeof indexedDB=="object"}catch{return!1}}function iS(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sS="FirebaseError";class hr extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=sS,Object.setPrototypeOf(this,hr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xa.prototype.create)}}class xa{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?oS(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new hr(i,c,r)}}function oS(t,e){return t.replace(aS,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const aS=/\{\$([^}]+)}/g;function lS(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function dc(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],a=e[i];if(sg(s)&&sg(a)){if(!dc(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function sg(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _a(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function bo(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function wo(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function cS(t,e){const n=new uS(t,e);return n.subscribe.bind(n)}class uS{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");dS(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Gu),i.error===void 0&&(i.error=Gu),i.complete===void 0&&(i.complete=Gu);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function dS(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Gu(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(t){return t&&t._delegate?t._delegate:t}class ki{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mi="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Gw;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(pS(e))try{this.getOrInitializeService({instanceIdentifier:mi})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=mi){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=mi){return this.instances.has(e)}getOptions(e=mi){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:fS(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=mi){return this.component?this.component.multipleInstances?e:mi:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function fS(t){return t===mi?void 0:t}function pS(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new hS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var be;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(be||(be={}));const gS={debug:be.DEBUG,verbose:be.VERBOSE,info:be.INFO,warn:be.WARN,error:be.ERROR,silent:be.SILENT},yS=be.INFO,vS={[be.DEBUG]:"log",[be.VERBOSE]:"log",[be.INFO]:"info",[be.WARN]:"warn",[be.ERROR]:"error"},xS=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=vS[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class _f{constructor(e){this.name=e,this._logLevel=yS,this._logHandler=xS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in be))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?gS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,be.DEBUG,...e),this._logHandler(this,be.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,be.VERBOSE,...e),this._logHandler(this,be.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,be.INFO,...e),this._logHandler(this,be.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,be.WARN,...e),this._logHandler(this,be.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,be.ERROR,...e),this._logHandler(this,be.ERROR,...e)}}const _S=(t,e)=>e.some(n=>t instanceof n);let og,ag;function bS(){return og||(og=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wS(){return ag||(ag=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const U0=new WeakMap,eh=new WeakMap,z0=new WeakMap,Qu=new WeakMap,bf=new WeakMap;function SS(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",a)},s=()=>{n(Fr(t.result)),i()},a=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&U0.set(n,t)}).catch(()=>{}),bf.set(e,t),e}function ES(t){if(eh.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",a),t.removeEventListener("abort",a)},s=()=>{n(),i()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",a),t.addEventListener("abort",a)});eh.set(t,e)}let th={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return eh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||z0.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Fr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function RS(t){th=t(th)}function IS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Yu(this),e,...n);return z0.set(r,e.sort?e.sort():[e]),Fr(r)}:wS().includes(t)?function(...e){return t.apply(Yu(this),e),Fr(U0.get(this))}:function(...e){return Fr(t.apply(Yu(this),e))}}function TS(t){return typeof t=="function"?IS(t):(t instanceof IDBTransaction&&ES(t),_S(t,bS())?new Proxy(t,th):t)}function Fr(t){if(t instanceof IDBRequest)return SS(t);if(Qu.has(t))return Qu.get(t);const e=TS(t);return e!==t&&(Qu.set(t,e),bf.set(e,t)),e}const Yu=t=>bf.get(t);function kS(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(t,e),c=Fr(a);return r&&a.addEventListener("upgradeneeded",d=>{r(Fr(a.result),d.oldVersion,d.newVersion,Fr(a.transaction),d)}),n&&a.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),c.then(d=>{s&&d.addEventListener("close",()=>s()),i&&d.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}const AS=["get","getKey","getAll","getAllKeys","count"],jS=["put","add","delete","clear"],Xu=new Map;function lg(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Xu.get(e))return Xu.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=jS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||AS.includes(n)))return;const s=async function(a,...c){const d=this.transaction(a,i?"readwrite":"readonly");let f=d.store;return r&&(f=f.index(c.shift())),(await Promise.all([f[n](...c),i&&d.done]))[0]};return Xu.set(e,s),s}RS(t=>({...t,get:(e,n,r)=>lg(e,n)||t.get(e,n,r),has:(e,n)=>!!lg(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(DS(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function DS(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const nh="@firebase/app",cg="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or=new _f("@firebase/app"),PS="@firebase/app-compat",NS="@firebase/analytics-compat",MS="@firebase/analytics",LS="@firebase/app-check-compat",VS="@firebase/app-check",OS="@firebase/auth",FS="@firebase/auth-compat",US="@firebase/database",zS="@firebase/data-connect",qS="@firebase/database-compat",BS="@firebase/functions",$S="@firebase/functions-compat",WS="@firebase/installations",HS="@firebase/installations-compat",KS="@firebase/messaging",GS="@firebase/messaging-compat",QS="@firebase/performance",YS="@firebase/performance-compat",XS="@firebase/remote-config",JS="@firebase/remote-config-compat",ZS="@firebase/storage",eE="@firebase/storage-compat",tE="@firebase/firestore",nE="@firebase/vertexai-preview",rE="@firebase/firestore-compat",iE="firebase",sE="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh="[DEFAULT]",oE={[nh]:"fire-core",[PS]:"fire-core-compat",[MS]:"fire-analytics",[NS]:"fire-analytics-compat",[VS]:"fire-app-check",[LS]:"fire-app-check-compat",[OS]:"fire-auth",[FS]:"fire-auth-compat",[US]:"fire-rtdb",[zS]:"fire-data-connect",[qS]:"fire-rtdb-compat",[BS]:"fire-fn",[$S]:"fire-fn-compat",[WS]:"fire-iid",[HS]:"fire-iid-compat",[KS]:"fire-fcm",[GS]:"fire-fcm-compat",[QS]:"fire-perf",[YS]:"fire-perf-compat",[XS]:"fire-rc",[JS]:"fire-rc-compat",[ZS]:"fire-gcs",[eE]:"fire-gcs-compat",[tE]:"fire-fst",[rE]:"fire-fst-compat",[nE]:"fire-vertex","fire-js":"fire-js",[iE]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc=new Map,aE=new Map,ih=new Map;function ug(t,e){try{t.container.addComponent(e)}catch(n){or.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ks(t){const e=t.name;if(ih.has(e))return or.debug(`There were multiple attempts to register component ${e}.`),!1;ih.set(e,t);for(const n of hc.values())ug(n,t);for(const n of aE.values())ug(n,t);return!0}function wf(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Mn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ur=new xa("app","Firebase",lE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cE{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ki("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ur.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs=sE;function q0(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:rh,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Ur.create("bad-app-name",{appName:String(i)});if(n||(n=O0()),!n)throw Ur.create("no-options");const s=hc.get(i);if(s){if(dc(n,s.options)&&dc(r,s.config))return s;throw Ur.create("duplicate-app",{appName:i})}const a=new mS(i);for(const d of ih.values())a.addComponent(d);const c=new cE(n,r,a);return hc.set(i,c),c}function B0(t=rh){const e=hc.get(t);if(!e&&t===rh&&O0())return q0();if(!e)throw Ur.create("no-app",{appName:t});return e}function zr(t,e,n){var r;let i=(r=oE[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),or.warn(c.join(" "));return}ks(new ki(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uE="firebase-heartbeat-database",dE=1,ia="firebase-heartbeat-store";let Ju=null;function $0(){return Ju||(Ju=kS(uE,dE,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ia)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ur.create("idb-open",{originalErrorMessage:t.message})})),Ju}async function hE(t){try{const n=(await $0()).transaction(ia),r=await n.objectStore(ia).get(W0(t));return await n.done,r}catch(e){if(e instanceof hr)or.warn(e.message);else{const n=Ur.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});or.warn(n.message)}}}async function dg(t,e){try{const r=(await $0()).transaction(ia,"readwrite");await r.objectStore(ia).put(e,W0(t)),await r.done}catch(n){if(n instanceof hr)or.warn(n.message);else{const r=Ur.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});or.warn(r.message)}}}function W0(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fE=1024,pE=30*24*60*60*1e3;class mE{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new yE(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=hg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=pE}),this._storage.overwrite(this._heartbeatsCache))}catch(r){or.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=hg(),{heartbeatsToSend:r,unsentEntries:i}=gE(this._heartbeatsCache.heartbeats),s=uc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return or.warn(n),""}}}function hg(){return new Date().toISOString().substring(0,10)}function gE(t,e=fE){const n=[];let r=t.slice();for(const i of t){const s=n.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),fg(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),fg(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class yE{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return rS()?iS().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await hE(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return dg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return dg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function fg(t){return uc(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vE(t){ks(new ki("platform-logger",e=>new CS(e),"PRIVATE")),ks(new ki("heartbeat",e=>new mE(e),"PRIVATE")),zr(nh,cg,t),zr(nh,cg,"esm2017"),zr("fire-js","")}vE("");function Sf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function H0(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const xE=H0,K0=new xa("auth","Firebase",H0());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc=new _f("@firebase/auth");function _E(t,...e){fc.logLevel<=be.WARN&&fc.warn(`Auth (${Fs}): ${t}`,...e)}function Cl(t,...e){fc.logLevel<=be.ERROR&&fc.error(`Auth (${Fs}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(t,...e){throw Ef(t,...e)}function On(t,...e){return Ef(t,...e)}function G0(t,e,n){const r=Object.assign(Object.assign({},xE()),{[e]:n});return new xa("auth","Firebase",r).create(e,{appName:t.name})}function er(t){return G0(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ef(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return K0.create(t,...e)}function ce(t,e,...n){if(!t)throw Ef(e,...n)}function Yn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Cl(e),new Error(e)}function ar(t,e){t||Yn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function bE(){return pg()==="http:"||pg()==="https:"}function pg(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(bE()||Zw()||"connection"in navigator)?navigator.onLine:!0}function SE(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e,n){this.shortDelay=e,this.longDelay=n,ar(n>e,"Short delay should be less than long delay!"),this.isMobile=Yw()||eS()}get(){return wE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(t,e){ar(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q0{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Yn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Yn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Yn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RE=new ba(3e4,6e4);function Xr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Jr(t,e,n,r,i={}){return Y0(t,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const c=_a(Object.assign({key:t.config.apiKey},a)).slice(1),d=await t._getAdditionalHeaders();d["Content-Type"]="application/json",t.languageCode&&(d["X-Firebase-Locale"]=t.languageCode);const f=Object.assign({method:e,headers:d},s);return Jw()||(f.referrerPolicy="no-referrer"),Q0.fetch()(X0(t,t.config.apiHost,n,c),f)})}async function Y0(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},EE),e);try{const i=new TE(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw fl(t,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[d,f]=c.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw fl(t,"credential-already-in-use",a);if(d==="EMAIL_EXISTS")throw fl(t,"email-already-in-use",a);if(d==="USER_DISABLED")throw fl(t,"user-disabled",a);const g=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw G0(t,g,f);Rn(t,g)}}catch(i){if(i instanceof hr)throw i;Rn(t,"network-request-failed",{message:String(i)})}}async function wa(t,e,n,r,i={}){const s=await Jr(t,e,n,r,i);return"mfaPendingCredential"in s&&Rn(t,"multi-factor-auth-required",{_serverResponse:s}),s}function X0(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Rf(t.config,i):`${t.config.apiScheme}://${i}`}function IE(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class TE{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(On(this.auth,"network-request-failed")),RE.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function fl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=On(t,e,r);return i.customData._tokenResponse=n,i}function mg(t){return t!==void 0&&t.enterprise!==void 0}class kE{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return IE(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function AE(t,e){return Jr(t,"GET","/v2/recaptchaConfig",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jE(t,e){return Jr(t,"POST","/v1/accounts:delete",e)}async function J0(t,e){return Jr(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function CE(t,e=!1){const n=ht(t),r=await n.getIdToken(e),i=If(r);ce(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Lo(Zu(i.auth_time)),issuedAtTime:Lo(Zu(i.iat)),expirationTime:Lo(Zu(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Zu(t){return Number(t)*1e3}function If(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Cl("JWT malformed, contained fewer than 3 sections"),null;try{const i=L0(n);return i?JSON.parse(i):(Cl("Failed to decode base64 JWT payload"),null)}catch(i){return Cl("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function gg(t){const e=If(t);return ce(e,"internal-error"),ce(typeof e.exp<"u","internal-error"),ce(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sa(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof hr&&DE(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function DE({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Lo(this.lastLoginAt),this.creationTime=Lo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pc(t){var e;const n=t.auth,r=await t.getIdToken(),i=await sa(t,J0(n,{idToken:r}));ce(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Z0(s.providerUserInfo):[],c=ME(t.providerData,a),d=t.isAnonymous,f=!(t.email&&s.passwordHash)&&!(c!=null&&c.length),g=d?f:!1,v={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new oh(s.createdAt,s.lastLoginAt),isAnonymous:g};Object.assign(t,v)}async function NE(t){const e=ht(t);await pc(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ME(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Z0(t){return t.map(e=>{var{providerId:n}=e,r=Sf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LE(t,e){const n=await Y0(t,{},async()=>{const r=_a({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,a=X0(t,i,"/v1/token",`key=${s}`),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Q0.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function VE(t,e){return Jr(t,"POST","/v2/accounts:revokeToken",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ce(e.idToken,"internal-error"),ce(typeof e.idToken<"u","internal-error"),ce(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):gg(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){ce(e.length!==0,"internal-error");const n=gg(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(ce(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await LE(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,a=new ys;return r&&(ce(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(ce(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(ce(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ys,this.toJSON())}_performRefresh(){return Yn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vr(t,e){ce(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Xn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=Sf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new PE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new oh(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await sa(this,this.stsTokenManager.getToken(this.auth,e));return ce(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return CE(this,e)}reload(){return NE(this)}_assign(e){this!==e&&(ce(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Xn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){ce(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await pc(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Mn(this.auth.app))return Promise.reject(er(this.auth));const e=await this.getIdToken();return await sa(this,jE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,a,c,d,f,g;const v=(r=n.displayName)!==null&&r!==void 0?r:void 0,_=(i=n.email)!==null&&i!==void 0?i:void 0,A=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,E=(a=n.photoURL)!==null&&a!==void 0?a:void 0,V=(c=n.tenantId)!==null&&c!==void 0?c:void 0,z=(d=n._redirectEventId)!==null&&d!==void 0?d:void 0,T=(f=n.createdAt)!==null&&f!==void 0?f:void 0,u=(g=n.lastLoginAt)!==null&&g!==void 0?g:void 0,{uid:I,emailVerified:M,isAnonymous:F,providerData:H,stsTokenManager:w}=n;ce(I&&w,e,"internal-error");const x=ys.fromJSON(this.name,w);ce(typeof I=="string",e,"internal-error"),vr(v,e.name),vr(_,e.name),ce(typeof M=="boolean",e,"internal-error"),ce(typeof F=="boolean",e,"internal-error"),vr(A,e.name),vr(E,e.name),vr(V,e.name),vr(z,e.name),vr(T,e.name),vr(u,e.name);const b=new Xn({uid:I,auth:e,email:_,emailVerified:M,displayName:v,isAnonymous:F,photoURL:E,phoneNumber:A,tenantId:V,stsTokenManager:x,createdAt:T,lastLoginAt:u});return H&&Array.isArray(H)&&(b.providerData=H.map(R=>Object.assign({},R))),z&&(b._redirectEventId=z),b}static async _fromIdTokenResponse(e,n,r=!1){const i=new ys;i.updateFromServerResponse(n);const s=new Xn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await pc(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];ce(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Z0(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new ys;c.updateFromIdToken(r);const d=new Xn({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new oh(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(d,f),d}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yg=new Map;function Jn(t){ar(t instanceof Function,"Expected a class definition");let e=yg.get(t);return e?(ar(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,yg.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ex{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}ex.type="NONE";const vg=ex;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dl(t,e,n){return`firebase:${t}:${e}:${n}`}class vs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Dl(this.userKey,i.apiKey,s),this.fullPersistenceKey=Dl("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Xn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new vs(Jn(vg),e,r);const i=(await Promise.all(n.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let s=i[0]||Jn(vg);const a=Dl(r,e.config.apiKey,e.name);let c=null;for(const f of n)try{const g=await f._get(a);if(g){const v=Xn._fromJSON(e,g);f!==s&&(c=v),s=f;break}}catch{}const d=i.filter(f=>f._shouldAllowMigration);return!s._shouldAllowMigration||!d.length?new vs(s,e,r):(s=d[0],c&&await s._set(a,c.toJSON()),await Promise.all(n.map(async f=>{if(f!==s)try{await f._remove(a)}catch{}})),new vs(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xg(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ix(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(tx(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ox(e))return"Blackberry";if(ax(e))return"Webos";if(nx(e))return"Safari";if((e.includes("chrome/")||rx(e))&&!e.includes("edge/"))return"Chrome";if(sx(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function tx(t=Nt()){return/firefox\//i.test(t)}function nx(t=Nt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function rx(t=Nt()){return/crios\//i.test(t)}function ix(t=Nt()){return/iemobile/i.test(t)}function sx(t=Nt()){return/android/i.test(t)}function ox(t=Nt()){return/blackberry/i.test(t)}function ax(t=Nt()){return/webos/i.test(t)}function Tf(t=Nt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function OE(t=Nt()){var e;return Tf(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function FE(){return tS()&&document.documentMode===10}function lx(t=Nt()){return Tf(t)||sx(t)||ax(t)||ox(t)||/windows phone/i.test(t)||ix(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cx(t,e=[]){let n;switch(t){case"Browser":n=xg(Nt());break;case"Worker":n=`${xg(Nt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Fs}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UE{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((a,c)=>{try{const d=e(s);a(d)}catch(d){c(d)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zE(t,e={}){return Jr(t,"GET","/v2/passwordPolicy",Xr(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qE=6;class BE{constructor(e){var n,r,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=a.minPasswordLength)!==null&&n!==void 0?n:qE,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,a,c;const d={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,d),this.validatePasswordCharacterOptions(e,d),d.isValid&&(d.isValid=(n=d.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),d.isValid&&(d.isValid=(r=d.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),d.isValid&&(d.isValid=(i=d.containsLowercaseLetter)!==null&&i!==void 0?i:!0),d.isValid&&(d.isValid=(s=d.containsUppercaseLetter)!==null&&s!==void 0?s:!0),d.isValid&&(d.isValid=(a=d.containsNumericCharacter)!==null&&a!==void 0?a:!0),d.isValid&&(d.isValid=(c=d.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),d}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _g(this),this.idTokenSubscription=new _g(this),this.beforeStateQueue=new UE(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=K0,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Jn(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await vs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await J0(this,{idToken:e}),r=await Xn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Mn(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=i==null?void 0:i._redirectEventId,d=await this.tryRedirectSignIn(e);(!a||a===c)&&(d!=null&&d.user)&&(i=d.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return ce(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await pc(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=SE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Mn(this.app))return Promise.reject(er(this));const n=e?ht(e):null;return n&&ce(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ce(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Mn(this.app)?Promise.reject(er(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Mn(this.app)?Promise.reject(er(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Jn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await zE(this),n=new BE(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new xa("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await VE(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Jn(e)||this._popupRedirectResolver;ce(n,this,"argument-error"),this.redirectPersistenceManager=await vs.create(this,[Jn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(ce(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof n=="function"){const d=e.addObserver(n,r,i);return()=>{a=!0,d()}}else{const d=e.addObserver(n);return()=>{a=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ce(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=cx(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&_E(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Li(t){return ht(t)}class _g{constructor(e){this.auth=e,this.observer=null,this.addObserver=cS(n=>this.observer=n)}get next(){return ce(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $c={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function WE(t){$c=t}function ux(t){return $c.loadJS(t)}function HE(){return $c.recaptchaEnterpriseScript}function KE(){return $c.gapiScript}function GE(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const QE="recaptcha-enterprise",YE="NO_RECAPTCHA";class XE{constructor(e){this.type=QE,this.auth=Li(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{AE(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const f=new kE(d);return s.tenantId==null?s._agentRecaptchaConfig=f:s._tenantRecaptchaConfigs[s.tenantId]=f,a(f.siteKey)}}).catch(d=>{c(d)})})}function i(s,a,c){const d=window.grecaptcha;mg(d)?d.enterprise.ready(()=>{d.enterprise.execute(s,{action:e}).then(f=>{a(f)}).catch(()=>{a(YE)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,a)=>{r(this.auth).then(c=>{if(!n&&mg(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let d=HE();d.length!==0&&(d+=c),ux(d).then(()=>{i(c,s,a)}).catch(f=>{a(f)})}}).catch(c=>{a(c)})})}}async function bg(t,e,n,r=!1){const i=new XE(t);let s;try{s=await i.verify(n)}catch{s=await i.verify(n,!0)}const a=Object.assign({},e);return r?Object.assign(a,{captchaResp:s}):Object.assign(a,{captchaResponse:s}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ah(t,e,n,r){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await bg(t,e,n,n==="getOobCode");return r(t,s)}else return r(t,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await bg(t,e,n,n==="getOobCode");return r(t,a)}else return Promise.reject(s)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JE(t,e){const n=wf(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(dc(s,e??{}))return i;Rn(i,"already-initialized")}return n.initialize({options:e})}function ZE(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Jn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function e2(t,e,n){const r=Li(t);ce(r._canInitEmulator,r,"emulator-config-failed"),ce(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=dx(e),{host:a,port:c}=t2(e),d=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${a}${d}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),n2()}function dx(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function t2(t){const e=dx(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:wg(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:wg(a)}}}function wg(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function n2(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Yn("not implemented")}_getIdTokenResponse(e){return Yn("not implemented")}_linkToIdToken(e,n){return Yn("not implemented")}_getReauthenticationResolver(e){return Yn("not implemented")}}async function r2(t,e){return Jr(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function i2(t,e){return wa(t,"POST","/v1/accounts:signInWithPassword",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function s2(t,e){return wa(t,"POST","/v1/accounts:signInWithEmailLink",Xr(t,e))}async function o2(t,e){return wa(t,"POST","/v1/accounts:signInWithEmailLink",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa extends kf{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new oa(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new oa(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ah(e,n,"signInWithPassword",i2);case"emailLink":return s2(e,{email:this._email,oobCode:this._password});default:Rn(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ah(e,r,"signUpPassword",r2);case"emailLink":return o2(e,{idToken:n,email:this._email,oobCode:this._password});default:Rn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xs(t,e){return wa(t,"POST","/v1/accounts:signInWithIdp",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a2="http://localhost";class Ai extends kf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ai(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Rn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=Sf(n,["providerId","signInMethod"]);if(!r||!i)return null;const a=new Ai(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const n=this.buildRequest();return xs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,xs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,xs(e,n)}buildRequest(){const e={requestUri:a2,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=_a(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l2(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function c2(t){const e=bo(wo(t)).link,n=e?bo(wo(e)).deep_link_id:null,r=bo(wo(t)).deep_link_id;return(r?bo(wo(r)).link:null)||r||n||e||t}class Af{constructor(e){var n,r,i,s,a,c;const d=bo(wo(e)),f=(n=d.apiKey)!==null&&n!==void 0?n:null,g=(r=d.oobCode)!==null&&r!==void 0?r:null,v=l2((i=d.mode)!==null&&i!==void 0?i:null);ce(f&&g&&v,"argument-error"),this.apiKey=f,this.operation=v,this.code=g,this.continueUrl=(s=d.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=d.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=d.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const n=c2(e);try{return new Af(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(){this.providerId=Us.PROVIDER_ID}static credential(e,n){return oa._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Af.parseLink(n);return ce(r,"argument-error"),oa._fromEmailAndCode(e,r.code,r.tenantId)}}Us.PROVIDER_ID="password";Us.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Us.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hx{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa extends hx{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er extends Sa{constructor(){super("facebook.com")}static credential(e){return Ai._fromParams({providerId:Er.PROVIDER_ID,signInMethod:Er.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Er.credentialFromTaggedObject(e)}static credentialFromError(e){return Er.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Er.credential(e.oauthAccessToken)}catch{return null}}}Er.FACEBOOK_SIGN_IN_METHOD="facebook.com";Er.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr extends Sa{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ai._fromParams({providerId:Rr.PROVIDER_ID,signInMethod:Rr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Rr.credentialFromTaggedObject(e)}static credentialFromError(e){return Rr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Rr.credential(n,r)}catch{return null}}}Rr.GOOGLE_SIGN_IN_METHOD="google.com";Rr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir extends Sa{constructor(){super("github.com")}static credential(e){return Ai._fromParams({providerId:Ir.PROVIDER_ID,signInMethod:Ir.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ir.credentialFromTaggedObject(e)}static credentialFromError(e){return Ir.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ir.credential(e.oauthAccessToken)}catch{return null}}}Ir.GITHUB_SIGN_IN_METHOD="github.com";Ir.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr extends Sa{constructor(){super("twitter.com")}static credential(e,n){return Ai._fromParams({providerId:Tr.PROVIDER_ID,signInMethod:Tr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Tr.credentialFromTaggedObject(e)}static credentialFromError(e){return Tr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Tr.credential(n,r)}catch{return null}}}Tr.TWITTER_SIGN_IN_METHOD="twitter.com";Tr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function u2(t,e){return wa(t,"POST","/v1/accounts:signUp",Xr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Xn._fromIdTokenResponse(e,r,i),a=Sg(r);return new ji({user:s,providerId:a,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Sg(r);return new ji({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Sg(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc extends hr{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,mc.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new mc(e,n,r,i)}}function fx(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?mc._fromErrorAndOperation(t,s,e,r):s})}async function d2(t,e,n=!1){const r=await sa(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ji._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function h2(t,e,n=!1){const{auth:r}=t;if(Mn(r.app))return Promise.reject(er(r));const i="reauthenticate";try{const s=await sa(t,fx(r,i,e,t),n);ce(s.idToken,r,"internal-error");const a=If(s.idToken);ce(a,r,"internal-error");const{sub:c}=a;return ce(t.uid===c,r,"user-mismatch"),ji._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Rn(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function px(t,e,n=!1){if(Mn(t.app))return Promise.reject(er(t));const r="signIn",i=await fx(t,r,e),s=await ji._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function f2(t,e){return px(Li(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mx(t){const e=Li(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function p2(t,e,n){if(Mn(t.app))return Promise.reject(er(t));const r=Li(t),a=await ah(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",u2).catch(d=>{throw d.code==="auth/password-does-not-meet-requirements"&&mx(t),d}),c=await ji._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function m2(t,e,n){return Mn(t.app)?Promise.reject(er(t)):f2(ht(t),Us.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&mx(t),r})}function g2(t,e,n,r){return ht(t).onIdTokenChanged(e,n,r)}function y2(t,e,n){return ht(t).beforeAuthStateChanged(e,n)}function v2(t){return ht(t).signOut()}const gc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gx{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(gc,"1"),this.storage.removeItem(gc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x2=1e3,_2=10;class yx extends gx{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=lx(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((a,c,d)=>{this.notifyListeners(a,d)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!n&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);FE()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,_2):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},x2)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}yx.type="LOCAL";const b2=yx;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vx extends gx{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}vx.type="SESSION";const xx=vx;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w2(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new Wc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async f=>f(n.origin,s)),d=await w2(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:d})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Wc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jf(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S2{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,d)=>{const f=jf("",20);i.port1.start();const g=setTimeout(()=>{d(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(v){const _=v;if(_.data.eventId===f)switch(_.data.status){case"ack":clearTimeout(g),s=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(_.data.response);break;default:clearTimeout(g),clearTimeout(s),d(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:n},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(){return window}function E2(t){Fn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _x(){return typeof Fn().WorkerGlobalScope<"u"&&typeof Fn().importScripts=="function"}async function R2(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function I2(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function T2(){return _x()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bx="firebaseLocalStorageDb",k2=1,yc="firebaseLocalStorage",wx="fbase_key";class Ea{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Hc(t,e){return t.transaction([yc],e?"readwrite":"readonly").objectStore(yc)}function A2(){const t=indexedDB.deleteDatabase(bx);return new Ea(t).toPromise()}function lh(){const t=indexedDB.open(bx,k2);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(yc,{keyPath:wx})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(yc)?e(r):(r.close(),await A2(),e(await lh()))})})}async function Eg(t,e,n){const r=Hc(t,!0).put({[wx]:e,value:n});return new Ea(r).toPromise()}async function j2(t,e){const n=Hc(t,!1).get(e),r=await new Ea(n).toPromise();return r===void 0?null:r.value}function Rg(t,e){const n=Hc(t,!0).delete(e);return new Ea(n).toPromise()}const C2=800,D2=3;class Sx{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await lh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>D2)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _x()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Wc._getInstance(T2()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await R2(),!this.activeServiceWorker)return;this.sender=new S2(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||I2()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await lh();return await Eg(e,gc,"1"),await Rg(e,gc),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Eg(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>j2(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Rg(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Hc(i,!1).getAll();return new Ea(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),C2)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Sx.type="LOCAL";const P2=Sx;new ba(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N2(t,e){return e?Jn(e):(ce(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf extends kf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return xs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return xs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return xs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function M2(t){return px(t.auth,new Cf(t),t.bypassAuthState)}function L2(t){const{auth:e,user:n}=t;return ce(n,e,"internal-error"),h2(n,new Cf(t),t.bypassAuthState)}async function V2(t){const{auth:e,user:n}=t;return ce(n,e,"internal-error"),d2(n,new Cf(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ex{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const d={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(d))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return M2;case"linkViaPopup":case"linkViaRedirect":return V2;case"reauthViaPopup":case"reauthViaRedirect":return L2;default:Rn(this.auth,"internal-error")}}resolve(e){ar(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ar(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O2=new ba(2e3,1e4);class us extends Ex{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,us.currentPopupAction&&us.currentPopupAction.cancel(),us.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ce(e,this.auth,"internal-error"),e}async onExecution(){ar(this.filter.length===1,"Popup operations only handle one event");const e=jf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(On(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(On(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,us.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(On(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,O2.get())};e()}}us.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F2="pendingRedirect",Pl=new Map;class U2 extends Ex{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Pl.get(this.auth._key());if(!e){try{const r=await z2(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Pl.set(this.auth._key(),e)}return this.bypassAuthState||Pl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function z2(t,e){const n=$2(e),r=B2(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function q2(t,e){Pl.set(t._key(),e)}function B2(t){return Jn(t._redirectPersistence)}function $2(t){return Dl(F2,t.config.apiKey,t.name)}async function W2(t,e,n=!1){if(Mn(t.app))return Promise.reject(er(t));const r=Li(t),i=N2(r,e),a=await new U2(r,i,n).execute();return a&&!n&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H2=10*60*1e3;class K2{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!G2(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Rx(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(On(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=H2&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ig(e))}saveEventToCache(e){this.cachedEventUids.add(Ig(e)),this.lastProcessedEventTime=Date.now()}}function Ig(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Rx({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function G2(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Rx(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q2(t,e={}){return Jr(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y2=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,X2=/^https?/;async function J2(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Q2(t);for(const n of e)try{if(Z2(n))return}catch{}Rn(t,"unauthorized-domain")}function Z2(t){const e=sh(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const a=new URL(t);return a.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&a.hostname===r}if(!X2.test(n))return!1;if(Y2.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eR=new ba(3e4,6e4);function Tg(){const t=Fn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function tR(t){return new Promise((e,n)=>{var r,i,s;function a(){Tg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Tg(),n(On(t,"network-request-failed"))},timeout:eR.get()})}if(!((i=(r=Fn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Fn().gapi)===null||s===void 0)&&s.load)a();else{const c=GE("iframefcb");return Fn()[c]=()=>{gapi.load?a():n(On(t,"network-request-failed"))},ux(`${KE()}?onload=${c}`).catch(d=>n(d))}}).catch(e=>{throw Nl=null,e})}let Nl=null;function nR(t){return Nl=Nl||tR(t),Nl}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rR=new ba(5e3,15e3),iR="__/auth/iframe",sR="emulator/auth/iframe",oR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},aR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function lR(t){const e=t.config;ce(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Rf(e,sR):`https://${t.config.authDomain}/${iR}`,r={apiKey:e.apiKey,appName:t.name,v:Fs},i=aR.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${_a(r).slice(1)}`}async function cR(t){const e=await nR(t),n=Fn().gapi;return ce(n,t,"internal-error"),e.open({where:document.body,url:lR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:oR,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=On(t,"network-request-failed"),c=Fn().setTimeout(()=>{s(a)},rR.get());function d(){Fn().clearTimeout(c),i(r)}r.ping(d).then(d,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},dR=500,hR=600,fR="_blank",pR="http://localhost";class kg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function mR(t,e,n,r=dR,i=hR){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const d=Object.assign(Object.assign({},uR),{width:r.toString(),height:i.toString(),top:s,left:a}),f=Nt().toLowerCase();n&&(c=rx(f)?fR:n),tx(f)&&(e=e||pR,d.scrollbars="yes");const g=Object.entries(d).reduce((_,[A,E])=>`${_}${A}=${E},`,"");if(OE(f)&&c!=="_self")return gR(e||"",c),new kg(null);const v=window.open(e||"",c,g);ce(v,t,"popup-blocked");try{v.focus()}catch{}return new kg(v)}function gR(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yR="__/auth/handler",vR="emulator/auth/handler",xR=encodeURIComponent("fac");async function Ag(t,e,n,r,i,s){ce(t.config.authDomain,t,"auth-domain-config-required"),ce(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Fs,eventId:i};if(e instanceof hx){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",lS(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[g,v]of Object.entries({}))a[g]=v}if(e instanceof Sa){const g=e.getScopes().filter(v=>v!=="");g.length>0&&(a.scopes=g.join(","))}t.tenantId&&(a.tid=t.tenantId);const c=a;for(const g of Object.keys(c))c[g]===void 0&&delete c[g];const d=await t._getAppCheckToken(),f=d?`#${xR}=${encodeURIComponent(d)}`:"";return`${_R(t)}?${_a(c).slice(1)}${f}`}function _R({config:t}){return t.emulator?Rf(t,vR):`https://${t.authDomain}/${yR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="webStorageSupport";class bR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=xx,this._completeRedirectFn=W2,this._overrideRedirectResult=q2}async _openPopup(e,n,r,i){var s;ar((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await Ag(e,n,r,sh(),i);return mR(e,a,jf())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Ag(e,n,r,sh(),i);return E2(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(ar(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await cR(e),r=new K2(e);return n.register("authEvent",i=>(ce(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(ed,{type:ed},i=>{var s;const a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[ed];a!==void 0&&n(!!a),Rn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=J2(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return lx()||nx()||Tf()}}const wR=bR;var jg="@firebase/auth",Cg="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ce(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ER(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function RR(t){ks(new ki("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;ce(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const d={apiKey:a,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:cx(t)},f=new $E(r,i,s,d);return ZE(f,n),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),ks(new ki("auth-internal",e=>{const n=Li(e.getProvider("auth").getImmediate());return(r=>new SR(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),zr(jg,Cg,ER(t)),zr(jg,Cg,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IR=5*60,TR=F0("authIdTokenMaxAge")||IR;let Dg=null;const kR=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>TR)return;const i=n==null?void 0:n.token;Dg!==i&&(Dg=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function AR(t=B0()){const e=wf(t,"auth");if(e.isInitialized())return e.getImmediate();const n=JE(t,{popupRedirectResolver:wR,persistence:[P2,b2,xx]}),r=F0("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=kR(s.toString());y2(n,a,()=>a(n.currentUser)),g2(n,c=>a(c))}}const i=V0("auth");return i&&e2(n,`http://${i}`),n}function jR(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}WE({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=On("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",jR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});RR("Browser");var Pg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var wi,Ix;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,x){function b(){}b.prototype=x.prototype,w.D=x.prototype,w.prototype=new b,w.prototype.constructor=w,w.C=function(R,k,j){for(var S=Array(arguments.length-2),zt=2;zt<arguments.length;zt++)S[zt-2]=arguments[zt];return x.prototype[k].apply(R,S)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,x,b){b||(b=0);var R=Array(16);if(typeof x=="string")for(var k=0;16>k;++k)R[k]=x.charCodeAt(b++)|x.charCodeAt(b++)<<8|x.charCodeAt(b++)<<16|x.charCodeAt(b++)<<24;else for(k=0;16>k;++k)R[k]=x[b++]|x[b++]<<8|x[b++]<<16|x[b++]<<24;x=w.g[0],b=w.g[1],k=w.g[2];var j=w.g[3],S=x+(j^b&(k^j))+R[0]+3614090360&4294967295;x=b+(S<<7&4294967295|S>>>25),S=j+(k^x&(b^k))+R[1]+3905402710&4294967295,j=x+(S<<12&4294967295|S>>>20),S=k+(b^j&(x^b))+R[2]+606105819&4294967295,k=j+(S<<17&4294967295|S>>>15),S=b+(x^k&(j^x))+R[3]+3250441966&4294967295,b=k+(S<<22&4294967295|S>>>10),S=x+(j^b&(k^j))+R[4]+4118548399&4294967295,x=b+(S<<7&4294967295|S>>>25),S=j+(k^x&(b^k))+R[5]+1200080426&4294967295,j=x+(S<<12&4294967295|S>>>20),S=k+(b^j&(x^b))+R[6]+2821735955&4294967295,k=j+(S<<17&4294967295|S>>>15),S=b+(x^k&(j^x))+R[7]+4249261313&4294967295,b=k+(S<<22&4294967295|S>>>10),S=x+(j^b&(k^j))+R[8]+1770035416&4294967295,x=b+(S<<7&4294967295|S>>>25),S=j+(k^x&(b^k))+R[9]+2336552879&4294967295,j=x+(S<<12&4294967295|S>>>20),S=k+(b^j&(x^b))+R[10]+4294925233&4294967295,k=j+(S<<17&4294967295|S>>>15),S=b+(x^k&(j^x))+R[11]+2304563134&4294967295,b=k+(S<<22&4294967295|S>>>10),S=x+(j^b&(k^j))+R[12]+1804603682&4294967295,x=b+(S<<7&4294967295|S>>>25),S=j+(k^x&(b^k))+R[13]+4254626195&4294967295,j=x+(S<<12&4294967295|S>>>20),S=k+(b^j&(x^b))+R[14]+2792965006&4294967295,k=j+(S<<17&4294967295|S>>>15),S=b+(x^k&(j^x))+R[15]+1236535329&4294967295,b=k+(S<<22&4294967295|S>>>10),S=x+(k^j&(b^k))+R[1]+4129170786&4294967295,x=b+(S<<5&4294967295|S>>>27),S=j+(b^k&(x^b))+R[6]+3225465664&4294967295,j=x+(S<<9&4294967295|S>>>23),S=k+(x^b&(j^x))+R[11]+643717713&4294967295,k=j+(S<<14&4294967295|S>>>18),S=b+(j^x&(k^j))+R[0]+3921069994&4294967295,b=k+(S<<20&4294967295|S>>>12),S=x+(k^j&(b^k))+R[5]+3593408605&4294967295,x=b+(S<<5&4294967295|S>>>27),S=j+(b^k&(x^b))+R[10]+38016083&4294967295,j=x+(S<<9&4294967295|S>>>23),S=k+(x^b&(j^x))+R[15]+3634488961&4294967295,k=j+(S<<14&4294967295|S>>>18),S=b+(j^x&(k^j))+R[4]+3889429448&4294967295,b=k+(S<<20&4294967295|S>>>12),S=x+(k^j&(b^k))+R[9]+568446438&4294967295,x=b+(S<<5&4294967295|S>>>27),S=j+(b^k&(x^b))+R[14]+3275163606&4294967295,j=x+(S<<9&4294967295|S>>>23),S=k+(x^b&(j^x))+R[3]+4107603335&4294967295,k=j+(S<<14&4294967295|S>>>18),S=b+(j^x&(k^j))+R[8]+1163531501&4294967295,b=k+(S<<20&4294967295|S>>>12),S=x+(k^j&(b^k))+R[13]+2850285829&4294967295,x=b+(S<<5&4294967295|S>>>27),S=j+(b^k&(x^b))+R[2]+4243563512&4294967295,j=x+(S<<9&4294967295|S>>>23),S=k+(x^b&(j^x))+R[7]+1735328473&4294967295,k=j+(S<<14&4294967295|S>>>18),S=b+(j^x&(k^j))+R[12]+2368359562&4294967295,b=k+(S<<20&4294967295|S>>>12),S=x+(b^k^j)+R[5]+4294588738&4294967295,x=b+(S<<4&4294967295|S>>>28),S=j+(x^b^k)+R[8]+2272392833&4294967295,j=x+(S<<11&4294967295|S>>>21),S=k+(j^x^b)+R[11]+1839030562&4294967295,k=j+(S<<16&4294967295|S>>>16),S=b+(k^j^x)+R[14]+4259657740&4294967295,b=k+(S<<23&4294967295|S>>>9),S=x+(b^k^j)+R[1]+2763975236&4294967295,x=b+(S<<4&4294967295|S>>>28),S=j+(x^b^k)+R[4]+1272893353&4294967295,j=x+(S<<11&4294967295|S>>>21),S=k+(j^x^b)+R[7]+4139469664&4294967295,k=j+(S<<16&4294967295|S>>>16),S=b+(k^j^x)+R[10]+3200236656&4294967295,b=k+(S<<23&4294967295|S>>>9),S=x+(b^k^j)+R[13]+681279174&4294967295,x=b+(S<<4&4294967295|S>>>28),S=j+(x^b^k)+R[0]+3936430074&4294967295,j=x+(S<<11&4294967295|S>>>21),S=k+(j^x^b)+R[3]+3572445317&4294967295,k=j+(S<<16&4294967295|S>>>16),S=b+(k^j^x)+R[6]+76029189&4294967295,b=k+(S<<23&4294967295|S>>>9),S=x+(b^k^j)+R[9]+3654602809&4294967295,x=b+(S<<4&4294967295|S>>>28),S=j+(x^b^k)+R[12]+3873151461&4294967295,j=x+(S<<11&4294967295|S>>>21),S=k+(j^x^b)+R[15]+530742520&4294967295,k=j+(S<<16&4294967295|S>>>16),S=b+(k^j^x)+R[2]+3299628645&4294967295,b=k+(S<<23&4294967295|S>>>9),S=x+(k^(b|~j))+R[0]+4096336452&4294967295,x=b+(S<<6&4294967295|S>>>26),S=j+(b^(x|~k))+R[7]+1126891415&4294967295,j=x+(S<<10&4294967295|S>>>22),S=k+(x^(j|~b))+R[14]+2878612391&4294967295,k=j+(S<<15&4294967295|S>>>17),S=b+(j^(k|~x))+R[5]+4237533241&4294967295,b=k+(S<<21&4294967295|S>>>11),S=x+(k^(b|~j))+R[12]+1700485571&4294967295,x=b+(S<<6&4294967295|S>>>26),S=j+(b^(x|~k))+R[3]+2399980690&4294967295,j=x+(S<<10&4294967295|S>>>22),S=k+(x^(j|~b))+R[10]+4293915773&4294967295,k=j+(S<<15&4294967295|S>>>17),S=b+(j^(k|~x))+R[1]+2240044497&4294967295,b=k+(S<<21&4294967295|S>>>11),S=x+(k^(b|~j))+R[8]+1873313359&4294967295,x=b+(S<<6&4294967295|S>>>26),S=j+(b^(x|~k))+R[15]+4264355552&4294967295,j=x+(S<<10&4294967295|S>>>22),S=k+(x^(j|~b))+R[6]+2734768916&4294967295,k=j+(S<<15&4294967295|S>>>17),S=b+(j^(k|~x))+R[13]+1309151649&4294967295,b=k+(S<<21&4294967295|S>>>11),S=x+(k^(b|~j))+R[4]+4149444226&4294967295,x=b+(S<<6&4294967295|S>>>26),S=j+(b^(x|~k))+R[11]+3174756917&4294967295,j=x+(S<<10&4294967295|S>>>22),S=k+(x^(j|~b))+R[2]+718787259&4294967295,k=j+(S<<15&4294967295|S>>>17),S=b+(j^(k|~x))+R[9]+3951481745&4294967295,w.g[0]=w.g[0]+x&4294967295,w.g[1]=w.g[1]+(k+(S<<21&4294967295|S>>>11))&4294967295,w.g[2]=w.g[2]+k&4294967295,w.g[3]=w.g[3]+j&4294967295}r.prototype.u=function(w,x){x===void 0&&(x=w.length);for(var b=x-this.blockSize,R=this.B,k=this.h,j=0;j<x;){if(k==0)for(;j<=b;)i(this,w,j),j+=this.blockSize;if(typeof w=="string"){for(;j<x;)if(R[k++]=w.charCodeAt(j++),k==this.blockSize){i(this,R),k=0;break}}else for(;j<x;)if(R[k++]=w[j++],k==this.blockSize){i(this,R),k=0;break}}this.h=k,this.o+=x},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var x=1;x<w.length-8;++x)w[x]=0;var b=8*this.o;for(x=w.length-8;x<w.length;++x)w[x]=b&255,b/=256;for(this.u(w),w=Array(16),x=b=0;4>x;++x)for(var R=0;32>R;R+=8)w[b++]=this.g[x]>>>R&255;return w};function s(w,x){var b=c;return Object.prototype.hasOwnProperty.call(b,w)?b[w]:b[w]=x(w)}function a(w,x){this.h=x;for(var b=[],R=!0,k=w.length-1;0<=k;k--){var j=w[k]|0;R&&j==x||(b[k]=j,R=!1)}this.g=b}var c={};function d(w){return-128<=w&&128>w?s(w,function(x){return new a([x|0],0>x?-1:0)}):new a([w|0],0>w?-1:0)}function f(w){if(isNaN(w)||!isFinite(w))return v;if(0>w)return z(f(-w));for(var x=[],b=1,R=0;w>=b;R++)x[R]=w/b|0,b*=4294967296;return new a(x,0)}function g(w,x){if(w.length==0)throw Error("number format error: empty string");if(x=x||10,2>x||36<x)throw Error("radix out of range: "+x);if(w.charAt(0)=="-")return z(g(w.substring(1),x));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var b=f(Math.pow(x,8)),R=v,k=0;k<w.length;k+=8){var j=Math.min(8,w.length-k),S=parseInt(w.substring(k,k+j),x);8>j?(j=f(Math.pow(x,j)),R=R.j(j).add(f(S))):(R=R.j(b),R=R.add(f(S)))}return R}var v=d(0),_=d(1),A=d(16777216);t=a.prototype,t.m=function(){if(V(this))return-z(this).m();for(var w=0,x=1,b=0;b<this.g.length;b++){var R=this.i(b);w+=(0<=R?R:4294967296+R)*x,x*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(E(this))return"0";if(V(this))return"-"+z(this).toString(w);for(var x=f(Math.pow(w,6)),b=this,R="";;){var k=M(b,x).g;b=T(b,k.j(x));var j=((0<b.g.length?b.g[0]:b.h)>>>0).toString(w);if(b=k,E(b))return j+R;for(;6>j.length;)j="0"+j;R=j+R}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function E(w){if(w.h!=0)return!1;for(var x=0;x<w.g.length;x++)if(w.g[x]!=0)return!1;return!0}function V(w){return w.h==-1}t.l=function(w){return w=T(this,w),V(w)?-1:E(w)?0:1};function z(w){for(var x=w.g.length,b=[],R=0;R<x;R++)b[R]=~w.g[R];return new a(b,~w.h).add(_)}t.abs=function(){return V(this)?z(this):this},t.add=function(w){for(var x=Math.max(this.g.length,w.g.length),b=[],R=0,k=0;k<=x;k++){var j=R+(this.i(k)&65535)+(w.i(k)&65535),S=(j>>>16)+(this.i(k)>>>16)+(w.i(k)>>>16);R=S>>>16,j&=65535,S&=65535,b[k]=S<<16|j}return new a(b,b[b.length-1]&-2147483648?-1:0)};function T(w,x){return w.add(z(x))}t.j=function(w){if(E(this)||E(w))return v;if(V(this))return V(w)?z(this).j(z(w)):z(z(this).j(w));if(V(w))return z(this.j(z(w)));if(0>this.l(A)&&0>w.l(A))return f(this.m()*w.m());for(var x=this.g.length+w.g.length,b=[],R=0;R<2*x;R++)b[R]=0;for(R=0;R<this.g.length;R++)for(var k=0;k<w.g.length;k++){var j=this.i(R)>>>16,S=this.i(R)&65535,zt=w.i(k)>>>16,Bn=w.i(k)&65535;b[2*R+2*k]+=S*Bn,u(b,2*R+2*k),b[2*R+2*k+1]+=j*Bn,u(b,2*R+2*k+1),b[2*R+2*k+1]+=S*zt,u(b,2*R+2*k+1),b[2*R+2*k+2]+=j*zt,u(b,2*R+2*k+2)}for(R=0;R<x;R++)b[R]=b[2*R+1]<<16|b[2*R];for(R=x;R<2*x;R++)b[R]=0;return new a(b,0)};function u(w,x){for(;(w[x]&65535)!=w[x];)w[x+1]+=w[x]>>>16,w[x]&=65535,x++}function I(w,x){this.g=w,this.h=x}function M(w,x){if(E(x))throw Error("division by zero");if(E(w))return new I(v,v);if(V(w))return x=M(z(w),x),new I(z(x.g),z(x.h));if(V(x))return x=M(w,z(x)),new I(z(x.g),x.h);if(30<w.g.length){if(V(w)||V(x))throw Error("slowDivide_ only works with positive integers.");for(var b=_,R=x;0>=R.l(w);)b=F(b),R=F(R);var k=H(b,1),j=H(R,1);for(R=H(R,2),b=H(b,2);!E(R);){var S=j.add(R);0>=S.l(w)&&(k=k.add(b),j=S),R=H(R,1),b=H(b,1)}return x=T(w,k.j(x)),new I(k,x)}for(k=v;0<=w.l(x);){for(b=Math.max(1,Math.floor(w.m()/x.m())),R=Math.ceil(Math.log(b)/Math.LN2),R=48>=R?1:Math.pow(2,R-48),j=f(b),S=j.j(x);V(S)||0<S.l(w);)b-=R,j=f(b),S=j.j(x);E(j)&&(j=_),k=k.add(j),w=T(w,S)}return new I(k,w)}t.A=function(w){return M(this,w).h},t.and=function(w){for(var x=Math.max(this.g.length,w.g.length),b=[],R=0;R<x;R++)b[R]=this.i(R)&w.i(R);return new a(b,this.h&w.h)},t.or=function(w){for(var x=Math.max(this.g.length,w.g.length),b=[],R=0;R<x;R++)b[R]=this.i(R)|w.i(R);return new a(b,this.h|w.h)},t.xor=function(w){for(var x=Math.max(this.g.length,w.g.length),b=[],R=0;R<x;R++)b[R]=this.i(R)^w.i(R);return new a(b,this.h^w.h)};function F(w){for(var x=w.g.length+1,b=[],R=0;R<x;R++)b[R]=w.i(R)<<1|w.i(R-1)>>>31;return new a(b,w.h)}function H(w,x){var b=x>>5;x%=32;for(var R=w.g.length-b,k=[],j=0;j<R;j++)k[j]=0<x?w.i(j+b)>>>x|w.i(j+b+1)<<32-x:w.i(j+b);return new a(k,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Ix=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=g,wi=a}).apply(typeof Pg<"u"?Pg:typeof self<"u"?self:typeof window<"u"?window:{});var pl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Tx,So,kx,Ml,ch,Ax,jx,Cx;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(l,h,p){return l==Array.prototype||l==Object.prototype||(l[h]=p.value),l};function n(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof pl=="object"&&pl];for(var h=0;h<l.length;++h){var p=l[h];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=n(this);function i(l,h){if(h)e:{var p=r;l=l.split(".");for(var y=0;y<l.length-1;y++){var C=l[y];if(!(C in p))break e;p=p[C]}l=l[l.length-1],y=p[l],h=h(y),h!=y&&h!=null&&e(p,l,{configurable:!0,writable:!0,value:h})}}function s(l,h){l instanceof String&&(l+="");var p=0,y=!1,C={next:function(){if(!y&&p<l.length){var L=p++;return{value:h(L,l[L]),done:!1}}return y=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}i("Array.prototype.values",function(l){return l||function(){return s(this,function(h,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function d(l){var h=typeof l;return h=h!="object"?h:l?Array.isArray(l)?"array":h:"null",h=="array"||h=="object"&&typeof l.length=="number"}function f(l){var h=typeof l;return h=="object"&&l!=null||h=="function"}function g(l,h,p){return l.call.apply(l.bind,arguments)}function v(l,h,p){if(!l)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,y),l.apply(h,C)}}return function(){return l.apply(h,arguments)}}function _(l,h,p){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?g:v,_.apply(null,arguments)}function A(l,h){var p=Array.prototype.slice.call(arguments,1);return function(){var y=p.slice();return y.push.apply(y,arguments),l.apply(this,y)}}function E(l,h){function p(){}p.prototype=h.prototype,l.aa=h.prototype,l.prototype=new p,l.prototype.constructor=l,l.Qb=function(y,C,L){for(var K=Array(arguments.length-2),je=2;je<arguments.length;je++)K[je-2]=arguments[je];return h.prototype[C].apply(y,K)}}function V(l){const h=l.length;if(0<h){const p=Array(h);for(let y=0;y<h;y++)p[y]=l[y];return p}return[]}function z(l,h){for(let p=1;p<arguments.length;p++){const y=arguments[p];if(d(y)){const C=l.length||0,L=y.length||0;l.length=C+L;for(let K=0;K<L;K++)l[C+K]=y[K]}else l.push(y)}}class T{constructor(h,p){this.i=h,this.j=p,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function u(l){return/^[\s\xa0]*$/.test(l)}function I(){var l=c.navigator;return l&&(l=l.userAgent)?l:""}function M(l){return M[" "](l),l}M[" "]=function(){};var F=I().indexOf("Gecko")!=-1&&!(I().toLowerCase().indexOf("webkit")!=-1&&I().indexOf("Edge")==-1)&&!(I().indexOf("Trident")!=-1||I().indexOf("MSIE")!=-1)&&I().indexOf("Edge")==-1;function H(l,h,p){for(const y in l)h.call(p,l[y],y,l)}function w(l,h){for(const p in l)h.call(void 0,l[p],p,l)}function x(l){const h={};for(const p in l)h[p]=l[p];return h}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function R(l,h){let p,y;for(let C=1;C<arguments.length;C++){y=arguments[C];for(p in y)l[p]=y[p];for(let L=0;L<b.length;L++)p=b[L],Object.prototype.hasOwnProperty.call(y,p)&&(l[p]=y[p])}}function k(l){var h=1;l=l.split(":");const p=[];for(;0<h&&l.length;)p.push(l.shift()),h--;return l.length&&p.push(l.join(":")),p}function j(l){c.setTimeout(()=>{throw l},0)}function S(){var l=ae;let h=null;return l.g&&(h=l.g,l.g=l.g.next,l.g||(l.h=null),h.next=null),h}class zt{constructor(){this.h=this.g=null}add(h,p){const y=Bn.get();y.set(h,p),this.h?this.h.next=y:this.g=y,this.h=y}}var Bn=new T(()=>new ti,l=>l.reset());class ti{constructor(){this.next=this.g=this.h=null}set(h,p){this.h=h,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let Qe,G=!1,ae=new zt,he=()=>{const l=c.Promise.resolve(void 0);Qe=()=>{l.then(_e)}};var _e=()=>{for(var l;l=S();){try{l.h.call(l.g)}catch(p){j(p)}var h=Bn;h.j(l),100>h.h&&(h.h++,l.next=h.g,h.g=l)}G=!1};function Te(){this.s=this.s,this.C=this.C}Te.prototype.s=!1,Te.prototype.ma=function(){this.s||(this.s=!0,this.N())},Te.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function He(l,h){this.type=l,this.g=this.target=h,this.defaultPrevented=!1}He.prototype.h=function(){this.defaultPrevented=!0};var Tn=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var l=!1,h=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const p=()=>{};c.addEventListener("test",p,h),c.removeEventListener("test",p,h)}catch{}return l}();function St(l,h){if(He.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l){var p=this.type=l.type,y=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;if(this.target=l.target||l.srcElement,this.g=h,h=l.relatedTarget){if(F){e:{try{M(h.nodeName);var C=!0;break e}catch{}C=!1}C||(h=null)}}else p=="mouseover"?h=l.fromElement:p=="mouseout"&&(h=l.toElement);this.relatedTarget=h,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=typeof l.pointerType=="string"?l.pointerType:rn[l.pointerType]||"",this.state=l.state,this.i=l,l.defaultPrevented&&St.aa.h.call(this)}}E(St,He);var rn={2:"touch",3:"pen",4:"mouse"};St.prototype.h=function(){St.aa.h.call(this);var l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var kn="closure_listenable_"+(1e6*Math.random()|0),mp=0;function Ws(l,h,p,y,C){this.listener=l,this.proxy=null,this.src=h,this.type=p,this.capture=!!y,this.ha=C,this.key=++mp,this.da=this.fa=!1}function ni(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function at(l){this.src=l,this.g={},this.h=0}at.prototype.add=function(l,h,p,y,C){var L=l.toString();l=this.g[L],l||(l=this.g[L]=[],this.h++);var K=nt(l,h,y,C);return-1<K?(h=l[K],p||(h.fa=!1)):(h=new Ws(h,this.src,L,!!y,C),h.fa=p,l.push(h)),h};function An(l,h){var p=h.type;if(p in l.g){var y=l.g[p],C=Array.prototype.indexOf.call(y,h,void 0),L;(L=0<=C)&&Array.prototype.splice.call(y,C,1),L&&(ni(h),l.g[p].length==0&&(delete l.g[p],l.h--))}}function nt(l,h,p,y){for(var C=0;C<l.length;++C){var L=l[C];if(!L.da&&L.listener==h&&L.capture==!!p&&L.ha==y)return C}return-1}var Hs="closure_lm_"+(1e6*Math.random()|0),Fe={};function Ks(l,h,p,y,C){if(Array.isArray(h)){for(var L=0;L<h.length;L++)Ks(l,h[L],p,y,C);return null}return p=Gs(p),l&&l[kn]?l.K(h,p,f(y)?!!y.capture:!1,C):Ue(l,h,p,!1,y,C)}function Ue(l,h,p,y,C,L){if(!h)throw Error("Invalid event type");var K=f(C)?!!C.capture:!!C,je=pn(l);if(je||(l[Hs]=je=new at(l)),p=je.add(h,p,y,K,L),p.proxy)return p;if(y=ri(),p.proxy=y,y.src=l,y.listener=p,l.addEventListener)Tn||(C=K),C===void 0&&(C=!1),l.addEventListener(h.toString(),y,C);else if(l.attachEvent)l.attachEvent(Ye(h.toString()),y);else if(l.addListener&&l.removeListener)l.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return p}function ri(){function l(p){return h.call(l.src,l.listener,p)}const h=jn;return l}function hu(l,h,p,y,C){if(Array.isArray(h))for(var L=0;L<h.length;L++)hu(l,h[L],p,y,C);else y=f(y)?!!y.capture:!!y,p=Gs(p),l&&l[kn]?(l=l.i,h=String(h).toString(),h in l.g&&(L=l.g[h],p=nt(L,p,y,C),-1<p&&(ni(L[p]),Array.prototype.splice.call(L,p,1),L.length==0&&(delete l.g[h],l.h--)))):l&&(l=pn(l))&&(h=l.g[h.toString()],l=-1,h&&(l=nt(h,p,y,C)),(p=-1<l?h[l]:null)&&sn(p))}function sn(l){if(typeof l!="number"&&l&&!l.da){var h=l.src;if(h&&h[kn])An(h.i,l);else{var p=l.type,y=l.proxy;h.removeEventListener?h.removeEventListener(p,y,l.capture):h.detachEvent?h.detachEvent(Ye(p),y):h.addListener&&h.removeListener&&h.removeListener(y),(p=pn(h))?(An(p,l),p.h==0&&(p.src=null,h[Hs]=null)):ni(l)}}}function Ye(l){return l in Fe?Fe[l]:Fe[l]="on"+l}function jn(l,h){if(l.da)l=!0;else{h=new St(h,this);var p=l.listener,y=l.ha||l.src;l.fa&&sn(l),l=p.call(y,h)}return l}function pn(l){return l=l[Hs],l instanceof at?l:null}var Fi="__closure_events_fn_"+(1e9*Math.random()>>>0);function Gs(l){return typeof l=="function"?l:(l[Fi]||(l[Fi]=function(h){return l.handleEvent(h)}),l[Fi])}function Y(){Te.call(this),this.i=new at(this),this.M=this,this.F=null}E(Y,Te),Y.prototype[kn]=!0,Y.prototype.removeEventListener=function(l,h,p,y){hu(this,l,h,p,y)};function ft(l,h){var p,y=l.F;if(y)for(p=[];y;y=y.F)p.push(y);if(l=l.M,y=h.type||h,typeof h=="string")h=new He(h,l);else if(h instanceof He)h.target=h.target||l;else{var C=h;h=new He(y,l),R(h,C)}if(C=!0,p)for(var L=p.length-1;0<=L;L--){var K=h.g=p[L];C=Ui(K,y,!0,h)&&C}if(K=h.g=l,C=Ui(K,y,!0,h)&&C,C=Ui(K,y,!1,h)&&C,p)for(L=0;L<p.length;L++)K=h.g=p[L],C=Ui(K,y,!1,h)&&C}Y.prototype.N=function(){if(Y.aa.N.call(this),this.i){var l=this.i,h;for(h in l.g){for(var p=l.g[h],y=0;y<p.length;y++)ni(p[y]);delete l.g[h],l.h--}}this.F=null},Y.prototype.K=function(l,h,p,y){return this.i.add(String(l),h,!1,p,y)},Y.prototype.L=function(l,h,p,y){return this.i.add(String(l),h,!0,p,y)};function Ui(l,h,p,y){if(h=l.i.g[String(h)],!h)return!0;h=h.concat();for(var C=!0,L=0;L<h.length;++L){var K=h[L];if(K&&!K.da&&K.capture==p){var je=K.listener,mt=K.ha||K.src;K.fa&&An(l.i,K),C=je.call(mt,y)!==!1&&C}}return C&&!y.defaultPrevented}function Da(l,h,p){if(typeof l=="function")p&&(l=_(l,p));else if(l&&typeof l.handleEvent=="function")l=_(l.handleEvent,l);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(l,h||0)}function Pa(l){l.g=Da(()=>{l.g=null,l.i&&(l.i=!1,Pa(l))},l.l);const h=l.h;l.h=null,l.m.apply(null,h)}class fu extends Te{constructor(h,p){super(),this.m=h,this.l=p,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Pa(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ii(l){Te.call(this),this.h=l,this.g={}}E(ii,Te);var Na=[];function Mt(l){H(l.g,function(h,p){this.g.hasOwnProperty(p)&&sn(h)},l),l.g={}}ii.prototype.N=function(){ii.aa.N.call(this),Mt(this)},ii.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Qs=c.JSON.stringify,Ma=c.JSON.parse,pu=class{stringify(l){return c.JSON.stringify(l,void 0)}parse(l){return c.JSON.parse(l,void 0)}};function zi(){}zi.prototype.h=null;function Ys(l){return l.h||(l.h=l.i())}function Xs(){}var si={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Js(){He.call(this,"d")}E(Js,He);function qi(){He.call(this,"c")}E(qi,He);var mn={},Zs=null;function oi(){return Zs=Zs||new Y}mn.La="serverreachability";function Bi(l){He.call(this,mn.La,l)}E(Bi,He);function ai(l){const h=oi();ft(h,new Bi(h))}mn.STAT_EVENT="statevent";function La(l,h){He.call(this,mn.STAT_EVENT,l),this.stat=h}E(La,He);function pt(l){const h=oi();ft(h,new La(h,l))}mn.Ma="timingevent";function Cn(l,h){He.call(this,mn.Ma,l),this.size=h}E(Cn,He);function fr(l,h){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){l()},h)}function pr(){this.g=!0}pr.prototype.xa=function(){this.g=!1};function Va(l,h,p,y,C,L){l.info(function(){if(l.g)if(L)for(var K="",je=L.split("&"),mt=0;mt<je.length;mt++){var Re=je[mt].split("=");if(1<Re.length){var Et=Re[0];Re=Re[1];var Rt=Et.split("_");K=2<=Rt.length&&Rt[1]=="type"?K+(Et+"="+Re+"&"):K+(Et+"=redacted&")}}else K=null;else K=L;return"XMLHTTP REQ ("+y+") [attempt "+C+"]: "+h+`
`+p+`
`+K})}function O(l,h,p,y,C,L,K){l.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+C+"]: "+h+`
`+p+`
`+L+" "+K})}function N(l,h,p,y){l.info(function(){return"XMLHTTP TEXT ("+h+"): "+oe(l,p)+(y?" "+y:"")})}function q(l,h){l.info(function(){return"TIMEOUT: "+h})}pr.prototype.info=function(){};function oe(l,h){if(!l.g)return h;if(!h)return null;try{var p=JSON.parse(h);if(p){for(l=0;l<p.length;l++)if(Array.isArray(p[l])){var y=p[l];if(!(2>y.length)){var C=y[1];if(Array.isArray(C)&&!(1>C.length)){var L=C[0];if(L!="noop"&&L!="stop"&&L!="close")for(var K=1;K<C.length;K++)C[K]=""}}}}return Qs(p)}catch{return h}}var ue={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ye={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},rt;function m(){}E(m,zi),m.prototype.g=function(){return new XMLHttpRequest},m.prototype.i=function(){return{}},rt=new m;function D(l,h,p,y){this.j=l,this.i=h,this.l=p,this.R=y||1,this.U=new ii(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new $}function $(){this.i=null,this.g="",this.h=!1}var Q={},P={};function te(l,h,p){l.L=1,l.v=za($n(h)),l.m=p,l.P=!0,re(l,null)}function re(l,h){l.F=Date.now(),ne(l),l.A=$n(l.v);var p=l.A,y=l.R;Array.isArray(y)||(y=[String(y)]),Tp(p.i,"t",y),l.C=0,p=l.j.J,l.h=new $,l.g=Wp(l.j,p?h:null,!l.m),0<l.O&&(l.M=new fu(_(l.Y,l,l.g),l.O)),h=l.U,p=l.g,y=l.ca;var C="readystatechange";Array.isArray(C)||(C&&(Na[0]=C.toString()),C=Na);for(var L=0;L<C.length;L++){var K=Ks(p,C[L],y||h.handleEvent,!1,h.h||h);if(!K)break;h.g[K.key]=K}h=l.H?x(l.H):{},l.m?(l.u||(l.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.A,l.u,l.m,h)):(l.u="GET",l.g.ea(l.A,l.u,null,h)),ai(),Va(l.i,l.u,l.A,l.l,l.R,l.m)}D.prototype.ca=function(l){l=l.target;const h=this.M;h&&Wn(l)==3?h.j():this.Y(l)},D.prototype.Y=function(l){try{if(l==this.g)e:{const Rt=Wn(this.g);var h=this.g.Ba();const Hi=this.g.Z();if(!(3>Rt)&&(Rt!=3||this.g&&(this.h.h||this.g.oa()||Np(this.g)))){this.J||Rt!=4||h==7||(h==8||0>=Hi?ai(3):ai(2)),me(this);var p=this.g.Z();this.X=p;t:if(Z(this)){var y=Np(this.g);l="";var C=y.length,L=Wn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ce(this),lt(this);var K="";break t}this.h.i=new c.TextDecoder}for(h=0;h<C;h++)this.h.h=!0,l+=this.h.i.decode(y[h],{stream:!(L&&h==C-1)});y.length=0,this.h.g+=l,this.C=0,K=this.h.g}else K=this.g.oa();if(this.o=p==200,O(this.i,this.u,this.A,this.l,this.R,Rt,p),this.o){if(this.T&&!this.K){t:{if(this.g){var je,mt=this.g;if((je=mt.g?mt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!u(je)){var Re=je;break t}}Re=null}if(p=Re)N(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,on(this,p);else{this.o=!1,this.s=3,pt(12),Ce(this),lt(this);break e}}if(this.P){p=!0;let gn;for(;!this.J&&this.C<K.length;)if(gn=le(this,K),gn==P){Rt==4&&(this.s=4,pt(14),p=!1),N(this.i,this.l,null,"[Incomplete Response]");break}else if(gn==Q){this.s=4,pt(15),N(this.i,this.l,K,"[Invalid Chunk]"),p=!1;break}else N(this.i,this.l,gn,null),on(this,gn);if(Z(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Rt!=4||K.length!=0||this.h.h||(this.s=1,pt(16),p=!1),this.o=this.o&&p,!p)N(this.i,this.l,K,"[Invalid Chunked Response]"),Ce(this),lt(this);else if(0<K.length&&!this.W){this.W=!0;var Et=this.j;Et.g==this&&Et.ba&&!Et.M&&(Et.j.info("Great, no buffering proxy detected. Bytes received: "+K.length),_u(Et),Et.M=!0,pt(11))}}else N(this.i,this.l,K,null),on(this,K);Rt==4&&Ce(this),this.o&&!this.J&&(Rt==4?zp(this.j,this):(this.o=!1,ne(this)))}else c_(this.g),p==400&&0<K.indexOf("Unknown SID")?(this.s=3,pt(12)):(this.s=0,pt(13)),Ce(this),lt(this)}}}catch{}finally{}};function Z(l){return l.g?l.u=="GET"&&l.L!=2&&l.j.Ca:!1}function le(l,h){var p=l.C,y=h.indexOf(`
`,p);return y==-1?P:(p=Number(h.substring(p,y)),isNaN(p)?Q:(y+=1,y+p>h.length?P:(h=h.slice(y,y+p),l.C=y+p,h)))}D.prototype.cancel=function(){this.J=!0,Ce(this)};function ne(l){l.S=Date.now()+l.I,Pe(l,l.I)}function Pe(l,h){if(l.B!=null)throw Error("WatchDog timer not null");l.B=fr(_(l.ba,l),h)}function me(l){l.B&&(c.clearTimeout(l.B),l.B=null)}D.prototype.ba=function(){this.B=null;const l=Date.now();0<=l-this.S?(q(this.i,this.A),this.L!=2&&(ai(),pt(17)),Ce(this),this.s=2,lt(this)):Pe(this,this.S-l)};function lt(l){l.j.G==0||l.J||zp(l.j,l)}function Ce(l){me(l);var h=l.M;h&&typeof h.ma=="function"&&h.ma(),l.M=null,Mt(l.U),l.g&&(h=l.g,l.g=null,h.abort(),h.ma())}function on(l,h){try{var p=l.j;if(p.G!=0&&(p.g==l||mu(p.h,l))){if(!l.K&&mu(p.h,l)&&p.G==3){try{var y=p.Da.g.parse(h)}catch{y=null}if(Array.isArray(y)&&y.length==3){var C=y;if(C[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<l.F)Ka(p),Wa(p);else break e;xu(p),pt(18)}}else p.za=C[1],0<p.za-p.T&&37500>C[2]&&p.F&&p.v==0&&!p.C&&(p.C=fr(_(p.Za,p),6e3));if(1>=vp(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else ci(p,11)}else if((l.K||p.g==l)&&Ka(p),!u(h))for(C=p.Da.g.parse(h),h=0;h<C.length;h++){let Re=C[h];if(p.T=Re[0],Re=Re[1],p.G==2)if(Re[0]=="c"){p.K=Re[1],p.ia=Re[2];const Et=Re[3];Et!=null&&(p.la=Et,p.j.info("VER="+p.la));const Rt=Re[4];Rt!=null&&(p.Aa=Rt,p.j.info("SVER="+p.Aa));const Hi=Re[5];Hi!=null&&typeof Hi=="number"&&0<Hi&&(y=1.5*Hi,p.L=y,p.j.info("backChannelRequestTimeoutMs_="+y)),y=p;const gn=l.g;if(gn){const Qa=gn.g?gn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Qa){var L=y.h;L.g||Qa.indexOf("spdy")==-1&&Qa.indexOf("quic")==-1&&Qa.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(gu(L,L.h),L.h=null))}if(y.D){const bu=gn.g?gn.g.getResponseHeader("X-HTTP-Session-Id"):null;bu&&(y.ya=bu,Ne(y.I,y.D,bu))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-l.F,p.j.info("Handshake RTT: "+p.R+"ms")),y=p;var K=l;if(y.qa=$p(y,y.J?y.ia:null,y.W),K.K){xp(y.h,K);var je=K,mt=y.L;mt&&(je.I=mt),je.B&&(me(je),ne(je)),y.g=K}else Fp(y);0<p.i.length&&Ha(p)}else Re[0]!="stop"&&Re[0]!="close"||ci(p,7);else p.G==3&&(Re[0]=="stop"||Re[0]=="close"?Re[0]=="stop"?ci(p,7):vu(p):Re[0]!="noop"&&p.l&&p.l.ta(Re),p.v=0)}}ai(4)}catch{}}var Oa=class{constructor(l,h){this.g=l,this.map=h}};function gp(l){this.l=l||10,c.PerformanceNavigationTiming?(l=c.performance.getEntriesByType("navigation"),l=0<l.length&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function yp(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function vp(l){return l.h?1:l.g?l.g.size:0}function mu(l,h){return l.h?l.h==h:l.g?l.g.has(h):!1}function gu(l,h){l.g?l.g.add(h):l.h=h}function xp(l,h){l.h&&l.h==h?l.h=null:l.g&&l.g.has(h)&&l.g.delete(h)}gp.prototype.cancel=function(){if(this.i=_p(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function _p(l){if(l.h!=null)return l.i.concat(l.h.D);if(l.g!=null&&l.g.size!==0){let h=l.i;for(const p of l.g.values())h=h.concat(p.D);return h}return V(l.i)}function G1(l){if(l.V&&typeof l.V=="function")return l.V();if(typeof Map<"u"&&l instanceof Map||typeof Set<"u"&&l instanceof Set)return Array.from(l.values());if(typeof l=="string")return l.split("");if(d(l)){for(var h=[],p=l.length,y=0;y<p;y++)h.push(l[y]);return h}h=[],p=0;for(y in l)h[p++]=l[y];return h}function Q1(l){if(l.na&&typeof l.na=="function")return l.na();if(!l.V||typeof l.V!="function"){if(typeof Map<"u"&&l instanceof Map)return Array.from(l.keys());if(!(typeof Set<"u"&&l instanceof Set)){if(d(l)||typeof l=="string"){var h=[];l=l.length;for(var p=0;p<l;p++)h.push(p);return h}h=[],p=0;for(const y in l)h[p++]=y;return h}}}function bp(l,h){if(l.forEach&&typeof l.forEach=="function")l.forEach(h,void 0);else if(d(l)||typeof l=="string")Array.prototype.forEach.call(l,h,void 0);else for(var p=Q1(l),y=G1(l),C=y.length,L=0;L<C;L++)h.call(void 0,y[L],p&&p[L],l)}var wp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Y1(l,h){if(l){l=l.split("&");for(var p=0;p<l.length;p++){var y=l[p].indexOf("="),C=null;if(0<=y){var L=l[p].substring(0,y);C=l[p].substring(y+1)}else L=l[p];h(L,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function li(l){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,l instanceof li){this.h=l.h,Fa(this,l.j),this.o=l.o,this.g=l.g,Ua(this,l.s),this.l=l.l;var h=l.i,p=new no;p.i=h.i,h.g&&(p.g=new Map(h.g),p.h=h.h),Sp(this,p),this.m=l.m}else l&&(h=String(l).match(wp))?(this.h=!1,Fa(this,h[1]||"",!0),this.o=eo(h[2]||""),this.g=eo(h[3]||"",!0),Ua(this,h[4]),this.l=eo(h[5]||"",!0),Sp(this,h[6]||"",!0),this.m=eo(h[7]||"")):(this.h=!1,this.i=new no(null,this.h))}li.prototype.toString=function(){var l=[],h=this.j;h&&l.push(to(h,Ep,!0),":");var p=this.g;return(p||h=="file")&&(l.push("//"),(h=this.o)&&l.push(to(h,Ep,!0),"@"),l.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&l.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&l.push("/"),l.push(to(p,p.charAt(0)=="/"?Z1:J1,!0))),(p=this.i.toString())&&l.push("?",p),(p=this.m)&&l.push("#",to(p,t_)),l.join("")};function $n(l){return new li(l)}function Fa(l,h,p){l.j=p?eo(h,!0):h,l.j&&(l.j=l.j.replace(/:$/,""))}function Ua(l,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);l.s=h}else l.s=null}function Sp(l,h,p){h instanceof no?(l.i=h,n_(l.i,l.h)):(p||(h=to(h,e_)),l.i=new no(h,l.h))}function Ne(l,h,p){l.i.set(h,p)}function za(l){return Ne(l,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),l}function eo(l,h){return l?h?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function to(l,h,p){return typeof l=="string"?(l=encodeURI(l).replace(h,X1),p&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function X1(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var Ep=/[#\/\?@]/g,J1=/[#\?:]/g,Z1=/[#\?]/g,e_=/[#\?@]/g,t_=/#/g;function no(l,h){this.h=this.g=null,this.i=l||null,this.j=!!h}function mr(l){l.g||(l.g=new Map,l.h=0,l.i&&Y1(l.i,function(h,p){l.add(decodeURIComponent(h.replace(/\+/g," ")),p)}))}t=no.prototype,t.add=function(l,h){mr(this),this.i=null,l=$i(this,l);var p=this.g.get(l);return p||this.g.set(l,p=[]),p.push(h),this.h+=1,this};function Rp(l,h){mr(l),h=$i(l,h),l.g.has(h)&&(l.i=null,l.h-=l.g.get(h).length,l.g.delete(h))}function Ip(l,h){return mr(l),h=$i(l,h),l.g.has(h)}t.forEach=function(l,h){mr(this),this.g.forEach(function(p,y){p.forEach(function(C){l.call(h,C,y,this)},this)},this)},t.na=function(){mr(this);const l=Array.from(this.g.values()),h=Array.from(this.g.keys()),p=[];for(let y=0;y<h.length;y++){const C=l[y];for(let L=0;L<C.length;L++)p.push(h[y])}return p},t.V=function(l){mr(this);let h=[];if(typeof l=="string")Ip(this,l)&&(h=h.concat(this.g.get($i(this,l))));else{l=Array.from(this.g.values());for(let p=0;p<l.length;p++)h=h.concat(l[p])}return h},t.set=function(l,h){return mr(this),this.i=null,l=$i(this,l),Ip(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[h]),this.h+=1,this},t.get=function(l,h){return l?(l=this.V(l),0<l.length?String(l[0]):h):h};function Tp(l,h,p){Rp(l,h),0<p.length&&(l.i=null,l.g.set($i(l,h),V(p)),l.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],h=Array.from(this.g.keys());for(var p=0;p<h.length;p++){var y=h[p];const L=encodeURIComponent(String(y)),K=this.V(y);for(y=0;y<K.length;y++){var C=L;K[y]!==""&&(C+="="+encodeURIComponent(String(K[y]))),l.push(C)}}return this.i=l.join("&")};function $i(l,h){return h=String(h),l.j&&(h=h.toLowerCase()),h}function n_(l,h){h&&!l.j&&(mr(l),l.i=null,l.g.forEach(function(p,y){var C=y.toLowerCase();y!=C&&(Rp(this,y),Tp(this,C,p))},l)),l.j=h}function r_(l,h){const p=new pr;if(c.Image){const y=new Image;y.onload=A(gr,p,"TestLoadImage: loaded",!0,h,y),y.onerror=A(gr,p,"TestLoadImage: error",!1,h,y),y.onabort=A(gr,p,"TestLoadImage: abort",!1,h,y),y.ontimeout=A(gr,p,"TestLoadImage: timeout",!1,h,y),c.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=l}else h(!1)}function i_(l,h){const p=new pr,y=new AbortController,C=setTimeout(()=>{y.abort(),gr(p,"TestPingServer: timeout",!1,h)},1e4);fetch(l,{signal:y.signal}).then(L=>{clearTimeout(C),L.ok?gr(p,"TestPingServer: ok",!0,h):gr(p,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(C),gr(p,"TestPingServer: error",!1,h)})}function gr(l,h,p,y,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),y(p)}catch{}}function s_(){this.g=new pu}function o_(l,h,p){const y=p||"";try{bp(l,function(C,L){let K=C;f(C)&&(K=Qs(C)),h.push(y+L+"="+encodeURIComponent(K))})}catch(C){throw h.push(y+"type="+encodeURIComponent("_badmap")),C}}function qa(l){this.l=l.Ub||null,this.j=l.eb||!1}E(qa,zi),qa.prototype.g=function(){return new Ba(this.l,this.j)},qa.prototype.i=function(l){return function(){return l}}({});function Ba(l,h){Y.call(this),this.D=l,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}E(Ba,Y),t=Ba.prototype,t.open=function(l,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=l,this.A=h,this.readyState=1,io(this)},t.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};l&&(h.body=l),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ro(this)),this.readyState=0},t.Sa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,io(this)),this.g&&(this.readyState=3,io(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;kp(this)}else l.text().then(this.Ra.bind(this),this.ga.bind(this))};function kp(l){l.j.read().then(l.Pa.bind(l)).catch(l.ga.bind(l))}t.Pa=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var h=l.value?l.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!l.done}))&&(this.response=this.responseText+=h)}l.done?ro(this):io(this),this.readyState==3&&kp(this)}},t.Ra=function(l){this.g&&(this.response=this.responseText=l,ro(this))},t.Qa=function(l){this.g&&(this.response=l,ro(this))},t.ga=function(){this.g&&ro(this)};function ro(l){l.readyState=4,l.l=null,l.j=null,l.v=null,io(l)}t.setRequestHeader=function(l,h){this.u.append(l,h)},t.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],h=this.h.entries();for(var p=h.next();!p.done;)p=p.value,l.push(p[0]+": "+p[1]),p=h.next();return l.join(`\r
`)};function io(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(Ba.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function Ap(l){let h="";return H(l,function(p,y){h+=y,h+=":",h+=p,h+=`\r
`}),h}function yu(l,h,p){e:{for(y in p){var y=!1;break e}y=!0}y||(p=Ap(p),typeof l=="string"?p!=null&&encodeURIComponent(String(p)):Ne(l,h,p))}function Ke(l){Y.call(this),this.headers=new Map,this.o=l||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}E(Ke,Y);var a_=/^https?$/i,l_=["POST","PUT"];t=Ke.prototype,t.Ha=function(l){this.J=l},t.ea=function(l,h,p,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);h=h?h.toUpperCase():"GET",this.D=l,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():rt.g(),this.v=this.o?Ys(this.o):Ys(rt),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(h,String(l),!0),this.B=!1}catch(L){jp(this,L);return}if(l=p||"",p=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var C in y)p.set(C,y[C]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const L of y.keys())p.set(L,y.get(L));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(p.keys()).find(L=>L.toLowerCase()=="content-type"),C=c.FormData&&l instanceof c.FormData,!(0<=Array.prototype.indexOf.call(l_,h,void 0))||y||C||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,K]of p)this.g.setRequestHeader(L,K);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Pp(this),this.u=!0,this.g.send(l),this.u=!1}catch(L){jp(this,L)}};function jp(l,h){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=h,l.m=5,Cp(l),$a(l)}function Cp(l){l.A||(l.A=!0,ft(l,"complete"),ft(l,"error"))}t.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=l||7,ft(this,"complete"),ft(this,"abort"),$a(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),$a(this,!0)),Ke.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Dp(this):this.bb())},t.bb=function(){Dp(this)};function Dp(l){if(l.h&&typeof a<"u"&&(!l.v[1]||Wn(l)!=4||l.Z()!=2)){if(l.u&&Wn(l)==4)Da(l.Ea,0,l);else if(ft(l,"readystatechange"),Wn(l)==4){l.h=!1;try{const K=l.Z();e:switch(K){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var p;if(!(p=h)){var y;if(y=K===0){var C=String(l.D).match(wp)[1]||null;!C&&c.self&&c.self.location&&(C=c.self.location.protocol.slice(0,-1)),y=!a_.test(C?C.toLowerCase():"")}p=y}if(p)ft(l,"complete"),ft(l,"success");else{l.m=6;try{var L=2<Wn(l)?l.g.statusText:""}catch{L=""}l.l=L+" ["+l.Z()+"]",Cp(l)}}finally{$a(l)}}}}function $a(l,h){if(l.g){Pp(l);const p=l.g,y=l.v[0]?()=>{}:null;l.g=null,l.v=null,h||ft(l,"ready");try{p.onreadystatechange=y}catch{}}}function Pp(l){l.I&&(c.clearTimeout(l.I),l.I=null)}t.isActive=function(){return!!this.g};function Wn(l){return l.g?l.g.readyState:0}t.Z=function(){try{return 2<Wn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(l){if(this.g){var h=this.g.responseText;return l&&h.indexOf(l)==0&&(h=h.substring(l.length)),Ma(h)}};function Np(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.H){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function c_(l){const h={};l=(l.g&&2<=Wn(l)&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<l.length;y++){if(u(l[y]))continue;var p=k(l[y]);const C=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const L=h[C]||[];h[C]=L,L.push(p)}w(h,function(y){return y.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function so(l,h,p){return p&&p.internalChannelParams&&p.internalChannelParams[l]||h}function Mp(l){this.Aa=0,this.i=[],this.j=new pr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=so("failFast",!1,l),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=so("baseRetryDelayMs",5e3,l),this.cb=so("retryDelaySeedMs",1e4,l),this.Wa=so("forwardChannelMaxRetries",2,l),this.wa=so("forwardChannelRequestTimeoutMs",2e4,l),this.pa=l&&l.xmlHttpFactory||void 0,this.Xa=l&&l.Tb||void 0,this.Ca=l&&l.useFetchStreams||!1,this.L=void 0,this.J=l&&l.supportsCrossDomainXhr||!1,this.K="",this.h=new gp(l&&l.concurrentRequestLimit),this.Da=new s_,this.P=l&&l.fastHandshake||!1,this.O=l&&l.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=l&&l.Rb||!1,l&&l.xa&&this.j.xa(),l&&l.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&l&&l.detectBufferingProxy||!1,this.ja=void 0,l&&l.longPollingTimeout&&0<l.longPollingTimeout&&(this.ja=l.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Mp.prototype,t.la=8,t.G=1,t.connect=function(l,h,p,y){pt(0),this.W=l,this.H=h||{},p&&y!==void 0&&(this.H.OSID=p,this.H.OAID=y),this.F=this.X,this.I=$p(this,null,this.W),Ha(this)};function vu(l){if(Lp(l),l.G==3){var h=l.U++,p=$n(l.I);if(Ne(p,"SID",l.K),Ne(p,"RID",h),Ne(p,"TYPE","terminate"),oo(l,p),h=new D(l,l.j,h),h.L=2,h.v=za($n(p)),p=!1,c.navigator&&c.navigator.sendBeacon)try{p=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!p&&c.Image&&(new Image().src=h.v,p=!0),p||(h.g=Wp(h.j,null),h.g.ea(h.v)),h.F=Date.now(),ne(h)}Bp(l)}function Wa(l){l.g&&(_u(l),l.g.cancel(),l.g=null)}function Lp(l){Wa(l),l.u&&(c.clearTimeout(l.u),l.u=null),Ka(l),l.h.cancel(),l.s&&(typeof l.s=="number"&&c.clearTimeout(l.s),l.s=null)}function Ha(l){if(!yp(l.h)&&!l.s){l.s=!0;var h=l.Ga;Qe||he(),G||(Qe(),G=!0),ae.add(h,l),l.B=0}}function u_(l,h){return vp(l.h)>=l.h.j-(l.s?1:0)?!1:l.s?(l.i=h.D.concat(l.i),!0):l.G==1||l.G==2||l.B>=(l.Va?0:l.Wa)?!1:(l.s=fr(_(l.Ga,l,h),qp(l,l.B)),l.B++,!0)}t.Ga=function(l){if(this.s)if(this.s=null,this.G==1){if(!l){this.U=Math.floor(1e5*Math.random()),l=this.U++;const C=new D(this,this.j,l);let L=this.o;if(this.S&&(L?(L=x(L),R(L,this.S)):L=this.S),this.m!==null||this.O||(C.H=L,L=null),this.P)e:{for(var h=0,p=0;p<this.i.length;p++){t:{var y=this.i[p];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(h+=y,4096<h){h=p;break e}if(h===4096||p===this.i.length-1){h=p+1;break e}}h=1e3}else h=1e3;h=Op(this,C,h),p=$n(this.I),Ne(p,"RID",l),Ne(p,"CVER",22),this.D&&Ne(p,"X-HTTP-Session-Id",this.D),oo(this,p),L&&(this.O?h="headers="+encodeURIComponent(String(Ap(L)))+"&"+h:this.m&&yu(p,this.m,L)),gu(this.h,C),this.Ua&&Ne(p,"TYPE","init"),this.P?(Ne(p,"$req",h),Ne(p,"SID","null"),C.T=!0,te(C,p,null)):te(C,p,h),this.G=2}}else this.G==3&&(l?Vp(this,l):this.i.length==0||yp(this.h)||Vp(this))};function Vp(l,h){var p;h?p=h.l:p=l.U++;const y=$n(l.I);Ne(y,"SID",l.K),Ne(y,"RID",p),Ne(y,"AID",l.T),oo(l,y),l.m&&l.o&&yu(y,l.m,l.o),p=new D(l,l.j,p,l.B+1),l.m===null&&(p.H=l.o),h&&(l.i=h.D.concat(l.i)),h=Op(l,p,1e3),p.I=Math.round(.5*l.wa)+Math.round(.5*l.wa*Math.random()),gu(l.h,p),te(p,y,h)}function oo(l,h){l.H&&H(l.H,function(p,y){Ne(h,y,p)}),l.l&&bp({},function(p,y){Ne(h,y,p)})}function Op(l,h,p){p=Math.min(l.i.length,p);var y=l.l?_(l.l.Na,l.l,l):null;e:{var C=l.i;let L=-1;for(;;){const K=["count="+p];L==-1?0<p?(L=C[0].g,K.push("ofs="+L)):L=0:K.push("ofs="+L);let je=!0;for(let mt=0;mt<p;mt++){let Re=C[mt].g;const Et=C[mt].map;if(Re-=L,0>Re)L=Math.max(0,C[mt].g-100),je=!1;else try{o_(Et,K,"req"+Re+"_")}catch{y&&y(Et)}}if(je){y=K.join("&");break e}}}return l=l.i.splice(0,p),h.D=l,y}function Fp(l){if(!l.g&&!l.u){l.Y=1;var h=l.Fa;Qe||he(),G||(Qe(),G=!0),ae.add(h,l),l.v=0}}function xu(l){return l.g||l.u||3<=l.v?!1:(l.Y++,l.u=fr(_(l.Fa,l),qp(l,l.v)),l.v++,!0)}t.Fa=function(){if(this.u=null,Up(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var l=2*this.R;this.j.info("BP detection timer enabled: "+l),this.A=fr(_(this.ab,this),l)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,pt(10),Wa(this),Up(this))};function _u(l){l.A!=null&&(c.clearTimeout(l.A),l.A=null)}function Up(l){l.g=new D(l,l.j,"rpc",l.Y),l.m===null&&(l.g.H=l.o),l.g.O=0;var h=$n(l.qa);Ne(h,"RID","rpc"),Ne(h,"SID",l.K),Ne(h,"AID",l.T),Ne(h,"CI",l.F?"0":"1"),!l.F&&l.ja&&Ne(h,"TO",l.ja),Ne(h,"TYPE","xmlhttp"),oo(l,h),l.m&&l.o&&yu(h,l.m,l.o),l.L&&(l.g.I=l.L);var p=l.g;l=l.ia,p.L=1,p.v=za($n(h)),p.m=null,p.P=!0,re(p,l)}t.Za=function(){this.C!=null&&(this.C=null,Wa(this),xu(this),pt(19))};function Ka(l){l.C!=null&&(c.clearTimeout(l.C),l.C=null)}function zp(l,h){var p=null;if(l.g==h){Ka(l),_u(l),l.g=null;var y=2}else if(mu(l.h,h))p=h.D,xp(l.h,h),y=1;else return;if(l.G!=0){if(h.o)if(y==1){p=h.m?h.m.length:0,h=Date.now()-h.F;var C=l.B;y=oi(),ft(y,new Cn(y,p)),Ha(l)}else Fp(l);else if(C=h.s,C==3||C==0&&0<h.X||!(y==1&&u_(l,h)||y==2&&xu(l)))switch(p&&0<p.length&&(h=l.h,h.i=h.i.concat(p)),C){case 1:ci(l,5);break;case 4:ci(l,10);break;case 3:ci(l,6);break;default:ci(l,2)}}}function qp(l,h){let p=l.Ta+Math.floor(Math.random()*l.cb);return l.isActive()||(p*=2),p*h}function ci(l,h){if(l.j.info("Error code "+h),h==2){var p=_(l.fb,l),y=l.Xa;const C=!y;y=new li(y||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Fa(y,"https"),za(y),C?r_(y.toString(),p):i_(y.toString(),p)}else pt(2);l.G=0,l.l&&l.l.sa(h),Bp(l),Lp(l)}t.fb=function(l){l?(this.j.info("Successfully pinged google.com"),pt(2)):(this.j.info("Failed to ping google.com"),pt(1))};function Bp(l){if(l.G=0,l.ka=[],l.l){const h=_p(l.h);(h.length!=0||l.i.length!=0)&&(z(l.ka,h),z(l.ka,l.i),l.h.i.length=0,V(l.i),l.i.length=0),l.l.ra()}}function $p(l,h,p){var y=p instanceof li?$n(p):new li(p);if(y.g!="")h&&(y.g=h+"."+y.g),Ua(y,y.s);else{var C=c.location;y=C.protocol,h=h?h+"."+C.hostname:C.hostname,C=+C.port;var L=new li(null);y&&Fa(L,y),h&&(L.g=h),C&&Ua(L,C),p&&(L.l=p),y=L}return p=l.D,h=l.ya,p&&h&&Ne(y,p,h),Ne(y,"VER",l.la),oo(l,y),y}function Wp(l,h,p){if(h&&!l.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=l.Ca&&!l.pa?new Ke(new qa({eb:p})):new Ke(l.pa),h.Ha(l.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Hp(){}t=Hp.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Ga(){}Ga.prototype.g=function(l,h){return new Qt(l,h)};function Qt(l,h){Y.call(this),this.g=new Mp(h),this.l=l,this.h=h&&h.messageUrlParams||null,l=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(l?l["X-WebChannel-Content-Type"]=h.messageContentType:l={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(l?l["X-WebChannel-Client-Profile"]=h.va:l={"X-WebChannel-Client-Profile":h.va}),this.g.S=l,(l=h&&h.Sb)&&!u(l)&&(this.g.m=l),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!u(h)&&(this.g.D=h,l=this.h,l!==null&&h in l&&(l=this.h,h in l&&delete l[h])),this.j=new Wi(this)}E(Qt,Y),Qt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Qt.prototype.close=function(){vu(this.g)},Qt.prototype.o=function(l){var h=this.g;if(typeof l=="string"){var p={};p.__data__=l,l=p}else this.u&&(p={},p.__data__=Qs(l),l=p);h.i.push(new Oa(h.Ya++,l)),h.G==3&&Ha(h)},Qt.prototype.N=function(){this.g.l=null,delete this.j,vu(this.g),delete this.g,Qt.aa.N.call(this)};function Kp(l){Js.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var h=l.__sm__;if(h){e:{for(const p in h){l=p;break e}l=void 0}(this.i=l)&&(l=this.i,h=h!==null&&l in h?h[l]:void 0),this.data=h}else this.data=l}E(Kp,Js);function Gp(){qi.call(this),this.status=1}E(Gp,qi);function Wi(l){this.g=l}E(Wi,Hp),Wi.prototype.ua=function(){ft(this.g,"a")},Wi.prototype.ta=function(l){ft(this.g,new Kp(l))},Wi.prototype.sa=function(l){ft(this.g,new Gp)},Wi.prototype.ra=function(){ft(this.g,"b")},Ga.prototype.createWebChannel=Ga.prototype.g,Qt.prototype.send=Qt.prototype.o,Qt.prototype.open=Qt.prototype.m,Qt.prototype.close=Qt.prototype.close,Cx=function(){return new Ga},jx=function(){return oi()},Ax=mn,ch={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ue.NO_ERROR=0,ue.TIMEOUT=8,ue.HTTP_ERROR=6,Ml=ue,ye.COMPLETE="complete",kx=ye,Xs.EventType=si,si.OPEN="a",si.CLOSE="b",si.ERROR="c",si.MESSAGE="d",Y.prototype.listen=Y.prototype.K,So=Xs,Ke.prototype.listenOnce=Ke.prototype.L,Ke.prototype.getLastError=Ke.prototype.Ka,Ke.prototype.getLastErrorCode=Ke.prototype.Ba,Ke.prototype.getStatus=Ke.prototype.Z,Ke.prototype.getResponseJson=Ke.prototype.Oa,Ke.prototype.getResponseText=Ke.prototype.oa,Ke.prototype.send=Ke.prototype.ea,Ke.prototype.setWithCredentials=Ke.prototype.Ha,Tx=Ke}).apply(typeof pl<"u"?pl:typeof self<"u"?self:typeof window<"u"?window:{});const Ng="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}At.UNAUTHENTICATED=new At(null),At.GOOGLE_CREDENTIALS=new At("google-credentials-uid"),At.FIRST_PARTY=new At("first-party-uid"),At.MOCK_USER=new At("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zs="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci=new _f("@firebase/firestore");function go(){return Ci.logLevel}function ee(t,...e){if(Ci.logLevel<=be.DEBUG){const n=e.map(Df);Ci.debug(`Firestore (${zs}): ${t}`,...n)}}function lr(t,...e){if(Ci.logLevel<=be.ERROR){const n=e.map(Df);Ci.error(`Firestore (${zs}): ${t}`,...n)}}function As(t,...e){if(Ci.logLevel<=be.WARN){const n=e.map(Df);Ci.warn(`Firestore (${zs}): ${t}`,...n)}}function Df(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(t="Unexpected state"){const e=`FIRESTORE (${zs}) INTERNAL ASSERTION FAILED: `+t;throw lr(e),new Error(e)}function Ae(t,e){t||de()}function pe(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class X extends hr{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dx{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class CR{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(At.UNAUTHENTICATED))}shutdown(){}}class DR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class PR{constructor(e){this.t=e,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ae(this.o===void 0);let r=this.i;const i=d=>this.i!==r?(r=this.i,n(d)):Promise.resolve();let s=new tr;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new tr,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const d=s;e.enqueueRetryable(async()=>{await d.promise,await i(this.currentUser)})},c=d=>{ee("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(d=>c(d)),setTimeout(()=>{if(!this.auth){const d=this.t.getImmediate({optional:!0});d?c(d):(ee("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new tr)}},0),a()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(ee("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ae(typeof r.accessToken=="string"),new Dx(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ae(e===null||typeof e=="string"),new At(e)}}class NR{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=At.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class MR{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new NR(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(At.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class LR{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class VR{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Ae(this.o===void 0);const r=s=>{s.error!=null&&ee("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.R;return this.R=s.token,ee("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{ee("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):ee("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ae(typeof n.token=="string"),this.R=n.token,new LR(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OR(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Px{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=OR(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function Ie(t,e){return t<e?-1:t>e?1:0}function js(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new X(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new X(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new X(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new X(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ot.fromMillis(Date.now())}static fromDate(e){return ot.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new ot(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Ie(this.nanoseconds,e.nanoseconds):Ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.timestamp=e}static fromTimestamp(e){return new fe(e)}static min(){return new fe(new ot(0,0))}static max(){return new fe(new ot(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,n,r){n===void 0?n=0:n>e.length&&de(),r===void 0?r=e.length-n:r>e.length-n&&de(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return aa.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof aa?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),a=n.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Ve extends aa{construct(e,n,r){return new Ve(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new X(U.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new Ve(n)}static emptyPath(){return new Ve([])}}const FR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class vt extends aa{construct(e,n,r){return new vt(e,n,r)}static isValidIdentifier(e){return FR.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),vt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new vt(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new X(U.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new X(U.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const d=e[i+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new X(U.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=d,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new X(U.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new vt(n)}static emptyPath(){return new vt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.path=e}static fromPath(e){return new ie(Ve.fromString(e))}static fromName(e){return new ie(Ve.fromString(e).popFirst(5))}static empty(){return new ie(Ve.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ve.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ve.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ie(new Ve(e.slice()))}}function UR(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=fe.fromTimestamp(r===1e9?new ot(n+1,0):new ot(n,r));return new Wr(i,ie.empty(),e)}function zR(t){return new Wr(t.readTime,t.key,-1)}class Wr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Wr(fe.min(),ie.empty(),-1)}static max(){return new Wr(fe.max(),ie.empty(),-1)}}function qR(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=ie.comparator(t.documentKey,e.documentKey),n!==0?n:Ie(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BR="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class $R{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ra(t){if(t.code!==U.FAILED_PRECONDITION||t.message!==BR)throw t;ee("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&de(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new B((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof B?n:B.resolve(n)}catch(n){return B.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):B.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):B.reject(n)}static resolve(e){return new B((n,r)=>{n(e)})}static reject(e){return new B((n,r)=>{r(e)})}static waitFor(e){return new B((n,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&n()},d=>r(d))}),a=!0,s===i&&n()})}static or(e){let n=B.resolve(!1);for(const r of e)n=n.next(i=>i?B.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new B((r,i)=>{const s=e.length,a=new Array(s);let c=0;for(let d=0;d<s;d++){const f=d;n(e[f]).next(g=>{a[f]=g,++c,c===s&&r(a)},g=>i(g))}})}static doWhile(e,n){return new B((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function WR(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ia(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Pf.oe=-1;function Kc(t){return t==null}function vc(t){return t===0&&1/t==-1/0}function HR(t){return typeof t=="number"&&Number.isInteger(t)&&!vc(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mg(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Vi(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Nx(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,n){this.comparator=e,this.root=n||yt.EMPTY}insert(e,n){return new We(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,yt.BLACK,null,null))}remove(e){return new We(this.comparator,this.root.remove(e,this.comparator).copy(null,null,yt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ml(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ml(this.root,e,this.comparator,!1)}getReverseIterator(){return new ml(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ml(this.root,e,this.comparator,!0)}}class ml{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class yt{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??yt.RED,this.left=i??yt.EMPTY,this.right=s??yt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new yt(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return yt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return yt.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,yt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,yt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw de();const e=this.left.check();if(e!==this.right.check())throw de();return e+(this.isRed()?0:1)}}yt.EMPTY=null,yt.RED=!0,yt.BLACK=!1;yt.EMPTY=new class{constructor(){this.size=0}get key(){throw de()}get value(){throw de()}get color(){throw de()}get left(){throw de()}get right(){throw de()}copy(e,n,r,i,s){return this}insert(e,n,r){return new yt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.comparator=e,this.data=new We(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Lg(this.data.getIterator())}getIteratorFrom(e){return new Lg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof _t)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new _t(this.comparator);return n.data=e,n}}class Lg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e){this.fields=e,e.sort(vt.comparator)}static empty(){return new Jt([])}unionWith(e){let n=new _t(vt.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Jt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return js(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mx extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Mx("Invalid base64 string: "+s):s}}(e);return new wt(n)}static fromUint8Array(e){const n=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new wt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}wt.EMPTY_BYTE_STRING=new wt("");const KR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Hr(t){if(Ae(!!t),typeof t=="string"){let e=0;const n=KR.exec(t);if(Ae(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Xe(t.seconds),nanos:Xe(t.nanos)}}function Xe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Di(t){return typeof t=="string"?wt.fromBase64String(t):wt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Mf(t){const e=t.mapValue.fields.__previous_value__;return Nf(e)?Mf(e):e}function la(t){const e=Hr(t.mapValue.fields.__local_write_time__.timestampValue);return new ot(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GR{constructor(e,n,r,i,s,a,c,d,f){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=d,this.useFetchStreams=f}}class ca{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new ca("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ca&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gl={mapValue:{}};function Pi(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Nf(t)?4:YR(t)?9007199254740991:QR(t)?10:11:de()}function qn(t,e){if(t===e)return!0;const n=Pi(t);if(n!==Pi(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return la(t).isEqual(la(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=Hr(i.timestampValue),c=Hr(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return Di(i.bytesValue).isEqual(Di(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return Xe(i.geoPointValue.latitude)===Xe(s.geoPointValue.latitude)&&Xe(i.geoPointValue.longitude)===Xe(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Xe(i.integerValue)===Xe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=Xe(i.doubleValue),c=Xe(s.doubleValue);return a===c?vc(a)===vc(c):isNaN(a)&&isNaN(c)}return!1}(t,e);case 9:return js(t.arrayValue.values||[],e.arrayValue.values||[],qn);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Mg(a)!==Mg(c))return!1;for(const d in a)if(a.hasOwnProperty(d)&&(c[d]===void 0||!qn(a[d],c[d])))return!1;return!0}(t,e);default:return de()}}function ua(t,e){return(t.values||[]).find(n=>qn(n,e))!==void 0}function Cs(t,e){if(t===e)return 0;const n=Pi(t),r=Pi(e);if(n!==r)return Ie(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ie(t.booleanValue,e.booleanValue);case 2:return function(s,a){const c=Xe(s.integerValue||s.doubleValue),d=Xe(a.integerValue||a.doubleValue);return c<d?-1:c>d?1:c===d?0:isNaN(c)?isNaN(d)?0:-1:1}(t,e);case 3:return Vg(t.timestampValue,e.timestampValue);case 4:return Vg(la(t),la(e));case 5:return Ie(t.stringValue,e.stringValue);case 6:return function(s,a){const c=Di(s),d=Di(a);return c.compareTo(d)}(t.bytesValue,e.bytesValue);case 7:return function(s,a){const c=s.split("/"),d=a.split("/");for(let f=0;f<c.length&&f<d.length;f++){const g=Ie(c[f],d[f]);if(g!==0)return g}return Ie(c.length,d.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,a){const c=Ie(Xe(s.latitude),Xe(a.latitude));return c!==0?c:Ie(Xe(s.longitude),Xe(a.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Og(t.arrayValue,e.arrayValue);case 10:return function(s,a){var c,d,f,g;const v=s.fields||{},_=a.fields||{},A=(c=v.value)===null||c===void 0?void 0:c.arrayValue,E=(d=_.value)===null||d===void 0?void 0:d.arrayValue,V=Ie(((f=A==null?void 0:A.values)===null||f===void 0?void 0:f.length)||0,((g=E==null?void 0:E.values)===null||g===void 0?void 0:g.length)||0);return V!==0?V:Og(A,E)}(t.mapValue,e.mapValue);case 11:return function(s,a){if(s===gl.mapValue&&a===gl.mapValue)return 0;if(s===gl.mapValue)return 1;if(a===gl.mapValue)return-1;const c=s.fields||{},d=Object.keys(c),f=a.fields||{},g=Object.keys(f);d.sort(),g.sort();for(let v=0;v<d.length&&v<g.length;++v){const _=Ie(d[v],g[v]);if(_!==0)return _;const A=Cs(c[d[v]],f[g[v]]);if(A!==0)return A}return Ie(d.length,g.length)}(t.mapValue,e.mapValue);default:throw de()}}function Vg(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Ie(t,e);const n=Hr(t),r=Hr(e),i=Ie(n.seconds,r.seconds);return i!==0?i:Ie(n.nanos,r.nanos)}function Og(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=Cs(n[i],r[i]);if(s)return s}return Ie(n.length,r.length)}function Ds(t){return uh(t)}function uh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Hr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Di(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return ie.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=uh(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${uh(n.fields[a])}`;return i+"}"}(t.mapValue):de()}function Fg(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function dh(t){return!!t&&"integerValue"in t}function Lf(t){return!!t&&"arrayValue"in t}function Ug(t){return!!t&&"nullValue"in t}function zg(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ll(t){return!!t&&"mapValue"in t}function QR(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function Vo(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Vi(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Vo(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Vo(t.arrayValue.values[n]);return e}return Object.assign({},t)}function YR(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this.value=e}static empty(){return new Bt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Ll(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Vo(n)}setAll(e){let n=vt.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!n.isImmediateParentOf(c)){const d=this.getFieldsMap(n);this.applyChanges(d,r,i),r={},i=[],n=c.popLast()}a?r[c.lastSegment()]=Vo(a):i.push(c.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Ll(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return qn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Ll(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Vi(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Bt(Vo(this.value))}}function Lx(t){const e=[];return Vi(t.fields,(n,r)=>{const i=new vt([n]);if(Ll(r)){const s=Lx(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new Jt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e,n,r,i,s,a,c){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ct(e,0,fe.min(),fe.min(),fe.min(),Bt.empty(),0)}static newFoundDocument(e,n,r,i){return new Ct(e,1,n,fe.min(),r,i,0)}static newNoDocument(e,n){return new Ct(e,2,n,fe.min(),fe.min(),Bt.empty(),0)}static newUnknownDocument(e,n){return new Ct(e,3,n,fe.min(),fe.min(),Bt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(fe.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Bt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Bt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=fe.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ct&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ct(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(e,n){this.position=e,this.inclusive=n}}function qg(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],a=t.position[i];if(s.field.isKeyField()?r=ie.comparator(ie.fromName(a.referenceValue),n.key):r=Cs(a,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Bg(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!qn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,n="asc"){this.field=e,this.dir=n}}function XR(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vx{}class tt extends Vx{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new ZR(e,n,r):n==="array-contains"?new nI(e,r):n==="in"?new rI(e,r):n==="not-in"?new iI(e,r):n==="array-contains-any"?new sI(e,r):new tt(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new eI(e,r):new tI(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Cs(n,this.value)):n!==null&&Pi(this.value)===Pi(n)&&this.matchesComparison(Cs(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return de()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class In extends Vx{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new In(e,n)}matches(e){return Ox(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Ox(t){return t.op==="and"}function Fx(t){return JR(t)&&Ox(t)}function JR(t){for(const e of t.filters)if(e instanceof In)return!1;return!0}function hh(t){if(t instanceof tt)return t.field.canonicalString()+t.op.toString()+Ds(t.value);if(Fx(t))return t.filters.map(e=>hh(e)).join(",");{const e=t.filters.map(n=>hh(n)).join(",");return`${t.op}(${e})`}}function Ux(t,e){return t instanceof tt?function(r,i){return i instanceof tt&&r.op===i.op&&r.field.isEqual(i.field)&&qn(r.value,i.value)}(t,e):t instanceof In?function(r,i){return i instanceof In&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&Ux(a,i.filters[c]),!0):!1}(t,e):void de()}function zx(t){return t instanceof tt?function(n){return`${n.field.canonicalString()} ${n.op} ${Ds(n.value)}`}(t):t instanceof In?function(n){return n.op.toString()+" {"+n.getFilters().map(zx).join(" ,")+"}"}(t):"Filter"}class ZR extends tt{constructor(e,n,r){super(e,n,r),this.key=ie.fromName(r.referenceValue)}matches(e){const n=ie.comparator(e.key,this.key);return this.matchesComparison(n)}}class eI extends tt{constructor(e,n){super(e,"in",n),this.keys=qx("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class tI extends tt{constructor(e,n){super(e,"not-in",n),this.keys=qx("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function qx(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>ie.fromName(r.referenceValue))}class nI extends tt{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Lf(n)&&ua(n.arrayValue,this.value)}}class rI extends tt{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ua(this.value.arrayValue,n)}}class iI extends tt{constructor(e,n){super(e,"not-in",n)}matches(e){if(ua(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!ua(this.value.arrayValue,n)}}class sI extends tt{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Lf(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ua(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(e,n=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.ue=null}}function $g(t,e=null,n=[],r=[],i=null,s=null,a=null){return new oI(t,e,n,r,i,s,a)}function Vf(t){const e=pe(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>hh(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Kc(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Ds(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Ds(r)).join(",")),e.ue=n}return e.ue}function Of(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!XR(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Ux(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Bg(t.startAt,e.startAt)&&Bg(t.endAt,e.endAt)}function fh(t){return ie.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e,n=null,r=[],i=[],s=null,a="F",c=null,d=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=d,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function aI(t,e,n,r,i,s,a,c){return new qs(t,e,n,r,i,s,a,c)}function Gc(t){return new qs(t)}function Wg(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Bx(t){return t.collectionGroup!==null}function Oo(t){const e=pe(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new _t(vt.comparator);return a.filters.forEach(d=>{d.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new da(s,r))}),n.has(vt.keyField().canonicalString())||e.ce.push(new da(vt.keyField(),r))}return e.ce}function Un(t){const e=pe(t);return e.le||(e.le=lI(e,Oo(t))),e.le}function lI(t,e){if(t.limitType==="F")return $g(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new da(i.field,s)});const n=t.endAt?new xc(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new xc(t.startAt.position,t.startAt.inclusive):null;return $g(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function ph(t,e){const n=t.filters.concat([e]);return new qs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function mh(t,e,n){return new qs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Qc(t,e){return Of(Un(t),Un(e))&&t.limitType===e.limitType}function $x(t){return`${Vf(Un(t))}|lt:${t.limitType}`}function Qi(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>zx(i)).join(", ")}]`),Kc(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>Ds(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>Ds(i)).join(",")),`Target(${r})`}(Un(t))}; limitType=${t.limitType})`}function Yc(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):ie.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of Oo(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(a,c,d){const f=qg(a,c,d);return a.inclusive?f<=0:f<0}(r.startAt,Oo(r),i)||r.endAt&&!function(a,c,d){const f=qg(a,c,d);return a.inclusive?f>=0:f>0}(r.endAt,Oo(r),i))}(t,e)}function cI(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Wx(t){return(e,n)=>{let r=!1;for(const i of Oo(t)){const s=uI(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function uI(t,e,n){const r=t.field.isKeyField()?ie.comparator(e.key,n.key):function(s,a,c){const d=a.data.field(s),f=c.data.field(s);return d!==null&&f!==null?Cs(d,f):de()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return de()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Vi(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return Nx(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI=new We(ie.comparator);function cr(){return dI}const Hx=new We(ie.comparator);function Eo(...t){let e=Hx;for(const n of t)e=e.insert(n.key,n);return e}function Kx(t){let e=Hx;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function xi(){return Fo()}function Gx(){return Fo()}function Fo(){return new Bs(t=>t.toString(),(t,e)=>t.isEqual(e))}const hI=new We(ie.comparator),fI=new _t(ie.comparator);function xe(...t){let e=fI;for(const n of t)e=e.add(n);return e}const pI=new _t(Ie);function mI(){return pI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ff(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:vc(e)?"-0":e}}function Qx(t){return{integerValue:""+t}}function gI(t,e){return HR(e)?Qx(e):Ff(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(){this._=void 0}}function yI(t,e,n){return t instanceof _c?function(i,s){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Nf(s)&&(s=Mf(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}}(n,e):t instanceof ha?Xx(t,e):t instanceof fa?Jx(t,e):function(i,s){const a=Yx(i,s),c=Hg(a)+Hg(i.Pe);return dh(a)&&dh(i.Pe)?Qx(c):Ff(i.serializer,c)}(t,e)}function vI(t,e,n){return t instanceof ha?Xx(t,e):t instanceof fa?Jx(t,e):n}function Yx(t,e){return t instanceof bc?function(r){return dh(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class _c extends Xc{}class ha extends Xc{constructor(e){super(),this.elements=e}}function Xx(t,e){const n=Zx(e);for(const r of t.elements)n.some(i=>qn(i,r))||n.push(r);return{arrayValue:{values:n}}}class fa extends Xc{constructor(e){super(),this.elements=e}}function Jx(t,e){let n=Zx(e);for(const r of t.elements)n=n.filter(i=>!qn(i,r));return{arrayValue:{values:n}}}class bc extends Xc{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function Hg(t){return Xe(t.integerValue||t.doubleValue)}function Zx(t){return Lf(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function xI(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof ha&&i instanceof ha||r instanceof fa&&i instanceof fa?js(r.elements,i.elements,qn):r instanceof bc&&i instanceof bc?qn(r.Pe,i.Pe):r instanceof _c&&i instanceof _c}(t.transform,e.transform)}class _I{constructor(e,n){this.version=e,this.transformResults=n}}class dn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new dn}static exists(e){return new dn(void 0,e)}static updateTime(e){return new dn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Vl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Jc{}function e1(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Uf(t.key,dn.none()):new Ta(t.key,t.data,dn.none());{const n=t.data,r=Bt.empty();let i=new _t(vt.comparator);for(let s of e.fields)if(!i.has(s)){let a=n.field(s);a===null&&s.length>1&&(s=s.popLast(),a=n.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Zr(t.key,r,new Jt(i.toArray()),dn.none())}}function bI(t,e,n){t instanceof Ta?function(i,s,a){const c=i.value.clone(),d=Gg(i.fieldTransforms,s,a.transformResults);c.setAll(d),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(t,e,n):t instanceof Zr?function(i,s,a){if(!Vl(i.precondition,s))return void s.convertToUnknownDocument(a.version);const c=Gg(i.fieldTransforms,s,a.transformResults),d=s.data;d.setAll(t1(i)),d.setAll(c),s.convertToFoundDocument(a.version,d).setHasCommittedMutations()}(t,e,n):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,n)}function Uo(t,e,n,r){return t instanceof Ta?function(s,a,c,d){if(!Vl(s.precondition,a))return c;const f=s.value.clone(),g=Qg(s.fieldTransforms,d,a);return f.setAll(g),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(t,e,n,r):t instanceof Zr?function(s,a,c,d){if(!Vl(s.precondition,a))return c;const f=Qg(s.fieldTransforms,d,a),g=a.data;return g.setAll(t1(s)),g.setAll(f),a.convertToFoundDocument(a.version,g).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(v=>v.field))}(t,e,n,r):function(s,a,c){return Vl(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(t,e,n)}function wI(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=Yx(r.transform,i||null);s!=null&&(n===null&&(n=Bt.empty()),n.set(r.field,s))}return n||null}function Kg(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&js(r,i,(s,a)=>xI(s,a))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ta extends Jc{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Zr extends Jc{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function t1(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Gg(t,e,n){const r=new Map;Ae(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,vI(a,c,n[i]))}return r}function Qg(t,e,n){const r=new Map;for(const i of t){const s=i.transform,a=n.data.field(i.field);r.set(i.field,yI(s,a,e))}return r}class Uf extends Jc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class SI extends Jc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&bI(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Uo(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Uo(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Gx();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let c=this.applyToLocalView(a,s.mutatedFields);c=n.has(i.key)?null:c;const d=e1(a,c);d!==null&&r.set(i.key,d),a.isValidDocument()||a.convertToNoDocument(fe.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),xe())}isEqual(e){return this.batchId===e.batchId&&js(this.mutations,e.mutations,(n,r)=>Kg(n,r))&&js(this.baseMutations,e.baseMutations,(n,r)=>Kg(n,r))}}class zf{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){Ae(e.mutations.length===r.length);let i=function(){return hI}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new zf(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ze,we;function TI(t){switch(t){default:return de();case U.CANCELLED:case U.UNKNOWN:case U.DEADLINE_EXCEEDED:case U.RESOURCE_EXHAUSTED:case U.INTERNAL:case U.UNAVAILABLE:case U.UNAUTHENTICATED:return!1;case U.INVALID_ARGUMENT:case U.NOT_FOUND:case U.ALREADY_EXISTS:case U.PERMISSION_DENIED:case U.FAILED_PRECONDITION:case U.ABORTED:case U.OUT_OF_RANGE:case U.UNIMPLEMENTED:case U.DATA_LOSS:return!0}}function n1(t){if(t===void 0)return lr("GRPC error has no .code"),U.UNKNOWN;switch(t){case Ze.OK:return U.OK;case Ze.CANCELLED:return U.CANCELLED;case Ze.UNKNOWN:return U.UNKNOWN;case Ze.DEADLINE_EXCEEDED:return U.DEADLINE_EXCEEDED;case Ze.RESOURCE_EXHAUSTED:return U.RESOURCE_EXHAUSTED;case Ze.INTERNAL:return U.INTERNAL;case Ze.UNAVAILABLE:return U.UNAVAILABLE;case Ze.UNAUTHENTICATED:return U.UNAUTHENTICATED;case Ze.INVALID_ARGUMENT:return U.INVALID_ARGUMENT;case Ze.NOT_FOUND:return U.NOT_FOUND;case Ze.ALREADY_EXISTS:return U.ALREADY_EXISTS;case Ze.PERMISSION_DENIED:return U.PERMISSION_DENIED;case Ze.FAILED_PRECONDITION:return U.FAILED_PRECONDITION;case Ze.ABORTED:return U.ABORTED;case Ze.OUT_OF_RANGE:return U.OUT_OF_RANGE;case Ze.UNIMPLEMENTED:return U.UNIMPLEMENTED;case Ze.DATA_LOSS:return U.DATA_LOSS;default:return de()}}(we=Ze||(Ze={}))[we.OK=0]="OK",we[we.CANCELLED=1]="CANCELLED",we[we.UNKNOWN=2]="UNKNOWN",we[we.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",we[we.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",we[we.NOT_FOUND=5]="NOT_FOUND",we[we.ALREADY_EXISTS=6]="ALREADY_EXISTS",we[we.PERMISSION_DENIED=7]="PERMISSION_DENIED",we[we.UNAUTHENTICATED=16]="UNAUTHENTICATED",we[we.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",we[we.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",we[we.ABORTED=10]="ABORTED",we[we.OUT_OF_RANGE=11]="OUT_OF_RANGE",we[we.UNIMPLEMENTED=12]="UNIMPLEMENTED",we[we.INTERNAL=13]="INTERNAL",we[we.UNAVAILABLE=14]="UNAVAILABLE",we[we.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kI(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI=new wi([4294967295,4294967295],0);function Yg(t){const e=kI().encode(t),n=new Ix;return n.update(e),new Uint8Array(n.digest())}function Xg(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new wi([n,r],0),new wi([i,s],0)]}class qf{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Ro(`Invalid padding: ${n}`);if(r<0)throw new Ro(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ro(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Ro(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=wi.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(wi.fromNumber(r)));return i.compare(AI)===1&&(i=new wi([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Yg(e),[r,i]=Xg(n);for(let s=0;s<this.hashCount;s++){const a=this.Ee(r,i,s);if(!this.de(a))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new qf(s,i,n);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ie===0)return;const n=Yg(e),[r,i]=Xg(n);for(let s=0;s<this.hashCount;s++){const a=this.Ee(r,i,s);this.Ae(a)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Ro extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,ka.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Zc(fe.min(),i,new We(Ie),cr(),xe())}}class ka{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new ka(r,n,xe(),xe(),xe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class r1{constructor(e,n){this.targetId=e,this.me=n}}class i1{constructor(e,n,r=wt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class Jg{constructor(){this.fe=0,this.ge=ey(),this.pe=wt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=xe(),n=xe(),r=xe();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:de()}}),new ka(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=ey()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Ae(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class jI{constructor(e){this.Le=e,this.Be=new Map,this.ke=cr(),this.qe=Zg(),this.Qe=new We(Ie)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:de()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(fh(s))if(r===0){const a=new ie(s.path);this.Ue(n,a,Ct.newNoDocument(a,fe.min()))}else Ae(r===1);else{const a=this.Ye(n);if(a!==r){const c=this.Ze(e),d=c?this.Xe(c,e,a):1;if(d!==0){this.je(n);const f=d===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,f)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let a,c;try{a=Di(r).toUint8Array()}catch(d){if(d instanceof Mx)return As("Decoding the base64 bloom filter in existence filter failed ("+d.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw d}try{c=new qf(a,i,s)}catch(d){return As(d instanceof Ro?"BloomFilter error: ":"Applying bloom filter failed: ",d),null}return c.Ie===0?null:c}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const a=this.Le.tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,a)=>{const c=this.Je(a);if(c){if(s.current&&fh(c.target)){const d=new ie(c.target.path);this.ke.get(d)!==null||this.it(a,d)||this.Ue(a,d,Ct.newNoDocument(d,e))}s.be&&(n.set(a,s.ve()),s.Ce())}});let r=xe();this.qe.forEach((s,a)=>{let c=!0;a.forEachWhile(d=>{const f=this.Je(d);return!f||f.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,a)=>a.setReadTime(e));const i=new Zc(e,n,this.Qe,this.ke,r);return this.ke=cr(),this.qe=Zg(),this.Qe=new We(Ie),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Jg,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new _t(Ie),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||ee("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Jg),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function Zg(){return new We(ie.comparator)}function ey(){return new We(ie.comparator)}const CI={asc:"ASCENDING",desc:"DESCENDING"},DI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},PI={and:"AND",or:"OR"};class NI{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function gh(t,e){return t.useProto3Json||Kc(e)?e:{value:e}}function wc(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function s1(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function MI(t,e){return wc(t,e.toTimestamp())}function zn(t){return Ae(!!t),fe.fromTimestamp(function(n){const r=Hr(n);return new ot(r.seconds,r.nanos)}(t))}function Bf(t,e){return yh(t,e).canonicalString()}function yh(t,e){const n=function(i){return new Ve(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function o1(t){const e=Ve.fromString(t);return Ae(d1(e)),e}function vh(t,e){return Bf(t.databaseId,e.path)}function td(t,e){const n=o1(e);if(n.get(1)!==t.databaseId.projectId)throw new X(U.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new X(U.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ie(l1(n))}function a1(t,e){return Bf(t.databaseId,e)}function LI(t){const e=o1(t);return e.length===4?Ve.emptyPath():l1(e)}function xh(t){return new Ve(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function l1(t){return Ae(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function ty(t,e,n){return{name:vh(t,e),fields:n.value.mapValue.fields}}function VI(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:de()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(f,g){return f.useProto3Json?(Ae(g===void 0||typeof g=="string"),wt.fromBase64String(g||"")):(Ae(g===void 0||g instanceof Buffer||g instanceof Uint8Array),wt.fromUint8Array(g||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(f){const g=f.code===void 0?U.UNKNOWN:n1(f.code);return new X(g,f.message||"")}(a);n=new i1(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=td(t,r.document.name),s=zn(r.document.updateTime),a=r.document.createTime?zn(r.document.createTime):fe.min(),c=new Bt({mapValue:{fields:r.document.fields}}),d=Ct.newFoundDocument(i,s,a,c),f=r.targetIds||[],g=r.removedTargetIds||[];n=new Ol(f,g,d.key,d)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=td(t,r.document),s=r.readTime?zn(r.readTime):fe.min(),a=Ct.newNoDocument(i,s),c=r.removedTargetIds||[];n=new Ol([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=td(t,r.document),s=r.removedTargetIds||[];n=new Ol([],s,i,null)}else{if(!("filter"in e))return de();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new II(i,s),c=r.targetId;n=new r1(c,a)}}return n}function OI(t,e){let n;if(e instanceof Ta)n={update:ty(t,e.key,e.value)};else if(e instanceof Uf)n={delete:vh(t,e.key)};else if(e instanceof Zr)n={update:ty(t,e.key,e.data),updateMask:KI(e.fieldMask)};else{if(!(e instanceof SI))return de();n={verify:vh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const c=a.transform;if(c instanceof _c)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ha)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof fa)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof bc)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw de()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:MI(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:de()}(t,e.precondition)),n}function FI(t,e){return t&&t.length>0?(Ae(e!==void 0),t.map(n=>function(i,s){let a=i.updateTime?zn(i.updateTime):zn(s);return a.isEqual(fe.min())&&(a=zn(s)),new _I(a,i.transformResults||[])}(n,e))):[]}function UI(t,e){return{documents:[a1(t,e.path)]}}function zI(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=a1(t,i);const s=function(f){if(f.length!==0)return u1(In.create(f,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const a=function(f){if(f.length!==0)return f.map(g=>function(_){return{field:Yi(_.field),direction:$I(_.dir)}}(g))}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const c=gh(t,e.limit);return c!==null&&(n.structuredQuery.limit=c),e.startAt&&(n.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(e.endAt)),{_t:n,parent:i}}function qI(t){let e=LI(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){Ae(r===1);const g=n.from[0];g.allDescendants?i=g.collectionId:e=e.child(g.collectionId)}let s=[];n.where&&(s=function(v){const _=c1(v);return _ instanceof In&&Fx(_)?_.getFilters():[_]}(n.where));let a=[];n.orderBy&&(a=function(v){return v.map(_=>function(E){return new da(Xi(E.field),function(z){switch(z){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(E.direction))}(_))}(n.orderBy));let c=null;n.limit&&(c=function(v){let _;return _=typeof v=="object"?v.value:v,Kc(_)?null:_}(n.limit));let d=null;n.startAt&&(d=function(v){const _=!!v.before,A=v.values||[];return new xc(A,_)}(n.startAt));let f=null;return n.endAt&&(f=function(v){const _=!v.before,A=v.values||[];return new xc(A,_)}(n.endAt)),aI(e,i,a,s,c,"F",d,f)}function BI(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return de()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function c1(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Xi(n.unaryFilter.field);return tt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Xi(n.unaryFilter.field);return tt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Xi(n.unaryFilter.field);return tt.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Xi(n.unaryFilter.field);return tt.create(a,"!=",{nullValue:"NULL_VALUE"});default:return de()}}(t):t.fieldFilter!==void 0?function(n){return tt.create(Xi(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return de()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return In.create(n.compositeFilter.filters.map(r=>c1(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return de()}}(n.compositeFilter.op))}(t):de()}function $I(t){return CI[t]}function WI(t){return DI[t]}function HI(t){return PI[t]}function Yi(t){return{fieldPath:t.canonicalString()}}function Xi(t){return vt.fromServerFormat(t.fieldPath)}function u1(t){return t instanceof tt?function(n){if(n.op==="=="){if(zg(n.value))return{unaryFilter:{field:Yi(n.field),op:"IS_NAN"}};if(Ug(n.value))return{unaryFilter:{field:Yi(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(zg(n.value))return{unaryFilter:{field:Yi(n.field),op:"IS_NOT_NAN"}};if(Ug(n.value))return{unaryFilter:{field:Yi(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Yi(n.field),op:WI(n.op),value:n.value}}}(t):t instanceof In?function(n){const r=n.getFilters().map(i=>u1(i));return r.length===1?r[0]:{compositeFilter:{op:HI(n.op),filters:r}}}(t):de()}function KI(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function d1(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(e,n,r,i,s=fe.min(),a=fe.min(),c=wt.EMPTY_BYTE_STRING,d=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=d}withSequenceNumber(e){return new jr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new jr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new jr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new jr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GI{constructor(e){this.ct=e}}function QI(t){const e=qI({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?mh(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YI{constructor(){this.un=new XI}addToCollectionParentIndex(e,n){return this.un.add(n),B.resolve()}getCollectionParents(e,n){return B.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return B.resolve()}deleteFieldIndex(e,n){return B.resolve()}deleteAllFieldIndexes(e){return B.resolve()}createTargetIndexes(e,n){return B.resolve()}getDocumentsMatchingTarget(e,n){return B.resolve(null)}getIndexType(e,n){return B.resolve(0)}getFieldIndexes(e,n){return B.resolve([])}getNextCollectionGroupToUpdate(e){return B.resolve(null)}getMinOffset(e,n){return B.resolve(Wr.min())}getMinOffsetFromCollectionGroup(e,n){return B.resolve(Wr.min())}updateCollectionGroup(e,n,r){return B.resolve()}updateIndexEntries(e,n){return B.resolve()}}class XI{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new _t(Ve.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new _t(Ve.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ps(0)}static kn(){return new Ps(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JI{constructor(){this.changes=new Bs(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Ct.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?B.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&Uo(r.mutation,i,Jt.empty(),ot.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,xe()).next(()=>r))}getLocalViewOfDocuments(e,n,r=xe()){const i=xi();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let a=Eo();return s.forEach((c,d)=>{a=a.insert(c,d.overlayedDocument)}),a}))}getOverlayedDocuments(e,n){const r=xi();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,xe()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{n.set(a,c)})})}computeViews(e,n,r,i){let s=cr();const a=Fo(),c=function(){return Fo()}();return n.forEach((d,f)=>{const g=r.get(f.key);i.has(f.key)&&(g===void 0||g.mutation instanceof Zr)?s=s.insert(f.key,f):g!==void 0?(a.set(f.key,g.mutation.getFieldMask()),Uo(g.mutation,f,g.mutation.getFieldMask(),ot.now())):a.set(f.key,Jt.empty())}),this.recalculateAndSaveOverlays(e,s).next(d=>(d.forEach((f,g)=>a.set(f,g)),n.forEach((f,g)=>{var v;return c.set(f,new ZI(g,(v=a.get(f))!==null&&v!==void 0?v:null))}),c))}recalculateAndSaveOverlays(e,n){const r=Fo();let i=new We((a,c)=>a-c),s=xe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(a=>{for(const c of a)c.keys().forEach(d=>{const f=n.get(d);if(f===null)return;let g=r.get(d)||Jt.empty();g=c.applyToLocalView(f,g),r.set(d,g);const v=(i.get(c.batchId)||xe()).add(d);i=i.insert(c.batchId,v)})}).next(()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const d=c.getNext(),f=d.key,g=d.value,v=Gx();g.forEach(_=>{if(!s.has(_)){const A=e1(n.get(_),r.get(_));A!==null&&v.set(_,A),s=s.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,f,v))}return B.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(a){return ie.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Bx(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):B.resolve(xi());let c=-1,d=s;return a.next(f=>B.forEach(f,(g,v)=>(c<v.largestBatchId&&(c=v.largestBatchId),s.get(g)?B.resolve():this.remoteDocumentCache.getEntry(e,g).next(_=>{d=d.insert(g,_)}))).next(()=>this.populateOverlays(e,f,s)).next(()=>this.computeViews(e,d,f,xe())).next(g=>({batchId:c,changes:Kx(g)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new ie(n)).next(r=>{let i=Eo();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let a=Eo();return this.indexManager.getCollectionParents(e,s).next(c=>B.forEach(c,d=>{const f=function(v,_){return new qs(_,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(n,d.child(s));return this.getDocumentsMatchingCollectionQuery(e,f,r,i).next(g=>{g.forEach((v,_)=>{a=a.insert(v,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(a=>{s.forEach((d,f)=>{const g=f.getKey();a.get(g)===null&&(a=a.insert(g,Ct.newInvalidDocument(g)))});let c=Eo();return a.forEach((d,f)=>{const g=s.get(d);g!==void 0&&Uo(g.mutation,f,Jt.empty(),ot.now()),Yc(n,f)&&(c=c.insert(d,f))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return B.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:zn(i.createTime)}}(n)),B.resolve()}getNamedQuery(e,n){return B.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:QI(i.bundledQuery),readTime:zn(i.readTime)}}(n)),B.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(){this.overlays=new We(ie.comparator),this.Ir=new Map}getOverlay(e,n){return B.resolve(this.overlays.get(n))}getOverlays(e,n){const r=xi();return B.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),B.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),B.resolve()}getOverlaysForCollection(e,n,r){const i=xi(),s=n.length+1,a=new ie(n.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const d=c.getNext().value,f=d.getKey();if(!n.isPrefixOf(f.path))break;f.path.length===s&&d.largestBatchId>r&&i.set(d.getKey(),d)}return B.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new We((f,g)=>f-g);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===n&&f.largestBatchId>r){let g=s.get(f.largestBatchId);g===null&&(g=xi(),s=s.insert(f.largestBatchId,g)),g.set(f.getKey(),f)}}const c=xi(),d=s.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach((f,g)=>c.set(f,g)),!(c.size()>=i)););return B.resolve(c)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new RI(n,r));let s=this.Ir.get(n);s===void 0&&(s=xe(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{constructor(){this.sessionToken=wt.EMPTY_BYTE_STRING}getSessionToken(e){return B.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,B.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(){this.Tr=new _t(ct.Er),this.dr=new _t(ct.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new ct(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new ct(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new ie(new Ve([])),r=new ct(n,e),i=new ct(n,e+1),s=[];return this.dr.forEachInRange([r,i],a=>{this.Vr(a),s.push(a.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new ie(new Ve([])),r=new ct(n,e),i=new ct(n,e+1);let s=xe();return this.dr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const n=new ct(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class ct{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return ie.comparator(e.key,n.key)||Ie(e.wr,n.wr)}static Ar(e,n){return Ie(e.wr,n.wr)||ie.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new _t(ct.Er)}checkEmpty(e){return B.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new EI(s,n,r,i);this.mutationQueue.push(a);for(const c of i)this.br=this.br.add(new ct(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return B.resolve(a)}lookupMutationBatch(e,n){return B.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return B.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return B.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return B.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new ct(n,0),i=new ct(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],a=>{const c=this.Dr(a.wr);s.push(c)}),B.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new _t(Ie);return n.forEach(i=>{const s=new ct(i,0),a=new ct(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,a],c=>{r=r.add(c.wr)})}),B.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;ie.isDocumentKey(s)||(s=s.child(""));const a=new ct(new ie(s),0);let c=new _t(Ie);return this.br.forEachWhile(d=>{const f=d.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(c=c.add(d.wr)),!0)},a),B.resolve(this.Cr(c))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){Ae(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return B.forEach(n.mutations,i=>{const s=new ct(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new ct(n,0),i=this.br.firstAfterOrEqual(r);return B.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,B.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e){this.Mr=e,this.docs=function(){return new We(ie.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,a=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return B.resolve(r?r.document.mutableCopy():Ct.newInvalidDocument(n))}getEntries(e,n){let r=cr();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ct.newInvalidDocument(i))}),B.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=cr();const a=n.path,c=new ie(a.child("")),d=this.docs.getIteratorFrom(c);for(;d.hasNext();){const{key:f,value:{document:g}}=d.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||qR(zR(g),r)<=0||(i.has(g.key)||Yc(n,g))&&(s=s.insert(g.key,g.mutableCopy()))}return B.resolve(s)}getAllFromCollectionGroup(e,n,r,i){de()}Or(e,n){return B.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new oT(this)}getSize(e){return B.resolve(this.size)}}class oT extends JI{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),B.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(e){this.persistence=e,this.Nr=new Bs(n=>Vf(n),Of),this.lastRemoteSnapshotVersion=fe.min(),this.highestTargetId=0,this.Lr=0,this.Br=new $f,this.targetCount=0,this.kr=Ps.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),B.resolve()}getLastRemoteSnapshotVersion(e){return B.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return B.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),B.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),B.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Ps(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,B.resolve()}updateTargetData(e,n){return this.Kn(n),B.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,B.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((a,c)=>{c.sequenceNumber<=n&&r.get(c.targetId)===null&&(this.Nr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),B.waitFor(s).next(()=>i)}getTargetCount(e){return B.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return B.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),B.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),B.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),B.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return B.resolve(r)}containsKey(e,n){return B.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Pf(0),this.Kr=!1,this.Kr=!0,this.$r=new rT,this.referenceDelegate=e(this),this.Ur=new aT(this),this.indexManager=new YI,this.remoteDocumentCache=function(i){return new sT(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new GI(n),this.Gr=new tT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new nT,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new iT(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){ee("MemoryPersistence","Starting transaction:",e);const i=new cT(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return B.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class cT extends $R{constructor(e){super(),this.currentSequenceNumber=e}}class Wf{constructor(e){this.persistence=e,this.Jr=new $f,this.Yr=null}static Zr(e){return new Wf(e)}get Xr(){if(this.Yr)return this.Yr;throw de()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),B.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),B.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),B.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return B.forEach(this.Xr,r=>{const i=ie.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,fe.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return B.or([()=>B.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=xe(),i=xe();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Hf(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return nS()?8:WR(Nt())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new uT;return this.Xi(e,n,a).next(c=>{if(s.result=c,this.zi)return this.es(e,n,a,c.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(go()<=be.DEBUG&&ee("QueryEngine","SDK will not create cache indexes for query:",Qi(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),B.resolve()):(go()<=be.DEBUG&&ee("QueryEngine","Query:",Qi(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(go()<=be.DEBUG&&ee("QueryEngine","The SDK decides to create cache indexes for query:",Qi(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Un(n))):B.resolve())}Yi(e,n){if(Wg(n))return B.resolve(null);let r=Un(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=mh(n,null,"F"),r=Un(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=xe(...s);return this.Ji.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(d=>{const f=this.ts(n,c);return this.ns(n,f,a,d.readTime)?this.Yi(e,mh(n,null,"F")):this.rs(e,f,n,d)}))})))}Zi(e,n,r,i){return Wg(n)||i.isEqual(fe.min())?B.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const a=this.ts(n,s);return this.ns(n,a,r,i)?B.resolve(null):(go()<=be.DEBUG&&ee("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Qi(n)),this.rs(e,a,n,UR(i,-1)).next(c=>c))})}ts(e,n){let r=new _t(Wx(e));return n.forEach((i,s)=>{Yc(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return go()<=be.DEBUG&&ee("QueryEngine","Using full collection scan to execute query:",Qi(n)),this.Ji.getDocumentsMatchingQuery(e,n,Wr.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hT{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new We(Ie),this._s=new Bs(s=>Vf(s),Of),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new eT(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function fT(t,e,n,r){return new hT(t,e,n,r)}async function h1(t,e){const n=pe(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],c=[];let d=xe();for(const f of i){a.push(f.batchId);for(const g of f.mutations)d=d.add(g.key)}for(const f of s){c.push(f.batchId);for(const g of f.mutations)d=d.add(g.key)}return n.localDocuments.getDocuments(r,d).next(f=>({hs:f,removedBatchIds:a,addedBatchIds:c}))})})}function pT(t,e){const n=pe(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(c,d,f,g){const v=f.batch,_=v.keys();let A=B.resolve();return _.forEach(E=>{A=A.next(()=>g.getEntry(d,E)).next(V=>{const z=f.docVersions.get(E);Ae(z!==null),V.version.compareTo(z)<0&&(v.applyToRemoteDocument(V,f),V.isValidDocument()&&(V.setReadTime(f.commitVersion),g.addEntry(V)))})}),A.next(()=>c.mutationQueue.removeMutationBatch(d,v))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let d=xe();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(d=d.add(c.batch.mutations[f].key));return d}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function f1(t){const e=pe(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function mT(t,e){const n=pe(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const c=[];e.targetChanges.forEach((g,v)=>{const _=i.get(v);if(!_)return;c.push(n.Ur.removeMatchingKeys(s,g.removedDocuments,v).next(()=>n.Ur.addMatchingKeys(s,g.addedDocuments,v)));let A=_.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(v)!==null?A=A.withResumeToken(wt.EMPTY_BYTE_STRING,fe.min()).withLastLimboFreeSnapshotVersion(fe.min()):g.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(g.resumeToken,r)),i=i.insert(v,A),function(V,z,T){return V.resumeToken.approximateByteSize()===0||z.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:T.addedDocuments.size+T.modifiedDocuments.size+T.removedDocuments.size>0}(_,A,g)&&c.push(n.Ur.updateTargetData(s,A))});let d=cr(),f=xe();if(e.documentUpdates.forEach(g=>{e.resolvedLimboDocuments.has(g)&&c.push(n.persistence.referenceDelegate.updateLimboDocument(s,g))}),c.push(gT(s,a,e.documentUpdates).next(g=>{d=g.Ps,f=g.Is})),!r.isEqual(fe.min())){const g=n.Ur.getLastRemoteSnapshotVersion(s).next(v=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(g)}return B.waitFor(c).next(()=>a.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,d,f)).next(()=>d)}).then(s=>(n.os=i,s))}function gT(t,e,n){let r=xe(),i=xe();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let a=cr();return n.forEach((c,d)=>{const f=s.get(c);d.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(c)),d.isNoDocument()&&d.version.isEqual(fe.min())?(e.removeEntry(c,d.readTime),a=a.insert(c,d)):!f.isValidDocument()||d.version.compareTo(f.version)>0||d.version.compareTo(f.version)===0&&f.hasPendingWrites?(e.addEntry(d),a=a.insert(c,d)):ee("LocalStore","Ignoring outdated watch update for ",c,". Current version:",f.version," Watch version:",d.version)}),{Ps:a,Is:i}})}function yT(t,e){const n=pe(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function vT(t,e){const n=pe(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,B.resolve(i)):n.Ur.allocateTargetId(r).next(a=>(i=new jr(e,a,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function _h(t,e,n){const r=pe(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!Ia(a))throw a;ee("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function ny(t,e,n){const r=pe(t);let i=fe.min(),s=xe();return r.persistence.runTransaction("Execute query","readwrite",a=>function(d,f,g){const v=pe(d),_=v._s.get(g);return _!==void 0?B.resolve(v.os.get(_)):v.Ur.getTargetData(f,g)}(r,a,Un(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,c.targetId).next(d=>{s=d})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,n?i:fe.min(),n?s:xe())).next(c=>(xT(r,cI(e),c),{documents:c,Ts:s})))}function xT(t,e,n){let r=t.us.get(e)||fe.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}class ry{constructor(){this.activeTargetIds=mI()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class _T{constructor(){this.so=new ry,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new ry,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iy{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){ee("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){ee("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yl=null;function nd(){return yl===null?yl=function(){return 268435456+Math.round(2147483648*Math.random())}():yl++,"0x"+yl.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt="WebChannelConnection";class ET extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,a){const c=nd(),d=this.xo(n,r.toUriEncodedString());ee("RestConnection",`Sending RPC '${n}' ${c}:`,d,i);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,s,a),this.No(n,d,f,i).then(g=>(ee("RestConnection",`Received RPC '${n}' ${c}: `,g),g),g=>{throw As("RestConnection",`RPC '${n}' ${c} failed with error: `,g,"url: ",d,"request:",i),g})}Lo(n,r,i,s,a,c){return this.Mo(n,r,i,s,a)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+zs}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,a)=>n[a]=s),i&&i.headers.forEach((s,a)=>n[a]=s)}xo(n,r){const i=wT[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=nd();return new Promise((a,c)=>{const d=new Tx;d.setWithCredentials(!0),d.listenOnce(kx.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Ml.NO_ERROR:const g=d.getResponseJson();ee(kt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(g)),a(g);break;case Ml.TIMEOUT:ee(kt,`RPC '${e}' ${s} timed out`),c(new X(U.DEADLINE_EXCEEDED,"Request time out"));break;case Ml.HTTP_ERROR:const v=d.getStatus();if(ee(kt,`RPC '${e}' ${s} failed with status:`,v,"response text:",d.getResponseText()),v>0){let _=d.getResponseJson();Array.isArray(_)&&(_=_[0]);const A=_==null?void 0:_.error;if(A&&A.status&&A.message){const E=function(z){const T=z.toLowerCase().replace(/_/g,"-");return Object.values(U).indexOf(T)>=0?T:U.UNKNOWN}(A.status);c(new X(E,A.message))}else c(new X(U.UNKNOWN,"Server responded with status "+d.getStatus()))}else c(new X(U.UNAVAILABLE,"Connection failed."));break;default:de()}}finally{ee(kt,`RPC '${e}' ${s} completed.`)}});const f=JSON.stringify(i);ee(kt,`RPC '${e}' ${s} sending request:`,i),d.send(n,"POST",f,r,15)})}Bo(e,n,r){const i=nd(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Cx(),c=jx(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(d.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(d.useFetchStreams=!0),this.Oo(d.initMessageHeaders,n,r),d.encodeInitMessageHeaders=!0;const g=s.join("");ee(kt,`Creating RPC '${e}' stream ${i}: ${g}`,d);const v=a.createWebChannel(g,d);let _=!1,A=!1;const E=new ST({Io:z=>{A?ee(kt,`Not sending because RPC '${e}' stream ${i} is closed:`,z):(_||(ee(kt,`Opening RPC '${e}' stream ${i} transport.`),v.open(),_=!0),ee(kt,`RPC '${e}' stream ${i} sending:`,z),v.send(z))},To:()=>v.close()}),V=(z,T,u)=>{z.listen(T,I=>{try{u(I)}catch(M){setTimeout(()=>{throw M},0)}})};return V(v,So.EventType.OPEN,()=>{A||(ee(kt,`RPC '${e}' stream ${i} transport opened.`),E.yo())}),V(v,So.EventType.CLOSE,()=>{A||(A=!0,ee(kt,`RPC '${e}' stream ${i} transport closed`),E.So())}),V(v,So.EventType.ERROR,z=>{A||(A=!0,As(kt,`RPC '${e}' stream ${i} transport errored:`,z),E.So(new X(U.UNAVAILABLE,"The operation could not be completed")))}),V(v,So.EventType.MESSAGE,z=>{var T;if(!A){const u=z.data[0];Ae(!!u);const I=u,M=I.error||((T=I[0])===null||T===void 0?void 0:T.error);if(M){ee(kt,`RPC '${e}' stream ${i} received error:`,M);const F=M.status;let H=function(b){const R=Ze[b];if(R!==void 0)return n1(R)}(F),w=M.message;H===void 0&&(H=U.INTERNAL,w="Unknown error status: "+F+" with message "+M.message),A=!0,E.So(new X(H,w)),v.close()}else ee(kt,`RPC '${e}' stream ${i} received:`,u),E.bo(u)}}),V(c,Ax.STAT_EVENT,z=>{z.stat===ch.PROXY?ee(kt,`RPC '${e}' stream ${i} detected buffering proxy`):z.stat===ch.NOPROXY&&ee(kt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{E.wo()},0),E}}function rd(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(t){return new NI(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p1{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&ee("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m1{constructor(e,n,r,i,s,a,c,d){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=d,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new p1(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===U.RESOURCE_EXHAUSTED?(lr(n.toString()),lr("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===U.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new X(U.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return ee("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(ee("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class RT extends m1{constructor(e,n,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,a),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=VI(this.serializer,e),r=function(s){if(!("targetChange"in s))return fe.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?fe.min():a.readTime?zn(a.readTime):fe.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=xh(this.serializer),n.addTarget=function(s,a){let c;const d=a.target;if(c=fh(d)?{documents:UI(s,d)}:{query:zI(s,d)._t},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=s1(s,a.resumeToken);const f=gh(s,a.expectedCount);f!==null&&(c.expectedCount=f)}else if(a.snapshotVersion.compareTo(fe.min())>0){c.readTime=wc(s,a.snapshotVersion.toTimestamp());const f=gh(s,a.expectedCount);f!==null&&(c.expectedCount=f)}return c}(this.serializer,e);const r=BI(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=xh(this.serializer),n.removeTarget=e,this.a_(n)}}class IT extends m1{constructor(e,n,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,a),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return Ae(!!e.streamToken),this.lastStreamToken=e.streamToken,Ae(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Ae(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=FI(e.writeResults,e.commitTime),r=zn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=xh(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>OI(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new X(U.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Mo(e,yh(n,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new X(U.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Lo(e,yh(n,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new X(U.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class kT{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(lr(n),this.D_=!1):ee("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AT{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(a=>{r.enqueueAndForget(async()=>{Oi(this)&&(ee("RemoteStore","Restarting streams for network reachability change."),await async function(d){const f=pe(d);f.L_.add(4),await Aa(f),f.q_.set("Unknown"),f.L_.delete(4),await tu(f)}(this))})}),this.q_=new kT(r,i)}}async function tu(t){if(Oi(t))for(const e of t.B_)await e(!0)}async function Aa(t){for(const e of t.B_)await e(!1)}function g1(t,e){const n=pe(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Yf(n)?Qf(n):$s(n).r_()&&Gf(n,e))}function Kf(t,e){const n=pe(t),r=$s(n);n.N_.delete(e),r.r_()&&y1(n,e),n.N_.size===0&&(r.r_()?r.o_():Oi(n)&&n.q_.set("Unknown"))}function Gf(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(fe.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}$s(t).A_(e)}function y1(t,e){t.Q_.xe(e),$s(t).R_(e)}function Qf(t){t.Q_=new jI({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),$s(t).start(),t.q_.v_()}function Yf(t){return Oi(t)&&!$s(t).n_()&&t.N_.size>0}function Oi(t){return pe(t).L_.size===0}function v1(t){t.Q_=void 0}async function jT(t){t.q_.set("Online")}async function CT(t){t.N_.forEach((e,n)=>{Gf(t,e)})}async function DT(t,e){v1(t),Yf(t)?(t.q_.M_(e),Qf(t)):t.q_.set("Unknown")}async function PT(t,e,n){if(t.q_.set("Online"),e instanceof i1&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const c of s.targetIds)i.N_.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.N_.delete(c),i.Q_.removeTarget(c))}(t,e)}catch(r){ee("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Sc(t,r)}else if(e instanceof Ol?t.Q_.Ke(e):e instanceof r1?t.Q_.He(e):t.Q_.We(e),!n.isEqual(fe.min()))try{const r=await f1(t.localStore);n.compareTo(r)>=0&&await function(s,a){const c=s.Q_.rt(a);return c.targetChanges.forEach((d,f)=>{if(d.resumeToken.approximateByteSize()>0){const g=s.N_.get(f);g&&s.N_.set(f,g.withResumeToken(d.resumeToken,a))}}),c.targetMismatches.forEach((d,f)=>{const g=s.N_.get(d);if(!g)return;s.N_.set(d,g.withResumeToken(wt.EMPTY_BYTE_STRING,g.snapshotVersion)),y1(s,d);const v=new jr(g.target,d,f,g.sequenceNumber);Gf(s,v)}),s.remoteSyncer.applyRemoteEvent(c)}(t,n)}catch(r){ee("RemoteStore","Failed to raise snapshot:",r),await Sc(t,r)}}async function Sc(t,e,n){if(!Ia(e))throw e;t.L_.add(1),await Aa(t),t.q_.set("Offline"),n||(n=()=>f1(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{ee("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await tu(t)})}function x1(t,e){return e().catch(n=>Sc(t,n,e))}async function nu(t){const e=pe(t),n=Kr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;NT(e);)try{const i=await yT(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,MT(e,i)}catch(i){await Sc(e,i)}_1(e)&&b1(e)}function NT(t){return Oi(t)&&t.O_.length<10}function MT(t,e){t.O_.push(e);const n=Kr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function _1(t){return Oi(t)&&!Kr(t).n_()&&t.O_.length>0}function b1(t){Kr(t).start()}async function LT(t){Kr(t).p_()}async function VT(t){const e=Kr(t);for(const n of t.O_)e.m_(n.mutations)}async function OT(t,e,n){const r=t.O_.shift(),i=zf.from(r,e,n);await x1(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await nu(t)}async function FT(t,e){e&&Kr(t).V_&&await async function(r,i){if(function(a){return TI(a)&&a!==U.ABORTED}(i.code)){const s=r.O_.shift();Kr(r).s_(),await x1(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await nu(r)}}(t,e),_1(t)&&b1(t)}async function sy(t,e){const n=pe(t);n.asyncQueue.verifyOperationInProgress(),ee("RemoteStore","RemoteStore received new credentials");const r=Oi(n);n.L_.add(3),await Aa(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await tu(n)}async function UT(t,e){const n=pe(t);e?(n.L_.delete(2),await tu(n)):e||(n.L_.add(2),await Aa(n),n.q_.set("Unknown"))}function $s(t){return t.K_||(t.K_=function(n,r,i){const s=pe(n);return s.w_(),new RT(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:jT.bind(null,t),Ro:CT.bind(null,t),mo:DT.bind(null,t),d_:PT.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Yf(t)?Qf(t):t.q_.set("Unknown")):(await t.K_.stop(),v1(t))})),t.K_}function Kr(t){return t.U_||(t.U_=function(n,r,i){const s=pe(n);return s.w_(),new IT(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:LT.bind(null,t),mo:FT.bind(null,t),f_:VT.bind(null,t),g_:OT.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await nu(t)):(await t.U_.stop(),t.O_.length>0&&(ee("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new tr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const a=Date.now()+r,c=new Xf(e,n,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(U.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Jf(t,e){if(lr("AsyncQueue",`${e}: ${t}`),Ia(t))return new X(U.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e){this.comparator=e?(n,r)=>e(n,r)||ie.comparator(n.key,r.key):(n,r)=>ie.comparator(n.key,r.key),this.keyedMap=Eo(),this.sortedSet=new We(this.comparator)}static emptySet(e){return new _s(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof _s)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new _s;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(){this.W_=new We(ie.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):de():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class Ns{constructor(e,n,r,i,s,a,c,d,f){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=d,this.hasCachedResults=f}static fromInitialDocuments(e,n,r,i,s){const a=[];return n.forEach(c=>{a.push({type:0,doc:c})}),new Ns(e,n,_s.emptySet(n),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Qc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class qT{constructor(){this.queries=ay(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=pe(n),s=i.queries;i.queries=ay(),s.forEach((a,c)=>{for(const d of c.j_)d.onError(r)})})(this,new X(U.ABORTED,"Firestore shutting down"))}}function ay(){return new Bs(t=>$x(t),Qc)}async function Zf(t,e){const n=pe(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new zT,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(a){const c=Jf(a,`Initialization of query '${Qi(e.query)}' failed`);return void e.onError(c)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&tp(n)}async function ep(t,e){const n=pe(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const a=s.j_.indexOf(e);a>=0&&(s.j_.splice(a,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function BT(t,e){const n=pe(t);let r=!1;for(const i of e){const s=i.query,a=n.queries.get(s);if(a){for(const c of a.j_)c.X_(i)&&(r=!0);a.z_=i}}r&&tp(n)}function $T(t,e,n){const r=pe(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function tp(t){t.Y_.forEach(e=>{e.next()})}var bh,ly;(ly=bh||(bh={})).ea="default",ly.Cache="cache";class np{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Ns(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=Ns.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==bh.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w1{constructor(e){this.key=e}}class S1{constructor(e){this.key=e}}class WT{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=xe(),this.mutatedKeys=xe(),this.Aa=Wx(e),this.Ra=new _s(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new oy,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,a=i,c=!1;const d=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((g,v)=>{const _=i.get(g),A=Yc(this.query,v)?v:null,E=!!_&&this.mutatedKeys.has(_.key),V=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let z=!1;_&&A?_.data.isEqual(A.data)?E!==V&&(r.track({type:3,doc:A}),z=!0):this.ga(_,A)||(r.track({type:2,doc:A}),z=!0,(d&&this.Aa(A,d)>0||f&&this.Aa(A,f)<0)&&(c=!0)):!_&&A?(r.track({type:0,doc:A}),z=!0):_&&!A&&(r.track({type:1,doc:_}),z=!0,(d||f)&&(c=!0)),z&&(A?(a=a.add(A),s=V?s.add(g):s.delete(g)):(a=a.delete(g),s=s.delete(g)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const g=this.query.limitType==="F"?a.last():a.first();a=a.delete(g.key),s=s.delete(g.key),r.track({type:1,doc:g})}return{Ra:a,fa:r,ns:c,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((g,v)=>function(A,E){const V=z=>{switch(z){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return de()}};return V(A)-V(E)}(g.type,v.type)||this.Aa(g.doc,v.doc)),this.pa(r),i=i!=null&&i;const c=n&&!i?this.ya():[],d=this.da.size===0&&this.current&&!i?1:0,f=d!==this.Ea;return this.Ea=d,a.length!==0||f?{snapshot:new Ns(this.query,e.Ra,s,a,e.mutatedKeys,d===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new oy,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=xe(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new S1(r))}),this.da.forEach(r=>{e.has(r)||n.push(new w1(r))}),n}ba(e){this.Ta=e.Ts,this.da=xe();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return Ns.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class HT{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class KT{constructor(e){this.key=e,this.va=!1}}class GT{constructor(e,n,r,i,s,a){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Bs(c=>$x(c),Qc),this.Ma=new Map,this.xa=new Set,this.Oa=new We(ie.comparator),this.Na=new Map,this.La=new $f,this.Ba={},this.ka=new Map,this.qa=Ps.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function QT(t,e,n=!0){const r=A1(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await E1(r,e,n,!0),i}async function YT(t,e){const n=A1(t);await E1(n,e,!0,!1)}async function E1(t,e,n,r){const i=await vT(t.localStore,Un(e)),s=i.targetId,a=t.sharedClientState.addLocalQueryTarget(s,n);let c;return r&&(c=await XT(t,e,s,a==="current",i.resumeToken)),t.isPrimaryClient&&n&&g1(t.remoteStore,i),c}async function XT(t,e,n,r,i){t.Ka=(v,_,A)=>async function(V,z,T,u){let I=z.view.ma(T);I.ns&&(I=await ny(V.localStore,z.query,!1).then(({documents:w})=>z.view.ma(w,I)));const M=u&&u.targetChanges.get(z.targetId),F=u&&u.targetMismatches.get(z.targetId)!=null,H=z.view.applyChanges(I,V.isPrimaryClient,M,F);return uy(V,z.targetId,H.wa),H.snapshot}(t,v,_,A);const s=await ny(t.localStore,e,!0),a=new WT(e,s.Ts),c=a.ma(s.documents),d=ka.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),f=a.applyChanges(c,t.isPrimaryClient,d);uy(t,n,f.wa);const g=new HT(e,n,a);return t.Fa.set(e,g),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),f.snapshot}async function JT(t,e,n){const r=pe(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(a=>!Qc(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await _h(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Kf(r.remoteStore,i.targetId),wh(r,i.targetId)}).catch(Ra)):(wh(r,i.targetId),await _h(r.localStore,i.targetId,!0))}async function ZT(t,e){const n=pe(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Kf(n.remoteStore,r.targetId))}async function ek(t,e,n){const r=ak(t);try{const i=await function(a,c){const d=pe(a),f=ot.now(),g=c.reduce((A,E)=>A.add(E.key),xe());let v,_;return d.persistence.runTransaction("Locally write mutations","readwrite",A=>{let E=cr(),V=xe();return d.cs.getEntries(A,g).next(z=>{E=z,E.forEach((T,u)=>{u.isValidDocument()||(V=V.add(T))})}).next(()=>d.localDocuments.getOverlayedDocuments(A,E)).next(z=>{v=z;const T=[];for(const u of c){const I=wI(u,v.get(u.key).overlayedDocument);I!=null&&T.push(new Zr(u.key,I,Lx(I.value.mapValue),dn.exists(!0)))}return d.mutationQueue.addMutationBatch(A,f,T,c)}).next(z=>{_=z;const T=z.applyToLocalDocumentSet(v,V);return d.documentOverlayCache.saveOverlays(A,z.batchId,T)})}).then(()=>({batchId:_.batchId,changes:Kx(v)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,d){let f=a.Ba[a.currentUser.toKey()];f||(f=new We(Ie)),f=f.insert(c,d),a.Ba[a.currentUser.toKey()]=f}(r,i.batchId,n),await ja(r,i.changes),await nu(r.remoteStore)}catch(i){const s=Jf(i,"Failed to persist write");n.reject(s)}}async function R1(t,e){const n=pe(t);try{const r=await mT(n.localStore,e);e.targetChanges.forEach((i,s)=>{const a=n.Na.get(s);a&&(Ae(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.va=!0:i.modifiedDocuments.size>0?Ae(a.va):i.removedDocuments.size>0&&(Ae(a.va),a.va=!1))}),await ja(n,r,e)}catch(r){await Ra(r)}}function cy(t,e,n){const r=pe(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,a)=>{const c=a.view.Z_(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){const d=pe(a);d.onlineState=c;let f=!1;d.queries.forEach((g,v)=>{for(const _ of v.j_)_.Z_(c)&&(f=!0)}),f&&tp(d)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function tk(t,e,n){const r=pe(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let a=new We(ie.comparator);a=a.insert(s,Ct.newNoDocument(s,fe.min()));const c=xe().add(s),d=new Zc(fe.min(),new Map,new We(Ie),a,c);await R1(r,d),r.Oa=r.Oa.remove(s),r.Na.delete(e),rp(r)}else await _h(r.localStore,e,!1).then(()=>wh(r,e,n)).catch(Ra)}async function nk(t,e){const n=pe(t),r=e.batch.batchId;try{const i=await pT(n.localStore,e);T1(n,r,null),I1(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await ja(n,i)}catch(i){await Ra(i)}}async function rk(t,e,n){const r=pe(t);try{const i=await function(a,c){const d=pe(a);return d.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let g;return d.mutationQueue.lookupMutationBatch(f,c).next(v=>(Ae(v!==null),g=v.keys(),d.mutationQueue.removeMutationBatch(f,v))).next(()=>d.mutationQueue.performConsistencyCheck(f)).next(()=>d.documentOverlayCache.removeOverlaysForBatchId(f,g,c)).next(()=>d.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,g)).next(()=>d.localDocuments.getDocuments(f,g))})}(r.localStore,e);T1(r,e,n),I1(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await ja(r,i)}catch(i){await Ra(i)}}function I1(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function T1(t,e,n){const r=pe(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function wh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||k1(t,r)})}function k1(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Kf(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),rp(t))}function uy(t,e,n){for(const r of n)r instanceof w1?(t.La.addReference(r.key,e),ik(t,r)):r instanceof S1?(ee("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||k1(t,r.key)):de()}function ik(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(ee("SyncEngine","New document in limbo: "+n),t.xa.add(r),rp(t))}function rp(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new ie(Ve.fromString(e)),r=t.qa.next();t.Na.set(r,new KT(n)),t.Oa=t.Oa.insert(n,r),g1(t.remoteStore,new jr(Un(Gc(n.path)),r,"TargetPurposeLimboResolution",Pf.oe))}}async function ja(t,e,n){const r=pe(t),i=[],s=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((c,d)=>{a.push(r.Ka(d,e,n).then(f=>{var g;if((f||n)&&r.isPrimaryClient){const v=f?!f.fromCache:(g=n==null?void 0:n.targetChanges.get(d.targetId))===null||g===void 0?void 0:g.current;r.sharedClientState.updateQueryState(d.targetId,v?"current":"not-current")}if(f){i.push(f);const v=Hf.Wi(d.targetId,f);s.push(v)}}))}),await Promise.all(a),r.Ca.d_(i),await async function(d,f){const g=pe(d);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>B.forEach(f,_=>B.forEach(_.$i,A=>g.persistence.referenceDelegate.addReference(v,_.targetId,A)).next(()=>B.forEach(_.Ui,A=>g.persistence.referenceDelegate.removeReference(v,_.targetId,A)))))}catch(v){if(!Ia(v))throw v;ee("LocalStore","Failed to update sequence numbers: "+v)}for(const v of f){const _=v.targetId;if(!v.fromCache){const A=g.os.get(_),E=A.snapshotVersion,V=A.withLastLimboFreeSnapshotVersion(E);g.os=g.os.insert(_,V)}}}(r.localStore,s))}async function sk(t,e){const n=pe(t);if(!n.currentUser.isEqual(e)){ee("SyncEngine","User change. New user:",e.toKey());const r=await h1(n.localStore,e);n.currentUser=e,function(s,a){s.ka.forEach(c=>{c.forEach(d=>{d.reject(new X(U.CANCELLED,a))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ja(n,r.hs)}}function ok(t,e){const n=pe(t),r=n.Na.get(e);if(r&&r.va)return xe().add(r.key);{let i=xe();const s=n.Ma.get(e);if(!s)return i;for(const a of s){const c=n.Fa.get(a);i=i.unionWith(c.view.Va)}return i}}function A1(t){const e=pe(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=R1.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=ok.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=tk.bind(null,e),e.Ca.d_=BT.bind(null,e.eventManager),e.Ca.$a=$T.bind(null,e.eventManager),e}function ak(t){const e=pe(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=nk.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=rk.bind(null,e),e}class Ec{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=eu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return fT(this.persistence,new dT,e.initialUser,this.serializer)}Ga(e){return new lT(Wf.Zr,this.serializer)}Wa(e){return new _T}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ec.provider={build:()=>new Ec};class Sh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>cy(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=sk.bind(null,this.syncEngine),await UT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new qT}()}createDatastore(e){const n=eu(e.databaseInfo.databaseId),r=function(s){return new ET(s)}(e.databaseInfo);return function(s,a,c,d){return new TT(s,a,c,d)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,a,c){return new AT(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,n=>cy(this.syncEngine,n,0),function(){return iy.D()?new iy:new bT}())}createSyncEngine(e,n){return function(i,s,a,c,d,f,g){const v=new GT(i,s,a,c,d,f);return g&&(v.Qa=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=pe(i);ee("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Aa(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Sh.provider={build:()=>new Sh};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):lr("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lk{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=At.UNAUTHENTICATED,this.clientId=Px.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{ee("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(ee("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new tr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Jf(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function id(t,e){t.asyncQueue.verifyOperationInProgress(),ee("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await h1(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function dy(t,e){t.asyncQueue.verifyOperationInProgress();const n=await ck(t);ee("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>sy(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>sy(e.remoteStore,i)),t._onlineComponents=e}async function ck(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){ee("FirestoreClient","Using user provided OfflineComponentProvider");try{await id(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===U.FAILED_PRECONDITION||i.code===U.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;As("Error using user provided cache. Falling back to memory cache: "+n),await id(t,new Ec)}}else ee("FirestoreClient","Using default OfflineComponentProvider"),await id(t,new Ec);return t._offlineComponents}async function j1(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(ee("FirestoreClient","Using user provided OnlineComponentProvider"),await dy(t,t._uninitializedComponentsProvider._online)):(ee("FirestoreClient","Using default OnlineComponentProvider"),await dy(t,new Sh))),t._onlineComponents}function uk(t){return j1(t).then(e=>e.syncEngine)}async function Rc(t){const e=await j1(t),n=e.eventManager;return n.onListen=QT.bind(null,e.syncEngine),n.onUnlisten=JT.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=YT.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=ZT.bind(null,e.syncEngine),n}function dk(t,e,n={}){const r=new tr;return t.asyncQueue.enqueueAndForget(async()=>function(s,a,c,d,f){const g=new ip({next:_=>{g.Za(),a.enqueueAndForget(()=>ep(s,v));const A=_.docs.has(c);!A&&_.fromCache?f.reject(new X(U.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&_.fromCache&&d&&d.source==="server"?f.reject(new X(U.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(_)},error:_=>f.reject(_)}),v=new np(Gc(c.path),g,{includeMetadataChanges:!0,_a:!0});return Zf(s,v)}(await Rc(t),t.asyncQueue,e,n,r)),r.promise}function hk(t,e,n={}){const r=new tr;return t.asyncQueue.enqueueAndForget(async()=>function(s,a,c,d,f){const g=new ip({next:_=>{g.Za(),a.enqueueAndForget(()=>ep(s,v)),_.fromCache&&d.source==="server"?f.reject(new X(U.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(_)},error:_=>f.reject(_)}),v=new np(c,g,{includeMetadataChanges:!0,_a:!0});return Zf(s,v)}(await Rc(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C1(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hy=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D1(t,e,n){if(!n)throw new X(U.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function fk(t,e,n,r){if(e===!0&&r===!0)throw new X(U.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function fy(t){if(!ie.isDocumentKey(t))throw new X(U.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function py(t){if(ie.isDocumentKey(t))throw new X(U.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function ru(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":de()}function Gt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new X(U.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ru(t);throw new X(U.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new X(U.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new X(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}fk("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=C1((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new X(U.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new X(U.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new X(U.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class iu{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new my({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(U.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(U.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new my(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new CR;switch(r.type){case"firstParty":return new MR(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new X(U.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=hy.get(n);r&&(ee("ComponentProvider","Removing Datastore"),hy.delete(n),r.terminate())}(this),Promise.resolve()}}function pk(t,e,n,r={}){var i;const s=(t=Gt(t,iu))._getSettings(),a=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&As("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let c,d;if(typeof r.mockUserToken=="string")c=r.mockUserToken,d=At.MOCK_USER;else{c=Qw(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new X(U.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new At(f)}t._authCredentials=new DR(new Dx(c,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ei(this.firestore,e,this._query)}}class Dt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new qr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Dt(this.firestore,e,this._key)}}class qr extends ei{constructor(e,n,r){super(e,n,Gc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Dt(this.firestore,null,new ie(e))}withConverter(e){return new qr(this.firestore,e,this._path)}}function Lt(t,e,...n){if(t=ht(t),D1("collection","path",e),t instanceof iu){const r=Ve.fromString(e,...n);return py(r),new qr(t,null,r)}{if(!(t instanceof Dt||t instanceof qr))throw new X(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ve.fromString(e,...n));return py(r),new qr(t.firestore,null,r)}}function Le(t,e,...n){if(t=ht(t),arguments.length===1&&(e=Px.newId()),D1("doc","path",e),t instanceof iu){const r=Ve.fromString(e,...n);return fy(r),new Dt(t,null,new ie(r))}{if(!(t instanceof Dt||t instanceof qr))throw new X(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ve.fromString(e,...n));return fy(r),new Dt(t.firestore,t instanceof qr?t.converter:null,new ie(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gy{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new p1(this,"async_queue_retry"),this.Vu=()=>{const r=rd();r&&ee("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=rd();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=rd();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new tr;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ia(e))throw e;ee("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw lr("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=Xf.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&de()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function yy(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class ur extends iu{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new gy,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new gy(e),this._firestoreClient=void 0,await e}}}function mk(t,e){const n=typeof t=="object"?t:B0(),r=typeof t=="string"?t:"(default)",i=wf(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Kw("firestore");s&&pk(i,...s)}return i}function su(t){if(t._terminated)throw new X(U.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||gk(t),t._firestoreClient}function gk(t){var e,n,r;const i=t._freezeSettings(),s=function(c,d,f,g){return new GR(c,d,f,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,C1(g.experimentalLongPollingOptions),g.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new lk(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(c){const d=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(d),_online:d}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ms(wt.fromBase64String(e))}catch(n){throw new X(U.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Ms(wt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new X(U.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new vt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new X(U.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new X(U.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Ie(this._lat,e._lat)||Ie(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yk=/^__.*__$/;class vk{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Zr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ta(e,this.data,n,this.fieldTransforms)}}class P1{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Zr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function N1(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw de()}}class lp{constructor(e,n,r,i,s,a){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new lp(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Ic(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(N1(this.Cu)&&yk.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class xk{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||eu(e)}Qu(e,n,r,i=!1){return new lp({Cu:e,methodName:n,qu:r,path:vt.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function au(t){const e=t._freezeSettings(),n=eu(t._databaseId);return new xk(t._databaseId,!!e.ignoreUndefinedProperties,n)}function M1(t,e,n,r,i,s={}){const a=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);cp("Data must be an object, but it was:",a,r);const c=L1(r,a);let d,f;if(s.merge)d=new Jt(a.fieldMask),f=a.fieldTransforms;else if(s.mergeFields){const g=[];for(const v of s.mergeFields){const _=Eh(e,v,n);if(!a.contains(_))throw new X(U.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);O1(g,_)||g.push(_)}d=new Jt(g),f=a.fieldTransforms.filter(v=>d.covers(v.field))}else d=null,f=a.fieldTransforms;return new vk(new Bt(c),d,f)}class lu extends sp{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof lu}}function _k(t,e,n,r){const i=t.Qu(1,e,n);cp("Data must be an object, but it was:",i,r);const s=[],a=Bt.empty();Vi(r,(d,f)=>{const g=up(e,d,n);f=ht(f);const v=i.Nu(g);if(f instanceof lu)s.push(g);else{const _=Ca(f,v);_!=null&&(s.push(g),a.set(g,_))}});const c=new Jt(s);return new P1(a,c,i.fieldTransforms)}function bk(t,e,n,r,i,s){const a=t.Qu(1,e,n),c=[Eh(e,r,n)],d=[i];if(s.length%2!=0)throw new X(U.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<s.length;_+=2)c.push(Eh(e,s[_])),d.push(s[_+1]);const f=[],g=Bt.empty();for(let _=c.length-1;_>=0;--_)if(!O1(f,c[_])){const A=c[_];let E=d[_];E=ht(E);const V=a.Nu(A);if(E instanceof lu)f.push(A);else{const z=Ca(E,V);z!=null&&(f.push(A),g.set(A,z))}}const v=new Jt(f);return new P1(g,v,a.fieldTransforms)}function wk(t,e,n,r=!1){return Ca(n,t.Qu(r?4:3,e))}function Ca(t,e){if(V1(t=ht(t)))return cp("Unsupported field value:",e,t),L1(t,e);if(t instanceof sp)return function(r,i){if(!N1(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const c of r){let d=Ca(c,i.Lu(a));d==null&&(d={nullValue:"NULL_VALUE"}),s.push(d),a++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=ht(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return gI(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ot.fromDate(r);return{timestampValue:wc(i.serializer,s)}}if(r instanceof ot){const s=new ot(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:wc(i.serializer,s)}}if(r instanceof op)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ms)return{bytesValue:s1(i.serializer,r._byteString)};if(r instanceof Dt){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Bf(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof ap)return function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Bu("VectorValues must only contain numeric values.");return Ff(c.serializer,d)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${ru(r)}`)}(t,e)}function L1(t,e){const n={};return Nx(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Vi(t,(r,i)=>{const s=Ca(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function V1(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ot||t instanceof op||t instanceof Ms||t instanceof Dt||t instanceof sp||t instanceof ap)}function cp(t,e,n){if(!V1(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=ru(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Eh(t,e,n){if((e=ht(e))instanceof ou)return e._internalPath;if(typeof e=="string")return up(t,e);throw Ic("Field path arguments must be of type string or ",t,!1,void 0,n)}const Sk=new RegExp("[~\\*/\\[\\]]");function up(t,e,n){if(e.search(Sk)>=0)throw Ic(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ou(...e.split("."))._internalPath}catch{throw Ic(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ic(t,e,n,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let c=`Function ${e}() called with invalid data`;n&&(c+=" (via `toFirestore()`)"),c+=". ";let d="";return(s||a)&&(d+=" (found",s&&(d+=` in field ${r}`),a&&(d+=` in document ${i}`),d+=")"),new X(U.INVALID_ARGUMENT,c+t+d)}function O1(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F1{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Dt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Ek(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(cu("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Ek extends F1{data(){return super.data()}}function cu(t,e){return typeof e=="string"?up(t,e):e instanceof ou?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U1(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new X(U.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class dp{}class z1 extends dp{}function xr(t,e,...n){let r=[];e instanceof dp&&r.push(e),r=r.concat(n),function(s){const a=s.filter(d=>d instanceof hp).length,c=s.filter(d=>d instanceof uu).length;if(a>1||a>0&&c>0)throw new X(U.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class uu extends z1{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new uu(e,n,r)}_apply(e){const n=this._parse(e);return q1(e._query,n),new ei(e.firestore,e.converter,ph(e._query,n))}_parse(e){const n=au(e.firestore);return function(s,a,c,d,f,g,v){let _;if(f.isKeyField()){if(g==="array-contains"||g==="array-contains-any")throw new X(U.INVALID_ARGUMENT,`Invalid Query. You can't perform '${g}' queries on documentId().`);if(g==="in"||g==="not-in"){xy(v,g);const A=[];for(const E of v)A.push(vy(d,s,E));_={arrayValue:{values:A}}}else _=vy(d,s,v)}else g!=="in"&&g!=="not-in"&&g!=="array-contains-any"||xy(v,g),_=wk(c,a,v,g==="in"||g==="not-in");return tt.create(f,g,_)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function Rk(t,e,n){const r=e,i=cu("where",t);return uu._create(i,r,n)}class hp extends dp{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new hp(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:In.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let a=i;const c=s.getFlattenedFilters();for(const d of c)q1(a,d),a=ph(a,d)}(e._query,n),new ei(e.firestore,e.converter,ph(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class fp extends z1{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new fp(e,n)}_apply(e){const n=function(i,s,a){if(i.startAt!==null)throw new X(U.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new X(U.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new da(s,a)}(e._query,this._field,this._direction);return new ei(e.firestore,e.converter,function(i,s){const a=i.explicitOrderBy.concat([s]);return new qs(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,n))}}function ui(t,e="asc"){const n=e,r=cu("orderBy",t);return fp._create(r,n)}function vy(t,e,n){if(typeof(n=ht(n))=="string"){if(n==="")throw new X(U.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Bx(e)&&n.indexOf("/")!==-1)throw new X(U.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Ve.fromString(n));if(!ie.isDocumentKey(r))throw new X(U.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Fg(t,new ie(r))}if(n instanceof Dt)return Fg(t,n._key);throw new X(U.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ru(n)}.`)}function xy(t,e){if(!Array.isArray(t)||t.length===0)throw new X(U.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function q1(t,e){const n=function(i,s){for(const a of i)for(const c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new X(U.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new X(U.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class Ik{convertValue(e,n="none"){switch(Pi(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Di(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw de()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Vi(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>Xe(a.doubleValue));return new ap(s)}convertGeoPoint(e){return new op(Xe(e.latitude),Xe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Mf(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(la(e));default:return null}}convertTimestamp(e){const n=Hr(e);return new ot(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Ve.fromString(e);Ae(d1(r));const i=new ca(r.get(1),r.get(3)),s=new ie(r.popFirst(5));return i.isEqual(n)||lr(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B1(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class $1 extends F1{constructor(e,n,r,i,s,a){super(e,n,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Fl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(cu("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Fl extends $1{data(e={}){return super.data(e)}}class W1{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Io(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Fl(this._firestore,this._userDataWriter,r.key,r,new Io(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new X(U.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{const d=new Fl(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Io(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:d,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const d=new Fl(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Io(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let f=-1,g=-1;return c.type!==0&&(f=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),g=a.indexOf(c.doc.key)),{type:Tk(c.type),doc:d,oldIndex:f,newIndex:g}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function Tk(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return de()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vl(t){t=Gt(t,Dt);const e=Gt(t.firestore,ur);return dk(su(e),t._key).then(n=>H1(e,t,n))}class pp extends Ik{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ms(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Dt(this.firestore,null,n)}}function kk(t){t=Gt(t,ei);const e=Gt(t.firestore,ur),n=su(e),r=new pp(e);return U1(t._query),hk(n,t._query).then(i=>new W1(e,r,t,i))}function sd(t,e,n){t=Gt(t,Dt);const r=Gt(t.firestore,ur),i=B1(t.converter,e);return du(r,[M1(au(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,dn.none())])}function vn(t,e,n,...r){t=Gt(t,Dt);const i=Gt(t.firestore,ur),s=au(i);let a;return a=typeof(e=ht(e))=="string"||e instanceof ou?bk(s,"updateDoc",t._key,e,n,r):_k(s,"updateDoc",t._key,e),du(i,[a.toMutation(t._key,dn.exists(!0))])}function Gi(t){return du(Gt(t.firestore,ur),[new Uf(t._key,dn.none())])}function di(t,e){const n=Gt(t.firestore,ur),r=Le(t),i=B1(t.converter,e);return du(n,[M1(au(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,dn.exists(!1))]).then(()=>r)}function hi(t,...e){var n,r,i;t=ht(t);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||yy(e[a])||(s=e[a],a++);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(yy(e[a])){const v=e[a];e[a]=(n=v.next)===null||n===void 0?void 0:n.bind(v),e[a+1]=(r=v.error)===null||r===void 0?void 0:r.bind(v),e[a+2]=(i=v.complete)===null||i===void 0?void 0:i.bind(v)}let d,f,g;if(t instanceof Dt)f=Gt(t.firestore,ur),g=Gc(t._key.path),d={next:v=>{e[a]&&e[a](H1(f,t,v))},error:e[a+1],complete:e[a+2]};else{const v=Gt(t,ei);f=Gt(v.firestore,ur),g=v._query;const _=new pp(f);d={next:A=>{e[a]&&e[a](new W1(f,_,v,A))},error:e[a+1],complete:e[a+2]},U1(t._query)}return function(_,A,E,V){const z=new ip(V),T=new np(A,z,E);return _.asyncQueue.enqueueAndForget(async()=>Zf(await Rc(_),T)),()=>{z.Za(),_.asyncQueue.enqueueAndForget(async()=>ep(await Rc(_),T))}}(su(f),g,c,d)}function du(t,e){return function(r,i){const s=new tr;return r.asyncQueue.enqueueAndForget(async()=>ek(await uk(r),i,s)),s.promise}(su(t),e)}function H1(t,e,n){const r=n.docs.get(e._key),i=new pp(t);return new $1(t,i,e._key,r,new Io(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(i){zs=i})(Fs),ks(new ki("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),c=new ur(new PR(r.getProvider("auth-internal")),new VR(r.getProvider("app-check-internal")),function(f,g){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new X(U.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ca(f.options.projectId,g)}(a,i),a);return s=Object.assign({useFetchStreams:n},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),zr(Ng,"4.7.3",e),zr(Ng,"4.7.3","esm2017")})();var Ak="firebase",jk="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */zr(Ak,jk,"app");const Ck={apiKey:"AIzaSyDwPfH4q1flqXfY7UisE7sMfTgL2Y21PyM",authDomain:"labreservepoo.firebaseapp.com",projectId:"labreservepoo",storageBucket:"labreservepoo.firebasestorage.app",messagingSenderId:"512402225038",appId:"1:512402225038:web:dffa491fed18caf11496df"},K1=q0(Ck),od=AR(K1),ge=mk(K1),_y=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Mexico_City",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),Dk=()=>parseInt(new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",hour:"2-digit",hour12:!1}).format(new Date),10),by={admin:{gestionAulas:!0,gestionEquipos:!0,verReservas:!0,verSolicitudes:!0,aprobarSolicitudes:!0,reservarEquipos:!0,solicitarEquipos:!1,verInventario:!1},maestro:{gestionAulas:!1,gestionEquipos:!1,verReservas:!0,verSolicitudes:!1,aprobarSolicitudes:!1,reservarEquipos:!0,solicitarEquipos:!0,verInventario:!0},alumno:{gestionAulas:!1,gestionEquipos:!1,verReservas:!1,verSolicitudes:!1,aprobarSolicitudes:!1,reservarEquipos:!1,solicitarEquipos:!0,verInventario:!0}};function Pk(){var fr,pr,Va;const[t,e]=Se.useState(""),[n,r]=Se.useState(""),[i,s]=Se.useState("alumno"),[a,c]=Se.useState(""),[d,f]=Se.useState("info"),[g,v]=Se.useState(!1),[_,A]=Se.useState(!1),[E,V]=Se.useState(null),[z,T]=Se.useState("es"),u=Fw[z],[I,M]=Se.useState("inicio"),[F,H]=Se.useState([]),[w,x]=Se.useState([]),[b,R]=Se.useState([]),[k,j]=Se.useState([]),[S,zt]=Se.useState([]),[Bn,ti]=Se.useState([]),[Qe,G]=Se.useState([]),[ae,he]=Se.useState(!1),[_e,Te]=Se.useState(!1),[He,Tn]=Se.useState(!1),[St,rn]=Se.useState(!1),[kn,mp]=Se.useState(null),[Ws,ni]=Se.useState(!1),[at,An]=Se.useState("aulas"),[nt,Hs]=Se.useState(_y),[Fe,Ks]=Se.useState(null),[Ue,ri]=Se.useState(null),[hu,sn]=Se.useState(!1),[Ye,jn]=Se.useState(null),pn=O=>({Aprobada:u.status.approved,Rechazada:u.status.rejected,Pendiente:u.status.pending,Confirmada:u.status.confirmed,Disponible:u.status.available,Mantenimiento:u.status.maintenance,Devuelto:u.status.returned,"Sin Stock":u.status.noStock,Cancelada:u.status.cancelled})[O]||O,Fi=O=>({admin:u.roles.admin,maestro:u.roles.maestro,alumno:u.roles.alumno})[O==null?void 0:O.toLowerCase()]||O,Gs=O=>({"Gafas RV":u.classrooms.vrGlasses,Cámaras:u.classrooms.cameras,Laptops:u.classrooms.laptops,Proyector:u.classrooms.projector,"Pantalla interactiva":u.classrooms.interactiveScreen,Múltiple:u.classrooms.multiple,"Sin equipo":u.classrooms.noEquip})[O]||O;Se.useEffect(()=>{if(E){const O=xr(Lt(ge,"equipos"),ui("fecha","desc")),N=hi(O,Z=>{const le=[];Z.forEach(ne=>{le.push({...ne.data(),id:ne.id})}),H(le)}),q=xr(Lt(ge,"aulas"),ui("nombre")),oe=hi(q,Z=>{const le=[];Z.forEach(ne=>{le.push({...ne.data(),id:ne.id})}),x(le)}),ue=xr(Lt(ge,"reservas"),ui("fecha","desc")),ye=hi(ue,Z=>{const le=[];Z.forEach(ne=>{le.push({...ne.data(),id:ne.id})}),R(le)}),rt=xr(Lt(ge,"solicitudes"),ui("fechaSolicitud","desc")),m=hi(rt,Z=>{const le=[];Z.forEach(ne=>{le.push({...ne.data(),id:ne.id})}),j(le)}),D=xr(Lt(ge,"solicitudes_material"),ui("fechaSolicitud","desc")),$=hi(D,Z=>{const le=[];Z.forEach(ne=>{le.push({...ne.data(),id:ne.id})}),zt(le)}),Q=xr(Lt(ge,"notificaciones"),ui("fecha","desc")),P=hi(Q,Z=>{const le=[];Z.forEach(ne=>{le.push({...ne.data(),id:ne.id})}),ti(le)}),te=xr(Lt(ge,"usuarios"),ui("correo")),re=hi(te,Z=>{const le=[];Z.forEach(ne=>{le.push({...ne.data(),id:ne.id})}),G(le)});return()=>{N(),oe(),ye(),m(),$(),P(),re()}}},[E]);const Y=(O,N="success")=>{c(O),f(N),setTimeout(()=>c(""),3e3)},ft=async O=>{if(O.preventDefault(),!t.trim()||!n.trim()){Y("Por favor completa todos los campos","error");return}if(n.length<6){Y("La contraseña debe tener al menos 6 caracteres","error");return}A(!0),c(u.login.creatingAccount),f("info");try{const N=t.toLowerCase(),q=await vl(Le(ge,"roles_asignados",N));let oe="alumno";q.exists()&&(oe=q.data().rol);const ue=await p2(od,t,n);await sd(Le(ge,"usuarios",ue.user.uid),{correo:N,rol:oe,fechaRegistro:new Date().toISOString()}),V({uid:ue.user.uid,email:ue.user.email,rol:oe}),e(""),r(""),c(""),A(!1)}catch(N){A(!1),N.code==="auth/email-already-in-use"?Y("Este correo ya está registrado. Intenta con otro","error"):N.code==="auth/invalid-email"?Y("Correo electrónico inválido","error"):N.code==="auth/weak-password"?Y("La contraseña es muy débil. Usa al menos 6 caracteres","error"):Y("Error al crear la cuenta. Intenta de nuevo","error")}},Ui=async O=>{if(O.preventDefault(),!t.trim()||!n.trim()){Y("Por favor completa todos los campos","error");return}A(!0),c(u.login.loggingIn),f("info");try{const N=await m2(od,t,n),q=await vl(Le(ge,"usuarios",N.user.uid)),oe=q.exists()?q.data().rol.toLowerCase():"alumno";V({uid:N.user.uid,email:N.user.email,rol:oe}),e(""),r(""),c(""),A(!1)}catch(N){A(!1),N.code==="auth/user-not-found"?Y("Usuario no encontrado. Verifica tu correo electrónico","error"):N.code==="auth/wrong-password"?Y("Contraseña incorrecta. Intenta de nuevo","error"):N.code==="auth/invalid-email"?Y("Correo electrónico inválido","error"):N.code==="auth/user-disabled"?Y("Esta cuenta ha sido desactivada","error"):N.code==="auth/too-many-requests"?Y("Demasiados intentos fallidos. Intenta más tarde","error"):Y("Las credenciales no son correctas. Verifica tu correo y contraseña","error")}},Da=async O=>{O.preventDefault();const N=O.target.emailAsignar.value.toLowerCase(),q=O.target.rolAsignar.value;try{await sd(Le(ge,"roles_asignados",N),{correo:N,rol:q,asignadoPor:E.email,fecha:new Date().toISOString()});const oe=xr(Lt(ge,"usuarios"),Rk("correo","==",N));(await kk(oe)).forEach(async ye=>{await vn(Le(ge,"usuarios",ye.id),{rol:q})}),Y(`${u.messages.rolAssigned} ${N}`,"success"),O.target.reset()}catch(oe){Y(u.messages.errorRolAssign+oe.message,"error")}},Pa=async(O,N,q)=>{try{await vn(Le(ge,"usuarios",O),{rol:N}),await sd(Le(ge,"roles_asignados",q),{correo:q,rol:N,asignadoPor:E.email,fecha:new Date().toISOString()}),await Mt(q,"permissionsUpdated",u.messages.roleChangedMsg||`${u.messages.adminChangedMsg||"An administrator has changed"} ${u.messages.yourAccessLevelMsg||"your access level to"} ${N.toUpperCase()}. ${u.messages.signOutAndSignInMsg||"Sign out and sign back in to see the changes"}.`),Y(`${u.messages.permissionsUpdated} ${q} ${u.messages.permissionsUpdatedEnd} ${N.toUpperCase()}`,"success")}catch(oe){Y(u.messages.errorUpdate+oe.message,"error")}},fu=async(O,N)=>{if(confirm(`${u.messages.confirmRevokeAccess} ${N}?

${u.messages.confirmRevokeExtra}`))try{await Gi(Le(ge,"usuarios",O)),await Gi(Le(ge,"roles_asignados",N)),Y(`${u.messages.accessRevoked} ${N}`,"success")}catch(q){Y(u.messages.errorRevoke+q.message,"error")}},ii=()=>{v2(od).then(()=>{V(null),M("inicio"),e(""),r("")})},Na=(O,N)=>{const q={newMaterialRequest:{es:"Nueva Solicitud de Material",en:"New Material Request"},materialApproved:{es:"Material Aprobado",en:"Material Approved"},materialRejected:{es:"Material Rechazado",en:"Material Rejected"},successfulReturn:{es:"Devolución Exitosa",en:"Successful Return"},overdueReminder:{es:"⚠️ Material Atrasado",en:"⚠️ Overdue Material"},roomReservationConfirmed:{es:"Reserva Confirmada",en:"Reservation Confirmed"},roomReservationRejected:{es:"Reserva Rechazada",en:"Reservation Rejected"},directReservationCreated:{es:"Reserva Directa Creada",en:"Direct Reservation Created"},newRoomRequest:{es:"Nueva Solicitud de Aula",en:"New Room Request"},scheduleReleased:{es:"Horario Liberado / Cancelación",en:"Schedule Released / Cancellation"},permissionsUpdated:{es:"🛡️ Permisos Actualizados",en:"🛡️ Permissions Updated"}};try{if(N&&q[N])return q[N][z]||O;if(O){for(const[oe,ue]of Object.entries(q))if(ue.es===O||ue.en===O)return ue[z]||O}}catch{}return O},Mt=async(O,N,q)=>{var ue;const oe={newMaterialRequest:{es:"Nueva Solicitud de Material",en:"New Material Request"},materialApproved:{es:"Material Aprobado",en:"Material Approved"},materialRejected:{es:"Material Rechazado",en:"Material Rejected"},successfulReturn:{es:"Devolución Exitosa",en:"Successful Return"},overdueReminder:{es:"⚠️ Material Atrasado",en:"⚠️ Overdue Material"},roomReservationConfirmed:{es:"Reserva Confirmada",en:"Reservation Confirmed"},roomReservationRejected:{es:"Reserva Rechazada",en:"Reservation Rejected"},directReservationCreated:{es:"Reserva Directa Creada",en:"Direct Reservation Created"},newRoomRequest:{es:"Nueva Solicitud de Aula",en:"New Room Request"},scheduleReleased:{es:"Horario Liberado / Cancelación",en:"Schedule Released / Cancellation"},permissionsUpdated:{es:"🛡️ Permisos Actualizados",en:"🛡️ Permissions Updated"}};try{const ye=((ue=oe[N])==null?void 0:ue.es)||N;await di(Lt(ge,"notificaciones"),{para:O,claveNotificacion:N,titulo:ye,descripcion:q,leida:!1,fecha:new Date().toISOString()})}catch(ye){console.error("Error al crear notificación:",ye)}},Qs=async O=>{try{await vn(Le(ge,"notificaciones",O),{leida:!0})}catch(N){console.error("Error al marcar notificación:",N)}},Ma=async(O,N,q)=>{if(confirm(u.messages.confirmCancelRequest))try{await Gi(Le(ge,N,O)),await Mt("admin","❌ Solicitud Retirada",`${E.email} canceló su solicitud de: ${q}`),Y(u.messages.requestCancelled,"success")}catch{Y(u.messages.errorCancel,"error")}},pu=async O=>{O.preventDefault();try{const N=O.target.equipoId.value,q=parseInt(O.target.cantidad.value),oe=O.target.tiempoUso.value,ue=O.target.motivo.value,ye=F.find(D=>D.id===N);if(ye.cantidad<q){Y(`${u.messages.insufficientStockRequest} ${ye.cantidad} ${u.messages.units} ${ye.nombre}.`,"error");return}const rt=new Date,m=new Date(rt.getTime()+parseInt(oe)*60*60*1e3);await di(Lt(ge,"solicitudes_material"),{equipoId:N,equipoNombre:ye.nombre,cantidad:q,tiempoUso:parseInt(oe),motivo:ue,solicitadoPor:E.email,estado:"Pendiente",devuelto:!1,fechaSolicitud:rt.toISOString(),fechaDevolucionEsperada:m.toISOString()}),await Mt("admin","newMaterialRequest",`${E.email} ${u.messages.requestedItemMsg||"requested"} ${q}x ${ye.nombre}. ${u.messages.reasonMsg||"Reason"}: ${ue}`),O.target.reset(),Y(u.messages.requestSent,"success"),rn(!1)}catch(N){console.error("Error al crear solicitud:",N),Y(u.messages.errorRequest,"error")}},zi=async O=>{try{const N=S.find(ue=>ue.id===O),q=F.find(ue=>ue.id===N.equipoId);if(q.cantidad<N.cantidad){Y(`${u.messages.insufficientStock} ${q.cantidad}`,"error");return}const oe=q.cantidad-N.cantidad;await vn(Le(ge,"equipos",q.id),{cantidad:oe,estado:oe===0?"Sin Stock":q.estado}),await vn(Le(ge,"solicitudes_material",O),{estado:"Aprobada",fechaAprobacion:new Date().toISOString()}),await Mt(N.solicitadoPor,"materialApproved",`${u.messages.yourRequestMsg||"Your request"} ${N.cantidad}x ${q.nombre} ${u.messages.wasApprovedMsg||"was approved"}.`),Y(u.messages.materialApproved,"success")}catch(N){console.error("Error al aprobar:",N),Y(u.messages.errorApprove,"error")}},Ys=async O=>{try{const N=S.find(oe=>oe.id===O),q=F.find(oe=>oe.id===N.equipoId);await vn(Le(ge,"solicitudes_material",O),{estado:"Rechazada",fechaRechazo:new Date().toISOString()}),await Mt(N.solicitadoPor,"materialRejected",`${u.messages.yourRequestMsg||"Your request"} ${u.messages.forMsg||"for"} ${(q==null?void 0:q.nombre)||u.messages.materialMsg||"the material"} ${u.messages.wasRejectedMsg||"was rejected"}.`),Y(u.messages.requestRejected,"warning")}catch(N){console.error("Error al rechazar:",N),Y("Error al rechazar solicitud","error")}},Xs=async O=>{try{const N=S.find(ue=>ue.id===O),q=F.find(ue=>ue.id===N.equipoId),oe=(q.cantidad||0)+N.cantidad;await vn(Le(ge,"equipos",q.id),{cantidad:oe,estado:"Disponible"}),await vn(Le(ge,"solicitudes_material",O),{devuelto:!0,fechaDevolucionReal:new Date().toISOString()}),await Mt(N.solicitadoPor,"successfulReturn",`${u.messages.adminConfirmedMsg||"The admin confirmed the return of"} ${N.cantidad}x ${q.nombre}.`),Y(u.messages.returnRegistered,"success")}catch(N){console.error("Error en devolución:",N),Y(u.messages.errorReturn,"error")}},si=async O=>{O.preventDefault();const N=O.target.nombre.value,q=parseInt(O.target.capacidad.value),oe=O.target.equipo.value;try{await di(Lt(ge,"aulas"),{nombre:N,capacidad:q,equipoDisponible:oe,estado:"Disponible",creada:new Date().toISOString()}),O.target.reset(),Y(u.messages.roomRegistered,"success"),he(!1)}catch(ue){Y(u.messages.errorRegisterRoom+ue.message,"error")}},Js=async O=>{if(confirm(u.messages.confirmDeleteRoom))try{await Gi(Le(ge,"aulas",O)),Y(u.messages.roomDeleted,"success")}catch{Y(u.messages.errorDeleteRoom,"error")}},qi=async O=>{var ye;O.preventDefault();const N=O.target.nombre.value,q=O.target.categoria.value,oe=O.target.estado.value,ue=parseInt(((ye=O.target.cantidad)==null?void 0:ye.value)||1);try{await di(Lt(ge,"equipos"),{nombre:N,categoria:q,estado:oe,cantidad:ue,registradoPor:E.email,fecha:new Date().toISOString()}),O.target.reset(),Y(u.messages.equipRegistered,"success")}catch{Y(u.messages.errorRegisterEquip,"error")}},mn=async O=>{if(confirm(u.messages.confirmCancelReservation))try{const N=b.find(oe=>oe.id===O);await Gi(Le(ge,"reservas",O));const q=E.email===N.reservadoPor?"admin":N.reservadoPor;await Mt(q,"scheduleReleased",`${u.messages.reservationCancelledMsg||"The reservation for"} ${N.aulaNombre} ${u.messages.onMsg||"on"} ${N.fecha} (${N.horaInicio} - ${N.horaFin}) ${u.messages.wasCancelledMsg||"was cancelled"}.`),Y(u.messages.reservationCancelled,"success")}catch{Y(u.messages.errorCancelReservation,"error")}},Zs=async O=>{if(window.confirm(u.messages.confirmDeleteEquip))try{await Gi(Le(ge,"equipos",O)),H(F.filter(N=>N.id!==O)),Y(u.messages.equipDeleted,"success")}catch(N){console.error("Error al eliminar equipo:",N),Y(u.messages.errorDeleteEquip,"error")}},oi=async(O,N)=>{try{await vn(Le(ge,"equipos",O),{cantidad:N}),H(F.map(q=>q.id===O?{...q,cantidad:N}:q)),Y(u.messages.qtyUpdated,"success")}catch(q){console.error("Error al actualizar cantidad:",q),Y(u.messages.errorUpdateQty,"error")}},Bi=async()=>{const O=new Date,N=S.filter(q=>q.estado==="Aprobada"&&!q.devuelto&&new Date(q.fechaDevolucionEsperada)<O);if(N.length===0){Y(u.messages.noOverdue,"info");return}try{for(const q of N)await Mt(q.solicitadoPor,u.notifications.overdueReminder,`${u.messages.attentionMsg||"Attention"}: ${u.messages.notReturnedMsg||"You haven't returned the material"} "${q.equipoNombre}" (x${q.cantidad}). ${u.messages.loanExpiredMsg||"Your loan expired on"} ${new Date(q.fechaDevolucionEsperada).toLocaleString("es-ES",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}.`);Y(`${u.messages.remindersSent} ${N.length} ${u.messages.remindersEnd}`,"success")}catch(q){console.error("Error al enviar notificaciones:",q),Y(u.messages.errorReminders,"error")}},ai=async O=>{var D,$,Q,P,te;O.preventDefault();const N=O.target.tipo.value,q=O.target.descripcion.value,oe=((D=O.target.fechaSolicitada)==null?void 0:D.value)||"",ue=(($=O.target.aulaNombre)==null?void 0:$.value)||"",ye=((Q=O.target.aulaId)==null?void 0:Q.value)||"",rt=((P=O.target.horaInicio)==null?void 0:P.value)||"",m=((te=O.target.horaFin)==null?void 0:te.value)||"";try{if(E.rol==="maestro"||E.rol==="admin"){const re=w.find(Z=>Z.id===ye);await di(Lt(ge,"reservas"),{aulaId:ye,aulaNombre:ue,fecha:oe,horaInicio:rt,horaFin:m,descripcion:q,aulaCapacidad:(re==null?void 0:re.capacidad)||0,aulaEquipo:(re==null?void 0:re.equipoDisponible)||"",reservadoPor:E.email,nombreReservador:E.email.split("@")[0],rol:E.rol,estado:"Confirmada",fechaReserva:new Date().toISOString()}),await Mt("admin","directReservationCreated",`${E.email} ${u.messages.reservedMsg||"reserved"} ${u.messages.roomMsg||"the room"} ${ue} ${u.messages.forMsg||"for"} ${oe} (${rt} - ${m}).`),Y(u.messages.directReserveCreated,"success")}else await di(Lt(ge,"solicitudes"),{tipo:N,descripcion:q,fechaSolicitada:oe,aulaNombre:ue,aulaId:ye,horaInicio:rt,horaFin:m,solicitadoPor:E.email,nombreSolicitador:E.email.split("@")[0],rol:E.rol,estado:"Pendiente",fechaSolicitud:new Date().toISOString()}),await Mt("admin","newRoomRequest",`${E.email} ${u.messages.asksForMsg||"asks for"} ${u.messages.roomMsg||"the room"} ${ue} ${u.messages.forMsg||"for"} ${oe} (${rt} - ${m}).`),Y(u.messages.requestSent,"success");O.target.reset(),sn(!1),jn(null)}catch{Y(u.messages.errorRequest,"error")}},La=async O=>{try{const q=(await vl(Le(ge,"solicitudes",O))).data();if(q.tipo==="Aula"){const oe={aulaNombre:q.aulaNombre,aulaId:q.aulaId,fecha:q.fechaSolicitada,horaInicio:q.horaInicio,horaFin:q.horaFin,descripcion:q.descripcion,aulaCapacidad:q.aulaCapacidad||0,aulaEquipo:q.aulaEquipo||"",reservadoPor:q.solicitadoPor,nombreReservador:q.nombreSolicitador,rol:q.rol,estado:"Confirmada",fechaReserva:new Date().toISOString()},ue=await di(Lt(ge,"reservas"),oe);await vn(Le(ge,"solicitudes",O),{estado:"Aprobada",fechaAprobacion:new Date().toISOString(),reservaId:ue.id}),await Mt(q.solicitadoPor,"roomReservationConfirmed",`${u.messages.readyMsg||"Ready"} ${u.messages.yourReservationMsg||"Your reservation"} ${u.messages.forMsg||"for"} ${u.messages.roomMsg||"the room"} ${q.aulaNombre} ${u.messages.onMsg||"on"} ${q.fechaSolicitada} (${q.horaInicio} - ${q.horaFin}) ${u.messages.hasBeenApprovedMsg||"has been approved"}​.`),R([{...oe,id:ue.id},...b]),j(k.map(ye=>ye.id===O?{...ye,estado:"Aprobada"}:ye)),Y(u.messages.requestApproved,"success")}}catch(N){console.error("Error al aprobar solicitud:",N),Y(u.messages.errorApprove+N.message,"error")}},pt=async O=>{try{const q=(await vl(Le(ge,"solicitudes",O))).data();await vn(Le(ge,"solicitudes",O),{estado:"Rechazada",fechaRechazo:new Date().toISOString()}),await Mt(q.solicitadoPor,"roomReservationRejected",`${u.messages.sorryMsg||"Sorry"}, ${u.messages.yourRequestMsg||"your request"} ${u.messages.forMsg||"for"} ${u.messages.roomMsg||"the room"} ${q.aulaNombre} ${u.messages.onMsg||"on"} ${q.fechaSolicitada} ${u.messages.wasRejectedMsg||"was rejected"} ${u.messages.byAdminMsg||"by the administrator"}.`),j(k.map(oe=>oe.id===O?{...oe,estado:"Rechazada"}:se)),Y(u.messages.requestRejected,"success")}catch(N){console.error("Error al rechazar solicitud:",N),Y("Error al rechazar solicitud","error")}},Cn=(O,N)=>{const q=[],oe=[7,8,9,10,11,12,13,14,15,16,17],ue=Dk(),ye=_y(),rt=N===ye;return oe.forEach(m=>{const D=`${String(m).padStart(2,"0")}:00`,$=m+1,Q=`${String($).padStart(2,"0")}:00`,P=b.find(Z=>Z.aulaId===O&&Z.fecha===N&&Z.horaInicio===D),te=k.find(Z=>Z.aulaId===O&&Z.fechaSolicitada===N&&Z.horaInicio===D&&Z.estado==="Pendiente"),re=rt&&m<ue;q.push({horaInicio:D,horaFin:Q,ocupado:!!P,reserva:P||null,conSolicitud:!!te,solicitud:te||null,pasado:re})}),q};if(E){const O=((fr=E.rol)==null?void 0:fr.toLowerCase())||"alumno",N=by[O]||by.alumno,q={admin:"badge-admin",maestro:"badge-maestro",alumno:"badge-alumno"}[O]||"badge-alumno",oe=new Date,ue=S.filter(m=>m.solicitadoPor===E.email&&m.estado==="Aprobada"&&!m.devuelto&&new Date(m.fechaDevolucionEsperada)<oe),ye=Bn.filter(m=>m.para===E.email||O==="admin"&&m.para==="admin"),rt=ye.filter(m=>!m.leida).length;return o.jsxs("div",{className:"dashboard-layout",children:[o.jsxs("aside",{className:"sidebar",children:[o.jsxs("div",{className:"sidebar-header",children:[o.jsx("h2",{children:" LabReserve "}),o.jsx("div",{className:`role-badge ${q}`,children:u.roles[E.rol]})]}),o.jsxs("nav",{className:"sidebar-menu",children:[o.jsx("button",{className:`menu-btn ${I==="inicio"?"activo":""}`,onClick:()=>M("inicio"),children:u.nav.home}),E.rol==="admin"&&o.jsx("button",{className:`menu-btn ${I==="roles"?"activo":""}`,onClick:()=>M("roles"),children:u.nav.roles}),N.gestionAulas&&o.jsx("button",{className:`menu-btn ${I==="aulas"?"activo":""}`,onClick:()=>M("aulas"),children:u.nav.classrooms}),N.gestionEquipos&&o.jsx("button",{className:`menu-btn ${I==="equipos"?"activo":""}`,onClick:()=>M("equipos"),children:u.nav.inventory}),o.jsx("button",{className:`menu-btn ${I==="aulasReservadas"?"activo":""}`,onClick:()=>M("aulasReservadas"),children:u.nav.reservedRooms}),o.jsx("button",{className:`menu-btn ${I==="aulasPúblicas"?"activo":""}`,onClick:()=>M("aulasPúblicas"),children:u.nav.availableRooms}),N.solicitarEquipos&&o.jsx("button",{className:`menu-btn ${I==="solicitudes"?"activo":""}`,onClick:()=>M("solicitudes"),children:u.nav.myRequests}),(N.verInventario||N.solicitarEquipos)&&o.jsx("button",{className:`menu-btn ${I==="inventario"?"activo":""}`,onClick:()=>M("inventario"),children:u.nav.inventoryView}),N.verSolicitudes&&o.jsxs("button",{className:`menu-btn ${I==="solicitudesAdmin"?"activo":""}`,onClick:()=>M("solicitudesAdmin"),children:[u.nav.requests," (",k.filter(m=>m.estado==="Pendiente").length,")"]}),N.verReservas&&o.jsx("button",{className:`menu-btn ${I==="reservasAdmin"?"activo":""}`,onClick:()=>M("reservasAdmin"),children:u.nav.allReservations}),o.jsxs("div",{className:"sidebar-footer",children:[o.jsx("p",{children:E.email}),o.jsx("button",{className:"btn-logout",onClick:ii,children:u.nav.logout})]})]})]}),o.jsxs("main",{className:"main-content",children:[o.jsxs("header",{className:"topbar",children:[o.jsx("div",{className:"topbar-title",children:o.jsx("h1",{id:"page-title",children:u.nav.home})}),o.jsxs("div",{className:"topbar-info",children:[o.jsxs("button",{onClick:()=>T(z==="es"?"en":"es"),title:u.topbar.langLabel,style:{display:"flex",alignItems:"center",gap:"6px",padding:"6px 14px",background:"transparent",border:"1.5px solid #e2e8f0",borderRadius:"6px",fontSize:"13px",fontWeight:"700",color:"#1e293b",cursor:"pointer",transition:"all 0.2s",letterSpacing:"0.5px",fontFamily:"inherit"},children:[o.jsx("span",{style:{fontSize:"16px"},children:z==="es"?"🇺🇸":"🇲🇽"}),o.jsx("span",{children:u.topbar.langButton})]}),o.jsx("span",{children:u.topbar.systemName}),E&&o.jsxs("div",{style:{position:"relative"},children:[o.jsxs("button",{onClick:()=>ni(!Ws),style:{background:"none",border:"none",fontSize:"24px",cursor:"pointer",padding:"5px",transition:"transform 0.2s",transform:Ws?"scale(1.1)":"scale(1)"},children:["🔔",rt>0&&o.jsx("span",{style:{position:"absolute",top:"0",right:"-5px",backgroundColor:"#ef4444",color:"white",borderRadius:"50%",width:"20px",height:"20px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",boxShadow:"0 2px 4px rgba(0,0,0,0.2)"},children:rt})]}),Ws&&o.jsxs("div",{style:{position:"absolute",top:"50px",right:"0",width:"350px",backgroundColor:"white",borderRadius:"12px",boxShadow:"0 10px 25px rgba(0,0,0,0.15)",zIndex:1e3,overflow:"hidden",border:"1px solid #e2e8f0",maxHeight:"500px",display:"flex",flexDirection:"column"},children:[o.jsxs("div",{style:{padding:"15px 20px",backgroundColor:"#f8fafc",borderBottom:"1px solid #e2e8f0",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[o.jsx("h3",{style:{margin:0,fontSize:"16px",color:"#1e293b"},children:u.notifications.title}),o.jsx("button",{onClick:()=>ni(!1),style:{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontWeight:"bold"},children:"✕"})]}),o.jsx("div",{style:{flex:1,overflowY:"auto",padding:"0"},children:ye.length===0?o.jsxs("div",{style:{textAlign:"center",padding:"40px 20px",color:"#94a3b8"},children:[o.jsx("p",{style:{fontSize:"30px",margin:"0 0 10px 0"},children:"📭"}),o.jsx("p",{style:{margin:0},children:u.notifications.empty})]}):ye.map(m=>o.jsx("div",{style:{padding:"15px 20px",borderBottom:"1px solid #f1f5f9",backgroundColor:m.leida?"#ffffff":"#f0f9ff",transition:"background-color 0.3s"},children:o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[o.jsxs("div",{children:[o.jsx("h4",{style:{margin:"0 0 5px 0",fontSize:"14px",color:m.leida?"#475569":"#0369a1",fontWeight:m.leida?"normal":"bold"},children:m.titulo}),o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"13px",color:"#64748b",lineHeight:"1.4"},children:m.descripcion}),o.jsx("small",{style:{color:"#94a3b8",fontSize:"11px"},children:m.fecha?new Date(m.fecha).toLocaleString("es-ES"):""})]}),!m.leida&&o.jsx("button",{onClick:()=>Qs(m.id),style:{background:"none",border:"none",color:"#3b82f6",cursor:"pointer",fontSize:"12px",fontWeight:"bold",padding:"4px 8px",borderRadius:"4px",whiteSpace:"nowrap"},children:"✔ Leída"})]})},m.id))})]})]})]})]}),ue.length>0&&o.jsxs("div",{style:{backgroundColor:"#fef2f2",border:"2px solid #ef4444",color:"#991b1b",padding:"20px",margin:"20px 30px 0 30px",borderRadius:"8px",display:"flex",alignItems:"center",gap:"20px",boxShadow:"0 4px 15px rgba(239, 68, 68, 0.3)"},children:[o.jsx("div",{style:{fontSize:"40px"},children:"⚠️"}),o.jsxs("div",{children:[o.jsx("h3",{style:{margin:"0 0 5px 0",fontSize:"18px",color:"#7f1d1d",fontWeight:"bold"},children:u.overdueAlert.title}),o.jsx("p",{style:{margin:"0 0 10px 0",fontSize:"14px"},children:u.overdueAlert.subtitle}),o.jsx("ul",{style:{margin:0,paddingLeft:"20px",fontSize:"13px"},children:ue.map(m=>o.jsxs("li",{children:[o.jsxs("strong",{children:[m.equipoNombre," (x",m.cantidad,")"]})," - Debió entregarse el ",new Date(m.fechaDevolucionEsperada).toLocaleString("es-ES",{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})]},m.id))})]})]}),a&&o.jsx("div",{className:`alert alert-${d}`,style:{margin:"20px 30px 0 30px"},children:a}),o.jsxs("div",{className:"content-area",children:[I==="inicio"&&o.jsxs("div",{style:{animation:"fadeIn 0.5s ease-in-out"},children:[o.jsx("style",{children:`
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

                    @keyframes slideUp {
                      from { opacity: 0; transform: translateY(20px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes expandBar {
                      from { width: 0; }
                    }
                    @keyframes fadeInItem {
                      from { opacity: 0; transform: translateX(-8px); }
                      to   { opacity: 1; transform: translateX(0); }
                    }

                    .lab-stat-card {
                      background: #ffffff;
                      border-radius: 6px;
                      padding: 28px 28px 24px;
                      border: 1px solid #e4e8ef;
                      position: relative;
                      overflow: hidden;
                      transition: box-shadow 0.25s ease, transform 0.25s ease;
                    }
                    .lab-stat-card:hover {
                      box-shadow: 0 8px 28px rgba(15,23,42,0.09);
                      transform: translateY(-3px);
                    }
                    .lab-stat-card .accent-line {
                      position: absolute;
                      left: 0; top: 0; bottom: 0;
                      width: 3px;
                      background: var(--line-color);
                    }

                    .lab-action-row {
                      display: flex;
                      align-items: center;
                      gap: 14px;
                      padding: 13px 16px;
                      border-radius: 6px;
                      border: 1px solid #e9edf3;
                      background: #fafbfc;
                      cursor: pointer;
                      transition: all 0.2s ease;
                      width: 100%;
                      text-align: left;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .lab-action-row:hover {
                      background: #ffffff;
                      border-color: #94a3b8;
                      box-shadow: 0 2px 12px rgba(15,23,42,0.07);
                    }

                    .lab-activity-row {
                      display: flex;
                      align-items: flex-start;
                      gap: 12px;
                      padding: 13px 0;
                      border-bottom: 1px solid #f1f5f9;
                      opacity: 0;
                      animation: fadeInItem 0.4s ease forwards;
                    }
                    .lab-activity-row:last-child {
                      border-bottom: none;
                    }

                    .lab-dot-unread {
                      width: 6px; height: 6px; border-radius: 50%;
                      background: #2563eb; flex-shrink: 0; margin-top: 6px;
                    }
                    .lab-dot-read {
                      width: 6px; height: 6px; border-radius: 50%;
                      background: #e2e8f0; flex-shrink: 0; margin-top: 6px;
                    }
                    
                    .lab-section-label {
                      font-size: 10px;
                      font-weight: 600;
                      letter-spacing: 1.4px;
                      text-transform: uppercase;
                      color: #94a3b8;
                      margin: 0 0 16px 0;
                      font-family: 'DM Sans', sans-serif;
                    }
                  `}),o.jsxs("div",{style:{background:"linear-gradient(100deg, #0f172a 0%, #1e293b 60%, #1e3a5f 100%)",borderRadius:"6px",padding:"36px 40px",marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",position:"relative",overflow:"hidden",animation:"slideUp 0.5s ease forwards"},children:[o.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",backgroundSize:"40px 40px"}}),o.jsx("div",{style:{position:"absolute",top:"-60px",right:"-60px",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsxs("div",{style:{position:"relative",zIndex:1},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"11px",fontWeight:"600",letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.45)",fontFamily:'"DM Sans", sans-serif'},children:u.home.panelLabel}),o.jsxs("h2",{style:{margin:"0 0 10px 0",fontSize:"26px",fontWeight:"400",color:"#ffffff",fontFamily:'"DM Serif Display", serif',letterSpacing:"0.2px",lineHeight:"1.25"},children:[u.home.welcome," ",o.jsx("span",{style:{fontStyle:"italic"},children:E.email.split("@")[0]})]}),o.jsx("p",{style:{margin:0,color:"rgba(255,255,255,0.5)",fontSize:"13.5px",fontFamily:'"DM Sans", sans-serif'},children:u.home.systemName})]}),o.jsxs("div",{style:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"6px"},children:[o.jsx("span",{style:{fontSize:"10px",fontWeight:"600",letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",fontFamily:'"DM Sans", sans-serif'},children:u.home.accessLevel}),o.jsx("div",{style:{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"4px",padding:"8px 20px"},children:o.jsx("span",{style:{color:"#ffffff",fontSize:"13px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",fontFamily:'"DM Sans", sans-serif'},children:u.roles[E.rol]})}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginTop:"2px"},children:[o.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:"#4ade80"}}),o.jsx("span",{style:{fontSize:"11px",color:"rgba(255,255,255,0.4)",fontFamily:'"DM Sans", sans-serif'},children:u.home.systemOnline})]})]})]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(210px, 1fr))",gap:"12px",marginBottom:"20px"},children:[o.jsxs("div",{className:"lab-stat-card",style:{"--line-color":"#2563eb",animation:"slideUp 0.4s ease 0.1s forwards",opacity:0},children:[o.jsx("div",{className:"accent-line"}),o.jsxs("div",{style:{paddingLeft:"4px"},children:[o.jsx("p",{className:"lab-section-label",children:u.home.registeredRooms}),o.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"18px"},children:[o.jsx("span",{style:{fontSize:"40px",fontWeight:"300",color:"#0f172a",lineHeight:1,fontFamily:'"DM Serif Display", serif'},children:w.length}),o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"#2563eb",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})]}),o.jsx("div",{style:{height:"2px",background:"#f1f5f9",borderRadius:"1px"},children:o.jsx("div",{style:{height:"100%",background:"#2563eb",borderRadius:"1px",width:`${Math.min(w.length/10*100,100)}%`,animation:"expandBar 1s ease 0.4s both"}})}),o.jsx("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.home.spaces})]})]}),o.jsxs("div",{className:"lab-stat-card",style:{"--line-color":"#059669",animation:"slideUp 0.4s ease 0.18s forwards",opacity:0},children:[o.jsx("div",{className:"accent-line"}),o.jsxs("div",{style:{paddingLeft:"4px"},children:[o.jsx("p",{className:"lab-section-label",children:u.home.stockUnits}),o.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"18px"},children:[o.jsx("span",{style:{fontSize:"40px",fontWeight:"300",color:"#0f172a",lineHeight:1,fontFamily:'"DM Serif Display", serif'},children:F.reduce((m,D)=>m+(D.cantidad||0),0)}),o.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:o.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})]}),o.jsx("div",{style:{height:"2px",background:"#f1f5f9",borderRadius:"1px"},children:o.jsx("div",{style:{height:"100%",background:"#059669",borderRadius:"1px",width:"72%",animation:"expandBar 1s ease 0.5s both"}})}),o.jsx("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.home.equipmentMaterials})]})]}),o.jsxs("div",{className:"lab-stat-card",style:{"--line-color":"#d97706",animation:"slideUp 0.4s ease 0.26s forwards",opacity:0},children:[o.jsx("div",{className:"accent-line"}),o.jsxs("div",{style:{paddingLeft:"4px"},children:[o.jsx("p",{className:"lab-section-label",children:u.home.confirmedReservations}),o.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"18px"},children:[o.jsx("span",{style:{fontSize:"40px",fontWeight:"300",color:"#0f172a",lineHeight:1,fontFamily:'"DM Serif Display", serif'},children:b.filter(m=>m.estado==="Confirmada").length}),o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"#d97706",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),o.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),o.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),o.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]})]}),o.jsx("div",{style:{height:"2px",background:"#f1f5f9",borderRadius:"1px"},children:o.jsx("div",{style:{height:"100%",background:"#d97706",borderRadius:"1px",width:`${Math.min(b.filter(m=>m.estado==="Confirmada").length/20*100,100)}%`,animation:"expandBar 1s ease 0.6s both"}})}),o.jsx("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.home.activeReservations})]})]}),O==="admin"||O==="maestro"?o.jsxs("div",{className:"lab-stat-card",style:{"--line-color":"#dc2626",animation:"slideUp 0.4s ease 0.34s forwards",opacity:0},children:[o.jsx("div",{className:"accent-line"}),o.jsxs("div",{style:{paddingLeft:"4px"},children:[o.jsx("p",{className:"lab-section-label",children:u.home.pendingRequests}),o.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"18px"},children:[o.jsx("span",{style:{fontSize:"40px",fontWeight:"300",lineHeight:1,fontFamily:'"DM Serif Display", serif',color:k.filter(m=>m.estado==="Pendiente").length+S.filter(m=>m.estado==="Pendiente").length>0?"#dc2626":"#0f172a"},children:k.filter(m=>m.estado==="Pendiente").length+S.filter(m=>m.estado==="Pendiente").length}),o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"#dc2626",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("polyline",{points:"12 6 12 12 16 14"})]})]}),o.jsx("div",{style:{height:"2px",background:"#f1f5f9",borderRadius:"1px"},children:o.jsx("div",{style:{height:"100%",background:"#dc2626",borderRadius:"1px",width:`${Math.min((k.filter(m=>m.estado==="Pendiente").length+S.filter(m=>m.estado==="Pendiente").length)/10*100,100)}%`,animation:"expandBar 1s ease 0.7s both"}})}),o.jsx("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.home.needAttention})]})]}):o.jsxs("div",{className:"lab-stat-card",style:{"--line-color":"#7c3aed",animation:"slideUp 0.4s ease 0.34s forwards",opacity:0},children:[o.jsx("div",{className:"accent-line"}),o.jsxs("div",{style:{paddingLeft:"4px"},children:[o.jsx("p",{className:"lab-section-label",children:u.home.myRequestsStat}),o.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"18px"},children:[o.jsx("span",{style:{fontSize:"40px",fontWeight:"300",color:"#0f172a",lineHeight:1,fontFamily:'"DM Serif Display", serif'},children:k.filter(m=>m.solicitadoPor===E.email).length+S.filter(m=>m.solicitadoPor===E.email).length}),o.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"#7c3aed",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.jsx("polyline",{points:"14 2 14 8 20 8"}),o.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),o.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]})]}),o.jsx("div",{style:{height:"2px",background:"#f1f5f9",borderRadius:"1px"},children:o.jsx("div",{style:{height:"100%",background:"#7c3aed",borderRadius:"1px",width:"45%",animation:"expandBar 1s ease 0.7s both"}})}),o.jsx("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.home.sentRequests})]})]})]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:"12px",animation:"slideUp 0.4s ease 0.42s forwards",opacity:0},children:[o.jsxs("div",{style:{background:"#ffffff",borderRadius:"6px",padding:"26px",border:"1px solid #e4e8ef"},children:[o.jsx("p",{className:"lab-section-label",children:u.home.quickAccess}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[o.jsxs("button",{className:"lab-action-row",onClick:()=>M("aulasPúblicas"),children:[o.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"4px",background:"#f0f4ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"#2563eb",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),o.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),o.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),o.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]})}),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",marginBottom:"1px"},children:u.home.checkAvailability}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8"},children:u.home.checkAvailabilitySub})]}),o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"2",children:o.jsx("polyline",{points:"9 18 15 12 9 6"})})]}),N.solicitarEquipos&&o.jsxs("button",{className:"lab-action-row",onClick:()=>M("inventario"),children:[o.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"4px",background:"#f0fdf6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsx("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:o.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})}),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",marginBottom:"1px"},children:u.home.requestMaterial}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8"},children:u.home.requestMaterialSub})]}),o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"2",children:o.jsx("polyline",{points:"9 18 15 12 9 6"})})]}),N.verSolicitudes&&o.jsxs("button",{className:"lab-action-row",onClick:()=>M("solicitudesAdmin"),children:[o.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"4px",background:"#fff5f5",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"#dc2626",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("polyline",{points:"12 6 12 12 16 14"})]})}),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",marginBottom:"1px"},children:u.home.manageRequests}),o.jsxs("div",{style:{fontSize:"11.5px",color:"#94a3b8"},children:[k.filter(m=>m.estado==="Pendiente").length+S.filter(m=>m.estado==="Pendiente").length," ",u.home.pending]})]}),o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"2",children:o.jsx("polyline",{points:"9 18 15 12 9 6"})})]}),O==="admin"&&o.jsxs("button",{className:"lab-action-row",onClick:()=>M("roles"),children:[o.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"4px",background:"#f5f3ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"#7c3aed",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"9",cy:"7",r:"4"}),o.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),o.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",marginBottom:"1px"},children:u.home.userManagement}),o.jsxs("div",{style:{fontSize:"11.5px",color:"#94a3b8"},children:[Qe.length," ",u.home.registered]})]}),o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"2",children:o.jsx("polyline",{points:"9 18 15 12 9 6"})})]}),N.verReservas&&o.jsxs("button",{className:"lab-action-row",onClick:()=>M("reservasAdmin"),children:[o.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"4px",background:"#fffbeb",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"#d97706",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})}),o.jsxs("div",{style:{flex:1},children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",marginBottom:"1px"},children:u.home.allReservations}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8"},children:u.home.fullHistory})]}),o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"2",children:o.jsx("polyline",{points:"9 18 15 12 9 6"})})]})]})]}),o.jsxs("div",{style:{background:"#ffffff",borderRadius:"6px",padding:"26px",border:"1px solid #e4e8ef"},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[o.jsx("p",{className:"lab-section-label",style:{margin:0},children:u.home.recentActivity}),ye.filter(m=>!m.leida).length>0&&o.jsxs("span",{style:{fontSize:"11px",color:"#2563eb",fontWeight:"600",fontFamily:'"DM Sans", sans-serif'},children:[ye.filter(m=>!m.leida).length," ",u.notifications.unread]})]}),o.jsx("div",{style:{maxHeight:"300px",overflowY:"auto"},children:ye.length===0?o.jsxs("div",{style:{padding:"40px 0",textAlign:"center"},children:[o.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",border:"1px solid #e2e8f0",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",children:[o.jsx("path",{d:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}),o.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]})}),o.jsx("p",{style:{fontSize:"13px",color:"#94a3b8",margin:0,fontFamily:'"DM Sans", sans-serif'},children:u.home.noActivity})]}):ye.slice(0,7).map((m,D)=>o.jsxs("div",{className:"lab-activity-row",style:{animationDelay:`${.5+D*.07}s`},children:[o.jsx("div",{className:m.leida?"lab-dot-read":"lab-dot-unread"}),o.jsxs("div",{style:{flex:1,minWidth:0},children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:m.leida?"400":"600",color:m.leida?"#64748b":"#1e293b",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontFamily:'"DM Sans", sans-serif',marginBottom:"2px"},children:(Na(m.titulo,m.claveNotificacion)||"").replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{1F300}-\u{1F9FF}]/gu,"").trim()}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontFamily:'"DM Sans", sans-serif'},children:(m.descripcion||"").replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{1F300}-\u{1F9FF}]/gu,"").trim()})]}),o.jsx("div",{style:{fontSize:"11px",color:"#cbd5e1",flexShrink:0,marginLeft:"12px",fontFamily:'"DM Sans", sans-serif',whiteSpace:"nowrap"},children:m.fecha?new Date(m.fecha).toLocaleString("es-ES",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):""})]},m.id))})]})]})]}),E.rol==="admin"&&I==="roles"&&o.jsxs("div",{style:{animation:"fadeIn 0.5s ease-in-out"},children:[o.jsx("style",{children:`
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

                    @keyframes rolesSlideUp {
                      from { opacity: 0; transform: translateY(20px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes rolesFadeInRow {
                      from { opacity: 0; transform: translateX(-6px); }
                      to   { opacity: 1; transform: translateX(0); }
                    }

                    .roles-input {
                      width: 100%;
                      padding: 10px 14px;
                      border: 1px solid #dde2ea;
                      border-radius: 4px;
                      font-size: 13px;
                      font-family: 'DM Sans', sans-serif;
                      color: #1e293b;
                      background: #ffffff;
                      transition: border-color 0.2s ease, box-shadow 0.2s ease;
                      outline: none;
                      box-sizing: border-box;
                    }
                    .roles-input:focus {
                      border-color: #2563eb;
                      box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
                    }
                    .roles-input::placeholder {
                      color: #b0b8c8;
                    }

                    .roles-submit-btn {
                      padding: 10px 24px;
                      background: #0f172a;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      font-size: 13px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      letter-spacing: 0.3px;
                      transition: background 0.2s ease, transform 0.15s ease;
                      white-space: nowrap;
                      height: 40px;
                    }
                    .roles-submit-btn:hover {
                      background: #1e293b;
                      transform: translateY(-1px);
                    }

                    .roles-table {
                      width: 100%;
                      border-collapse: collapse;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .roles-table thead tr {
                      background: #f8fafc;
                      border-bottom: 1px solid #e4e8ef;
                    }
                    .roles-table thead th {
                      padding: 11px 16px;
                      text-align: left;
                      font-size: 10px;
                      font-weight: 600;
                      letter-spacing: 1.2px;
                      text-transform: uppercase;
                      color: #94a3b8;
                    }
                    .roles-table tbody tr {
                      border-bottom: 1px solid #f1f5f9;
                      transition: background 0.15s ease;
                      opacity: 0;
                      animation: rolesFadeInRow 0.35s ease forwards;
                    }
                    .roles-table tbody tr:hover {
                      background: #fafbfc;
                    }
                    .roles-table tbody tr:last-child {
                      border-bottom: none;
                    }
                    .roles-table td {
                      padding: 13px 16px;
                      font-size: 13px;
                      color: #334155;
                      vertical-align: middle;
                    }

                    .roles-select {
                      padding: 6px 10px;
                      border: 1px solid #e4e8ef;
                      border-radius: 4px;
                      font-size: 12px;
                      font-family: 'DM Sans', sans-serif;
                      color: #334155;
                      background: #fafbfc;
                      cursor: pointer;
                      transition: border-color 0.2s ease;
                      outline: none;
                      min-width: 130px;
                    }
                    .roles-select:focus {
                      border-color: #2563eb;
                      box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
                    }
                    .roles-select:disabled {
                      opacity: 0.5;
                      cursor: not-allowed;
                    }

                    .roles-revoke-btn {
                      padding: 6px 14px;
                      background: transparent;
                      color: #dc2626;
                      border: 1px solid #fca5a5;
                      border-radius: 4px;
                      font-size: 11px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      letter-spacing: 0.3px;
                      transition: all 0.2s ease;
                    }
                    .roles-revoke-btn:hover {
                      background: #fef2f2;
                      border-color: #dc2626;
                    }
                    .roles-revoke-btn:disabled {
                      opacity: 0.4;
                      cursor: not-allowed;
                    }

                    .roles-badge {
                      display: inline-block;
                      padding: 3px 10px;
                      border-radius: 3px;
                      font-size: 10px;
                      font-weight: 700;
                      letter-spacing: 0.8px;
                      text-transform: uppercase;
                    }
                    .roles-badge-admin   { background: #fef2f2; color: #dc2626; }
                    .roles-badge-maestro { background: #eff6ff; color: #2563eb; }
                    .roles-badge-alumno  { background: #f0fdf4; color: #16a34a; }
                  `}),o.jsxs("div",{style:{background:"linear-gradient(100deg, #0f172a 0%, #1e293b 60%, #1e3a5f 100%)",borderRadius:"6px",padding:"32px 40px",marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",position:"relative",overflow:"hidden",animation:"rolesSlideUp 0.5s ease forwards"},children:[o.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",backgroundSize:"40px 40px"}}),o.jsx("div",{style:{position:"absolute",top:"-60px",right:"-60px",width:"280px",height:"280px",borderRadius:"50%",background:"radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsxs("div",{style:{position:"relative",zIndex:1},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"11px",fontWeight:"600",letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.45)",fontFamily:'"DM Sans", sans-serif'},children:"Administración del Sistema"}),o.jsxs("h2",{style:{margin:"0 0 8px 0",fontSize:"24px",fontWeight:"400",color:"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:"1.25"},children:[u.rolesPage.title," ",o.jsx("span",{style:{fontStyle:"italic"},children:u.rolesPage.titleItalic})]}),o.jsx("p",{style:{margin:0,color:"rgba(255,255,255,0.45)",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:u.rolesPage.subtitle})]}),o.jsx("div",{style:{position:"relative",zIndex:1,display:"flex",gap:"12px",flexWrap:"wrap"},children:[{label:u.rolesPage.totalUsers,value:Qe.length},{label:u.rolesPage.admins,value:Qe.filter(m=>m.rol==="admin").length},{label:u.rolesPage.teachers,value:Qe.filter(m=>m.rol==="maestro").length},{label:u.rolesPage.students,value:Qe.filter(m=>m.rol==="alumno").length}].map((m,D)=>o.jsxs("div",{style:{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",padding:"10px 16px",textAlign:"center",minWidth:"80px"},children:[o.jsx("div",{style:{fontSize:"20px",fontWeight:"300",color:"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:1,marginBottom:"4px"},children:m.value}),o.jsx("div",{style:{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase",letterSpacing:"0.5px"},children:m.label})]},D))})]}),o.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e4e8ef",borderRadius:"6px",marginBottom:"20px",overflow:"hidden",animation:"rolesSlideUp 0.4s ease 0.1s forwards",opacity:0},children:[o.jsxs("div",{style:{padding:"16px 24px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:"10px",background:"#fafbfc"},children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"#f0f4ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#2563eb",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"9",cy:"7",r:"4"}),o.jsx("line",{x1:"19",y1:"8",x2:"19",y2:"14"}),o.jsx("line",{x1:"22",y1:"11",x2:"16",y2:"11"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:u.rolesPage.formTitle}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.rolesPage.formSubtitle})]})]}),o.jsx("div",{style:{padding:"20px 24px"},children:o.jsx("form",{onSubmit:Da,children:o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 220px auto",gap:"12px",alignItems:"flex-end"},children:[o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.rolesPage.emailLabel}),o.jsx("input",{name:"emailAsignar",type:"email",className:"roles-input",placeholder:u.rolesPage.emailPlaceholder,required:!0})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.rolesPage.accessLevel}),o.jsxs("select",{name:"rolAsignar",className:"roles-input",required:!0,style:{cursor:"pointer"},children:[o.jsx("option",{value:"",children:u.rolesPage.selectRole}),o.jsx("option",{value:"maestro",children:u.rolesPage.roleTeacher}),o.jsx("option",{value:"admin",children:u.rolesPage.roleAdmin}),o.jsx("option",{value:"alumno",children:u.rolesPage.roleStudent})]})]}),o.jsx("button",{type:"submit",className:"roles-submit-btn",children:u.rolesPage.assignBtn})]})})})]}),o.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e4e8ef",borderRadius:"6px",overflow:"hidden",animation:"rolesSlideUp 0.4s ease 0.2s forwards",opacity:0},children:[o.jsxs("div",{style:{padding:"16px 24px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fafbfc"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"#f5f3ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#7c3aed",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"9",cy:"7",r:"4"}),o.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),o.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:u.rolesPage.tableTitle}),o.jsxs("div",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:[Qe.length," ",u.rolesPage.tableSubtitle]})]})]}),o.jsx("div",{style:{display:"flex",gap:"6px"},children:[{rol:"admin",label:u.roles.admin,color:"#dc2626",bg:"#fef2f2"},{rol:"maestro",label:u.roles.maestro,color:"#2563eb",bg:"#eff6ff"},{rol:"alumno",label:u.roles.alumno,color:"#16a34a",bg:"#f0fdf4"}].map(({rol:m,label:D,color:$,bg:Q})=>{const P=Qe.filter(te=>te.rol===m).length;return o.jsxs("div",{style:{background:Q,border:`1px solid ${$}22`,borderRadius:"4px",padding:"4px 12px",display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:$,display:"inline-block"}}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:$,fontFamily:'"DM Sans", sans-serif'},children:[P," ",D,P!==1?"s":""]})]},m)})})]}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs("table",{className:"roles-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.rolesPage.colUser}),o.jsx("th",{children:u.rolesPage.colAccess}),o.jsx("th",{children:u.rolesPage.colDate}),o.jsx("th",{style:{textAlign:"right"},children:u.rolesPage.colActions})]})}),o.jsx("tbody",{children:Qe.length===0?o.jsx("tr",{style:{opacity:1},children:o.jsxs("td",{colSpan:"4",style:{textAlign:"center",padding:"40px",color:"#94a3b8"},children:[o.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",border:"1px solid #e2e8f0",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",children:[o.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"9",cy:"7",r:"4"})]})}),u.rolesPage.loadingUsers]})}):Qe.map((m,D)=>{const $=m.correo===E.email,Q=m.rol==="admin"?"roles-badge-admin":m.rol==="maestro"?"roles-badge-maestro":"roles-badge-alumno";return o.jsxs("tr",{style:{animationDelay:`${.25+D*.04}s`},children:[o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"50%",background:m.rol==="admin"?"#fef2f2":m.rol==="maestro"?"#eff6ff":"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1px solid ${m.rol==="admin"?"#fca5a5":m.rol==="maestro"?"#93c5fd":"#86efac"}`},children:o.jsx("span",{style:{fontSize:"12px",fontWeight:"700",color:m.rol==="admin"?"#dc2626":m.rol==="maestro"?"#2563eb":"#16a34a",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase"},children:m.correo.charAt(0)})}),o.jsxs("div",{children:[o.jsxs("div",{style:{fontWeight:"600",color:"#1e293b",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:[m.correo.split("@")[0],$&&o.jsx("span",{style:{marginLeft:"6px",fontSize:"10px",color:"#94a3b8",fontWeight:"400"},children:u.rolesPage.you})]}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:m.correo})]})]})}),o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsxs("select",{value:m.rol,onChange:P=>Pa(m.id,P.target.value,m.correo),className:"roles-select",disabled:$,children:[o.jsx("option",{value:"admin",children:u.rolesPage.roleAdmin}),o.jsx("option",{value:"maestro",children:u.rolesPage.roleTeacher}),o.jsx("option",{value:"alumno",children:u.rolesPage.roleStudent})]}),o.jsx("span",{className:`roles-badge ${Q}`,children:Fi(m.rol)})]})}),o.jsx("td",{style:{color:"#64748b",fontSize:"12px",fontFamily:'"DM Sans", sans-serif'},children:m.fechaRegistro?new Date(m.fechaRegistro).toLocaleDateString("es-ES",{year:"numeric",month:"short",day:"numeric"}):o.jsx("span",{style:{color:"#cbd5e1"},children:"—"})}),o.jsx("td",{style:{textAlign:"right"},children:o.jsx("button",{className:"roles-revoke-btn",onClick:()=>fu(m.id,m.correo),disabled:$,children:u.rolesPage.revokeBtn})})]},m.id)})})]})}),Qe.length>0&&o.jsxs("div",{style:{padding:"12px 24px",borderTop:"1px solid #f1f5f9",background:"#fafbfc",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[o.jsxs("span",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:[u.rolesPage.showing," ",Qe.length," ",u.rolesPage.users]}),o.jsx("span",{style:{fontSize:"11px",color:"#cbd5e1",fontFamily:'"DM Sans", sans-serif'},children:u.rolesPage.changesApply})]})]})]}),N.gestionAulas&&I==="aulas"&&o.jsxs("div",{style:{animation:"fadeIn 0.5s ease-in-out"},children:[o.jsx("style",{children:`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

      /* ── Keyframes ── */
      @keyframes auSlideUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes auFadeRow {
        from { opacity: 0; transform: translateX(-5px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes auExpandBar {
        from { width: 0; }
      }
      @keyframes auPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(5,150,105,0.4); }
        50%       { box-shadow: 0 0 0 6px rgba(5,150,105,0); }
      }

      /* ── Inputs ── */
      .au-input {
        width: 100%;
        padding: 9px 13px;
        border: 1px solid #dde2ea;
        border-radius: 4px;
        font-size: 13px;
        font-family: 'DM Sans', sans-serif;
        color: #1e293b;
        background: #ffffff;
        transition: border-color 0.2s, box-shadow 0.2s;
        outline: none;
        box-sizing: border-box;
      }
      .au-input:focus {
        border-color: #059669;
        box-shadow: 0 0 0 3px rgba(5,150,105,0.09);
      }
      .au-input::placeholder { color: #b8c0cc; }

      /* ── Buttons ── */
      .au-btn-dark {
        padding: 9px 20px;
        background: #0f172a;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        letter-spacing: 0.3px;
        transition: background 0.2s, transform 0.15s;
        white-space: nowrap;
      }
      .au-btn-dark:hover { background: #1e293b; transform: translateY(-1px); }

      .au-btn-green {
        padding: 9px 20px;
        background: #059669;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s;
        white-space: nowrap;
      }
      .au-btn-green:hover { background: #047857; transform: translateY(-1px); }

      .au-btn-ghost {
        padding: 6px 14px;
        background: transparent;
        border: 1px solid #e4e8ef;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        color: #64748b;
        transition: all 0.2s;
      }
      .au-btn-ghost:hover { border-color: #94a3b8; background: #f8fafc; color: #334155; }

      .au-btn-danger {
        padding: 6px 14px;
        background: transparent;
        border: 1px solid #fca5a5;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        color: #dc2626;
        transition: all 0.2s;
      }
      .au-btn-danger:hover { border-color: #dc2626; background: #fef2f2; }

      /* ── Cards ── */
      .au-card {
        background: #fff;
        border: 1px solid #e4e8ef;
        border-radius: 6px;
        overflow: hidden;
        opacity: 0;
        animation: auSlideUp 0.4s ease forwards;
      }
      .au-card-header {
        padding: 14px 20px;
        border-bottom: 1px solid #f1f5f9;
        background: #fafbfc;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      /* ── Table ── */
      .au-table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'DM Sans', sans-serif;
      }
      .au-table thead tr {
        background: #f8fafc;
        border-bottom: 1px solid #e4e8ef;
      }
      .au-table thead th {
        padding: 10px 16px;
        text-align: left;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: #94a3b8;
      }
      .au-table tbody tr {
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.15s;
        opacity: 0;
        animation: auFadeRow 0.3s ease forwards;
      }
      .au-table tbody tr:last-child { border-bottom: none; }
      .au-table tbody tr:hover { background: #fafbfc; }
      .au-table td {
        padding: 12px 16px;
        font-size: 13px;
        color: #334155;
        vertical-align: middle;
      }

      /* ── Badges ── */
      .au-badge {
        display: inline-block;
        padding: 3px 9px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-transform: uppercase;
        font-family: 'DM Sans', sans-serif;
      }
      .au-badge-green  { background: #f0fdf4; color: #16a34a; }
      .au-badge-red    { background: #fef2f2; color: #dc2626; }
      .au-badge-amber  { background: #fffbeb; color: #b45309; }
      .au-badge-blue   { background: #eff6ff; color: #2563eb; }
      .au-badge-slate  { background: #f1f5f9; color: #475569; }

      /* ── Icon circle ── */
      .au-icon-box {
        width: 30px;
        height: 30px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      /* ── Labels ── */
      .au-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.3px;
        text-transform: uppercase;
        color: #94a3b8;
        margin: 0 0 6px 0;
        font-family: 'DM Sans', sans-serif;
        display: block;
      }

      /* ── Capacity bar ── */
      .au-bar-track {
        height: 3px;
        background: #f1f5f9;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 5px;
        width: 72px;
      }
      .au-bar-fill {
        height: 100%;
        border-radius: 2px;
        animation: auExpandBar 0.9s ease both;
      }

      /* ── Empty state ── */
      .au-empty {
        text-align: center;
        padding: 44px 20px;
        color: #94a3b8;
        font-family: 'DM Sans', sans-serif;
      }
    `}),o.jsxs("div",{style:{background:"linear-gradient(105deg, #0f172a 0%, #064e3b 50%, #065f46 100%)",borderRadius:"6px",padding:"32px 40px",marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",position:"relative",overflow:"hidden",animation:"auSlideUp 0.5s ease forwards"},children:[o.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",backgroundSize:"40px 40px"}}),o.jsx("div",{style:{position:"absolute",top:"-50px",right:"-30px",width:"260px",height:"260px",borderRadius:"50%",background:"radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsx("div",{style:{position:"absolute",bottom:"-40px",left:"30%",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsxs("div",{style:{position:"relative",zIndex:1},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"11px",fontWeight:"600",letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",fontFamily:'"DM Sans", sans-serif'},children:u.classrooms.sectionLabel}),o.jsxs("h2",{style:{margin:"0 0 8px 0",fontSize:"24px",fontWeight:"400",color:"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:"1.25"},children:[u.classrooms.title," ",o.jsx("span",{style:{fontStyle:"italic"},children:u.classrooms.titleItalic})]}),o.jsx("p",{style:{margin:0,color:"rgba(255,255,255,0.42)",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:u.classrooms.subtitle})]}),o.jsx("div",{style:{position:"relative",zIndex:1,display:"flex",gap:"10px",flexWrap:"wrap"},children:[{label:u.classrooms.totalRooms,value:w.length,warn:!1},{label:u.classrooms.available,value:w.filter(m=>m.estado==="Disponible").length,warn:!1},{label:u.classrooms.maintenance,value:w.filter(m=>m.estado==="Mantenimiento").length,warn:w.filter(m=>m.estado==="Mantenimiento").length>0},{label:u.classrooms.activeReservations,value:b.filter(m=>m.estado==="Confirmada").length,warn:!1}].map((m,D)=>o.jsxs("div",{style:{background:m.warn?"rgba(220,38,38,0.15)":"rgba(255,255,255,0.07)",border:`1px solid ${m.warn?"rgba(220,38,38,0.35)":"rgba(255,255,255,0.1)"}`,borderRadius:"4px",padding:"10px 14px",textAlign:"center",minWidth:"76px"},children:[o.jsx("div",{style:{fontSize:"20px",fontWeight:"300",color:m.warn?"#fca5a5":"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:1,marginBottom:"4px"},children:m.value}),o.jsx("div",{style:{fontSize:"10px",color:m.warn?"rgba(252,165,165,0.8)":"rgba(255,255,255,0.38)",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase",letterSpacing:"0.4px"},children:m.label})]},D))})]}),o.jsxs("div",{className:"au-card",style:{marginBottom:"16px",animationDelay:"0.08s"},children:[o.jsxs("div",{className:"au-card-header",style:{justifyContent:"space-between"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{className:"au-icon-box",style:{background:"#f0fdf4"},children:o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),o.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:u.classrooms.newRoomTitle}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.classrooms.newRoomSubtitle})]})]}),o.jsx("button",{onClick:()=>he(!ae),style:{padding:"7px 16px",background:ae?"#f1f5f9":"#0f172a",color:ae?"#64748b":"#fff",border:"1px solid "+(ae?"#e4e8ef":"transparent"),borderRadius:"4px",fontSize:"12px",fontWeight:"600",fontFamily:'"DM Sans", sans-serif',cursor:"pointer",transition:"all 0.2s",letterSpacing:"0.2px"},children:ae?u.classrooms.cancelBtn:u.classrooms.newRoomBtn})]}),ae&&o.jsx("div",{style:{padding:"20px 24px",borderTop:"1px solid #f1f5f9",background:"#ffffff"},children:o.jsxs("form",{onSubmit:si,children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 150px 200px",gap:"14px",alignItems:"flex-end",marginBottom:"14px"},children:[o.jsxs("div",{children:[o.jsx("label",{className:"au-label",children:u.classrooms.nameLabel}),o.jsx("input",{name:"nombre",className:"au-input",placeholder:u.classrooms.namePlaceholder,required:!0})]}),o.jsxs("div",{children:[o.jsx("label",{className:"au-label",children:u.classrooms.capacityLabel}),o.jsx("input",{name:"capacidad",type:"number",min:"1",className:"au-input",placeholder:"30",required:!0})]}),o.jsxs("div",{children:[o.jsx("label",{className:"au-label",children:u.classrooms.equipmentLabel}),o.jsxs("select",{name:"equipo",className:"au-input",required:!0,style:{cursor:"pointer"},children:[o.jsx("option",{value:"",children:u.classrooms.selectEquip}),o.jsx("option",{value:"Gafas RV",children:u.classrooms.vrGlasses}),o.jsx("option",{value:"Cámaras",children:u.classrooms.cameras}),o.jsx("option",{value:"Laptops",children:u.classrooms.laptops}),o.jsx("option",{value:"Proyector",children:u.classrooms.projector}),o.jsx("option",{value:"Pantalla interactiva",children:u.classrooms.interactiveScreen}),o.jsx("option",{value:"Múltiple",children:u.classrooms.multiple}),o.jsx("option",{value:"Sin equipo",children:u.classrooms.noEquip})]})]})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"},children:[o.jsx("button",{type:"button",className:"au-btn-ghost",onClick:()=>he(!1),children:u.classrooms.cancel}),o.jsx("button",{type:"submit",className:"au-btn-green",children:u.classrooms.registerBtn})]})]})})]}),o.jsxs("div",{className:"au-card",style:{animationDelay:"0.14s"},children:[o.jsxs("div",{style:{padding:"12px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"},children:[o.jsxs("span",{style:{fontSize:"11.5px",color:"#64748b",fontFamily:'"DM Sans", sans-serif'},children:[o.jsx("span",{style:{fontWeight:"600",color:"#1e293b"},children:w.length})," ",u.classrooms.tableSummary," ",o.jsx("span",{style:{fontWeight:"600",color:"#059669"},children:w.reduce((m,D)=>m+(parseInt(D.capacidad)||0),0)})," ",u.classrooms.people]}),o.jsx("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:[{label:u.classrooms.available,count:w.filter(m=>m.estado==="Disponible").length,color:"#059669",bg:"#f0fdf4"},{label:u.classrooms.maintenance,count:w.filter(m=>m.estado==="Mantenimiento").length,color:"#b45309",bg:"#fffbeb"}].map(({label:m,count:D,color:$,bg:Q})=>o.jsxs("div",{style:{background:Q,border:`1px solid ${$}20`,borderRadius:"4px",padding:"4px 11px",display:"flex",alignItems:"center",gap:"5px"},children:[o.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:$,display:"inline-block",flexShrink:0}}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:$,fontFamily:'"DM Sans", sans-serif'},children:[D," ",m]})]},m))})]}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs("table",{className:"au-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.classrooms.colRoom}),o.jsx("th",{children:u.classrooms.colCapacity}),o.jsx("th",{children:u.classrooms.colEquipment}),o.jsx("th",{children:u.classrooms.colStatus}),o.jsx("th",{children:u.classrooms.colActiveRes}),o.jsx("th",{children:u.classrooms.colCreated}),o.jsx("th",{style:{textAlign:"right"},children:u.classrooms.colActions})]})}),o.jsx("tbody",{children:w.length===0?o.jsx("tr",{style:{opacity:1},children:o.jsx("td",{colSpan:"7",children:o.jsxs("div",{className:"au-empty",children:[o.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"50%",border:"1px solid #e2e8f0",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})}),o.jsx("p",{style:{margin:0,fontSize:"13px"},children:u.classrooms.noRooms}),o.jsx("p",{style:{margin:"4px 0 0",fontSize:"11.5px",color:"#cbd5e1"},children:u.classrooms.noRoomsHint})]})})}):w.map((m,D)=>{const $=m.estado==="Mantenimiento",Q=b.filter(Z=>Z.aulaId===m.id&&Z.estado==="Confirmada").length,P=Math.max(...w.map(Z=>parseInt(Z.capacidad)||0),1),te=Math.min((parseInt(m.capacidad)||0)/P*100,100),re=$?"#b45309":"#059669";return o.jsxs("tr",{style:{animationDelay:`${.18+D*.035}s`},children:[o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"34px",height:"34px",borderRadius:"5px",flexShrink:0,background:$?"#fffbeb":"#f0fdf4",border:`1px solid ${$?"#fde68a":"#86efac"}`,display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:$?"#b45309":"#059669",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#1e293b",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:m.nombre}),o.jsx("div",{style:{fontSize:"10.5px",color:"#b0bac9",fontFamily:'"DM Sans", sans-serif'},children:m.creada?new Date(m.creada).toLocaleDateString("es-ES",{year:"numeric",month:"short",day:"numeric"}):"—"})]})]})}),o.jsx("td",{children:o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:o.jsxs("div",{children:[o.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:"3px"},children:[o.jsx("span",{style:{fontFamily:'"DM Serif Display", serif',fontSize:"18px",fontWeight:"300",color:"#0f172a",lineHeight:1},children:m.capacidad}),o.jsx("span",{style:{fontSize:"10.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.classrooms.people})]}),o.jsx("div",{className:"au-bar-track",children:o.jsx("div",{className:"au-bar-fill",style:{width:`${te}%`,background:re,animationDelay:`${.3+D*.04}s`}})})]})})}),o.jsx("td",{children:o.jsx("span",{className:"au-badge au-badge-slate",children:m.equipoDisponible?Gs(m.equipoDisponible):"—"})}),o.jsx("td",{children:o.jsx("span",{className:`au-badge ${$?"au-badge-amber":"au-badge-green"}`,children:pn(m.estado||"Disponible")})}),o.jsx("td",{children:Q>0?o.jsxs("span",{className:"au-badge au-badge-blue",children:[Q," reserva",Q!==1?"s":""]}):o.jsx("span",{style:{fontSize:"12px",color:"#cbd5e1",fontFamily:'"DM Sans", sans-serif'},children:"—"})}),o.jsx("td",{children:o.jsx("div",{style:{fontSize:"12px",color:"#64748b",fontFamily:'"DM Sans", sans-serif'},children:m.creada?new Date(m.creada).toLocaleDateString("es-ES",{year:"numeric",month:"short",day:"numeric"}):o.jsx("span",{style:{color:"#cbd5e1"},children:"—"})})}),o.jsx("td",{style:{textAlign:"right"},children:o.jsx("button",{className:"au-btn-danger",onClick:()=>Js(m.id),children:u.classrooms.deleteBtn})})]},m.id)})})]})}),w.length>0&&o.jsxs("div",{style:{padding:"10px 20px",borderTop:"1px solid #f1f5f9",background:"#fafbfc",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[o.jsxs("span",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:[w.length," ",u.classrooms.tableSummary," · ",w.reduce((m,D)=>m+(parseInt(D.capacidad)||0),0)," ",u.classrooms.people]}),o.jsxs("span",{style:{fontSize:"11px",color:"#cbd5e1",fontFamily:'"DM Sans", sans-serif',display:"flex",alignItems:"center",gap:"5px"},children:[o.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),o.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),u.classrooms.footerNote]})]})]})]}),N.gestionEquipos&&I==="equipos"&&o.jsxs("div",{style:{animation:"fadeIn 0.5s ease-in-out"},children:[o.jsx("style",{children:`
                  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

                  @keyframes giSlideUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes giFadeRow {
                    from { opacity: 0; transform: translateX(-5px); }
                    to   { opacity: 1; transform: translateX(0); }
                  }
                  @keyframes giExpandBar {
                    from { width: 0; }
                  }
                  @keyframes giPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                  }

                  /* ── Inputs & Controls ── */
                  .gi-input {
                    width: 100%;
                    padding: 9px 13px;
                    border: 1px solid #dde2ea;
                    border-radius: 4px;
                    font-size: 13px;
                    font-family: 'DM Sans', sans-serif;
                    color: #1e293b;
                    background: #ffffff;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    outline: none;
                    box-sizing: border-box;
                  }
                  .gi-input:focus {
                    border-color: #059669;
                    box-shadow: 0 0 0 3px rgba(5,150,105,0.09);
                  }
                  .gi-input::placeholder { color: #b8c0cc; }

                  /* ── Buttons ── */
                  .gi-btn-dark {
                    padding: 9px 20px;
                    background: #0f172a;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 13px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    letter-spacing: 0.3px;
                    transition: background 0.2s, transform 0.15s;
                    white-space: nowrap;
                  }
                  .gi-btn-dark:hover { background: #1e293b; transform: translateY(-1px); }

                  .gi-btn-green {
                    padding: 9px 20px;
                    background: #059669;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 13px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.15s;
                    white-space: nowrap;
                  }
                  .gi-btn-green:hover { background: #047857; transform: translateY(-1px); }

                  .gi-btn-ghost {
                    padding: 6px 14px;
                    background: transparent;
                    border: 1px solid #e4e8ef;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    color: #64748b;
                    transition: all 0.2s;
                  }
                  .gi-btn-ghost:hover { border-color: #94a3b8; background: #f8fafc; color: #334155; }

                  .gi-btn-danger {
                    padding: 6px 14px;
                    background: transparent;
                    border: 1px solid #fca5a5;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    color: #dc2626;
                    transition: all 0.2s;
                  }
                  .gi-btn-danger:hover { border-color: #dc2626; background: #fef2f2; }

                  .gi-btn-approve {
                    padding: 6px 14px;
                    background: transparent;
                    border: 1px solid #86efac;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    color: #16a34a;
                    transition: all 0.2s;
                  }
                  .gi-btn-approve:hover { border-color: #16a34a; background: #f0fdf4; }

                  .gi-btn-return {
                    padding: 6px 14px;
                    background: #f0fdf4;
                    border: 1px solid #86efac;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    color: #16a34a;
                    transition: all 0.2s;
                  }
                  .gi-btn-return:hover { background: #dcfce7; border-color: #16a34a; }

                  /* ── Tabs ── */
                  .gi-tab-bar {
                    display: flex;
                    gap: 2px;
                    background: #f1f5f9;
                    padding: 4px;
                    border-radius: 6px;
                    width: fit-content;
                  }
                  .gi-tab {
                    padding: 7px 18px;
                    border: none;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: transparent;
                    color: #64748b;
                    white-space: nowrap;
                    letter-spacing: 0.2px;
                  }
                  .gi-tab:hover { color: #334155; background: rgba(255,255,255,0.6); }
                  .gi-tab.active {
                    background: #ffffff;
                    color: #0f172a;
                    box-shadow: 0 1px 4px rgba(15,23,42,0.1);
                  }

                  /* ── Tables ── */
                  .gi-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: 'DM Sans', sans-serif;
                  }
                  .gi-table thead tr {
                    background: #f8fafc;
                    border-bottom: 1px solid #e4e8ef;
                  }
                  .gi-table thead th {
                    padding: 10px 16px;
                    text-align: left;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 1.2px;
                    text-transform: uppercase;
                    color: #94a3b8;
                  }
                  .gi-table tbody tr {
                    border-bottom: 1px solid #f1f5f9;
                    transition: background 0.15s;
                    opacity: 0;
                    animation: giFadeRow 0.3s ease forwards;
                  }
                  .gi-table tbody tr:last-child { border-bottom: none; }
                  .gi-table tbody tr:hover { background: #fafbfc; }
                  .gi-table td {
                    padding: 12px 16px;
                    font-size: 13px;
                    color: #334155;
                    vertical-align: middle;
                  }

                  /* ── Badges ── */
                  .gi-badge {
                    display: inline-block;
                    padding: 3px 9px;
                    border-radius: 3px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.7px;
                    text-transform: uppercase;
                    font-family: 'DM Sans', sans-serif;
                  }
                  .gi-badge-green  { background: #f0fdf4; color: #16a34a; }
                  .gi-badge-red    { background: #fef2f2; color: #dc2626; }
                  .gi-badge-amber  { background: #fffbeb; color: #b45309; }
                  .gi-badge-blue   { background: #eff6ff; color: #2563eb; }
                  .gi-badge-gray   { background: #f8fafc; color: #64748b; border: 1px solid #e4e8ef; }
                  .gi-badge-slate  { background: #f1f5f9; color: #475569; }

                  /* ── Cards ── */
                  .gi-card {
                    background: #fff;
                    border: 1px solid #e4e8ef;
                    border-radius: 6px;
                    overflow: hidden;
                    opacity: 0;
                    animation: giSlideUp 0.4s ease forwards;
                  }
                  .gi-card-header {
                    padding: 14px 20px;
                    border-bottom: 1px solid #f1f5f9;
                    background: #fafbfc;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                  }

                  /* ── Qty input ── */
                  .gi-qty {
                    width: 66px;
                    padding: 5px 8px;
                    border: 1px solid #e4e8ef;
                    border-radius: 4px;
                    font-size: 13px;
                    font-family: 'DM Sans', sans-serif;
                    text-align: center;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    background: #fafbfc;
                  }
                  .gi-qty:focus {
                    border-color: #059669;
                    box-shadow: 0 0 0 3px rgba(5,150,105,0.08);
                    background: #fff;
                  }

                  /* ── Stock bar ── */
                  .gi-bar-track {
                    height: 3px;
                    background: #f1f5f9;
                    border-radius: 2px;
                    overflow: hidden;
                    margin-top: 5px;
                    width: 72px;
                  }
                  .gi-bar-fill {
                    height: 100%;
                    border-radius: 2px;
                    animation: giExpandBar 0.9s ease both;
                  }

                  /* ── Icon circle ── */
                  .gi-icon-circle {
                    width: 30px;
                    height: 30px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                  }

                  /* ── Section label ── */
                  .gi-label {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 1.3px;
                    text-transform: uppercase;
                    color: #94a3b8;
                    margin: 0 0 6px 0;
                    font-family: 'DM Sans', sans-serif;
                    display: block;
                  }

                  /* ── Overdue row highlight ── */
                  .gi-overdue {
                    background: #fef2f2 !important;
                    border-left: 3px solid #dc2626;
                  }
                  .gi-ontime {
                    background: #f0fdf4 !important;
                    border-left: 3px solid #22c55e;
                  }

                  /* ── Empty state ── */
                  .gi-empty {
                    text-align: center;
                    padding: 44px 20px;
                    color: #94a3b8;
                    font-family: 'DM Sans', sans-serif;
                  }
                `}),o.jsxs("div",{style:{background:"linear-gradient(105deg, #0f172a 0%, #064e3b 50%, #065f46 100%)",borderRadius:"6px",padding:"32px 40px",marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",position:"relative",overflow:"hidden",animation:"giSlideUp 0.5s ease forwards"},children:[o.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",backgroundSize:"40px 40px"}}),o.jsx("div",{style:{position:"absolute",top:"-50px",right:"-30px",width:"260px",height:"260px",borderRadius:"50%",background:"radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsx("div",{style:{position:"absolute",bottom:"-40px",left:"30%",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsxs("div",{style:{position:"relative",zIndex:1},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"11px",fontWeight:"600",letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryAdmin.sectionLabel}),o.jsxs("h2",{style:{margin:"0 0 8px 0",fontSize:"24px",fontWeight:"400",color:"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:"1.25"},children:[u.inventoryAdmin.title," ",o.jsx("span",{style:{fontStyle:"italic"},children:u.inventoryAdmin.titleItalic})]}),o.jsx("p",{style:{margin:0,color:"rgba(255,255,255,0.42)",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryAdmin.subtitle})]}),o.jsx("div",{style:{position:"relative",zIndex:1,display:"flex",gap:"10px",flexWrap:"wrap"},children:[{label:u.inventoryAdmin.equipmentTypes,value:F.length,warn:!1},{label:u.inventoryAdmin.stockUnits,value:F.reduce((m,D)=>m+(D.cantidad||0),0),warn:!1},{label:u.inventoryAdmin.noStock,value:F.filter(m=>(m.cantidad||0)===0).length,warn:F.filter(m=>(m.cantidad||0)===0).length>0},{label:u.inventoryAdmin.activeLoans,value:S.filter(m=>m.estado==="Aprobada"&&!m.devuelto).length,warn:!1},{label:u.inventoryAdmin.overdue,value:S.filter(m=>m.estado==="Aprobada"&&!m.devuelto&&new Date(m.fechaDevolucionEsperada)<new Date).length,warn:S.filter(m=>m.estado==="Aprobada"&&!m.devuelto&&new Date(m.fechaDevolucionEsperada)<new Date).length>0}].map((m,D)=>o.jsxs("div",{style:{background:m.warn?"rgba(220,38,38,0.15)":"rgba(255,255,255,0.07)",border:`1px solid ${m.warn?"rgba(220,38,38,0.35)":"rgba(255,255,255,0.1)"}`,borderRadius:"4px",padding:"10px 14px",textAlign:"center",minWidth:"76px"},children:[o.jsx("div",{style:{fontSize:"20px",fontWeight:"300",color:m.warn?"#fca5a5":"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:1,marginBottom:"4px"},children:m.value}),o.jsx("div",{style:{fontSize:"10px",color:m.warn?"rgba(252,165,165,0.8)":"rgba(255,255,255,0.38)",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase",letterSpacing:"0.4px"},children:m.label})]},D))})]}),o.jsxs("div",{className:"gi-card",style:{marginBottom:"16px",animationDelay:"0.08s"},children:[o.jsxs("div",{className:"gi-card-header",style:{justifyContent:"space-between"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{className:"gi-icon-circle",style:{background:"#f0fdf4"},children:o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),o.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryAdmin.addTitle}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryAdmin.addSubtitle})]})]}),o.jsx("button",{onClick:()=>Te(!_e),style:{padding:"7px 16px",background:_e?"#f1f5f9":"#0f172a",color:_e?"#64748b":"#fff",border:"1px solid "+(_e?"#e4e8ef":"transparent"),borderRadius:"4px",fontSize:"12px",fontWeight:"600",fontFamily:'"DM Sans", sans-serif',cursor:"pointer",transition:"all 0.2s",letterSpacing:"0.2px"},children:_e?u.inventoryAdmin.cancelAdd:u.inventoryAdmin.addBtn})]}),_e&&o.jsx("div",{style:{padding:"20px 24px",borderTop:"1px solid #f1f5f9",background:"#ffffff"},children:o.jsxs("form",{onSubmit:qi,children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 180px 120px 160px",gap:"14px",alignItems:"flex-end",marginBottom:"14px"},children:[o.jsxs("div",{children:[o.jsx("label",{className:"gi-label",children:u.inventoryAdmin.nameLabel}),o.jsx("input",{name:"nombre",className:"gi-input",placeholder:u.inventoryAdmin.namePlaceholder,required:!0})]}),o.jsxs("div",{children:[o.jsx("label",{className:"gi-label",children:u.inventoryAdmin.categoryLabel}),o.jsxs("select",{name:"categoria",className:"gi-input",required:!0,style:{cursor:"pointer"},children:[o.jsx("option",{value:"",children:u.inventoryAdmin.selectCategory}),o.jsx("option",{value:"Gafas RV",children:"Gafas RV"}),o.jsx("option",{value:"Cámara",children:"Cámara"}),o.jsx("option",{value:"Laptop",children:"Laptop"}),o.jsx("option",{value:"Micrófono",children:"Micrófono"}),o.jsx("option",{value:"Trípode",children:"Trípode"}),o.jsx("option",{value:"Iluminación",children:"Iluminación"}),o.jsx("option",{value:"Otro",children:"Otro"})]})]}),o.jsxs("div",{children:[o.jsx("label",{className:"gi-label",children:u.inventoryAdmin.qtyLabel}),o.jsx("input",{name:"cantidad",type:"number",min:"1",className:"gi-input",placeholder:"1",defaultValue:"1"})]}),o.jsxs("div",{children:[o.jsx("label",{className:"gi-label",children:u.inventoryAdmin.statusLabel}),o.jsxs("select",{name:"estado",className:"gi-input",style:{cursor:"pointer"},children:[o.jsx("option",{value:"Disponible",children:u.status.available}),o.jsx("option",{value:"Mantenimiento",children:u.status.maintenance}),o.jsx("option",{value:"Inactivo",children:u.status.inactive})]})]})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"},children:[o.jsx("button",{type:"button",className:"gi-btn-ghost",onClick:()=>Te(!1),children:u.inventoryAdmin.cancel}),o.jsx("button",{type:"submit",className:"gi-btn-green",children:u.inventoryAdmin.registerBtn})]})]})})]}),(()=>{const m=at.startsWith("gi-")?at:"gi-catalogo",D=S.filter(P=>P.estado==="Pendiente").length,$=S.filter(P=>P.estado==="Aprobada"&&!P.devuelto).length,Q=S.filter(P=>P.estado==="Aprobada"&&!P.devuelto&&new Date(P.fechaDevolucionEsperada)<new Date).length;return o.jsxs("div",{className:"gi-card",style:{animationDelay:"0.14s"},children:[o.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid #f1f5f9",background:"#fafbfc",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",flexWrap:"wrap"},children:[o.jsx("div",{className:"gi-tab-bar",children:[{key:"gi-catalogo",label:u.inventoryAdmin.tabCatalog},{key:"gi-solicitudes",label:`${u.inventoryAdmin.tabRequests}${D>0?` · ${D}`:""}`},{key:"gi-prestamos",label:`${u.inventoryAdmin.tabLoans}${$>0?` · ${$}`:""}`}].map(({key:P,label:te})=>o.jsxs("button",{className:`gi-tab ${m===P?"active":""}`,onClick:()=>An(P),children:[te,P==="gi-prestamos"&&Q>0&&o.jsx("span",{style:{marginLeft:"6px",background:"#dc2626",color:"#fff",borderRadius:"3px",padding:"1px 6px",fontSize:"10px",fontWeight:"700"},children:Q})]},P))}),m==="gi-prestamos"&&Q>0&&o.jsx("button",{onClick:Bi,style:{padding:"6px 14px",background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:"4px",fontSize:"11px",fontWeight:"600",color:"#dc2626",fontFamily:'"DM Sans", sans-serif',cursor:"pointer",transition:"all 0.2s",letterSpacing:"0.2px"},children:u.inventoryAdmin.sendReminders})]}),m==="gi-catalogo"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{padding:"12px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"},children:[o.jsxs("span",{style:{fontSize:"11.5px",color:"#64748b",fontFamily:'"DM Sans", sans-serif'},children:[o.jsx("span",{style:{fontWeight:"600",color:"#1e293b"},children:F.length})," tipo(s) registrado(s) · ",o.jsx("span",{style:{fontWeight:"600",color:"#059669"},children:F.reduce((P,te)=>P+(te.cantidad||0),0)})," ",u.inventoryAdmin.units," en total"]}),o.jsx("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:[{label:u.inventoryAdmin.withStock,count:F.filter(P=>(P.cantidad||0)>0).length,color:"#059669",bg:"#f0fdf4"},{label:u.inventoryAdmin.noStockLabel,count:F.filter(P=>(P.cantidad||0)===0).length,color:"#dc2626",bg:"#fef2f2"},{label:u.inventoryAdmin.maintenanceLabel,count:F.filter(P=>P.estado==="Mantenimiento").length,color:"#b45309",bg:"#fffbeb"}].map(({label:P,count:te,color:re,bg:Z})=>o.jsxs("div",{style:{background:Z,border:`1px solid ${re}20`,borderRadius:"4px",padding:"4px 11px",display:"flex",alignItems:"center",gap:"5px"},children:[o.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:re,display:"inline-block",flexShrink:0}}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:re,fontFamily:'"DM Sans", sans-serif'},children:[te," ",P]})]},P))})]}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs("table",{className:"gi-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.inventoryAdmin.colEquipment}),o.jsx("th",{children:u.inventoryAdmin.colCategory}),o.jsx("th",{children:u.inventoryAdmin.colStock}),o.jsx("th",{children:u.inventoryAdmin.colOnLoan}),o.jsx("th",{children:u.inventoryAdmin.colStatus}),o.jsx("th",{children:u.inventoryAdmin.colRegisteredBy}),o.jsx("th",{style:{textAlign:"right"},children:u.inventoryAdmin.colActions})]})}),o.jsx("tbody",{children:F.length===0?o.jsx("tr",{style:{opacity:1},children:o.jsx("td",{colSpan:"7",children:o.jsxs("div",{className:"gi-empty",children:[o.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"50%",border:"1px solid #e2e8f0",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",children:o.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})}),o.jsx("p",{style:{margin:0,fontSize:"13px"},children:u.inventoryAdmin.noEquipment}),o.jsx("p",{style:{margin:"4px 0 0",fontSize:"11.5px",color:"#cbd5e1"},children:u.inventoryAdmin.noEquipmentHint})]})})}):F.map((P,te)=>{var lt;const re=(P.cantidad||0)===0,Z=P.estado==="Mantenimiento",le=S.filter(Ce=>Ce.equipoId===P.id&&Ce.estado==="Aprobada"&&!Ce.devuelto).reduce((Ce,on)=>Ce+on.cantidad,0),ne=Math.max(...F.map(Ce=>Ce.cantidad||0),1),Pe=Math.min((P.cantidad||0)/ne*100,100),me=re?"#dc2626":Z?"#b45309":"#059669";return o.jsxs("tr",{style:{animationDelay:`${.18+te*.035}s`},children:[o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"34px",height:"34px",borderRadius:"5px",flexShrink:0,background:re?"#fef2f2":"#f0fdf4",border:`1px solid ${re?"#fca5a5":"#86efac"}`,display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:re?"#dc2626":"#059669",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:o.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#1e293b",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:P.nombre}),o.jsx("div",{style:{fontSize:"10.5px",color:"#b0bac9",fontFamily:'"DM Sans", sans-serif'},children:P.fecha?new Date(P.fecha).toLocaleDateString("es-ES",{year:"numeric",month:"short",day:"numeric"}):"—"})]})]})}),o.jsx("td",{children:o.jsx("span",{className:"gi-badge gi-badge-slate",children:P.categoria||"—"})}),o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsxs("div",{children:[o.jsx("input",{type:"number",className:"gi-qty",defaultValue:P.cantidad||0,min:"0",title:"Edita la cantidad y presiona Enter o haz clic fuera",onBlur:Ce=>{const on=parseInt(Ce.target.value);!isNaN(on)&&on!==(P.cantidad||0)&&oi(P.id,on)},onKeyDown:Ce=>{Ce.key==="Enter"&&Ce.target.blur()}}),o.jsx("div",{className:"gi-bar-track",children:o.jsx("div",{className:"gi-bar-fill",style:{width:`${Pe}%`,background:me,animationDelay:`${.3+te*.04}s`}})})]}),o.jsx("span",{style:{fontSize:"10.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif',whiteSpace:"nowrap"},children:"uds."})]})}),o.jsx("td",{children:le>0?o.jsxs("span",{className:"gi-badge gi-badge-blue",children:[le," uds."]}):o.jsx("span",{style:{fontSize:"12px",color:"#cbd5e1",fontFamily:'"DM Sans", sans-serif'},children:"—"})}),o.jsx("td",{children:o.jsx("span",{className:`gi-badge ${re?"gi-badge-red":Z?"gi-badge-amber":"gi-badge-green"}`,children:re?u.status.noStock:Z?u.status.maintenance:u.status.available})}),o.jsx("td",{children:o.jsx("div",{style:{fontSize:"12px",color:"#64748b",fontFamily:'"DM Sans", sans-serif'},children:((lt=P.registradoPor)==null?void 0:lt.split("@")[0])||"—"})}),o.jsx("td",{style:{textAlign:"right"},children:o.jsx("button",{className:"gi-btn-danger",onClick:()=>Zs(P.id),children:"Eliminar"})})]},P.id)})})]})}),F.length>0&&o.jsxs("div",{style:{padding:"10px 20px",borderTop:"1px solid #f1f5f9",background:"#fafbfc",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[o.jsxs("span",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:[F.length," tipo(s) · ",F.reduce((P,te)=>P+(te.cantidad||0),0)," unidades totales"]}),o.jsxs("span",{style:{fontSize:"11px",color:"#cbd5e1",fontFamily:'"DM Sans", sans-serif',display:"flex",alignItems:"center",gap:"5px"},children:[o.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"2",children:[o.jsx("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),o.jsx("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]}),"Click en la cantidad para editar · Enter para guardar"]})]})]}),m==="gi-solicitudes"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{padding:"12px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:"8px"},children:D>0?o.jsxs("div",{style:{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:"4px",padding:"5px 12px",display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:"#b45309",flexShrink:0,animation:"giPulse 1.5s ease infinite"}}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:"#b45309",fontFamily:'"DM Sans", sans-serif'},children:[D," solicitud(es) pendiente(s) de revisión"]})]}):o.jsx("span",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryAdmin.noPendingRequests})}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs("table",{className:"gi-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.inventoryAdmin.colRequester}),o.jsx("th",{children:u.inventoryAdmin.colMaterial}),o.jsx("th",{children:u.inventoryAdmin.colQty}),o.jsx("th",{children:u.inventoryAdmin.colReason}),o.jsx("th",{children:u.inventoryAdmin.colDuration}),o.jsx("th",{children:u.inventoryAdmin.colDueDate}),o.jsx("th",{children:u.inventoryAdmin.colStatus}),o.jsx("th",{style:{textAlign:"right"},children:"Acciones"})]})}),o.jsx("tbody",{children:S.length===0?o.jsx("tr",{style:{opacity:1},children:o.jsx("td",{colSpan:"8",children:o.jsx("div",{className:"gi-empty",children:o.jsx("p",{style:{margin:0,fontSize:"13px"},children:u.adminRequests.noMaterial})})})}):S.filter(P=>P.estado!=="Rechazada").map((P,te)=>{var Pe;const re=F.find(me=>me.id===P.equipoId),Z=new Date,le=new Date(P.fechaDevolucionEsperada),ne=P.estado==="Aprobada"&&!P.devuelto&&Z>le;return o.jsxs("tr",{style:{animationDelay:`${.1+te*.03}s`,background:ne?"#fef2f2":""},children:[o.jsxs("td",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#1e293b",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:(Pe=P.solicitadoPor)==null?void 0:Pe.split("@")[0]}),o.jsx("div",{style:{fontSize:"11px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:P.solicitadoPor})]}),o.jsx("td",{children:o.jsx("div",{style:{fontWeight:"500",color:"#334155",fontFamily:'"DM Sans", sans-serif'},children:(re==null?void 0:re.nombre)||P.equipoNombre||"Desconocido"})}),o.jsx("td",{children:o.jsxs("span",{style:{fontFamily:'"DM Serif Display", serif',fontSize:"17px",fontWeight:"300",color:"#0f172a"},children:["×",P.cantidad]})}),o.jsx("td",{style:{maxWidth:"160px"},children:o.jsx("div",{style:{fontSize:"12px",color:"#64748b",fontFamily:'"DM Sans", sans-serif',lineHeight:"1.4",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:P.motivo||o.jsx("span",{style:{color:"#cbd5e1"},children:"—"})})}),o.jsx("td",{children:o.jsxs("span",{style:{fontSize:"12px",color:"#64748b",fontFamily:'"DM Sans", sans-serif'},children:[P.tiempoUso,"h"]})}),o.jsx("td",{children:o.jsxs("div",{style:{fontSize:"12px",fontFamily:'"DM Sans", sans-serif',color:ne?"#dc2626":"#475569",fontWeight:ne?"600":"400"},children:[ne&&o.jsx("div",{style:{fontSize:"9px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.8px",color:"#dc2626",marginBottom:"2px"},children:u.messages.overdue}),new Date(P.fechaDevolucionEsperada).toLocaleString("es-ES",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})]})}),o.jsx("td",{children:o.jsx("span",{className:`gi-badge ${P.estado==="Aprobada"?"gi-badge-green":P.estado==="Rechazada"?"gi-badge-red":"gi-badge-amber"}`,children:pn(P.estado)})}),o.jsx("td",{style:{textAlign:"right",whiteSpace:"nowrap"},children:P.estado==="Pendiente"&&o.jsxs("div",{style:{display:"flex",gap:"6px",justifyContent:"flex-end"},children:[o.jsx("button",{className:"gi-btn-approve",onClick:()=>zi(P.id),children:"Aprobar"}),o.jsx("button",{className:"gi-btn-danger",onClick:()=>Ys(P.id),children:"Rechazar"})]})})]},P.id)})})]})})]}),m==="gi-prestamos"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{padding:"12px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"},children:[{label:u.inventoryAdmin.onTime,count:$-Q,color:"#059669",bg:"#f0fdf4"},{label:u.inventoryAdmin.overdueLabel,count:Q,color:"#dc2626",bg:"#fef2f2"}].map(({label:P,count:te,color:re,bg:Z})=>o.jsxs("div",{style:{background:Z,border:`1px solid ${re}20`,borderRadius:"4px",padding:"4px 11px",display:"flex",alignItems:"center",gap:"5px"},children:[o.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:re,display:"inline-block",flexShrink:0}}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:re,fontFamily:'"DM Sans", sans-serif'},children:[te," ",P]})]},P))}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs("table",{className:"gi-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.inventoryAdmin.colLoanedTo}),o.jsx("th",{children:u.inventoryAdmin.colMaterial}),o.jsx("th",{children:u.inventoryAdmin.colQty}),o.jsx("th",{children:u.inventoryAdmin.colReason}),o.jsx("th",{children:u.inventoryAdmin.colDueTime}),o.jsx("th",{children:u.inventoryAdmin.colDelivery}),o.jsx("th",{style:{textAlign:"right"},children:u.inventoryAdmin.colActions})]})}),o.jsx("tbody",{children:$===0?o.jsx("tr",{style:{opacity:1},children:o.jsx("td",{colSpan:"7",children:o.jsxs("div",{className:"gi-empty",children:[o.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"50%",border:"1px solid #dcfce7",background:"#f0fdf4",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#16a34a",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:o.jsx("polyline",{points:"20 6 9 17 4 12"})})}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:"#16a34a",fontWeight:"600"},children:"Todo devuelto"}),o.jsx("p",{style:{margin:"4px 0 0",fontSize:"11.5px",color:"#94a3b8"},children:u.inventoryAdmin.noActiveLoans})]})})}):S.filter(P=>P.estado==="Aprobada"&&!P.devuelto).sort((P,te)=>new Date(P.fechaDevolucionEsperada)-new Date(te.fechaDevolucionEsperada)).map((P,te)=>{var lt;const re=F.find(Ce=>Ce.id===P.equipoId),Z=new Date,le=new Date(P.fechaDevolucionEsperada),ne=Z>le,Pe=ne?Math.floor((Z-le)/36e5):null,me=Pe!==null?Math.floor(Pe/24):null;return o.jsxs("tr",{className:ne?"gi-overdue":"gi-ontime",style:{animationDelay:`${.1+te*.035}s`},children:[o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",flexShrink:0,background:ne?"#fef2f2":"#f0fdf4",border:`1px solid ${ne?"#fca5a5":"#86efac"}`,display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("span",{style:{fontSize:"12px",fontWeight:"700",color:ne?"#dc2626":"#16a34a",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase"},children:(P.solicitadoPor||"?").charAt(0)})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#1e293b",fontSize:"12.5px",fontFamily:'"DM Sans", sans-serif'},children:(lt=P.solicitadoPor)==null?void 0:lt.split("@")[0]}),o.jsx("div",{style:{fontSize:"10.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:P.solicitadoPor})]})]})}),o.jsx("td",{children:o.jsx("div",{style:{fontWeight:"500",color:"#334155",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:(re==null?void 0:re.nombre)||P.equipoNombre||"Desconocido"})}),o.jsx("td",{children:o.jsxs("span",{style:{fontFamily:'"DM Serif Display", serif',fontSize:"17px",fontWeight:"300",color:"#0f172a"},children:["×",P.cantidad]})}),o.jsx("td",{style:{maxWidth:"150px"},children:o.jsx("div",{style:{fontSize:"12px",color:"#64748b",fontFamily:'"DM Sans", sans-serif',lineHeight:"1.4",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:P.motivo||o.jsx("span",{style:{color:"#cbd5e1"},children:"—"})})}),o.jsx("td",{children:o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"12px",fontWeight:"600",color:ne?"#dc2626":"#059669",fontFamily:'"DM Sans", sans-serif'},children:ne?me>0?`${me}d ${Pe%24}h de atraso`:`${Pe}h de atraso`:"En tiempo"}),o.jsx("div",{style:{fontSize:"11px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif',marginTop:"2px"},children:le.toLocaleString("es-ES",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]})}),o.jsx("td",{children:o.jsx("span",{className:`gi-badge ${ne?"gi-badge-red":"gi-badge-green"}`,children:ne?"Atrasado":"En tiempo"})}),o.jsx("td",{style:{textAlign:"right"},children:o.jsx("button",{className:"gi-btn-return",onClick:()=>Xs(P.id),children:"Confirmar devolución"})})]},P.id)})})]})}),$>0&&o.jsxs("div",{style:{padding:"10px 20px",borderTop:"1px solid #f1f5f9",background:"#fafbfc",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[o.jsxs("span",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:[$," préstamo(s) activo(s)"]}),Q>0&&o.jsxs("button",{onClick:Bi,style:{padding:"5px 12px",background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:"4px",fontSize:"11px",fontWeight:"600",color:"#dc2626",fontFamily:'"DM Sans", sans-serif',cursor:"pointer",transition:"all 0.2s"},children:["Notificar a ",Q," usuario(s) atrasado(s)"]})]})]})]})})()]}),I==="aulasReservadas"&&o.jsxs("div",{style:{animation:"fadeIn 0.5s ease-in-out"},children:[o.jsx("style",{children:`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

      /* ── Keyframes ── */
      @keyframes arSlideUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes arFadeRow {
        from { opacity: 0; transform: translateX(-5px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes arExpandBar {
        from { width: 0; }
      }
      @keyframes arPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
        50%       { box-shadow: 0 0 0 5px rgba(37,99,235,0); }
      }
      @keyframes arSpin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      /* ── Cards ── */
      .ar-card {
        background: #fff;
        border: 1px solid #e4e8ef;
        border-radius: 6px;
        overflow: hidden;
        opacity: 0;
        animation: arSlideUp 0.4s ease forwards;
      }
      .ar-card-header {
        padding: 14px 20px;
        border-bottom: 1px solid #f1f5f9;
        background: #fafbfc;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      /* ── Aula grid cards ── */
      .ar-aula-card {
        background: #ffffff;
        border: 1px solid #e4e8ef;
        border-radius: 6px;
        overflow: hidden;
        transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.2s;
        cursor: default;
        opacity: 0;
        animation: arSlideUp 0.4s ease forwards;
      }
      .ar-aula-card:hover {
        box-shadow: 0 8px 28px rgba(15,23,42,0.09);
        transform: translateY(-2px);
        border-color: #cbd5e1;
      }

      /* ── Table ── */
      .ar-table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'DM Sans', sans-serif;
      }
      .ar-table thead tr {
        background: #f8fafc;
        border-bottom: 1px solid #e4e8ef;
      }
      .ar-table thead th {
        padding: 10px 16px;
        text-align: left;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: #94a3b8;
      }
      .ar-table tbody tr {
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.15s;
        opacity: 0;
        animation: arFadeRow 0.3s ease forwards;
      }
      .ar-table tbody tr:last-child { border-bottom: none; }
      .ar-table tbody tr:hover { background: #fafbfc; }
      .ar-table td {
        padding: 12px 16px;
        font-size: 13px;
        color: #334155;
        vertical-align: middle;
      }

      /* ── Badges ── */
      .ar-badge {
        display: inline-block;
        padding: 3px 9px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-transform: uppercase;
        font-family: 'DM Sans', sans-serif;
      }
      .ar-badge-green  { background: #f0fdf4; color: #16a34a; }
      .ar-badge-red    { background: #fef2f2; color: #dc2626; }
      .ar-badge-amber  { background: #fffbeb; color: #b45309; }
      .ar-badge-blue   { background: #eff6ff; color: #2563eb; }
      .ar-badge-slate  { background: #f1f5f9; color: #475569; }
      .ar-badge-indigo { background: #eef2ff; color: #4338ca; }

      /* ── Buttons ── */
      .ar-btn-danger {
        padding: 5px 13px;
        background: transparent;
        border: 1px solid #fca5a5;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        color: #dc2626;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .ar-btn-danger:hover { border-color: #dc2626; background: #fef2f2; }

      .ar-btn-reserve {
        padding: 7px 16px;
        background: #0f172a;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        letter-spacing: 0.2px;
        transition: background 0.2s, transform 0.15s;
        width: 100%;
      }
      .ar-btn-reserve:hover { background: #1e293b; transform: translateY(-1px); }

      .ar-btn-green {
        padding: 7px 16px;
        background: #059669;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s;
        width: 100%;
      }
      .ar-btn-green:hover { background: #047857; transform: translateY(-1px); }

      /* ── View toggle tabs ── */
      .ar-tab-bar {
        display: flex;
        gap: 2px;
        background: #f1f5f9;
        padding: 4px;
        border-radius: 6px;
        width: fit-content;
      }
      .ar-tab {
        padding: 6px 16px;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: all 0.2s;
        background: transparent;
        color: #64748b;
        white-space: nowrap;
      }
      .ar-tab:hover { color: #334155; }
      .ar-tab.ar-active {
        background: #ffffff;
        color: #0f172a;
        box-shadow: 0 1px 4px rgba(15,23,42,0.1);
      }

      /* ── Search input ── */
      .ar-search {
        padding: 7px 12px 7px 34px;
        border: 1px solid #e4e8ef;
        border-radius: 4px;
        font-size: 12.5px;
        font-family: 'DM Sans', sans-serif;
        color: #1e293b;
        background: #ffffff;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
        width: 220px;
      }
      .ar-search:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
      }
      .ar-search::placeholder { color: #b8c0cc; }

      /* ── Timeline item ── */
      .ar-timeline-item {
        display: flex;
        gap: 14px;
        padding: 12px 0;
        border-bottom: 1px solid #f1f5f9;
        opacity: 0;
        animation: arFadeRow 0.3s ease forwards;
      }
      .ar-timeline-item:last-child { border-bottom: none; }

      /* ── Bar track ── */
      .ar-bar-track {
        height: 3px;
        background: #f1f5f9;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 5px;
      }
      .ar-bar-fill {
        height: 100%;
        border-radius: 2px;
        animation: arExpandBar 1s ease both;
      }

      /* ── Label ── */
      .ar-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.3px;
        text-transform: uppercase;
        color: #94a3b8;
        font-family: 'DM Sans', sans-serif;
      }

      /* ── Occupancy ring ── */
      .ar-ring-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* ── Empty state ── */
      .ar-empty {
        text-align: center;
        padding: 44px 20px;
        color: #94a3b8;
        font-family: 'DM Sans', sans-serif;
      }
    `}),o.jsxs("div",{style:{background:"linear-gradient(105deg, #0f172a 0%, #064e3b 50%, #065f46 100%)",borderRadius:"6px",padding:"32px 40px",marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",position:"relative",overflow:"hidden",animation:"arSlideUp 0.5s ease forwards"},children:[o.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",backgroundSize:"40px 40px"}}),o.jsx("div",{style:{position:"absolute",top:"-50px",right:"-30px",width:"280px",height:"280px",borderRadius:"50%",background:"radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsx("div",{style:{position:"absolute",bottom:"-40px",left:"25%",width:"220px",height:"220px",borderRadius:"50%",background:"radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsxs("div",{style:{position:"relative",zIndex:1},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"11px",fontWeight:"600",letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",fontFamily:'"DM Sans", sans-serif'},children:u.reservedRooms.sectionLabel}),o.jsxs("h2",{style:{margin:"0 0 8px 0",fontSize:"24px",fontWeight:"400",color:"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:"1.25"},children:[u.reservedRooms.title," ",o.jsx("span",{style:{fontStyle:"italic"},children:u.reservedRooms.titleItalic})]}),o.jsx("p",{style:{margin:0,color:"rgba(255,255,255,0.42)",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:u.reservedRooms.subtitle})]}),o.jsx("div",{style:{position:"relative",zIndex:1,display:"flex",gap:"10px",flexWrap:"wrap"},children:[{label:u.reservedRooms.totalRooms,value:w.length,warn:!1},{label:u.reservedRooms.withReservations,value:w.filter(m=>b.some(D=>D.aulaId===m.id&&D.estado==="Confirmada")).length,warn:!1},{label:u.reservedRooms.withoutReservations,value:w.filter(m=>!b.some(D=>D.aulaId===m.id&&D.estado==="Confirmada")).length,warn:!1},{label:u.reservedRooms.totalConfirmed,value:b.filter(m=>m.estado==="Confirmada").length,warn:!1}].map((m,D)=>o.jsxs("div",{style:{background:m.warn?"rgba(220,38,38,0.15)":"rgba(255,255,255,0.07)",border:`1px solid ${m.warn?"rgba(220,38,38,0.35)":"rgba(255,255,255,0.1)"}`,borderRadius:"4px",padding:"10px 14px",textAlign:"center",minWidth:"78px"},children:[o.jsx("div",{style:{fontSize:"20px",fontWeight:"300",color:m.warn?"#fca5a5":"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:1,marginBottom:"4px"},children:m.value}),o.jsx("div",{style:{fontSize:"10px",color:"rgba(255,255,255,0.38)",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase",letterSpacing:"0.4px"},children:m.label})]},D))})]}),(()=>{const m=at.startsWith("ar-")?at:"ar-tarjetas";return o.jsxs(o.Fragment,{children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px",flexWrap:"wrap",gap:"10px",opacity:0,animation:"arSlideUp 0.4s ease 0.08s forwards"},children:[o.jsxs("div",{className:"ar-tab-bar",children:[o.jsx("button",{className:`ar-tab ${m==="ar-tarjetas"?"ar-active":""}`,onClick:()=>An("ar-tarjetas"),children:u.reservedRooms.viewByRoom}),o.jsx("button",{className:`ar-tab ${m==="ar-lista"?"ar-active":""}`,onClick:()=>An("ar-lista"),children:u.reservedRooms.reservationList})]}),o.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"},children:[[{label:u.reservedRooms.confirmed,count:b.filter(D=>D.estado==="Confirmada").length,color:"#059669",bg:"#f0fdf4"},{label:u.reservedRooms.cancelled,count:b.filter(D=>D.estado!=="Confirmada").length,color:"#dc2626",bg:"#fef2f2"}].map(({label:D,count:$,color:Q,bg:P})=>o.jsxs("div",{style:{background:P,border:`1px solid ${Q}20`,borderRadius:"4px",padding:"5px 12px",display:"flex",alignItems:"center",gap:"5px"},children:[o.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:Q,flexShrink:0}}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:Q,fontFamily:'"DM Sans", sans-serif'},children:[$," ",D]})]},D)),o.jsxs("button",{onClick:()=>M("aulasPúblicas"),style:{padding:"7px 16px",background:"#0f172a",color:"#fff",border:"none",borderRadius:"4px",fontSize:"12px",fontWeight:"600",fontFamily:'"DM Sans", sans-serif',cursor:"pointer",transition:"background 0.2s, transform 0.15s",letterSpacing:"0.2px",display:"flex",alignItems:"center",gap:"6px"},onMouseEnter:D=>{D.currentTarget.style.background="#1e293b",D.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:D=>{D.currentTarget.style.background="#0f172a",D.currentTarget.style.transform="translateY(0)"},children:[o.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),o.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),u.reservedRooms.newReservation]})]})]}),m==="ar-tarjetas"&&o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:"14px"},children:w.length===0?o.jsx("div",{style:{gridColumn:"1 / -1"},children:o.jsx("div",{className:"ar-card",style:{animationDelay:"0.1s"},children:o.jsxs("div",{className:"ar-empty",children:[o.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"50%",border:"1px solid #e2e8f0",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})}),o.jsx("p",{style:{margin:0,fontSize:"13px"},children:u.reservedRooms.noRooms}),o.jsx("p",{style:{margin:"4px 0 0",fontSize:"11.5px",color:"#cbd5e1"},children:u.reservedRooms.noRoomsHint})]})})}):w.map((D,$)=>{const Q=b.filter(me=>me.aulaId===D.id&&me.estado==="Confirmada"),P=Q.length>0,te=D.estado==="Mantenimiento",re=[...Q].sort((me,lt)=>me.fecha!==lt.fecha?me.fecha.localeCompare(lt.fecha):me.horaInicio.localeCompare(lt.horaInicio)),Z=(()=>{const me=new Date;return`${me.getFullYear()}-${String(me.getMonth()+1).padStart(2,"0")}-${String(me.getDate()).padStart(2,"0")}`})(),le=Q.filter(me=>me.fecha===Z).length,ne=Math.min(le/11*100,100),Pe=ne>=70?"#dc2626":ne>=40?"#d97706":"#059669";return o.jsxs("div",{className:"ar-aula-card",style:{animationDelay:`${.1+$*.06}s`},children:[o.jsx("div",{style:{height:"3px",background:te?"linear-gradient(90deg, #d97706, #b45309)":P?"linear-gradient(90deg, #2563eb, #059669)":"linear-gradient(90deg, #059669, #10b981)"}}),o.jsxs("div",{style:{padding:"16px 18px 12px",borderBottom:"1px solid #f1f5f9"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"10px",marginBottom:"10px"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"6px",flexShrink:0,background:te?"#fffbeb":"#f0fdf4",border:`1px solid ${te?"#fde68a":"#86efac"}`,display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:te?"#b45309":"#059669",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"700",color:"#0f172a",fontSize:"14px",fontFamily:'"DM Sans", sans-serif',lineHeight:1.2},children:D.nombre}),o.jsxs("div",{style:{fontSize:"11px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif',marginTop:"2px"},children:["Cap. ",D.capacidad," · ",D.equipoDisponible?Gs(D.equipoDisponible):u.availableRooms.noSpecialEquip]})]})]}),o.jsx("span",{className:`ar-badge ${te?"ar-badge-amber":P?"ar-badge-blue":"ar-badge-green"}`,children:te?u.reservedRooms.maintenance:P?`${Q.length} reserva${Q.length!==1?"s":""}`:u.reservedRooms.free})]}),o.jsxs("div",{children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[o.jsx("span",{className:"ar-label",children:u.reservedRooms.occupancyToday}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:Pe,fontFamily:'"DM Sans", sans-serif'},children:[le," ",u.reservedRooms.slotsOf," 11 ",u.reservedRooms.slots]})]}),o.jsx("div",{className:"ar-bar-track",children:o.jsx("div",{className:"ar-bar-fill",style:{width:`${ne}%`,background:Pe,animationDelay:`${.3+$*.06}s`}})})]})]}),o.jsx("div",{style:{padding:"0",maxHeight:"220px",overflowY:"auto"},children:re.length===0?o.jsx("div",{style:{padding:"20px",textAlign:"center"},children:o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},children:[o.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:"#86efac"}}),o.jsx("span",{style:{fontSize:"12.5px",color:"#16a34a",fontFamily:'"DM Sans", sans-serif',fontWeight:"600"},children:u.reservedRooms.availableToReserve})]})}):re.map((me,lt)=>{var Oa;const Ce=me.fecha===Z,on=me.fecha>Z;return o.jsxs("div",{style:{padding:"10px 18px",borderBottom:lt<re.length-1?"1px solid #f8fafc":"none",display:"flex",alignItems:"flex-start",gap:"10px",opacity:0,animation:"arFadeRow 0.3s ease forwards",animationDelay:`${.2+$*.06+lt*.04}s`},children:[o.jsxs("div",{style:{flexShrink:0,width:"46px",textAlign:"center",paddingTop:"2px"},children:[o.jsx("div",{style:{fontSize:"11px",fontWeight:"700",color:Ce?"#2563eb":"#475569",fontFamily:'"DM Sans", sans-serif',lineHeight:1,marginBottom:"3px"},children:me.horaInicio}),o.jsx("div",{style:{width:"1px",height:"10px",background:"#e2e8f0",margin:"0 auto"}}),o.jsx("div",{style:{fontSize:"10px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:me.horaFin})]}),o.jsxs("div",{style:{flex:1,minWidth:0},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"3px",flexWrap:"wrap"},children:[o.jsx("div",{style:{fontSize:"12.5px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif',whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:me.nombreReservador||((Oa=me.reservadoPor)==null?void 0:Oa.split("@")[0])}),o.jsx("span",{className:`ar-badge ${Ce?"ar-badge-blue":on?"ar-badge-indigo":"ar-badge-slate"}`,style:{fontSize:"9px",padding:"2px 6px"},children:Ce?"hoy":on?new Date(me.fecha+"T12:00:00").toLocaleDateString("es-ES",{month:"short",day:"numeric"}):new Date(me.fecha+"T12:00:00").toLocaleDateString("es-ES",{month:"short",day:"numeric"})}),o.jsx("span",{className:`ar-badge ${me.rol==="admin"?"ar-badge-red":me.rol==="maestro"?"ar-badge-blue":"ar-badge-slate"}`,style:{fontSize:"9px",padding:"2px 6px"},children:me.rol})]}),me.descripcion&&o.jsx("div",{style:{fontSize:"11.5px",color:"#64748b",fontFamily:'"DM Sans", sans-serif',lineHeight:"1.4",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:me.descripcion})]}),N.verReservas&&o.jsx("button",{className:"ar-btn-danger",style:{padding:"4px 10px",fontSize:"10px",flexShrink:0},onClick:()=>mn(me.id),children:"✕"})]},me.id)})}),o.jsxs("div",{style:{padding:"10px 18px",borderTop:"1px solid #f1f5f9",background:"#fafbfc",display:"flex",gap:"8px"},children:[o.jsx("button",{className:"ar-btn-reserve",onClick:()=>M("aulasPúblicas"),style:{flex:1,fontSize:"11px",padding:"6px"},children:u.reservedRooms.viewSchedule}),((E==null?void 0:E.rol)==="maestro"||(E==null?void 0:E.rol)==="admin")&&o.jsx("button",{className:"ar-btn-green",onClick:()=>M("aulasPúblicas"),style:{flex:1,fontSize:"11px",padding:"6px"},children:u.reservedRooms.reserve})]})]},D.id)})}),m==="ar-lista"&&o.jsxs("div",{className:"ar-card",style:{animationDelay:"0.1s"},children:[o.jsxs("div",{style:{padding:"12px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"},children:[o.jsxs("span",{style:{fontSize:"11.5px",color:"#64748b",fontFamily:'"DM Sans", sans-serif'},children:[o.jsx("span",{style:{fontWeight:"600",color:"#1e293b"},children:b.filter(D=>D.estado==="Confirmada").length})," ",u.home.activeReservations]}),o.jsx("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:[{label:u.roles.admin,count:b.filter(D=>D.rol==="admin"&&D.estado==="Confirmada").length,color:"#dc2626",bg:"#fef2f2"},{label:u.roles.maestro,count:b.filter(D=>D.rol==="maestro"&&D.estado==="Confirmada").length,color:"#2563eb",bg:"#eff6ff"},{label:u.roles.alumno,count:b.filter(D=>D.rol==="alumno"&&D.estado==="Confirmada").length,color:"#16a34a",bg:"#f0fdf4"}].map(({label:D,count:$,color:Q,bg:P})=>o.jsxs("div",{style:{background:P,border:`1px solid ${Q}20`,borderRadius:"4px",padding:"4px 11px",display:"flex",alignItems:"center",gap:"5px"},children:[o.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:Q,flexShrink:0}}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:Q,fontFamily:'"DM Sans", sans-serif'},children:[$," ",D]})]},D))})]}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs("table",{className:"ar-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.reservedRooms.colRoom}),o.jsx("th",{children:u.reservedRooms.colReservedBy}),o.jsx("th",{children:u.reservedRooms.colDate}),o.jsx("th",{children:u.reservedRooms.colSchedule}),o.jsx("th",{children:u.reservedRooms.colRole}),o.jsx("th",{children:u.reservedRooms.colDesc}),o.jsx("th",{children:u.reservedRooms.colStatus}),N.verReservas&&o.jsx("th",{style:{textAlign:"right"},children:u.reservedRooms.colActions})]})}),o.jsx("tbody",{children:b.length===0?o.jsx("tr",{style:{opacity:1},children:o.jsx("td",{colSpan:"8",children:o.jsxs("div",{className:"ar-empty",children:[o.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"50%",border:"1px solid #e2e8f0",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",children:[o.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),o.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),o.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),o.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]})}),o.jsx("p",{style:{margin:0,fontSize:"13px"},children:u.allReservations.noReservations}),o.jsx("p",{style:{margin:"4px 0 0",fontSize:"11.5px",color:"#cbd5e1"},children:u.allReservations.noReservationsHint||u.reservedRooms.noReservationsHint})]})})}):b.map((D,$)=>{var re;const Q=(()=>{const Z=new Date;return`${Z.getFullYear()}-${String(Z.getMonth()+1).padStart(2,"0")}-${String(Z.getDate()).padStart(2,"0")}`})(),P=D.fecha===Q;D.fecha>Q;const te=D.estado!=="Confirmada";return o.jsxs("tr",{style:{animationDelay:`${.15+$*.03}s`,opacity:te?.5:void 0},children:[o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"4px",flexShrink:0,background:"#f0fdf4",border:"1px solid #86efac",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#1e293b",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:D.aulaNombre}),D.aulaCapacidad&&o.jsxs("div",{style:{fontSize:"10.5px",color:"#b0bac9",fontFamily:'"DM Sans", sans-serif'},children:["Cap. ",D.aulaCapacidad]})]})]})}),o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",flexShrink:0,background:D.rol==="admin"?"#fef2f2":D.rol==="maestro"?"#eff6ff":"#f0fdf4",border:`1px solid ${D.rol==="admin"?"#fca5a5":D.rol==="maestro"?"#93c5fd":"#86efac"}`,display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("span",{style:{fontSize:"11px",fontWeight:"700",color:D.rol==="admin"?"#dc2626":D.rol==="maestro"?"#2563eb":"#16a34a",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase"},children:(D.nombreReservador||D.reservadoPor||"?").charAt(0)})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#1e293b",fontSize:"12.5px",fontFamily:'"DM Sans", sans-serif'},children:D.nombreReservador||((re=D.reservadoPor)==null?void 0:re.split("@")[0])}),o.jsx("div",{style:{fontSize:"10.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:D.reservadoPor})]})]})}),o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx("div",{style:{fontWeight:"500",fontSize:"12.5px",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:new Date(D.fecha+"T12:00:00").toLocaleDateString("es-ES",{weekday:"short",month:"short",day:"numeric"})}),P&&o.jsx("span",{className:"ar-badge ar-badge-blue",style:{fontSize:"9px",padding:"2px 6px",animation:"arPulse 2s ease infinite"},children:u.reservedRooms.today})]})}),o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",fontFamily:'"DM Sans", sans-serif'},children:[o.jsx("span",{style:{fontSize:"12.5px",fontWeight:"600",color:"#1e293b"},children:D.horaInicio}),o.jsx("span",{style:{fontSize:"10px",color:"#94a3b8"},children:"→"}),o.jsx("span",{style:{fontSize:"12.5px",fontWeight:"600",color:"#1e293b"},children:D.horaFin})]})}),o.jsx("td",{children:o.jsx("span",{className:`ar-badge ${D.rol==="admin"?"ar-badge-red":D.rol==="maestro"?"ar-badge-blue":"ar-badge-green"}`,children:Fi(D.rol)})}),o.jsx("td",{style:{maxWidth:"200px"},children:o.jsx("div",{style:{fontSize:"12px",color:"#64748b",fontFamily:'"DM Sans", sans-serif',lineHeight:"1.4",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:D.descripcion||o.jsx("span",{style:{color:"#cbd5e1"},children:"—"})})}),o.jsx("td",{children:o.jsx("span",{className:`ar-badge ${D.estado==="Confirmada"?"ar-badge-green":"ar-badge-red"}`,children:pn(D.estado||"Confirmada")})}),N.verReservas&&o.jsx("td",{style:{textAlign:"right"},children:D.estado==="Confirmada"&&o.jsx("button",{className:"ar-btn-danger",onClick:()=>mn(D.id),children:u.reservedRooms.cancelBtn})})]},D.id)})})]})}),b.length>0&&o.jsxs("div",{style:{padding:"10px 20px",borderTop:"1px solid #f1f5f9",background:"#fafbfc",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[o.jsxs("span",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:[b.length," reserva(s) en total · ",b.filter(D=>D.estado==="Confirmada").length," confirmada(s)"]}),o.jsxs("span",{style:{fontSize:"11px",color:"#cbd5e1",fontFamily:'"DM Sans", sans-serif',display:"flex",alignItems:"center",gap:"5px"},children:[o.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"2",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),o.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),u.reservedRooms.adminOnly]})]})]})]})})()]}),N.solicitarEquipos&&I==="solicitudes"&&o.jsxs("div",{className:"requests-wrapper",style:{animation:"slideIn 0.5s ease"},children:[o.jsx("div",{className:"requests-header",children:o.jsxs("div",{className:"requests-header-content",children:[o.jsx("h1",{children:u.myRequests.title}),o.jsx("p",{children:u.myRequests.title})]})}),o.jsxs("div",{className:"requests-container",children:[o.jsxs("div",{className:"request-section",children:[o.jsxs("div",{className:"request-section-header",children:[o.jsx("h2",{children:u.myRequests.pendingRooms}),o.jsx("span",{className:"section-badge",children:k.filter(m=>m.solicitadoPor===E.email).length})]}),o.jsx("div",{className:"table-container requests-table",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.myRequests.colRoom}),o.jsx("th",{children:u.myRequests.colDateTime}),o.jsx("th",{children:u.myRequests.colReason}),o.jsx("th",{children:u.myRequests.colStatus}),o.jsx("th",{children:u.myRequests.colActions})]})}),o.jsx("tbody",{children:k.filter(m=>m.solicitadoPor===E.email).length===0?o.jsx("tr",{children:o.jsx("td",{colSpan:"5",style:{textAlign:"center",padding:"30px",color:"#94a3b8"},children:u.myRequests.noRoomRequests})}):k.filter(m=>m.solicitadoPor===E.email).map(m=>o.jsxs("tr",{className:"request-row",children:[o.jsx("td",{children:o.jsx("strong",{style:{color:"#0f172a"},children:m.aulaNombre||m.tipo})}),o.jsxs("td",{style:{color:"#475569"},children:[m.fechaSolicitada," (",m.horaInicio,")"]}),o.jsx("td",{style:{fontSize:"13px",color:"#64748b"},children:m.descripcion}),o.jsx("td",{children:o.jsx("span",{className:`request-badge badge ${m.estado==="Aprobada"?"badge-success":m.estado==="Rechazada"?"badge-danger":"badge-warning"}`,children:pn(m.estado)})}),o.jsx("td",{children:m.estado==="Pendiente"&&o.jsx("button",{className:"btn-action btn-withdraw",onClick:()=>Ma(m.id,"solicitudes",`Aula ${m.aulaNombre}`),children:u.myRequests.withdrawBtn})})]},m.id))})]})})]}),o.jsxs("div",{className:"request-section",children:[o.jsxs("div",{className:"request-section-header",children:[o.jsx("h2",{children:u.myRequests.materials}),o.jsx("span",{className:"section-badge",children:S.filter(m=>m.solicitadoPor===E.email).length})]}),o.jsx("div",{className:"table-container requests-table",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.myRequests.colMaterial}),o.jsx("th",{children:u.myRequests.colQty}),o.jsx("th",{children:u.myRequests.colDueDate}),o.jsx("th",{children:u.myRequests.colStatusReturn}),o.jsx("th",{children:u.myRequests.colActions})]})}),o.jsx("tbody",{children:S.filter(m=>m.solicitadoPor===E.email).length===0?o.jsx("tr",{children:o.jsx("td",{colSpan:"5",style:{textAlign:"center",padding:"30px",color:"#94a3b8"},children:u.myRequests.noMaterialRequests})}):S.filter(m=>m.solicitadoPor===E.email).map(m=>o.jsxs("tr",{className:"request-row",children:[o.jsx("td",{children:o.jsx("strong",{style:{color:"#0f172a"},children:m.equipoNombre})}),o.jsxs("td",{style:{color:"#475569"},children:["x",m.cantidad]}),o.jsx("td",{style:{fontSize:"13px",color:"#64748b"},children:new Date(m.fechaDevolucionEsperada).toLocaleString("es-ES",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}),o.jsx("td",{children:o.jsx("span",{className:`request-badge badge ${m.devuelto?"badge-success":m.estado==="Pendiente"?"badge-warning":"badge-danger"}`,children:m.devuelto?u.myRequests.returned:m.estado})}),o.jsx("td",{children:m.estado==="Pendiente"&&o.jsx("button",{className:"btn-action btn-cancel",onClick:()=>Ma(m.id,"solicitudes_material",`Material ${m.equipoNombre}`),children:u.myRequests.cancelBtn})})]},m.id))})]})})]})]})]}),N.verReservas&&I==="reservasAdmin"&&o.jsxs("div",{className:"seccion-blanca",children:[o.jsxs("div",{className:"section-header",children:[o.jsx("h2",{children:u.allReservations.title}),o.jsxs("span",{className:"badge badge-info",children:[b.filter(m=>m.estado==="Confirmada").length," ",u.allReservations.active]})]}),o.jsx("div",{className:"table-container",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.allReservations.colRoom}),o.jsx("th",{children:u.allReservations.colReservedBy}),o.jsx("th",{children:u.allReservations.colDate}),o.jsx("th",{children:u.allReservations.colSchedule}),o.jsx("th",{children:u.allReservations.colDesc}),o.jsx("th",{children:u.allReservations.colStatus}),o.jsx("th",{children:u.allReservations.colActions})]})}),o.jsx("tbody",{children:b.length===0?o.jsx("tr",{children:o.jsx("td",{colSpan:"7",style:{textAlign:"center",padding:"20px"},children:u.allReservations.noReservations})}):b.map(m=>o.jsxs("tr",{children:[o.jsxs("td",{children:[o.jsx("div",{style:{fontWeight:"bold"},children:m.aulaNombre}),o.jsxs("div",{style:{fontSize:"11px",color:"#94a3b8"},children:["Cap: ",m.aulaCapacidad]})]}),o.jsxs("td",{children:[o.jsx("div",{style:{fontWeight:"500"},children:m.nombreReservador}),o.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:m.reservadoPor})]}),o.jsx("td",{style:{fontWeight:"500"},children:new Date(m.fecha).toLocaleDateString("es-ES")}),o.jsxs("td",{style:{fontWeight:"500"},children:[m.horaInicio," - ",m.horaFin]}),o.jsx("td",{style:{fontSize:"12px",color:"#475569",maxWidth:"200px"},children:m.descripcion}),o.jsx("td",{children:o.jsx("span",{className:`badge ${m.estado==="Confirmada"?"badge-success":"badge-warning"}`,children:pn(m.estado)})}),o.jsx("td",{children:o.jsx("button",{className:"btn-small btn-danger",onClick:()=>mn(m.id),children:u.allReservations.cancelBtn})})]},m.id))})]})})]}),I==="aulasPúblicas"&&o.jsxs("div",{style:{animation:"fadeIn 0.4s ease"},children:[o.jsx("style",{children:`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

      /* ── Keyframes ── */
      @keyframes adSlideUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes adFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes adExpandBar {
        from { width: 0; }
      }
      @keyframes adPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(5,150,105,0.4); }
        50%       { box-shadow: 0 0 0 6px rgba(5,150,105,0); }
      }
      @keyframes adPulseBlue {
        0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
        50%       { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
      }
      @keyframes adShake {
        0%, 100% { transform: translateX(0); }
        20%       { transform: translateX(-4px); }
        40%       { transform: translateX(4px); }
        60%       { transform: translateX(-4px); }
        80%       { transform: translateX(4px); }
      }
      @keyframes adSlideRight {
        from { opacity: 0; transform: translateX(-12px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes adScaleIn {
        from { opacity: 0; transform: scale(0.96); }
        to   { opacity: 1; transform: scale(1); }
      }

      /* ── Base ── */
      .ad-font { font-family: 'DM Sans', sans-serif; }

      /* ── Date input ── */
      .ad-date-input {
        padding: 9px 14px;
        border: 1px solid rgba(255,255,255,0.18);
        border-radius: 4px;
        font-size: 13px;
        font-family: 'DM Sans', sans-serif;
        color: #ffffff;
        background: rgba(255,255,255,0.1);
        outline: none;
        transition: border-color 0.2s, background 0.2s;
        cursor: pointer;
        width: 160px;
      }
      .ad-date-input:focus {
        border-color: rgba(255,255,255,0.4);
        background: rgba(255,255,255,0.15);
      }
      .ad-date-input::-webkit-calendar-picker-indicator {
        filter: invert(1);
        opacity: 0.7;
        cursor: pointer;
      }

      /* ── Aula selector buttons ── */
      .ad-aula-btn {
        padding: 14px 18px;
        border: 1.5px solid #e4e8ef;
        border-radius: 6px;
        background: #ffffff;
        cursor: pointer;
        text-align: left;
        font-family: 'DM Sans', sans-serif;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
        opacity: 0;
        animation: adSlideUp 0.35s ease forwards;
      }
      .ad-aula-btn::before {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 3px;
        background: #e4e8ef;
        transition: background 0.2s, width 0.2s;
      }
      .ad-aula-btn:hover {
        border-color: #94a3b8;
        box-shadow: 0 4px 16px rgba(15,23,42,0.08);
        transform: translateY(-2px);
      }
      .ad-aula-btn:hover::before {
        background: #059669;
        width: 4px;
      }
      .ad-aula-btn.ad-selected {
        border-color: #059669;
        background: #f0fdf4;
        box-shadow: 0 4px 20px rgba(5,150,105,0.15);
      }
      .ad-aula-btn.ad-selected::before {
        background: #059669;
        width: 4px;
      }

      /* ── Time slot grid ── */
      .ad-slot {
        border: 1.5px solid transparent;
        border-radius: 5px;
        padding: 0;
        cursor: pointer;
        transition: all 0.18s ease;
        position: relative;
        overflow: hidden;
        font-family: 'DM Sans', sans-serif;
      }
      .ad-slot-inner {
        padding: 11px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        height: 100%;
        box-sizing: border-box;
      }
      .ad-slot.ad-slot-free {
        background: #f0fdf4;
        border-color: #d1fae5;
      }
      .ad-slot.ad-slot-free:hover {
        background: #dcfce7;
        border-color: #86efac;
        transform: translateY(-2px);
        box-shadow: 0 4px 14px rgba(5,150,105,0.15);
      }
      .ad-slot.ad-slot-selected {
        background: #dbeafe;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        animation: adPulseBlue 2s ease infinite;
      }
      .ad-slot.ad-slot-occupied {
        background: #fef2f2;
        border-color: #fecaca;
        cursor: default;
      }
      .ad-slot.ad-slot-pending {
        background: #fffbeb;
        border-color: #fde68a;
        cursor: not-allowed;
      }
      .ad-slot.ad-slot-past {
        background: #f8fafc;
        border-color: #f1f5f9;
        opacity: 0.55;
        cursor: not-allowed;
      }
      .ad-slot.ad-slot-free:active { transform: scale(0.98); }

      /* ── Detail panel ── */
      .ad-detail-panel {
        background: #ffffff;
        border: 1px solid #e4e8ef;
        border-radius: 6px;
        overflow: hidden;
        animation: adScaleIn 0.25s ease forwards;
      }

      /* ── Textarea ── */
      .ad-textarea {
        width: 100%;
        padding: 11px 14px;
        border: 1.5px solid #e4e8ef;
        border-radius: 5px;
        font-size: 13px;
        font-family: 'DM Sans', sans-serif;
        color: #1e293b;
        background: #fafbfc;
        resize: vertical;
        min-height: 80px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        box-sizing: border-box;
      }
      .ad-textarea:focus {
        border-color: #059669;
        box-shadow: 0 0 0 3px rgba(5,150,105,0.1);
        background: #ffffff;
      }
      .ad-textarea::placeholder { color: #b8c0cc; }

      /* ── Submit buttons ── */
      .ad-btn-submit {
        padding: 11px 24px;
        background: #059669;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        letter-spacing: 0.2px;
      }
      .ad-btn-submit:hover {
        background: #047857;
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(5,150,105,0.3);
      }
      .ad-btn-submit-blue {
        padding: 11px 24px;
        background: #2563eb;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        letter-spacing: 0.2px;
      }
      .ad-btn-submit-blue:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(37,99,235,0.3);
      }
      .ad-btn-ghost {
        padding: 11px 20px;
        background: transparent;
        color: #64748b;
        border: 1.5px solid #e4e8ef;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: all 0.2s;
      }
      .ad-btn-ghost:hover {
        border-color: #94a3b8;
        background: #f8fafc;
        color: #334155;
      }

      /* ── Badges ── */
      .ad-badge {
        display: inline-block;
        padding: 3px 9px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-transform: uppercase;
        font-family: 'DM Sans', sans-serif;
      }
      .ad-badge-green  { background: #f0fdf4; color: #16a34a; }
      .ad-badge-red    { background: #fef2f2; color: #dc2626; }
      .ad-badge-amber  { background: #fffbeb; color: #b45309; }
      .ad-badge-blue   { background: #eff6ff; color: #2563eb; }
      .ad-badge-slate  { background: #f1f5f9; color: #475569; }
      .ad-badge-indigo { background: #eef2ff; color: #4338ca; }

      /* ── Legend dot ── */
      .ad-legend-dot {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        flex-shrink: 0;
      }

      /* ── Occupancy micro-bar ── */
      .ad-occ-track {
        height: 2px;
        background: #f1f5f9;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 3px;
      }
      .ad-occ-fill {
        height: 100%;
        border-radius: 2px;
        animation: adExpandBar 0.8s ease both;
      }
    `}),o.jsxs("div",{style:{background:"linear-gradient(105deg, #0f172a 0%, #064e3b 50%, #065f46 100%)",borderRadius:"6px",padding:"32px 40px",marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",position:"relative",overflow:"hidden",animation:"adSlideUp 0.5s ease forwards"},children:[o.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",backgroundSize:"40px 40px"}}),o.jsx("div",{style:{position:"absolute",top:"-60px",right:"-30px",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsx("div",{style:{position:"absolute",bottom:"-50px",left:"20%",width:"240px",height:"240px",borderRadius:"50%",background:"radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsxs("div",{style:{position:"relative",zIndex:1},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"11px",fontWeight:"600",letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.sectionLabel}),o.jsxs("h2",{style:{margin:"0 0 8px 0",fontSize:"24px",fontWeight:"400",color:"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:"1.25"},children:[u.availableRooms.title," ",o.jsx("span",{style:{fontStyle:"italic"},children:u.availableRooms.titleItalic})]}),o.jsx("p",{style:{margin:0,color:"rgba(255,255,255,0.42)",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.subtitle})]}),o.jsxs("div",{style:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"12px"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("span",{style:{fontSize:"11px",fontWeight:"600",letterSpacing:"1.2px",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.dateLabel}),o.jsx("input",{type:"date",className:"ad-date-input",value:nt,onChange:m=>{Hs(m.target.value),ri(null),Ks(null),jn(null),sn(!1)}})]}),o.jsx("div",{style:{display:"flex",gap:"10px"},children:[{label:u.availableRooms.totalRooms,value:w.length},{label:u.availableRooms.availableToday,value:(()=>{const m=nt;return w.filter(D=>Cn(D.id,m).some(Q=>!Q.ocupado&&!Q.pasado&&!Q.conSolicitud)).length})()},{label:u.availableRooms.freeSlots,value:(()=>{const m=nt;let D=0;return w.forEach($=>{Cn($.id,m).forEach(Q=>{!Q.ocupado&&!Q.pasado&&!Q.conSolicitud&&D++})}),D})()}].map((m,D)=>o.jsxs("div",{style:{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",padding:"8px 14px",textAlign:"center",minWidth:"74px"},children:[o.jsx("div",{style:{fontSize:"18px",fontWeight:"300",color:"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:1,marginBottom:"3px"},children:m.value}),o.jsx("div",{style:{fontSize:"10px",color:"rgba(255,255,255,0.38)",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase",letterSpacing:"0.4px"},children:m.label})]},D))})]})]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"260px 1fr",gap:"16px",alignItems:"flex-start",opacity:0,animation:"adSlideUp 0.4s ease 0.08s forwards"},children:[o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[o.jsx("p",{style:{margin:"0 0 10px 0",fontSize:"10px",fontWeight:"600",letterSpacing:"1.4px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.selectRoom}),w.length===0?o.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e4e8ef",borderRadius:"6px",padding:"28px 16px",textAlign:"center"},children:[o.jsx("div",{style:{width:"38px",height:"38px",borderRadius:"50%",border:"1px solid #e2e8f0",margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})}),o.jsx("p",{style:{margin:0,fontSize:"12.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.noRooms})]}):w.map((m,D)=>{const $=Cn(m.id,nt),Q=(()=>{const Pe=new Date;return`${Pe.getFullYear()}-${String(Pe.getMonth()+1).padStart(2,"0")}-${String(Pe.getDate()).padStart(2,"0")}`})(),te=nt<Q?0:$.filter(Pe=>!Pe.ocupado&&!Pe.pasado&&!Pe.conSolicitud).length,re=$.filter(Pe=>Pe.ocupado).length,Z=Math.min(re/11*100,100),le=m.estado==="Mantenimiento",ne=(Fe==null?void 0:Fe.id)===m.id;return o.jsxs("button",{className:`ad-aula-btn ${ne?"ad-selected":""}`,style:{animationDelay:`${.1+D*.05}s`},onClick:()=>{Ks(m),ri(null),jn(null),sn(!1)},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",flexShrink:0,background:le?"#fffbeb":ne?"#dcfce7":"#f0fdf4",border:`1px solid ${le?"#fde68a":ne?"#86efac":"#d1fae5"}`,display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:le?"#b45309":"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})}),o.jsx("span",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif',lineHeight:1.2},children:m.nombre})]}),ne&&o.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:"#059669",animation:"adPulse 2s ease infinite",flexShrink:0}})]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"},children:[o.jsxs("span",{style:{fontSize:"11px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:[u.availableRooms.cap," ",m.capacidad," · ",m.equipoDisponible||u.availableRooms.noEquip]}),o.jsx("span",{className:`ad-badge ${le?"ad-badge-amber":te>0?"ad-badge-green":"ad-badge-red"}`,children:le?u.availableRooms.maintenance:`${te} ${te!==1?u.availableRooms.freeSlots:u.availableRooms.selectRoom}`})]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx("div",{style:{flex:1},children:o.jsx("div",{className:"ad-occ-track",children:o.jsx("div",{className:"ad-occ-fill",style:{width:`${Z}%`,background:Z>=70?"#dc2626":Z>=40?"#d97706":"#059669"}})})}),o.jsxs("span",{style:{fontSize:"10px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif',flexShrink:0},children:[re,"/11"]})]})]},m.id)}),w.length>0&&o.jsxs("div",{style:{marginTop:"8px",padding:"12px 14px",background:"#fafbfc",border:"1px solid #f1f5f9",borderRadius:"5px"},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"9.5px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.legend}),o.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"5px"},children:[{color:"#d1fae5",border:"#86efac",label:u.availableRooms.legendFree},{color:"#dbeafe",border:"#93c5fd",label:u.availableRooms.legendSelected},{color:"#fee2e2",border:"#fca5a5",label:u.availableRooms.legendOccupied},{color:"#fef3c7",border:"#fde68a",label:u.availableRooms.legendPending},{color:"#f1f5f9",border:"#e2e8f0",label:u.availableRooms.legendPast}].map(({color:m,border:D,label:$})=>o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"7px"},children:[o.jsx("div",{className:"ad-legend-dot",style:{background:m,border:`1px solid ${D}`}}),o.jsx("span",{style:{fontSize:"11.5px",color:"#64748b",fontFamily:'"DM Sans", sans-serif'},children:$})]},$))})]})]}),o.jsx("div",{children:Fe?o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:[o.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e4e8ef",borderRadius:"6px",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"16px",flexWrap:"wrap",animation:"adSlideRight 0.3s ease forwards"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[o.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"6px",flexShrink:0,background:Fe.estado==="Mantenimiento"?"#fffbeb":"#f0fdf4",border:`1px solid ${Fe.estado==="Mantenimiento"?"#fde68a":"#86efac"}`,display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:Fe.estado==="Mantenimiento"?"#b45309":"#059669",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 21V9"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"16px",fontWeight:"700",color:"#0f172a",fontFamily:'"DM Serif Display", serif'},children:Fe.nombre}),o.jsxs("div",{style:{fontSize:"12px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif',marginTop:"2px"},children:[u.availableRooms.people," ",Fe.capacidad," · ",Fe.equipoDisponible||u.availableRooms.noSpecialEquip]})]})]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsxs("div",{style:{textAlign:"right"},children:[o.jsx("div",{style:{fontSize:"12px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:new Date(nt+"T12:00:00").toLocaleDateString("es-ES",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}),o.jsxs("div",{style:{fontSize:"11px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif',marginTop:"1px"},children:[Cn(Fe.id,nt).filter(m=>!m.ocupado&&!m.pasado&&!m.conSolicitud).length," bloque(s) disponibles"]})]}),o.jsx("span",{className:`ad-badge ${Fe.estado==="Mantenimiento"?"ad-badge-amber":Cn(Fe.id,nt).some(m=>!m.ocupado&&!m.pasado)?"ad-badge-green":"ad-badge-red"}`,children:Fe.estado==="Mantenimiento"?u.availableRooms.statusMaintenance:Cn(Fe.id,nt).some(m=>!m.ocupado&&!m.pasado)?u.availableRooms.statusAvailable:u.availableRooms.statusNoSlots})]})]}),o.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e4e8ef",borderRadius:"6px",overflow:"hidden",animation:"adSlideUp 0.3s ease 0.06s forwards",opacity:0},children:[o.jsxs("div",{style:{padding:"12px 20px",borderBottom:"1px solid #f1f5f9",background:"#fafbfc",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[o.jsx("span",{style:{fontSize:"10px",fontWeight:"600",letterSpacing:"1.3px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.slotsHeader}),Ye&&o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:"#2563eb",animation:"adPulse 1.5s ease infinite"}}),o.jsx("span",{style:{fontSize:"11.5px",fontWeight:"600",color:"#2563eb",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.slotSelected.replace("{inicio}",Ye==null?void 0:Ye.horaInicio).replace("{fin}",Ye==null?void 0:Ye.horaFin)})]})]}),o.jsxs("div",{style:{padding:"16px 20px"},children:[(()=>{const m=(()=>{const D=new Date;return`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}-${String(D.getDate()).padStart(2,"0")}`})();return nt>=m?null:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",marginBottom:"14px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"5px"},children:[o.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"#dc2626",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{flexShrink:0},children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),o.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),o.jsx("span",{style:{fontSize:"12.5px",fontWeight:"600",color:"#991b1b",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.pastDateWarning})]})})(),o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))",gap:"8px"},children:(()=>{const m=(()=>{const $=new Date;return`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}-${String($.getDate()).padStart(2,"0")}`})(),D=nt<m;return Cn(Fe.id,nt).map(($,Q)=>{var Z,le,ne;const P=$.pasado||D,te=(Ye==null?void 0:Ye.horaInicio)===$.horaInicio,re=P?"ad-slot-past":$.conSolicitud?"ad-slot-pending":$.ocupado?"ad-slot-occupied":te?"ad-slot-selected":"ad-slot-free";return o.jsxs("button",{className:`ad-slot ${re}`,disabled:P||$.conSolicitud,onClick:()=>{P||$.conSolicitud||($.ocupado?(ri($.reserva),jn(null),sn(!1)):te?(jn(null),sn(!1)):(jn($),ri(null),sn(!0)))},children:[o.jsxs("div",{className:"ad-slot-inner",children:[o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"700",color:P?"#94a3b8":$.conSolicitud?"#92400e":$.ocupado?"#991b1b":te?"#1d4ed8":"#166534",fontFamily:'"DM Sans", sans-serif',lineHeight:1.2},children:$.horaInicio}),o.jsxs("div",{style:{fontSize:"10px",color:P?"#b0bac9":"#94a3b8",fontFamily:'"DM Sans", sans-serif',marginTop:"1px"},children:["→ ",$.horaFin]})]}),o.jsx("div",{style:{textAlign:"right"},children:P?o.jsx("span",{style:{fontSize:"9px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.5px",color:"#b0bac9",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.past}):$.conSolicitud?o.jsx("span",{style:{fontSize:"9px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.5px",color:"#92400e",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.pending}):$.ocupado?o.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"#dc2626",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),o.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]}):te?o.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"#2563eb",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:o.jsx("polyline",{points:"20 6 9 17 4 12"})}):o.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"#16a34a",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),o.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})})]}),$.ocupado&&!P&&o.jsxs("div",{style:{padding:"5px 14px 8px",fontSize:"10.5px",color:"#991b1b",fontFamily:'"DM Sans", sans-serif',borderTop:"1px solid #fecaca",background:"rgba(220,38,38,0.04)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:[((Z=$.reserva)==null?void 0:Z.nombreReservador)||((ne=(le=$.reserva)==null?void 0:le.reservadoPor)==null?void 0:ne.split("@")[0])||"—"," · Ver detalle"]})]},Q)})})()})]})]}),Ue&&!Ye&&o.jsxs("div",{className:"ad-detail-panel",style:{borderLeft:"3px solid #dc2626"},children:[o.jsxs("div",{style:{padding:"14px 20px",background:"#fef2f2",borderBottom:"1px solid #fecaca",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"#fecaca",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"#dc2626",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),o.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),o.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),o.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"700",color:"#991b1b",fontFamily:'"DM Sans", sans-serif'},children:"Bloque Reservado"}),o.jsxs("div",{style:{fontSize:"11px",color:"#b91c1c",fontFamily:'"DM Sans", sans-serif'},children:[Ue.horaInicio," – ",Ue.horaFin]})]})]}),o.jsx("button",{onClick:()=>ri(null),style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",padding:"4px",fontSize:"16px",lineHeight:1,fontWeight:"300"},children:"✕"})]}),o.jsxs("div",{style:{padding:"18px 20px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"16px"},children:[o.jsxs("div",{children:[o.jsx("p",{style:{margin:"0 0 4px",fontSize:"10px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:"Reservado por"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:Ue.rol==="admin"?"#fef2f2":Ue.rol==="maestro"?"#eff6ff":"#f0fdf4",border:`1px solid ${Ue.rol==="admin"?"#fca5a5":Ue.rol==="maestro"?"#93c5fd":"#86efac"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsx("span",{style:{fontSize:"11px",fontWeight:"700",color:Ue.rol==="admin"?"#dc2626":Ue.rol==="maestro"?"#2563eb":"#16a34a",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase"},children:(Ue.nombreReservador||Ue.reservadoPor||"?").charAt(0)})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:Ue.nombreReservador||((pr=Ue.reservadoPor)==null?void 0:pr.split("@")[0])}),o.jsx("div",{style:{fontSize:"11px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:Ue.reservadoPor})]})]})]}),o.jsxs("div",{children:[o.jsx("p",{style:{margin:"0 0 4px",fontSize:"10px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:"Rol"}),o.jsx("span",{className:`ad-badge ${Ue.rol==="admin"?"ad-badge-red":Ue.rol==="maestro"?"ad-badge-blue":"ad-badge-green"}`,children:Ue.rol})]}),o.jsxs("div",{children:[o.jsx("p",{style:{margin:"0 0 4px",fontSize:"10px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:"Horario"}),o.jsxs("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:[Ue.horaInicio," → ",Ue.horaFin]})]}),Ue.descripcion&&o.jsxs("div",{style:{gridColumn:"1 / -1"},children:[o.jsx("p",{style:{margin:"0 0 4px",fontSize:"10px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.description}),o.jsx("div",{style:{fontSize:"13px",color:"#475569",fontFamily:'"DM Sans", sans-serif',lineHeight:"1.5",whiteSpace:"pre-wrap"},children:Ue.descripcion})]})]})]}),Ye&&!Ue&&o.jsxs("div",{className:"ad-detail-panel",style:{borderLeft:`3px solid ${E.rol==="alumno"?"#2563eb":"#059669"}`},children:[o.jsxs("div",{style:{padding:"14px 20px",background:E.rol==="alumno"?"#eff6ff":"#f0fdf4",borderBottom:`1px solid ${E.rol==="alumno"?"#bfdbfe":"#d1fae5"}`,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:E.rol==="alumno"?"#bfdbfe":"#bbf7d0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:E.rol==="alumno"?"#2563eb":"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:E.rol==="alumno"?o.jsxs(o.Fragment,{children:[o.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.jsx("polyline",{points:"14 2 14 8 20 8"})]}):o.jsx(o.Fragment,{children:o.jsx("polyline",{points:"20 6 9 17 4 12"})})})}),o.jsxs("div",{children:[(E==null?void 0:E.rol)==="alumno"?"Enviar Solicitud de Reserva":"Confirmar Reserva Directa",o.jsxs("div",{style:{fontSize:"11px",color:(E==null?void 0:E.rol)==="alumno"?"#3b82f6":"#16a34a",fontFamily:'"DM Sans", sans-serif'},children:[Fe.nombre," · ",Ye.horaInicio,"–",Ye.horaFin," · ",new Date(nt+"T12:00:00").toLocaleDateString("es-ES",{day:"numeric",month:"short",year:"numeric"})]})]})]}),o.jsx("button",{onClick:()=>{jn(null),sn(!1)},style:{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",padding:"4px",fontSize:"16px",lineHeight:1},children:"✕"})]}),o.jsx("div",{style:{padding:"12px 20px",borderBottom:"1px solid #f1f5f9",background:"#fafbfc",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:"12px"},children:[{label:u.availableRooms.room,value:Fe.nombre},{label:u.availableRooms.date,value:new Date(nt+"T12:00:00").toLocaleDateString("es-ES",{weekday:"short",day:"numeric",month:"short"})},{label:u.availableRooms.time,value:`${Ye.horaInicio} – ${Ye.horaFin}`},{label:u.availableRooms.mode,value:E.rol==="alumno"?u.availableRooms.modeRequest:u.availableRooms.modeDirectReserve}].map(({label:m,value:D})=>o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"10px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif',marginBottom:"2px"},children:m}),o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:D})]},m))}),o.jsx("div",{style:{padding:"18px 20px"},children:o.jsxs("form",{onSubmit:ai,children:[o.jsx("input",{type:"hidden",name:"tipo",value:"Aula"}),o.jsx("input",{type:"hidden",name:"fechaSolicitada",value:nt}),o.jsx("input",{type:"hidden",name:"aulaNombre",value:Fe.nombre}),o.jsx("input",{type:"hidden",name:"aulaId",value:Fe.id}),o.jsx("input",{type:"hidden",name:"horaInicio",value:Ye.horaInicio}),o.jsx("input",{type:"hidden",name:"horaFin",value:Ye.horaFin}),o.jsxs("div",{style:{marginBottom:"14px"},children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"10px",fontWeight:"600",letterSpacing:"1.2px",textTransform:"uppercase",color:"#64748b",fontFamily:'"DM Sans", sans-serif'},children:E.rol==="alumno"?u.availableRooms.reasonLabel:u.availableRooms.descLabel}),o.jsx("textarea",{name:"descripcion",className:"ad-textarea",placeholder:E.rol==="alumno"?u.availableRooms.reasonPlaceholder:u.availableRooms.descPlaceholder,required:!0,rows:"3"})]}),o.jsxs("div",{style:{padding:"10px 14px",background:E.rol==="alumno"?"#eff6ff":"#f0fdf4",borderRadius:"4px",marginBottom:"14px",display:"flex",gap:"8px",alignItems:"flex-start"},children:[o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:E.rol==="alumno"?"#2563eb":"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{flexShrink:0,marginTop:"1px"},children:[o.jsx("circle",{cx:"12",cy:"12",r:"10"}),o.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),o.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),o.jsx("span",{style:{fontSize:"12px",color:E.rol==="alumno"?"#1e40af":"#166534",fontFamily:'"DM Sans", sans-serif',lineHeight:1.5},children:E.rol==="alumno"?u.availableRooms.infoStudent:u.availableRooms.infoTeacher})]}),o.jsxs("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end"},children:[o.jsx("button",{type:"button",className:"ad-btn-ghost",onClick:()=>{jn(null),sn(!1)},children:u.availableRooms.cancelBtn}),o.jsx("button",{type:"submit",className:E.rol==="alumno"?"ad-btn-submit-blue":"ad-btn-submit",children:E.rol==="alumno"?u.availableRooms.submitRequest:u.availableRooms.submitReserve})]})]})})]})]}):o.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e4e8ef",borderRadius:"6px",padding:"60px 40px",textAlign:"center",opacity:0,animation:"adFadeIn 0.4s ease 0.15s forwards"},children:[o.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"50%",border:"1px solid #e2e8f0",margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8fafc"},children:o.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),o.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),o.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),o.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]})}),o.jsx("p",{style:{margin:"0 0 6px 0",fontSize:"14px",fontWeight:"600",color:"#475569",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.selectRoomPrompt}),o.jsx("p",{style:{margin:0,fontSize:"12.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.availableRooms.selectRoomHint})]})})]})]}),(N.verInventario||N.solicitarEquipos)&&I==="inventario"&&o.jsxs("div",{style:{animation:"fadeIn 0.5s ease-in-out"},children:[o.jsx("style",{children:`
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

                    @keyframes invSlideUp {
                      from { opacity: 0; transform: translateY(20px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes invFadeRow {
                      from { opacity: 0; transform: translateX(-6px); }
                      to   { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes invExpandBar {
                      from { width: 0; }
                    }

                    .inv-input {
                      width: 100%;
                      padding: 9px 13px;
                      border: 1px solid #dde2ea;
                      border-radius: 4px;
                      font-size: 13px;
                      font-family: 'DM Sans', sans-serif;
                      color: #1e293b;
                      background: #ffffff;
                      transition: border-color 0.2s, box-shadow 0.2s;
                      outline: none;
                      box-sizing: border-box;
                    }
                    .inv-input:focus {
                      border-color: #059669;
                      box-shadow: 0 0 0 3px rgba(5,150,105,0.08);
                    }
                    .inv-input::placeholder { color: #b0b8c8; }

                    .inv-btn-primary {
                      padding: 9px 22px;
                      background: #0f172a;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      font-size: 13px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      letter-spacing: 0.3px;
                      transition: background 0.2s, transform 0.15s;
                      white-space: nowrap;
                      height: 38px;
                    }
                    .inv-btn-primary:hover {
                      background: #1e293b;
                      transform: translateY(-1px);
                    }

                    .inv-btn-green {
                      padding: 9px 22px;
                      background: #059669;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      font-size: 13px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      transition: background 0.2s, transform 0.15s;
                      white-space: nowrap;
                      height: 38px;
                    }
                    .inv-btn-green:hover {
                      background: #047857;
                      transform: translateY(-1px);
                    }

                    .inv-btn-outline {
                      padding: 6px 14px;
                      background: transparent;
                      border: 1px solid #e4e8ef;
                      border-radius: 4px;
                      font-size: 11px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      color: #64748b;
                      transition: all 0.2s;
                    }
                    .inv-btn-outline:hover {
                      border-color: #94a3b8;
                      background: #f8fafc;
                    }

                    .inv-btn-danger-outline {
                      padding: 6px 14px;
                      background: transparent;
                      border: 1px solid #fca5a5;
                      border-radius: 4px;
                      font-size: 11px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      color: #dc2626;
                      transition: all 0.2s;
                    }
                    .inv-btn-danger-outline:hover {
                      border-color: #dc2626;
                      background: #fef2f2;
                    }

                    .inv-table {
                      width: 100%;
                      border-collapse: collapse;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .inv-table thead tr {
                      background: #f8fafc;
                      border-bottom: 1px solid #e4e8ef;
                    }
                    .inv-table thead th {
                      padding: 10px 16px;
                      text-align: left;
                      font-size: 10px;
                      font-weight: 600;
                      letter-spacing: 1.2px;
                      text-transform: uppercase;
                      color: #94a3b8;
                    }
                    .inv-table tbody tr {
                      border-bottom: 1px solid #f1f5f9;
                      transition: background 0.15s;
                      opacity: 0;
                      animation: invFadeRow 0.3s ease forwards;
                    }
                    .inv-table tbody tr:last-child { border-bottom: none; }
                    .inv-table tbody tr:hover { background: #fafbfc; }
                    .inv-table td {
                      padding: 12px 16px;
                      font-size: 13px;
                      color: #334155;
                      vertical-align: middle;
                    }

                    .inv-stock-bar {
                      height: 4px;
                      background: #f1f5f9;
                      border-radius: 2px;
                      overflow: hidden;
                      margin-top: 4px;
                      width: 80px;
                    }
                    .inv-stock-fill {
                      height: 100%;
                      border-radius: 2px;
                      animation: invExpandBar 0.8s ease both;
                    }

                    .inv-badge {
                      display: inline-block;
                      padding: 3px 9px;
                      border-radius: 3px;
                      font-size: 10px;
                      font-weight: 700;
                      letter-spacing: 0.7px;
                      text-transform: uppercase;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .inv-badge-green    { background: #f0fdf4; color: #16a34a; }
                    .inv-badge-red      { background: #fef2f2; color: #dc2626; }
                    .inv-badge-amber    { background: #fffbeb; color: #b45309; }
                    .inv-badge-blue     { background: #eff6ff; color: #2563eb; }
                    .inv-badge-gray     { background: #f8fafc; color: #64748b; }

                    .inv-section-label {
                      font-size: 10px;
                      font-weight: 600;
                      letter-spacing: 1.4px;
                      text-transform: uppercase;
                      color: #94a3b8;
                      margin: 0 0 14px 0;
                      font-family: 'DM Sans', sans-serif;
                    }

                    .inv-qty-input {
                      width: 64px;
                      padding: 5px 8px;
                      border: 1px solid #e4e8ef;
                      border-radius: 4px;
                      font-size: 13px;
                      font-family: 'DM Sans', sans-serif;
                      text-align: center;
                      outline: none;
                      transition: border-color 0.2s;
                    }
                    .inv-qty-input:focus { border-color: #059669; }

                    .inv-card {
                      background: #fff;
                      border: 1px solid #e4e8ef;
                      border-radius: 6px;
                      overflow: hidden;
                      opacity: 0;
                      animation: invSlideUp 0.4s ease forwards;
                    }
                    .inv-card-header {
                      padding: 14px 20px;
                      border-bottom: 1px solid #f1f5f9;
                      background: #fafbfc;
                      display: flex;
                      align-items: center;
                      gap: 10px;
                    }

                    .inv-sol-row {
                      display: flex;
                      align-items: flex-start;
                      gap: 12px;
                      padding: 13px 0;
                      border-bottom: 1px solid #f1f5f9;
                      opacity: 0;
                      animation: invFadeRow 0.3s ease forwards;
                    }
                    .inv-sol-row:last-child { border-bottom: none; }
                  `}),o.jsxs("div",{style:{background:"linear-gradient(100deg, #0f172a 0%, #064e3b 55%, #065f46 100%)",borderRadius:"6px",padding:"32px 40px",marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",position:"relative",overflow:"hidden",animation:"invSlideUp 0.5s ease forwards"},children:[o.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",backgroundSize:"40px 40px"}}),o.jsx("div",{style:{position:"absolute",top:"-60px",right:"-40px",width:"280px",height:"280px",borderRadius:"50%",background:"radial-gradient(circle, rgba(5,150,105,0.2) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsxs("div",{style:{position:"relative",zIndex:1},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"11px",fontWeight:"600",letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.45)",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.sectionLabel}),o.jsxs("h2",{style:{margin:"0 0 8px 0",fontSize:"24px",fontWeight:"400",color:"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:"1.25"},children:[u.inventoryUser.title," ",o.jsx("span",{style:{fontStyle:"italic"},children:u.inventoryUser.titleItalic})]}),o.jsx("p",{style:{margin:0,color:"rgba(255,255,255,0.45)",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.subtitle})]}),o.jsx("div",{style:{position:"relative",zIndex:1,display:"flex",gap:"12px",flexWrap:"wrap"},children:[{label:u.inventoryUser.equipmentTypes,value:F.length},{label:u.inventoryUser.totalStock,value:F.reduce((m,D)=>m+(D.cantidad||0),0)},{label:u.inventoryUser.noStock,value:F.filter(m=>(m.cantidad||0)===0).length},{label:u.inventoryUser.activeLoans,value:S.filter(m=>m.estado==="Aprobada"&&!m.devuelto).length}].map((m,D)=>o.jsxs("div",{style:{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",padding:"10px 16px",textAlign:"center",minWidth:"80px"},children:[o.jsx("div",{style:{fontSize:"20px",fontWeight:"300",color:m.label==="Sin stock"&&m.value>0?"#fca5a5":"#ffffff",fontFamily:'"DM Serif Display", serif',lineHeight:1,marginBottom:"4px"},children:m.value}),o.jsx("div",{style:{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:'"DM Sans", sans-serif',textTransform:"uppercase",letterSpacing:"0.5px"},children:m.label})]},D))})]}),N.gestionEquipos&&o.jsxs("div",{className:"inv-card",style:{marginBottom:"16px",animationDelay:"0.08s"},children:[o.jsxs("div",{className:"inv-card-header",children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),o.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.registerEquipment}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.registerEquipmentDesc})]}),o.jsx("button",{onClick:()=>Te(!_e),style:{marginLeft:"auto",padding:"6px 16px",background:_e?"#f1f5f9":"#0f172a",color:_e?"#64748b":"#fff",border:"1px solid #e4e8ef",borderRadius:"4px",fontSize:"12px",fontWeight:"600",fontFamily:'"DM Sans", sans-serif',cursor:"pointer",transition:"all 0.2s"},children:_e?u.inventoryUser.cancelBtn:u.inventoryUser.addEquipmentBtn})]}),_e&&o.jsx("div",{style:{padding:"20px 24px"},children:o.jsxs("form",{onSubmit:qi,children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 180px 140px 160px",gap:"12px",alignItems:"flex-end"},children:[o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.equipmentName}),o.jsx("input",{name:"nombre",className:"inv-input",placeholder:u.inventoryUser.equipmentNamePlaceholder,required:!0})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.category}),o.jsxs("select",{name:"categoria",className:"inv-input",required:!0,style:{cursor:"pointer"},children:[o.jsx("option",{value:"",children:u.inventoryUser.selectOption}),o.jsx("option",{value:"Gafas RV",children:"Gafas RV"}),o.jsx("option",{value:"Cámara",children:"Cámara"}),o.jsx("option",{value:"Laptop",children:"Laptop"}),o.jsx("option",{value:"Micrófono",children:"Micrófono"}),o.jsx("option",{value:"Otro",children:"Otro"})]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.quantity}),o.jsx("input",{name:"cantidad",type:"number",min:"1",className:"inv-input",placeholder:"1",defaultValue:"1"})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.status}),o.jsxs("select",{name:"estado",className:"inv-input",style:{cursor:"pointer"},children:[o.jsx("option",{value:"Disponible",children:u.inventoryUser.available}),o.jsx("option",{value:"Mantenimiento",children:u.inventoryUser.maintenance}),o.jsx("option",{value:"Inactivo",children:u.inventoryUser.inactive})]})]})]}),o.jsx("div",{style:{marginTop:"14px",display:"flex",justifyContent:"flex-end"},children:o.jsx("button",{type:"submit",className:"inv-btn-green",children:u.inventoryUser.registerBtn})})]})})]}),N.solicitarEquipos&&o.jsxs("div",{className:"inv-card",style:{marginBottom:"16px",animationDelay:"0.1s"},children:[o.jsxs("div",{className:"inv-card-header",children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:o.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.requestLoan}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.requestLoanDesc})]}),o.jsx("button",{onClick:()=>rn(!St),style:{marginLeft:"auto",padding:"6px 16px",background:St?"#f1f5f9":"#059669",color:St?"#64748b":"#fff",border:"1px solid "+(St?"#e4e8ef":"#059669"),borderRadius:"4px",fontSize:"12px",fontWeight:"600",fontFamily:'"DM Sans", sans-serif',cursor:"pointer",transition:"all 0.2s"},children:St?u.inventoryUser.cancelBtn:u.inventoryUser.newRequestBtn})]}),St&&o.jsx("div",{style:{padding:"20px 24px"},children:o.jsxs("form",{onSubmit:pu,children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 140px 180px",gap:"12px",marginBottom:"12px"},children:[o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.material}),o.jsxs("select",{name:"equipoId",className:"inv-input",required:!0,style:{cursor:"pointer"},children:[o.jsx("option",{value:"",children:u.inventoryUser.selectMaterial}),F.filter(m=>m.cantidad>0).map(m=>o.jsxs("option",{value:m.id,children:[m.nombre," — ",m.cantidad," ",m.cantidad===1?u.inventoryUser.available:u.inventoryUser.availablePlural]},m.id))]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.quantity}),o.jsx("input",{name:"cantidad",type:"number",min:"1",className:"inv-input",placeholder:"1",required:!0})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.usageTime}),o.jsxs("select",{name:"tiempoUso",className:"inv-input",required:!0,style:{cursor:"pointer"},children:[o.jsx("option",{value:"",children:u.inventoryUser.selectDuration}),o.jsx("option",{value:"1",children:"1 hour"}),o.jsx("option",{value:"2",children:"2 hours"}),o.jsx("option",{value:"24",children:"1 full day"}),o.jsx("option",{value:"168",children:"1 week"}),o.jsx("option",{value:"-24",style:{color:"#dc2626"},children:"TEST: Simulate Delay"})]})]})]}),o.jsxs("div",{style:{marginBottom:"14px"},children:[o.jsx("label",{style:{display:"block",marginBottom:"6px",fontSize:"11px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.reasonLoan}),o.jsx("textarea",{name:"motivo",className:"inv-input",placeholder:u.inventoryUser.reasonLoanPlaceholder,required:!0,rows:"2",style:{resize:"vertical",minHeight:"60px"}})]}),o.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:o.jsx("button",{type:"submit",className:"inv-btn-green",children:u.inventoryUser.submitRequestBtn})})]})})]}),o.jsxs("div",{className:"inv-card",style:{marginBottom:"16px",animationDelay:"0.16s"},children:[o.jsxs("div",{className:"inv-card-header",style:{justifyContent:"space-between"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:o.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.catalogTitle}),o.jsxs("div",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:[F.length," ",u.inventoryUser.equipmentRegistered]})]})]}),o.jsx("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:["Disponible","Sin stock","Mantenimiento"].map(m=>{const D=m==="Disponible"?F.filter(P=>(P.cantidad||0)>0).length:m==="Sin stock"?F.filter(P=>(P.cantidad||0)===0).length:F.filter(P=>P.estado==="Mantenimiento").length,$=m==="Disponible"?"#059669":m==="Sin stock"?"#dc2626":"#b45309",Q=m==="Disponible"?"#f0fdf4":m==="Sin stock"?"#fef2f2":"#fffbeb";return o.jsxs("div",{style:{background:Q,border:`1px solid ${$}22`,borderRadius:"4px",padding:"4px 12px",display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:$,display:"inline-block"}}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:$,fontFamily:'"DM Sans", sans-serif'},children:[D," ",m==="Disponible"?u.inventoryUser.available:m==="Sin stock"?u.inventoryUser.noStock:u.inventoryUser.maintenance]})]},m)})})]}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs("table",{className:"inv-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.inventoryUser.colEquipment}),o.jsx("th",{children:u.inventoryUser.colCategory}),o.jsx("th",{children:u.inventoryUser.colStock}),o.jsx("th",{children:u.inventoryUser.colAvailability}),O==="admin"&&o.jsx("th",{children:u.inventoryUser.colRegisteredBy}),O==="admin"&&o.jsx("th",{style:{textAlign:"right"},children:u.inventoryUser.colActions})]})}),o.jsx("tbody",{children:F.length===0?o.jsx("tr",{style:{opacity:1},children:o.jsxs("td",{colSpan:"6",style:{textAlign:"center",padding:"40px",color:"#94a3b8"},children:[o.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",border:"1px solid #e2e8f0",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",children:o.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})}),u.inventoryUser.noEquipmentRegistered]})}):F.map((m,D)=>{var Z;const $=(m.cantidad||0)===0,Q=m.estado==="Mantenimiento",P=Math.max(...F.map(le=>le.cantidad||0),1),te=Math.min((m.cantidad||0)/P*100,100),re=$?"#dc2626":Q?"#b45309":"#059669";return o.jsxs("tr",{style:{animationDelay:`${.2+D*.04}s`},children:[o.jsx("td",{children:o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"4px",background:$?"#fef2f2":"#f0fdf4",border:`1px solid ${$?"#fca5a5":"#86efac"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:$?"#dc2626":"#059669",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:o.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontWeight:"600",color:"#1e293b",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:m.nombre}),o.jsxs("div",{style:{fontSize:"11px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:["ID: ",m.id.slice(0,8),"..."]})]})]})}),o.jsx("td",{children:o.jsx("span",{className:"inv-badge inv-badge-gray",children:m.categoria||"—"})}),o.jsx("td",{children:o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:O==="admin"?o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx("input",{type:"number",className:"inv-qty-input",defaultValue:m.cantidad||0,min:"0",onBlur:le=>{const ne=parseInt(le.target.value);!isNaN(ne)&&ne!==m.cantidad&&oi(m.id,ne)},onKeyDown:le=>{le.key==="Enter"&&le.target.blur()}}),o.jsx("span",{style:{fontSize:"11px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:"uds."})]}):o.jsxs("div",{children:[o.jsx("span",{style:{fontSize:"22px",fontWeight:"300",fontFamily:'"DM Serif Display", serif',color:$?"#dc2626":"#0f172a",lineHeight:1},children:m.cantidad||0}),o.jsx("div",{className:"inv-stock-bar",children:o.jsx("div",{className:"inv-stock-fill",style:{width:`${te}%`,background:re}})})]})})}),o.jsx("td",{children:o.jsx("span",{className:`inv-badge ${$?"inv-badge-red":Q?"inv-badge-amber":"inv-badge-green"}`,children:$?u.inventoryUser.noStock:Q?u.inventoryUser.maintenance:u.inventoryUser.available})}),O==="admin"&&o.jsx("td",{style:{fontSize:"12px",color:"#64748b",fontFamily:'"DM Sans", sans-serif'},children:((Z=m.registradoPor)==null?void 0:Z.split("@")[0])||"—"}),O==="admin"&&o.jsx("td",{style:{textAlign:"right"},children:o.jsx("button",{className:"inv-btn-danger-outline",onClick:()=>Zs(m.id),children:u.inventoryUser.deleteBtn})})]},m.id)})})]})}),F.length>0&&o.jsxs("div",{style:{padding:"10px 20px",borderTop:"1px solid #f1f5f9",background:"#fafbfc",display:"flex",justifyContent:"space-between"},children:[o.jsxs("span",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:[F.length," tipo(s) · ",F.reduce((m,D)=>m+(D.cantidad||0),0)," unidades totales"]}),O==="admin"&&o.jsx("span",{style:{fontSize:"11px",color:"#cbd5e1",fontFamily:'"DM Sans", sans-serif'},children:"Edita las cantidades directamente en la celda y presiona Enter"})]})]}),N.solicitarEquipos&&S.filter(m=>m.solicitadoPor===(E==null?void 0:E.email)).length>0&&o.jsxs("div",{className:"inv-card",style:{animationDelay:"0.24s"},children:[o.jsxs("div",{className:"inv-card-header",style:{justifyContent:"space-between"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#2563eb",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.jsx("polyline",{points:"14 2 14 8 20 8"}),o.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),o.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:"600",color:"#1e293b",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.myMaterialRequests}),o.jsx("div",{style:{fontSize:"11.5px",color:"#94a3b8",fontFamily:'"DM Sans", sans-serif'},children:u.inventoryUser.historyBorrowedByYou})]})]}),S.filter(m=>m.solicitadoPor===(E==null?void 0:E.email)&&m.estado==="Pendiente").length>0&&o.jsxs("div",{style:{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:"4px",padding:"4px 12px",display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:"#b45309",display:"inline-block"}}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:"#b45309",fontFamily:'"DM Sans", sans-serif'},children:[S.filter(m=>m.solicitadoPor===(E==null?void 0:E.email)&&m.estado==="Pendiente").length," ",u.inventoryUser.pendingLabel]})]})]}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs("table",{className:"inv-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.inventoryUser.colMaterial}),o.jsx("th",{children:u.inventoryUser.colQuantity}),o.jsx("th",{children:u.inventoryUser.colReason}),o.jsx("th",{children:u.inventoryUser.colExpectedReturn}),o.jsx("th",{children:u.inventoryUser.colStatus}),o.jsx("th",{children:u.inventoryUser.colReturned})]})}),o.jsx("tbody",{children:S.filter(m=>m.solicitadoPor===(E==null?void 0:E.email)).map((m,D)=>{const $=new Date,Q=new Date(m.fechaDevolucionEsperada),P=m.estado==="Aprobada"&&!m.devuelto&&$>Q;return o.jsxs("tr",{style:{animationDelay:`${.3+D*.04}s`,background:P?"#fef2f2":""},children:[o.jsx("td",{children:o.jsx("div",{style:{fontWeight:"600",color:"#1e293b",fontSize:"13px",fontFamily:'"DM Sans", sans-serif'},children:m.equipoNombre})}),o.jsx("td",{children:o.jsxs("span",{style:{fontFamily:'"DM Serif Display", serif',fontSize:"18px",fontWeight:"300",color:"#0f172a"},children:["×",m.cantidad]})}),o.jsx("td",{style:{fontSize:"12px",color:"#64748b",maxWidth:"180px",fontFamily:'"DM Sans", sans-serif'},children:m.motivo||"—"}),o.jsx("td",{children:o.jsxs("div",{style:{fontSize:"12px",color:P?"#dc2626":"#64748b",fontFamily:'"DM Sans", sans-serif',fontWeight:P?"600":"400"},children:[P&&o.jsx("div",{style:{fontSize:"10px",fontWeight:"700",color:"#dc2626",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"2px"},children:u.inventoryAdmin.overdueBadge}),new Date(m.fechaDevolucionEsperada).toLocaleString("es-ES",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})]})}),o.jsx("td",{children:o.jsx("span",{className:`inv-badge ${m.estado==="Aprobada"?"inv-badge-green":m.estado==="Rechazada"?"inv-badge-red":"inv-badge-amber"}`,children:m.estado})}),o.jsx("td",{children:o.jsx("span",{className:`inv-badge ${m.devuelto?"inv-badge-green":m.estado==="Aprobada"?"inv-badge-red":"inv-badge-gray"}`,children:m.devuelto?u.inventoryUser.returned:m.estado==="Aprobada"?u.inventoryUser.notReturned:"—"})})]},m.id)})})]})})]})]}),N.verSolicitudes&&I==="solicitudesAdmin"&&o.jsxs("div",{className:"seccion-blanca",children:[o.jsx("div",{className:"section-header",children:o.jsx("h2",{children:u.adminRequests.title})}),o.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px",borderBottom:"2px solid #e2e8f0",paddingBottom:"10px"},children:[o.jsxs("button",{onClick:()=>An("aulas"),style:{padding:"10px 20px",border:"none",borderBottom:at==="aulas"?"3px solid #3b82f6":"none",backgroundColor:"transparent",cursor:"pointer",fontSize:"15px",color:at==="aulas"?"#3b82f6":"#64748b"},children:["📚 ",u.adminRequests.tabRooms," (",k.filter(m=>m.estado==="Pendiente").length,")"]}),o.jsxs("button",{onClick:()=>An("materiales"),style:{padding:"10px 20px",border:"none",borderBottom:at==="materiales"?"3px solid #3b82f6":"none",backgroundColor:"transparent",cursor:"pointer",fontSize:"15px",color:at==="materiales"?"#3b82f6":"#64748b"},children:[u.adminRequests.tabMateriales," (",S.filter(m=>m.estado==="Pendiente").length,")"]}),o.jsxs("button",{onClick:()=>An("devoluciones"),style:{padding:"10px 20px",border:"none",borderBottom:at==="devoluciones"?"3px solid #3b82f6":"none",backgroundColor:"transparent",cursor:"pointer",fontSize:"15px",color:at==="devoluciones"?"#3b82f6":"#64748b"},children:[u.adminRequests.tabReturns," (",S.filter(m=>m.estado==="Aprobada"&&!m.devuelto).length,")"]})]}),at==="aulas"&&o.jsx("div",{className:"table-container",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.adminRequests.colRequester}),o.jsx("th",{children:u.adminRequests.colType}),o.jsx("th",{children:u.adminRequests.colDesc}),o.jsx("th",{children:u.adminRequests.colStatus}),o.jsx("th",{children:u.adminRequests.colActions})]})}),o.jsx("tbody",{children:k.length===0?o.jsx("tr",{children:o.jsx("td",{colSpan:"5",style:{textAlign:"center",padding:"20px"},children:u.adminRequests.noRequests})}):k.map(m=>o.jsxs("tr",{className:m.estado==="Pendiente"?"row-highlight":"",children:[o.jsx("td",{children:o.jsx("strong",{children:m.solicitadoPor})}),o.jsx("td",{children:m.tipo}),o.jsx("td",{style:{fontSize:"13px",maxWidth:"300px"},children:m.descripcion}),o.jsx("td",{children:o.jsx("span",{className:`badge ${m.estado==="Aprobada"?"badge-success":m.estado==="Rechazada"?"badge-danger":"badge-warning"}`,children:pn(m.estado)})}),o.jsx("td",{children:m.estado==="Pendiente"&&o.jsxs(o.Fragment,{children:[o.jsx("button",{className:"btn-small btn-success",onClick:()=>La(m.id),children:u.adminRequests.approveBtn}),o.jsx("button",{className:"btn-small btn-danger",onClick:()=>pt(m.id),children:u.adminRequests.rejectBtn})]})})]},m.id))})]})}),at==="materiales"&&o.jsx("div",{className:"table-container",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.adminRequests.colRequester}),o.jsx("th",{children:u.adminRequests.colMaterial}),o.jsx("th",{children:u.adminRequests.colReason}),o.jsx("th",{children:u.adminRequests.colTime}),o.jsx("th",{children:u.adminRequests.colDueDate}),o.jsx("th",{children:u.adminRequests.colStatus}),o.jsx("th",{children:u.adminRequests.colActions})]})}),o.jsx("tbody",{children:S.length===0?o.jsx("tr",{children:o.jsx("td",{colSpan:"7",style:{textAlign:"center",padding:"20px"},children:u.adminRequests.noMaterial})}):S.filter(m=>m.estado!=="Rechazada").map(m=>{const D=F.find(te=>te.id===m.equipoId),$=new Date,Q=new Date(m.fechaDevolucionEsperada||m.fechaVencimiento),P=m.estado==="Aprobada"&&!m.devuelto&&$>Q;return o.jsxs("tr",{className:m.estado==="Pendiente"?"row-highlight":"",style:{backgroundColor:P?"#fee2e2":""},children:[o.jsx("td",{children:o.jsx("strong",{children:m.solicitadoPor})}),o.jsxs("td",{children:[D?D.nombre:u.adminRequests.unknown," ",o.jsxs("b",{children:["(x",m.cantidad,")"]})]}),o.jsx("td",{style:{fontSize:"12px",maxWidth:"150px"},children:m.motivo||u.adminRequests.notSpecified})," ",o.jsxs("td",{style:{fontSize:"13px"},children:[m.tiempoUso," horas"]}),o.jsxs("td",{style:{fontSize:"13px",color:P?"#dc2626":"#64748b"},children:[P&&"⚠️ ",new Date(m.fechaDevolucionEsperada||m.fechaVencimiento).toLocaleString("es-ES",{year:"2-digit",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})]}),o.jsx("td",{children:o.jsx("span",{className:`badge ${m.estado==="Aprobada"?"badge-success":m.estado==="Rechazada"?"badge-danger":"badge-warning"}`,children:pn(m.estado)})}),o.jsx("td",{style:{whiteSpace:"nowrap"},children:m.estado==="Pendiente"&&o.jsxs(o.Fragment,{children:[o.jsx("button",{className:"btn-small btn-success",onClick:()=>zi(m.id),children:u.adminRequests.approveBtn}),o.jsx("button",{className:"btn-small btn-danger",onClick:()=>Ys(m.id),children:u.adminRequests.rejectBtn})]})})]},m.id)})})]})}),at==="devoluciones"&&o.jsxs("div",{className:"table-container",children:[o.jsx("div",{style:{padding:"15px",borderBottom:"1px solid #e2e8f0",display:"flex",justifyContent:"flex-end",backgroundColor:"#f8fafc"},children:o.jsxs("button",{className:"btn-small btn-danger",onClick:Bi,style:{padding:"8px 15px"},children:["🔔 ",u.adminRequests.sendDelayNotifications]})}),o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:u.adminRequests.colUser}),o.jsx("th",{children:u.adminRequests.colMaterial}),o.jsx("th",{children:u.adminRequests.colQty}),o.jsx("th",{children:u.adminRequests.colDueStatus}),o.jsx("th",{children:u.adminRequests.colDelivery}),o.jsx("th",{children:u.adminRequests.colActions})]})}),o.jsx("tbody",{children:S.filter(m=>m.estado==="Aprobada"&&!m.devuelto).length===0?o.jsx("tr",{children:o.jsx("td",{colSpan:"6",style:{textAlign:"center",padding:"20px"},children:u.adminRequests.allReturned})}):S.filter(m=>m.estado==="Aprobada"&&!m.devuelto).sort((m,D)=>{const $=new Date(m.fechaDevolucionEsperada),Q=new Date(D.fechaDevolucionEsperada);return $-Q}).map(m=>{const D=F.find(re=>re.id===m.equipoId),$=new Date,Q=new Date(m.fechaDevolucionEsperada),P=$>Q,te=P?Math.floor(($-Q)/(1e3*60*60)):null;return o.jsxs("tr",{style:{backgroundColor:P?"#fee2e2":"#f0fdf4",borderLeft:P?"4px solid #dc2626":"4px solid #22c55e"},children:[o.jsx("td",{children:o.jsx("strong",{children:m.solicitadoPor})}),o.jsx("td",{children:D?D.nombre:"Desconocido"}),o.jsx("td",{children:m.cantidad}),o.jsxs("td",{style:{fontSize:"13px",color:P?"#dc2626":"#16a34a"},children:[P?`⚠️ ${u.adminRequests.delayedStatus} ${te}h`:"✅ "+u.adminRequests.onTimeStatus," ",o.jsx("br",{}),new Date(m.fechaDevolucionEsperada).toLocaleString("es-ES",{year:"2-digit",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})]}),o.jsx("td",{children:o.jsx("span",{className:`badge ${P?"badge-danger":"badge-success"}`,children:P?u.adminRequests.delayedBadge:u.adminRequests.onTimeBadge})}),o.jsx("td",{children:o.jsxs("button",{className:"btn-small btn-success",onClick:()=>Xs(m.id),style:{backgroundColor:"#16a34a"},children:["✅ ",u.adminRequests.confirmReturnBtn]})})]},m.id)})})]})]})]}),!I&&o.jsx("div",{style:{padding:"20px",color:"red",fontSize:"16px",fontWeight:"bold"},children:u.messages.viewNotSelected})]})]})]})}return o.jsxs("div",{className:"split-screen-login",children:[o.jsx("div",{className:"login-left-panel",children:o.jsxs("div",{className:"educational-visual",children:[o.jsx("div",{className:"visual-bg-gradient"}),o.jsxs("div",{className:"edu-content",children:[o.jsxs("div",{className:"edu-header",children:[o.jsx("div",{className:"lr-brand",children:"LR"}),o.jsx("h1",{children:"LabReserve"}),o.jsx("p",{className:"brand-tagline",children:u.login.subtitle})]}),o.jsxs("div",{className:"edu-features",children:[o.jsxs("div",{className:"feature-item",children:[o.jsx("div",{className:"feature-icon icon-1",children:o.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),o.jsx("path",{d:"M3 9h18M9 3v18"})]})}),o.jsx("h3",{children:u.login.feature1Title}),o.jsx("p",{children:u.login.feature1Desc})]}),o.jsxs("div",{className:"feature-item",children:[o.jsx("div",{className:"feature-icon icon-2",children:o.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:o.jsx("path",{d:"M12 2L15.09 8.26H22L17.27 12.74L19.36 19.5L12 16.42L4.64 19.5L6.73 12.74L2 8.26H8.91L12 2Z"})})}),o.jsx("h3",{children:u.login.feature2Title}),o.jsx("p",{children:u.login.feature2Desc})]}),o.jsxs("div",{className:"feature-item",children:[o.jsx("div",{className:"feature-icon icon-3",children:o.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[o.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"9",cy:"7",r:"4"}),o.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),o.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}),o.jsx("h3",{children:u.login.feature3Title}),o.jsx("p",{children:u.login.feature3Desc})]})]}),o.jsxs("div",{className:"decorative-shapes",children:[o.jsx("div",{className:"shape shape-float-1"}),o.jsx("div",{className:"shape shape-float-2"}),o.jsx("div",{className:"shape shape-float-3"}),o.jsx("div",{className:"shape shape-float-4"})]})]})]})}),o.jsxs("div",{className:"login-right-panel",children:[o.jsxs("button",{onClick:()=>T(z==="es"?"en":"es"),title:((Va=u.topbar)==null?void 0:Va.langLabel)||"Language",className:"lang-switcher-login",children:[o.jsx("span",{style:{fontSize:"16px"},children:z==="es"?"🇺🇸":"🇲🇽"}),o.jsx("span",{children:z==="es"?"EN":"ES"})]}),o.jsxs("div",{className:"login-form-container",children:[o.jsxs("div",{className:"form-header",children:[o.jsx("h2",{children:g?u.login.createAccount:u.login.title}),o.jsx("p",{className:"form-subtitle",children:g?u.login.subtitle:"Accede a tu cuenta de estudiante"})]}),a&&o.jsx("div",{className:`alert-form alert-${d}`,children:a}),o.jsxs("form",{onSubmit:g?ft:Ui,className:"modern-login-form",children:[o.jsxs("div",{className:"form-group-split",children:[o.jsx("label",{children:u.login.email}),o.jsxs("div",{className:"input-field",children:[o.jsx("input",{type:"email",placeholder:"usuario@institucion.edu",value:t,onChange:O=>e(O.target.value),required:!0,className:"input-split"}),o.jsx("span",{className:"field-icon",children:"@"})]})]}),o.jsxs("div",{className:"form-group-split",children:[o.jsx("label",{children:u.login.password}),o.jsxs("div",{className:"input-field",children:[o.jsx("input",{type:"password",placeholder:"Tu contraseña segura",value:n,onChange:O=>r(O.target.value),required:!0,className:"input-split"}),o.jsx("span",{className:"field-icon",children:"•"})]})]}),o.jsx("button",{className:"btn-submit-split",type:"submit",disabled:_,children:_?"Ingresando...":"Ingresar"})]}),o.jsx("div",{className:"form-divider",children:o.jsx("span",{children:"o"})}),o.jsxs("div",{className:"form-toggle-split",children:[o.jsx("p",{children:g?u.login.alreadyHaveAccount:u.login.noAccount}),o.jsx("button",{onClick:()=>{v(!g),c("")},className:"btn-toggle-split",children:g?u.login.switchToLogin:u.login.switchToRegister})]}),o.jsx("div",{className:"form-footer-split",children:o.jsx("p",{children:"LabReserve © 2025 - Sistema de Reservas Educativo"})})]})]})]})}ad.createRoot(document.getElementById("root")).render(o.jsx(T_.StrictMode,{children:o.jsx(Pk,{})}));
