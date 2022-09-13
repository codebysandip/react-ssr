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
  }
  `;
  return (
    <Helmet>
      <title>Default Title</title>
      {!process.env.IS_LOCAL && <script>{`${serviceWorker}`}</script>}
    </Helmet>
  );
}
