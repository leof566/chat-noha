// firebase-messaging-sw.js
// Usa compat en el SW para facilitar importación por CDN
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Misma config que en index.html (PEGAR tus valores)
firebase.initializeApp({
  apiKey: "PEGAR_AQUI_apiKey",
  authDomain: "PEGAR_AQUI_authDomain",
  projectId: "PEGAR_AQUI_projectId",
  storageBucket: "PEGAR_AQUI_storageBucket",
  messagingSenderId: "PEGAR_AQUI_messagingSenderId",
  appId: "PEGAR_AQUI_appId"
});

const messaging = firebase.messaging();

// Background messages
messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || 'Nuevo mensaje';
  const options = { body: payload?.notification?.body || '' };
  self.registration.showNotification(title, options);
});
