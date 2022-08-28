import { PageData } from "src/core/models/page-data.js";

/**
 * API Response of Home Page
 * Extended with {@link PageData} here because PageData.redirect will use by every page
 */
export interface HomeData extends PageData {
  count: number;
}
