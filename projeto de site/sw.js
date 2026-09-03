const CACHE_NAME = "menu-musicas-v2";
const APP_SHELL = [
  "./",
  "./teste.html",
  "./testes.css",
  "./testes.js",
  "./manifest.json",
  "./icone.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request).then(networkResponse => {
      if (networkResponse.ok) {
        const responseCopy = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseCopy);
        });
      }
      return networkResponse;
    }).catch(() => caches.match(event.request))
  );
});
