import React from "react";
import { Route } from "react-router-dom";
import Home from "@/pages/home";
import WordPress from "@/pages/wordpress";
import Writer from "@/pages/writer";
import Culture from "@/pages/culture";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import Page2 from "@/pages/page2";
import Center from "@/pages/center";

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
        path: "/writer",
        component: Writer
    },
    {
        path: "/culture",
        component: Culture
    },
    {
        path: "/page2",
        component: Page2
    },
    {
        path: "/mine",
        component: Center
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
