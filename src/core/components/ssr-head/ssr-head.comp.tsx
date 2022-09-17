import { Helmet } from "react-helmet";
import spinner from "assets/images/Spinner-1s-200px.svg";

/**
 * Use this component to set common head tags like meta, link and title
 */
export function SsrHead() {
  const serviceWorker = `
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js", { type: "module" })
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }`;

  const webVitalScript = `
  (function() {
    var script = document.createElement('script');
    script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.iife.js';
    script.onload = function() {
      // When loading web-vitals using a classic script, all the public
      // methods can be found on the webVitals global namespace.
      webVitals.onCLS(console.log);
      webVitals.onFID(console.log);
      webVitals.onLCP(console.log);
    }
    document.head.appendChild(script);
  }())`;
  return (
    <Helmet>
      <title>Default Title</title>
      <script>{`${serviceWorker}`}</script>
      <script>{`${webVitalScript}`}</script>
      <link href={spinner} rel="preload" as="image" />
    </Helmet>
  );
}
