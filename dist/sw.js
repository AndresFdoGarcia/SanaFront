if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let r={};const c=e=>n(e,o),l={module:{uri:o},exports:r,require:c};s[o]=Promise.all(t.map((e=>l[e]||c(e)))).then((e=>(i(...e),r)))}}define(["./workbox-a9164c95"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.registerRoute(/\.(?:png|jpg|jpeg|svg|gif)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET")}));
//# sourceMappingURL=sw.js.map
