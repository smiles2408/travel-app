if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let r={};const c=e=>i(e,o),d={module:{uri:o},exports:r,require:c};s[o]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(t(...e),r)))}}define(["./workbox-ec81a2a1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"main.bundle.js",revision:"85ad6cf2a9eb73c73c32e03a856d727a"},{url:"main.css",revision:"b70dc1d62c25c59667a1e8d444389b7e"}],{})}));
