!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/vue-component/dist/",e(e.s=26)}({0:function(t,e){t.exports=function(t,e,n,o,r){var i,s=t=t||{},u=typeof t.default;"object"!==u&&"function"!==u||(i=t,s=t.default);var a="function"==typeof s?s.options:s;e&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns),o&&(a._scopeId=o);var c;if(r?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},a._ssrRegister=c):n&&(c=n),c){var p=a.functional,f=p?a.render:a.beforeCreate;p?a.render=function(t,e){return c.call(e),f(t,e)}:a.beforeCreate=f?[].concat(f,c):[c]}return{esModule:i,exports:s,options:a}}},15:function(t,e){},21:function(t,e,n){function o(t){n(61)}var r=n(0)(n(29),n(71),o,"data-v-fb2f1a6e",null);t.exports=r.exports},26:function(t,e,n){"use strict";var o=n(21),r=function(t){return t&&t.__esModule?t:{default:t}}(o);n(15),new Vue({el:"#app",data:function(){return{selected:""}},mounted:function(){},methods:{openToast:function(t){this.$refs.toast.openModel({tip:"弹出位置："+t,position:t,expires:3e3})}},components:{Toast:r.default}})},29:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=null;e.default={data:function(){return{open:!1,tip:"",position:"bottom",expires:0}},methods:{close:function(){this.open=!1},openModel:function(t){var e=this;this.open=!0,this.tip=t.tip,this.position=t.position||"bottom",this.expires=t.expires||2500,o&&clearTimeout(o),o=setTimeout(function(){e.open=!1,e.tip=null},this.expires)}}},t.exports=e.default},61:function(t,e){},71:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.open?n("div",{staticClass:"toast-wrapper",class:{"toast-top":"top"===t.position,"toast-center":"center"===t.position,"toast-bottom":"bottom"===t.position}},[n("div",{staticClass:"content"},[t._v(t._s(t.tip))])]):t._e()},staticRenderFns:[]}}});
//# sourceMappingURL=toast.11ea2f051267ae70f3a6.js.map