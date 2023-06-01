// Cuando se instala el service worker
self.addEventListener('install', (e) => {
	console.log('Instalado el Service Worker')
	console.log(e)
})

self.addEventListener('activate', (e) => {
	console.log('Service Worker Activado')
	console.log(e)
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		fetch(event.request).catch(function () {
			return caches.match(event.request)
		})
	)
})
