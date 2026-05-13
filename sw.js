/* ==========================================
   StreamX Service Worker — PWA Support
   StreamX Team 🕊️
   ========================================== */

const CACHE_NAME = 'streamx-v1';
const STATIC_CACHE = 'streamx-static-v1';
const DYNAMIC_CACHE = 'streamx-dynamic-v1';

// Files to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&family=Poppins:wght@300;400;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ===== INSTALL =====
self.addEventListener('install', (event) => {
  console.log('[StreamX SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[StreamX SW] Caching static assets');
        // Cache what we can, ignore failures (fonts/CDN may block)
        return Promise.allSettled(
          STATIC_ASSETS.map(url =>
            cache.add(url).catch(err => console.warn('[SW] Could not cache:', url, err))
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ===== ACTIVATE =====
self.addEventListener('activate', (event) => {
  console.log('[StreamX SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => {
            console.log('[StreamX SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ===== FETCH — Cache Strategy =====
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Firebase, analytics, external APIs
  if (
    url.hostname.includes('firebase') ||
    url.hostname.includes('firebaseio') ||
    url.hostname.includes('googleapis.com') && url.pathname.includes('firebase') ||
    url.hostname.includes('gstatic.com') && url.pathname.includes('firebase')
  ) return;

  // Skip chrome-extension and non-http requests
  if (!url.protocol.startsWith('http')) return;

  // === Strategy 1: Cache First (static assets, fonts, icons) ===
  if (
    url.hostname.includes('fonts.googleapis') ||
    url.hostname.includes('fonts.gstatic') ||
    url.hostname.includes('cdnjs.cloudflare') ||
    url.pathname.includes('/icons/') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff')
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => new Response('/* offline */', { headers: { 'Content-Type': 'text/css' } }));
      })
    );
    return;
  }

  // === Strategy 2: Network First with Cache Fallback (HTML pages) ===
  if (
    url.hostname === self.location.hostname &&
    (url.pathname === '/' || url.pathname.startsWith('/movie/') || url.pathname.endsWith('.html'))
  ) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match('/index.html').then(cached => {
            if (cached) return cached;
            return new Response(offlinePage(), {
              headers: { 'Content-Type': 'text/html' }
            });
          });
        })
    );
    return;
  }

  // === Strategy 3: Cache First with Network Update (images from TMDB/etc) ===
  if (
    url.hostname.includes('image.tmdb.org') ||
    url.hostname.includes('via.placeholder')
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, clone);
              // Limit dynamic cache size
              limitCacheSize(DYNAMIC_CACHE, 100);
            });
          }
          return response;
        }).catch(() => null);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // === Default: Network with cache fallback ===
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// ===== LIMIT CACHE SIZE =====
function limitCacheSize(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxItems));
      }
    });
  });
}

// ===== OFFLINE PAGE =====
function offlinePage() {
  return `<!DOCTYPE html>
<html lang="si">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>StreamX — Offline</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#0a0a0a;color:#fff;font-family:'Poppins',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:24px;}
  .wrap{max-width:380px;}
  .logo{font-size:52px;font-weight:900;letter-spacing:6px;color:#e50914;margin-bottom:8px;font-family:Georgia,serif;}
  .logo span{color:#fff;}
  .icon{font-size:64px;margin:24px 0;}
  h2{font-size:22px;margin-bottom:12px;letter-spacing:2px;}
  p{font-size:13px;color:#888;line-height:1.7;margin-bottom:24px;}
  .btn{background:#e50914;color:#fff;border:none;padding:13px 32px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:1px;}
  .btn:hover{background:#b20710;}
  .tip{font-size:11px;color:#555;margin-top:16px;}
</style>
</head>
<body>
  <div class="wrap">
    <div class="logo">STREAM<span>X</span></div>
    <div class="icon">📡</div>
    <h2>YOU'RE OFFLINE</h2>
    <p>Internet connection එකක් නෑ. WiFi හෝ Mobile Data connect කරලා retry කරන්න.</p>
    <button class="btn" onclick="window.location.reload()">🔄 RETRY</button>
    <p class="tip">Previously visited pages cache-ෙ available විය හැක.</p>
  </div>
</body>
</html>`;
}

// ===== BACKGROUND SYNC (future use) =====
self.addEventListener('sync', (event) => {
  if (event.tag === 'streamx-sync') {
    console.log('[StreamX SW] Background sync triggered');
  }
});

// ===== PUSH NOTIFICATIONS =====
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body || 'New content available on StreamX!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: '🎬 Open StreamX' },
      { action: 'close', title: 'Dismiss' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'StreamX 🔥', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

console.log('[StreamX SW] Service Worker loaded ✅');
