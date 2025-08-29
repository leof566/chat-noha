// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBHGD-h6dQKp5Ma8qTF6xqX5oFRINffseY",
  authDomain: "chat-noha.firebaseapp.com",
  projectId: "chat-noha",
  storageBucket: "chat-noha.firebasestorage.app",
  messagingSenderId: "92519369703",
  appId: "1:92519369703:web:22a3cdb69542c0ad30cb42
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || 'Nuevo mensaje';
  const options = {
    body: payload?.notification?.body || '',
    vibrate: [200, 100, 200, 100, 200],
    tag: 'chat-familiar',
    renotify: true
  };
  self.registration.showNotification(title, options);
});
// ... tu initializeApp(...) y onBackgroundMessage(...) ya existente

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const APP_URL = 'https://leof566.github.io/chat-noha/'; // <-- poné TU URL exacta

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      // Si ya hay una pestaña abierta, enfocarla
      for (const client of clientsArr) {
        if (client.url.startsWith(APP_URL) && 'focus' in client) {
          return client.focus();
        }
      }
      // Si no, abrir una nueva
      if (self.clients.openWindow) {
        return self.clients.openWindow(APP_URL + '?from=push');
      }
    })
  );
});
