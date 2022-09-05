import { ToastContainer, ToastContainerProps, toast as toastFn } from "react-toastify";
import "./toaster.scss";

export default function LazyToaster(props: ToastContainerProps) {
  return <ToastContainer {...props} />;
}

export const toast = toastFn;
