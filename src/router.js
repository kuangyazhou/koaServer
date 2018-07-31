import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Page1 from "./commponents/page1";
import Page2 from "./commponents/page2";
import Page3 from "./commponents/page3";

const routes = [
    {
        path: "/",
        component: Page1
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
// export default class KRouter extends Component {
//     render() {
//         return (
//             <Switch>
//                 {Object.keys(config).map(key => {
//                     config[key].map(r => {
//                         const route = r => {
//                             const Component = AllComponents[r.component];
//                             return (
//                                 <Route
//                                     key={r.route || r.key}
//                                     exact
//                                     path={r.route || r.key}
//                                     component={props => {
//                                         r.login ? (
//                                             <Component {...props} />
//                                         ) : (
//                                             <Component {...props} />
//                                         );
//                                     }}
//                                 />
//                             );
//                         };
//                         return r.component
//                             ? route(r)
//                             : r.subs.map(r + route(r));
//                     });
//                 })}
//                 {/* <Route render={() => <Redirect to="/404" />} /> */}
//             </Switch>
//         );
//     }
// }
