/* Guarda o jogo no aparelho depois da primeira visita. Troque VERSAO a cada publicação para forçar a atualização. */
const VERSAO='vc-1';
const BASE=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSAO).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSAO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
  const ok=u.origin===location.origin||u.host==='cdnjs.cloudflare.com'||u.host==='fonts.googleapis.com'||u.host==='fonts.gstatic.com';if(!ok)return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(VERSAO).then(c=>c.put(e.request,cp)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));});
