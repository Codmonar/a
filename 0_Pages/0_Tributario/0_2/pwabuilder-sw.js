// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

const CACHE = "pwabuilder-offline-page";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html"; // Change this name to your offline page

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        cache.add(offlineFallbackPage); // Add the offline page to the cache
        cache.addAll(["/", "/styles.css", "/icon.png"]); // Add other pages and resources to the cache
      })
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(event.request); // Check if there is a cached response for the request
        if (cachedResp) {
          return cachedResp; // Return the cached response if there is one
        }
        const networkResp = await fetch(event.request); // Otherwise, fetch from the network
        cache.put(event.request, networkResp.clone()); // And save the network response in the cache for future requests
        return networkResp; // Return the network response
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
