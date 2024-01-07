'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "7843a888dba77c9644bf074f43a75ffb",
"assets/AssetManifest.bin.json": "54a64e71e2fb317d9f4ddf8da244f963",
"assets/AssetManifest.json": "0d761b23256062c4c4451db5cc12cffe",
"assets/assets/icons/launch-icon.png": "cdc3323ed764bcbb065fb1e501812595",
"assets/assets/icons/splash-icon.png": "dff9d3eac393914c274e8915d7ea1b1c",
"assets/assets/images/projects/chasing30_project.png": "161907110fe831eb801ef54ddf724897",
"assets/assets/images/projects/crimebuster_project.jpg": "b74a6309a26a3fc333b55afec028d98f",
"assets/assets/images/projects/notepad_api_project.png": "6a3a1b1c16af30e553f2839427c54b51",
"assets/assets/images/projects/notepad_web_project.jpg": "28cb51f67fd62d86a1043fa15d11b38e",
"assets/assets/images/projects/polaris_project.png": "4da0d1f194686f645ad22cb04017ac1d",
"assets/assets/images/projects/snake_project.jpeg": "bf2b950b4fc5f670ceb57b536d1a20b4",
"assets/assets/images/projects/snownotepad_project.jpg": "ccce5a9b031303bf024e4fbd932ab005",
"assets/FontManifest.json": "d0aa5d577e1d2f5491ee519639f78ab5",
"assets/fonts/MaterialIcons-Regular.otf": "df60559abd59f339ad8b1e218741e10b",
"assets/NOTICES": "76eb385cefcaf7345235e5a8b5655c5e",
"assets/packages/dev_icons/fonts/devicon.ttf": "1dede8d498067ea893dc79a5bfd7692c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "4f9b34c4ca658a3d7eb5e085e29507f2",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "e74d94fed4e2d98ca1a406bcb34563e9",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "92c4a13cc40d0b262d0045776748f4c5",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "230a68323821dbe488088941cb3ebaf3",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "536850aea2dcae2bf1657ab8270ff806",
"icons/Icon-512.png": "920a97f7bb044e127c57af8b079d3df6",
"icons/Icon-maskable-192.png": "536850aea2dcae2bf1657ab8270ff806",
"icons/Icon-maskable-512.png": "920a97f7bb044e127c57af8b079d3df6",
"index.html": "1b6bb1b14d6502e1634d5ecbf723220d",
"/": "1b6bb1b14d6502e1634d5ecbf723220d",
"main.dart.js": "47aab987b97fa3665f0d107a3216c563",
"manifest.json": "6d5bc19dc2f8e70e3b729fcd1e7a3c25",
"splash/img/dark-1x.png": "0dc5266420e3cf144566cbefc5c2bc3e",
"splash/img/dark-2x.png": "72d9fdcec81ca93291d7a8d273c13042",
"splash/img/dark-3x.png": "7dada1cddaccd2f7c7045a3c54e6783e",
"splash/img/dark-4x.png": "cd06aa316741cea1d84778530c84d5c2",
"splash/img/light-1x.png": "0dc5266420e3cf144566cbefc5c2bc3e",
"splash/img/light-2x.png": "72d9fdcec81ca93291d7a8d273c13042",
"splash/img/light-3x.png": "7dada1cddaccd2f7c7045a3c54e6783e",
"splash/img/light-4x.png": "cd06aa316741cea1d84778530c84d5c2",
"version.json": "a9bb4c4f2e98241620c77d38a325a3a5"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
