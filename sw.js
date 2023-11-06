;
const CACHE_NAME='V1_cache_casino_mony';
urlsToCache = [
    './',
    './icon/cartas.ico',
    'css/bootstrap.min.css',
    'css/style.css',
    'css/responsive.css',
    './manifest.json',
    'css/jquery.mCustomScrollbar.min.css',
    'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css',
    'https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css',
    './script.js'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
          return cache.addAll(urlsToCache)
          .then(()=>self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if (cacheWhitelist.indexOf(cacheName)=== -1){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', e => {
   e.respondWith(
    caches.match(e.request)
    .then(res => {
        if(res){
            return res
        }
           return fetch(e.request)
    })
   )
})