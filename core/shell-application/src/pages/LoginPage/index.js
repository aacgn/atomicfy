import { createPage, navigateTo, createMicroFrontendWrapper, mapContextStore } from "@aacgn/atomic";

import "./index.css";

const LoginPage = () => createPage(
    {
        name: "login",
        context: {},
        methods: {
            redirectToHome: function() {
                navigateTo("/home");
            }
        },
        mount: function(){
            return createMicroFrontendWrapper({
                attr: {
                    className: "external-source"
                },
                props: {
                    url: "http://localhost:3003"
                }
            });
        },
        onMount: function(ref){
            const appContextStore = mapContextStore("app");

            if (appContextStore && appContextStore.authorizedUser) {
                this.methods.redirectToHome();
            }
            else {
                window.addEventListener("authorizedUser", (event) => {
                    if (event.detail)
                        window.localStorage.setItem("authorizedUser", JSON.stringify(event.detail));
                        storeData("app", {
                            "authorizedUser": event.detail
                        });
                        this.methods.redirectToHome();
                })
            }
        }
    }
);

export default LoginPage;