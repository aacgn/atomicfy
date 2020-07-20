import { createPage, navigateTo, dispatchEvent, createTemplate, createOrganism, createMicroFrontendWrapper, mapContextStore } from "@aacgn/atomic";
import "./index.css";

const HomePage = () => createPage(
    {
        name: "home",
        context: {},
        mount: function(){
            return createTemplate({
                tag: "div",
                attr: {
                    className: "home"
                },
                props: {
                    children: [
                        createOrganism({
                            tag: "div",
                            attr: {},
                            props: {
                                children: [
                                    createMicroFrontendWrapper({
                                        attr: {
                                            id: "nav-bar",
                                            className: "external-source home__navbar"
                                        },
                                        props: {
                                            url: "http://localhost:4200"
                                        }
                                    })
                                ]
                            },
                        }),
                        createOrganism({
                            tag: "div",
                            attr: {},
                            props: {
                                children: [
                                    createMicroFrontendWrapper({
                                        attr: {
                                            id: "home",
                                            className: "external-source home__content"
                                        },
                                        props: {
                                            url: "http://localhost:3001"
                                        }
                                    })
                                ]
                            },
                        }),
                        createOrganism({
                            tag: "div",
                            attr: {},
                            props: {
                                children: [
                                    createMicroFrontendWrapper({
                                        attr: {
                                            id: "player",
                                            className: "external-source home__player"
                                        },
                                        props: {
                                            url: "http://localhost:3002"
                                        }
                                    })
                                ]
                            },
                        })
                    ]
                }
            }
        )},
        onMount: function(ref){
            if (!window.localStorage.getItem("authorizedUser"))
            {
                navigateTo("/");
            }
            else
            {
                // Intercept event and send it to the destination micro-frontend
                window.addEventListener("playUserPlayback", (event) => {
                    dispatchEvent(event.type, event.detail, ["player"]);
                });

                window.addEventListener("userActionDenied", () => {
                    alert("Only spotify premium users can use that application!");
                });
            }
        }
    }
);

export default HomePage;