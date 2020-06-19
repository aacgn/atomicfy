import LoginPage from "./pages/LoginPage/index";
import HomePage from "./pages/HomePage/index";
import SearchPage from "./pages/SearchPage/index";

const Routes = [
    {
        path: "/",
        page: LoginPage()
    },
    {
        path: "/home",
        page: HomePage()
    },
    {
        path: "/search",
        page: SearchPage()
    }
]

export default Routes;