import { PageData } from "src/core/models/page-data";
import { ServerResponse } from "src/core/models/server-response";

/**
 * This interface is just for reference purpose.
 * We added {@link PageData} here because PageData.redirect will use by every page
 * Every interface of page data should extend with PageData
 * Every api interface should extend with ServerResponse
 */
export interface HomeResponse extends PageData, ServerResponse<HomeData> {}

/**
 * Server Response of Home Page
 */
export interface HomeData {
  count: number;
}
