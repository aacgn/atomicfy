import { createTemplate, createPage, createOrganism } from "@aacgn/atomic";

import "./index.css";

const TransitionPage = () => createPage(
    {
        mount: function(){
            return createTemplate({
                tag: "div",
                attr: {
                    className: "transition",
                },
                props: {
                    children: [
                        createOrganism(
                            {
                                tag: "img",
                                attr: {
                                    className: "transition__logo blink-image",
                                    src: "assets/spotify_logo_white.png"
                                },
                                props: {}
                            }
                        )
                    ]
                }
            })
        }
    }
);

export default TransitionPage;