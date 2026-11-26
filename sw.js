const CACHE='kristi-countries-v1';
const FILES=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./icon.png','./icon.svg',...['au','br','cn','eg','in','it','jp','mx','es','tr','gb','us'].map(c=>`./${c}.svg`)];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('kristi-countries-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>r.ok?r:caches.match(e.request).then(c=>c||r)).catch(()=>caches.match(e.request)));});
