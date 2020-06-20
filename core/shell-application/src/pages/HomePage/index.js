import { createExternalSource, createPage, navigateTo, dispatchEvent, createTemplate, createOrganism } from "@aacgn/atomic";
import "./index.css";

import { NavBarItems } from "../../utils/enums/navbar-items.enum";

import NavBar from "../../components/NavBar/index";

const HomePage = () => createPage(
    {
        name: "home",
        context: {},
        mount: function(){
            return createTemplate({
                className: "home"
            }, 
            'div', 
            [
                NavBar(NavBarItems.HOME),
                createOrganism({}, 'div', [
                    createExternalSource({
                        id: "home",
                        className: "external-source home__content",
                        sourceUrl: "http://localhost:3001"
                    })
                ]),
                createOrganism({}, 'div', [
                    createExternalSource({
                        id: "player",
                        className: "external-source home__player",
                        sourceUrl: "http://localhost:3002"
                    })
                ])
            ]
        )},
        onMount: function(ref){
            const authorizedUser = window.localStorage.getItem("authorizedUser");

            if (!authorizedUser)
                navigateTo("/");

            const authorizedUserParse = JSON.parse(authorizedUser);

            setTimeout(() => {
                dispatchEvent("authorizedUser", authorizedUserParse, ["home", "player"]);
            }, 3000);
        }
    }
);

export default HomePage;