import { createExternalSource, createPage, navigateTo, dispatchEvent, createTemplate, createOrganism } from "@aacgn/atomic";
import "./index.css";

import { NavBarItems } from "../../utils/enums/navbar-items.enum";

import NavBar from "../../components/NavBar/index";

const SearchPage = () => createPage(
    {
        name: "search",
        context: {},
        mount: function(){
            return createTemplate({}, 'div', [
                NavBar(NavBarItems.SEARCH),
                createOrganism({}, 'div', [
                    createExternalSource({
                        id: "search",
                        className: "external-source search__content",
                        sourceUrl: "http://localhost:3004"
                    })
                ]),
                createOrganism({}, 'div', [
                    createExternalSource({
                        id: "player",
                        className: "external-source search__player",
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

            dispatchEvent("authorizedUser", authorizedUserParse, ["search", "player"]);
        }
    }
);

export default SearchPage;