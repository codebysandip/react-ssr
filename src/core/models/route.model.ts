export interface IRoute {
  /**
   * React route path
   */
  path: string;
  /**
   * Lazy loaded component
   */
  component: () => Promise<{ default: any }>;
  /**
   * Is Static Page. If true it will cached for performance
   * @default false
   */
  static?: boolean;
  /**
   * Is route need to render on server. If false server will send a template only
   * Whole page will render on client
   * There is case when page is not for SEO or page access required login
   */
  isSSR: boolean;
}
