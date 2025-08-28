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
