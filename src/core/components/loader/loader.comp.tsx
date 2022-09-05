import { useEffect, useState } from "react";
import { SHOW_LOADER } from "src/const.js";
import "./loader.scss";

export function Loader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener(SHOW_LOADER, (e) => {
      setShow(e.detail);
    });
    return function () {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.removeEventListener(SHOW_LOADER, () => {});
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
