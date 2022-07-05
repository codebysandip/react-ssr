import { PageData } from "src/core/models/page-data";
import { ServerResponse } from "src/core/models/server-response";

/**
 * This interface is just for reference purpose.
 * Every interface of page api should extend with PageData
 * Every api interface should extend with ServerResponse
 */
export interface HomeResponse extends ServerResponse<HomeData> {}

/**
 * API Response of Home Page
 * Extended with {@link PageData} here because PageData.redirect will use by every page
 */
export interface HomeData extends PageData {
  count: number;
}
