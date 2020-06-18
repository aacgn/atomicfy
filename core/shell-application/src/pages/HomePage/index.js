import { createExternalSource, createPage, navigateTo, dispatchEvent, createTemplate, createOrganism } from "@aacgn/atomic";

import "./index.css";

const HomePage = () => createPage(
    {
        name: "home",
        context: {},
        methods: {
            redirectToLogin: function() {
                navigateTo("/");
            }
        },
        mount: function(){
            return createTemplate({}, 'div', [
                createOrganism({}, 'div', [
                    createExternalSource({
                        id: "home",
                        className: "external-source external-source--90h",
                        sourceUrl: "http://localhost:3004"
                    })
                ]),
                createOrganism({}, 'div', [
                    createExternalSource({
                        id: "player",
                        className: "external-source external-source--10h external-source--top-unset",
                        sourceUrl: "http://localhost:3005"
                    })
                ])
            ]);
        },
        onMount: function(ref){
            const authorizedUser = window.localStorage.getItem("authorizedUser");
            const authorizedUserParse = JSON.parse(authorizedUser);

            if (!authorizedUserParse)
                this.methods.redirectToLogin();

            dispatchEvent("authorizedUser", authorizedUserParse, ["home", "player"]);
        }
    }
);

export default HomePage;