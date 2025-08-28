INSTRUCCIONES RÁPIDAS

1) Abrí index.html y PEGÁ tu firebaseConfig donde dice: 'PEGÁ LA TUYA AQUÍ'.
2) En Firestore, creá /rooms/familia con campo members = [uid1, uid2, uid3].
3) Subí index.html y firebase-messaging-sw.js juntos a GitHub Pages.
4) (Opcional) Para push reales:
   - Creá VAPID pública en Cloud Messaging y pegala en VAPID_KEY en index.html.
   - Desplegá la Cloud Function notifyOnNewMessage del instructivo que te pasé.
   - En cada dispositivo, dentro de la app, botón "Activar push".
