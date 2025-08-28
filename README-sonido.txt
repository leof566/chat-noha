SONIDO Y ALERTAS

- En web push no se puede definir un tono propio; usa el sonido por defecto del sistema.
- Dentro de la página agregamos un 'bip' con WebAudio (requiere presionar 'Activar sonido').
- Agregamos vibración en móviles (si el navegador lo soporta).
- En segundo plano la notificación usa vibración (definida en el SW) + el sonido del sistema.

Pasos:
1) Pega tu firebaseConfig en index.html y en firebase-messaging-sw.js.
2) Sube ambos a GitHub Pages.
3) En cada dispositivo, dentro de la app, toca 'Activar sonido' (una vez).
4) Para push, toca 'Activar push' y concede permisos.
