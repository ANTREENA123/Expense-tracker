const CACHE_NAME = 'expense-tracker-v1';
const assets = [
  '/',
  '/index.html',
  '/login.html',
  '/signup.html',
  '/dashboard.html',
  '/home.css',
  '/auth.css',
  '/dashboard.css',
  '/dashboard.js',
  '/firebase.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
