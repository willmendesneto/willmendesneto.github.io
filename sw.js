var version = '1.0.0';

self.addEventListener('install', function(e) {
  var timeStamp = Date.now();
  e.waitUntil(
    caches.open('willmendesneto.github.io').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html?timestamp=' + timeStamp,
        '/assets/css/index.css?timestamp=' + timeStamp,
        '/assets/images/profile.png?timestamp=' + timeStamp
      ])
      .then(function() {
        return self.skipWaiting();
      });
    })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
