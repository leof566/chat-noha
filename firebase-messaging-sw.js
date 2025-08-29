// firebase-messaging-sw.js
// Cargar SDKs "compat" (en un Service Worker NO uses import/export)
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Config EXACTA (misma que en index.html)
firebase.initializeApp({
  apiKey: "AIzaSyBHGD-h6dQKp5Ma8qTF6xqX5oFRINffseY",
  authDomain: "chat-noha.firebaseapp.com",
  projectId: "chat-noha",
  storageBucket: "chat-noha.appspot.com",
  messagingSenderId: "92519369703",
  appId: "1:92519369703:web:22a3cdb69542c0ad30cb42"
});

const messaging = firebase.messaging();

// Mostrar notificación cuando llega push en segundo plano
messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || 'Nuevo mensaje';
  const options = {
    body: payload?.notification?.body || '',
    vibrate: [200, 100, 200],
    tag: 'chat-familiar',
    renotify: true
  };
  self.registration.showNotification(title, options);
});

// Al tocar la notificación, abrir/enfocar tu app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const APP_URL = 'https://leof566.github.io/chat-noha/'; // tu URL exacta

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      for (const client of clientsArr) {
        if (client.url.startsWith(APP_URL) && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(APP_URL + '?from=push');
      }
    })
  );
});

