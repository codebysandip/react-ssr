import { IRoute } from "./core/models/route.model";
import React from "react";

export const Routes: IRoute[] = [
    {
        path: "/",
        component: () => import(/* webpackChunkName: "home" */ "pages/home/home.component")
    },
    {
        path: "/:id/product",
        component: () => import(/* webpackChunkName: "home-new" */ "pages/home/home.component")
    },
    {
        path: "contact-us",
        component: () => import(/* webpackChunkName: "contact-us" */ "pages/contact-us/contact-us.component")
    },
    {
        path: "/404",
        component: () => Promise.resolve({ default: () => <h1>Not Found</h1>})
    }
]