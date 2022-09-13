import { FunctionComponent, useEffect, useState } from "react";
import { ToastContainerProps, ToastContent, ToastOptions, Id } from "react-toastify";
import { Toaster as IToaster } from "src/core/models/toaster.model.js";

export function Toaster(props: ToastContainerProps) {
  const [lazyToast, setLazyToast] = useState<{ default: FunctionComponent<ToastContainerProps> } | null>(null);
  let toast: (content: ToastContent, options?: ToastOptions) => Id;
  const showToast = (toaster: IToaster) => {
    toast(toaster.message, {
      type: toaster.type,
    });
  };

  useEffect(() => {
    window.addEventListener("toast", (e) => {
      if (!lazyToast) {
        import(/* webpackChunkName: "toaster" */ "./toaster-lazy.com.js").then((module) => {
          setLazyToast(module);
          toast = module.toast;
          showToast(e.detail);
        });
      } else {
        showToast(e.detail);
      }
    });

    return function () {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.removeEventListener("toast", () => {});
    };
  }, []);
  if (lazyToast) {
    return <lazyToast.default {...props} />;
  }
  return null;
}
