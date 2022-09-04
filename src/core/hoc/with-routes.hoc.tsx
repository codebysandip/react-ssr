import { useRef } from "react";
import {
  Location,
  NavigateFunction,
  NavigateOptions,
  Params,
  To,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

/**
 * withRouter HOC provided route navigate and route data to wrapped component
 * Don't use navigate in render function of class component
 * navigate will not work on SSR
 * @param Component Wrapped Component
 * @returns Component with extended props
 */
export function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const ref = useRef();
    const navigateTo = (to: To, options?: NavigateOptions) => {
      const intervalId = setInterval(() => {
        if (ref.current) {
          clearInterval(intervalId);
          navigate(to, options);
        }
      });
    };
    const params = useParams();
    return <Component ref={ref} {...props} router={{ location, navigate: navigateTo, params }} />;
  }

  return ComponentWithRouterProp;
}

export interface WithRouterProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}
