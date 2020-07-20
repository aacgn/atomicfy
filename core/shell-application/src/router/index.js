import { AtomicRouter } from "@aacgn/atomic";

import LoginPage from "../pages/LoginPage/index";
import HomePage from "../pages/HomePage/index";

import TransitionPage from "../pages/TransitionPage/index";

const routes = [
    {
        path: "/",
        page: LoginPage()
    },
    {
        path: "/home",
        page: HomePage()
    }
]

const Router = new AtomicRouter({
    routes: routes,
    mode: "history",
    transitionPage: TransitionPage()
});

export default Router;