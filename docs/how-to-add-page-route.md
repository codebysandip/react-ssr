# React SSR - How to add page/route

Adding route is same as you did in any React application. In this architecture we have routes file where we add all routes. Every route point to a component. React router matches path then render component. So you need to create a route in route file and component for route.
We have interface named `IRoute` in `src/core/models/route.model.ts`.  Every route must follow `IRoute` interface. Let suppose we want to about page. These are the following simple steps to add a about page:

 - Add a folder in `src/pages` named `about`. Now folder structure will be `src/pages/about`.
 - Add a component `about.component.tsx` in `src/pages/about`
 - Paste following basic component code in `about.component.tsx`:


```
import React from "react";
import { PageData } from  "src/core/models/page-data";
import { ServerResponse } from  "src/core/models/server-response";
import { of } from "rxjs";

export default class About extends React.Component<AboutProps> {
  /**
  * getInitialProps method get called by server.ts in case off SSR
  * and lazy.component.tsx in case of CSR
  * getInitialProps should return Observable<ApiResponse>|IRedirect
  */
  public static getInitialProps() {
    // Api call will be here
    return of({staus: 200: data: {}});
  }

  render() {
    return <h1>About Page</h1>;
  }
}

// Replace any with Api Response Interface
// It's good practice to create interface for Api Response.
// This will help in detecting errors on compile time by typescript compiler
// Will enable code editor for intellisense
export interface AboutProps extends PageData&ServerResponse<any> {
}
```

 - Add route in Routes array of `src/routes.tsx`. Paste following code in Routes array:
 

```
  {
    path: "/about",
    component: () => import(/* webpackChunkName: "home" */ "pages/about/about.component"),
    isSSR: true,
  },

```

Now you are done with adding route. 
If about page gets data from API, don't forget to add model `src/pages/about/about.model.ts` for API response.
Check [How to add model/interface for API response](how-to-add-model-for-api-response.md)
