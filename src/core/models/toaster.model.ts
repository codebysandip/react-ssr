export type ToasterType = "success" | "error" | "warning" | "info";
export interface Toaster {
  type: ToasterType;
  message: string;
  timeout?: number;
}
