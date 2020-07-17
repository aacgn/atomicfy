import { createExternalSource, createPage, navigateTo, dispatchEvent, createTemplate, createOrganism } from "@aacgn/atomic";
import "./index.css";

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
                createOrganism({}, 'div', [
                    createExternalSource({
                        id: "nav-bar",
                        className: "external-source home__navbar",
                        sourceUrl: "http://localhost:4200"
                    })
                ]),
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
            {
                navigateTo("/");
            }
            else
            {
                const authorizedUserParse = JSON.parse(authorizedUser);

                setTimeout(() => {
                    dispatchEvent("authorizedUser", authorizedUserParse, ["home", "player", "nav-bar"]);
                }, 3000);
    
                window.addEventListener("userActionDenied", () => {
                    alert("Only spotify premium users can use that application!");
                });
            }
        }
    }
);

export default HomePage;