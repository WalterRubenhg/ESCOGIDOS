const CACHE_NAME = "epas-cache-v1";
const urlsToCache = [
  "/EPAS/index.html",
  
  "/EPAS/canciones.json"
];

// Instalar y cachear archivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activar y tomar control inmediato
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Interceptar requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => caches.match("/EPAS/index.html"))
  );
});
