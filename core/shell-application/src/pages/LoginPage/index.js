import { createExternalSource, createPage, navigateTo } from "atomic";

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
            return createExternalSource({
                className: "external-source",
                sourceUrl: "http://localhost:3003"
            });
        },
        onMount: function(ref){
            const authorizedUser = window.localStorage.getItem("authorizedUser");

            if (authorizedUser)
                this.methods.redirectToHome();

            window.addEventListener("authorizedUser", (event) => {
                if (event.detail)
                    window.localStorage.setItem("authorizedUser", JSON.stringify(event.detail));
                    this.methods.redirectToHome();
            })
        }
    }
);

export default LoginPage;