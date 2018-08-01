import React from "react";
import { Route } from "react-router-dom";
import Home from "@/pages/home";
import Page2 from "@/pages/page2";
import Page3 from "@/pages/page3";

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/page2",
        component: Page2
    },
    {
        path: "/page3",
        component: Page3
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
