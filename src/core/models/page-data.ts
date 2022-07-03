export interface PageMetaData {
  description?: string;
  canonicalUrl?: string;
}

export interface PageDataSeo {
  title?: string;
  metaData?: PageMetaData;
}

export interface PageRedirect {
  /**
   * Path to redirect
   */
  path: string;
  /**
   * Replace current url.
   * This will replace in history api
   */
  replace?: boolean;
  /**
   * state data of route
   */
  state?: Record<string, any>;
}

/**
 * Common interface for page data.
 * For seo server sends meta data like title, description
 * Change this interface based on response of API.
 * Don't remove redirect key
 */
export interface PageData {
  seo?: PageDataSeo;
  /**
   * redirect will use to redirect to another page when getInitialProps will return redirect
   */
  redirect?: PageRedirect;
}
