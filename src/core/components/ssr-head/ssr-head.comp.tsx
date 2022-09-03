import { Helmet } from "react-helmet";

/**
 * Use this component to set common head tags like meta, link and title
 */
export function SsrHead() {
  return (
    <Helmet>
      <title>Default Title</title>
    </Helmet>
  );
}
