import { TOAST } from "src/const.js";
import { Toaster } from "./toaster.model.js";

export class ToastEvent extends CustomEvent<Toaster> {
  constructor(detail: Toaster) {
    super(TOAST, { detail });
  }
}

