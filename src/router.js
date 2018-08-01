import React from "react";
import { Route } from "react-router-dom";
import Home from "@/pages/home";
import WordPress from "@/pages/wordpress";
import Life from "@/pages/life";
import Culture from "@/pages/culture";
import Page2 from "@/pages/page2";

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/wordpress",
        component: WordPress
    },
    {
        path: "/life",
        component: Life
    },
    {
        path: "/culture",
        component: Culture
    },
    {
        path: "/page2",
        component: Page2
    }
];

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact
        render={props => <route.component {...props} routes={route.routes} />}
    />
);

const routeConfig = routes.map((route, i) => {
    return <RouteWithSubRoutes key={i} {...route} />;
});
export { routeConfig };
