import { SHOW_LOADER, TOAST } from "src/const.js";
import { Toaster } from "./toaster.model.js";

export class ToastEvent extends CustomEvent<Toaster> {
  constructor(detail: Toaster) {
    super(TOAST, { detail });
  }
}

export class LoaderEvent extends CustomEvent<boolean> {
  constructor(detail: boolean) {
    super(SHOW_LOADER, { detail });
  }
}
