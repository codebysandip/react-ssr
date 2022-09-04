import { useEffect, useState } from "react";
import "./loader.scss";

export function Loader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("showLoader", (e: any) => {
      console.log("showloader!!", e.detail);
      setShow(e.detail);
    });
    return function () {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.removeEventListener("showLoader", () => {});
    };
  }, []);

  if (!show) {
    return null;
  }
  return (
    <div className="loader-container">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
