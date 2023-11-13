// service-worker.js
self.addEventListener('install', (event) => {
  // Código para instalar o Service Worker
  // Aqui você pode pre-cache de recursos, se necessário
});

self.addEventListener('fetch', (event) => {
  // Código para lidar com solicitações de rede
  event.respondWith(
      caches.match(event.request)
            .then(response => response || fetch(event.request))
  );
});
