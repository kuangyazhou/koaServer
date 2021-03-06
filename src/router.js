import React from "react";
import { Route } from "react-router-dom";
import Home from "@/pages/home";
import WordPress from "@/pages/wordpress";
import Writer from "@/pages/writer";
import Culture from "@/pages/culture";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import Article from "@/pages/article";
import Page1 from "@/pages/page1";
import Page2 from "@/pages/page2";
import Page3 from "@/pages/page3";
import Editors from "@/components/editors";
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
        path: "/article/:query",
        component: Article
    },
    {
        path: "/page1",
        component: Page1
    },
    {
        path: "/page2",
        component: Page2
    },
    {
        path: "/page3",
        component: Page3
    },
    {
        path: "/editors",
        component: Editors
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
