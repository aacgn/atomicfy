import { createExternalSource, createPage, navigateTo, dispatchEvent, createTemplate, createOrganism } from "@aacgn/atomic";
import "./index.css";

import { NavBarItems } from "../../utils/enums/navbar-items.enum";

import NavBar from "../../components/NavBar/index";

const HomePage = () => createPage(
    {
        name: "home",
        context: {},
        mount: function(){
            return createTemplate({}, 'div', [
                NavBar(NavBarItems.HOME),
                createOrganism({}, 'div', [
                    createExternalSource({
                        id: "home",
                        className: "external-source home__content",
                        sourceUrl: "http://localhost:3004"
                    })
                ]),
                createOrganism({}, 'div', [
                    createExternalSource({
                        id: "player",
                        className: "external-source home__player",
                        sourceUrl: "http://localhost:3005"
                    })
                ])
            ]);
        },
        onMount: function(ref){
            const authorizedUser = window.localStorage.getItem("authorizedUser");

            if (!authorizedUser)
                navigateTo("/");

            const authorizedUserParse = JSON.parse(authorizedUser);

            dispatchEvent("authorizedUser", authorizedUserParse, ["home", "player"]);
        }
    }
);

export default HomePage;