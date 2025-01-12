const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/main.js",
  "/static/css/main.css",
];

// Event listener สำหรับติดตั้ง Service Worker และแคชไฟล์
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching Files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Event listener สำหรับการเปิดใช้งาน Service Worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // ลบ cache ที่ไม่จำเป็น
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Event listener สำหรับการจับคำขอ (fetch) จากแอป
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // ถ้าหาเจอใน cache ให้ส่งกลับเลย
      if (cachedResponse) {
        return cachedResponse;
      }
      // ถ้าไม่พบใน cache ให้ทำการ fetch จาก network
      return fetch(event.request).then((networkResponse) => {
        // แคช response ใหม่
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
