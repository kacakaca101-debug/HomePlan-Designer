/* HomePlan Designer – service worker: aplikace funguje i bez internetu.
   Při každé nové verzi aplikace zvyšte číslo ve VERSION, aby se uložené soubory obnovily. */
const VERSION = "homeplan-v119";
const CORE = [
  "./",
  "index.html",
  "vendor/three/three.module.min.js",
  "vendor/three/addons/lights/RectAreaLightTexturesLib.js",
  "vendor/three/addons/lights/RectAreaLightUniformsLib.js",
  "vendor/three/addons/math/SimplexNoise.js",
  "vendor/three/addons/postprocessing/EffectComposer.js",
  "vendor/three/addons/postprocessing/GTAOPass.js",
  "vendor/three/addons/postprocessing/MaskPass.js",
  "vendor/three/addons/postprocessing/OutputPass.js",
  "vendor/three/addons/postprocessing/Pass.js",
  "vendor/three/addons/postprocessing/RenderPass.js",
  "vendor/three/addons/postprocessing/ShaderPass.js",
  "vendor/three/addons/postprocessing/UnrealBloomPass.js",
  "vendor/three/addons/shaders/CopyShader.js",
  "vendor/three/addons/shaders/GTAOShader.js",
  "vendor/three/addons/shaders/LuminosityHighPassShader.js",
  "vendor/three/addons/shaders/OutputShader.js",
  "vendor/three/addons/shaders/PoissonDenoiseShader.js",
  "fonts/IBMPlexSans-Regular.woff2",
  "fonts/IBMPlexSans-Medium.woff2",
  "fonts/IBMPlexSans-SemiBold.woff2",
  "fonts/IBMPlexMono-Regular.woff2",
  "fonts/IBMPlexMono-Medium.woff2",
  "fonts/fonts.css",
  "icons/apple-touch-icon.png",
  "icons/favicon-16.png",
  "icons/favicon-32.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-192.png",
  "icons/icon-maskable-512.png",
  "icons/icon.svg",
  "screenshots/3d-dum.png",
  "screenshots/3d-exterier.png",
  "manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith("homeplan-") && k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  /* stránka aplikace: nejdřív z internetu (kvůli aktualizacím), bez připojení z uložené kopie */
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((r) => {
      if (r.ok) { const copy = r.clone(); caches.open(VERSION).then((c) => c.put("index.html", copy)); }
      return r;
    }).catch(() => caches.match("index.html").then((r) => r || caches.match("./"))));
    return;
  }
  /* ostatní soubory (3D knihovna, písmo, ikony): z uložené kopie, jinak z internetu */
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok) { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
    return r;
  })));
});
