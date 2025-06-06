const CACHE_NAME = 'astart-v1';
const BASE_PATH = self.location.pathname.replace(/\/[^\/]*$/, '');
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/assets/`,
  `${BASE_PATH}/manifest.json`,
  'https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600;700;800;900&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache the main page and manifest first
        return cache.addAll([
          `${BASE_PATH}/`,
          `${BASE_PATH}/manifest.json`,
          'https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600;700;800;900&display=swap'
        ]);
      })
      .catch((error) => {
        console.log('Cache installation failed:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Background sync for offline activity completion
self.addEventListener('sync', (event) => {
  if (event.tag === 'activity-sync') {
    event.waitUntil(syncActivities());
  }
});

async function syncActivities() {
  // Handle offline activity completions when back online
  const activities = await getStoredActivities();
  // Sync logic would go here for backend integration
}

async function getStoredActivities() {
  // Placeholder function for stored activities
  return [];
}
