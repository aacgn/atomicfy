import LoginPage from "./pages/LoginPage/index";
import HomePage from "./pages/HomePage/index";

const Routes = [
    {
        path: "/",
        page: LoginPage()
    },
    {
        path: "/home",
        page: HomePage()
    }
]

export default Routes;