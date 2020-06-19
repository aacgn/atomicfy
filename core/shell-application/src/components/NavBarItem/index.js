import { createMolecule, createAtom, navigateTo } from "@aacgn/atomic";
import "./index.css";

const NavBarItem = (isActive, redirectPath, iconHTML, text) => createMolecule(
    {
        className: [ 
            "nav-bar__item", 
            isActive ? "nav-bar__item--active" : ""
        ].join(" "),
        onClick: function() {
            if (!isActive)
                navigateTo(redirectPath);
        }
    },
    "div",
    [
        createAtom(
            {
                innerHTML: iconHTML
            },
            "span"
        ),
        createAtom(
            {
                className: "item__text",
                textContent: text
            },
            "span"
        )
    ]
);

export default NavBarItem;