import React from "react";
import { Route } from "react-router-dom";
import Home from "@/pages/home";
import WordPress from "@/pages/wordpress";
import Life from "@/pages/life";
import Culture from "@/pages/culture"
import SignIn from "@/pages/signin"
import SignUp from "@/pages/signup"

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/signin",
        component: SignIn
    },
    {
        path: "/signup",
        component: SignUp
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
