import spinner from "assets/images/Spinner-1s-200px.svg";
import { Helmet } from "react-helmet";

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

  // const webVitalScript = `
  // (function() {
  //   var script = document.createElement('script');
  //   script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.iife.js';
  //   script.onload = function() {
  //     // When loading web-vitals using a classic script, all the public
  //     // methods can be found on the webVitals global namespace.
  //     webVitals.onCLS(console.log);
  //     webVitals.onFID(console.log);
  //     webVitals.onLCP(console.log);
  //   }
  //   document.head.appendChild(script);
  // }())`;
  return (
    <Helmet>
      <title>Default Title</title>
      <script nonce="react-ssr">{`${serviceWorker}`}</script>
      {/* <script>{`${webVitalScript}`}</script> */}
      <meta name="description" content="A sample meta description" />
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#f8f9fa" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
      />
      <link href={spinner} rel="preload" as="image" />
      <link rel="apple-touch-icon" href="/assets/icons/ios/192.png" />
    </Helmet>
  );
}
