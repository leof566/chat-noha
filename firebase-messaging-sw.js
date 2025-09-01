// firebase-messaging-sw.js
// -----------------------------------------------------
// 1) PWA básico (sin cachés para no interferir con el chat)
// -----------------------------------------------------
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// -----------------------------------------------------
// 2) Firebase Messaging (modo compat en Service Worker)
// -----------------------------------------------------
// Nota: en SW usamos *compat* (no módulos ES) con importScripts.
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Tu config de Firebase (misma que en index.html)
firebase.initializeApp({
  apiKey: "AIzaSyBHGD-h6dQKp5Ma8qTF6xqX5oFRINffseY",
  authDomain: "chat-noha.firebaseapp.com",
  projectId: "chat-noha",
  storageBucket: "chat-noha.firebasestorage.app",
  messagingSenderId: "92519369703",
  appId: "1:92519369703:web:22a3cdb69542c0ad30cb42"
});

const messaging = firebase.messaging();

// -----------------------------------------------------
// 3) Notificaciones cuando la app está en segundo plano
// -----------------------------------------------------
messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || 'Nuevo mensaje';
  const body  = payload?.notification?.body  || '';
  const image = payload?.notification?.image;

  // URL a abrir al tocar la notificación:
  // - Para GitHub Pages usamos '/chat-noha/'
  // - Si migrás a raíz (Firebase Hosting), cambiá por '/'
  const targetUrl = payload?.fcmOptions?.link || payload?.data?.url || '/chat-noha/';

  const options = {
    body,
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    image,
    data: { url: targetUrl }
  };

  self.registration.showNotification(title, options);
});

// -----------------------------------------------------
// 4) Comportamiento al hacer clic en la notificación
//    (foca una pestaña existente o abre una nueva)
// -----------------------------------------------------
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || '/chat-noha/'; // <- cambiar a '/' si hospedás en raíz

  event.waitUntil((async () => {
    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });

    // Si ya hay una pestaña de la app abierta en el scope, fócala
    for (const client of allClients) {
      if (client.url.includes('/chat-noha/')) { // <- cambiar a '/' si hospedás en raíz
        client.focus();
        try { client.postMessage({ type: 'notification-clicked' }); } catch {}
        return;
      }
    }
    // Si no hay ninguna, abrí una nueva
    return clients.openWindow(url);
  })());
});
