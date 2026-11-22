// Service worker: lets the app install on a home screen and show push notifications.
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
firebase.initializeApp({apiKey:"AIzaSyAVmZRNPRF5vozc9q3vSwNQjOSDRYtLuxI",authDomain:"mseuf-grading-sheet.firebaseapp.com",projectId:"mseuf-grading-sheet",storageBucket:"mseuf-grading-sheet.firebasestorage.app",messagingSenderId:"548651789448",appId:"1:548651789448:web:94af671a75e00dff14033d"});
const messaging = firebase.messaging();

// Push arrives while the app is closed or in the background.
messaging.onBackgroundMessage((p) => {
  const d = p.data || {};
  self.registration.showNotification(d.title || "MSEUF Concert Singers", {
    body: d.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    tag: d.tag || "cs-calendar"
  });
});

// Tapping a notification opens (or focuses) the app.
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
    for (const c of list) if ("focus" in c) return c.focus();
    return clients.openWindow(self.registration.scope);
  }));
});

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(clients.claim()));
self.addEventListener("fetch", () => {});
