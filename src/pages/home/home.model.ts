import { PageData } from "src/core/models/page-data.js";
import { ApiResponse } from "src/core/models/api-response.js";

/**
 * This interface is just for reference purpose.
 * Every interface of page api should extend with PageData
 * Every api interface should extend with ServerResponse
 */
export interface HomeResponse extends ApiResponse<HomeData> {}

/**
 * API Response of Home Page
 * Extended with {@link PageData} here because PageData.redirect will use by every page
 */
export interface HomeData extends PageData {
  count: number;
}
