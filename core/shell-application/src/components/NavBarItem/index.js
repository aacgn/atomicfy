import { createMolecule, createAtom } from "@aacgn/atomic";
import "./index.css";

import HighlightText from "../HighlightText/index";

const NavBarItem = (textContent, iconName = null, clickFunction = null, isActive = false) => createMolecule(
    {
        className: [ 
            "nav-bar__item", 
            isActive ? "nav-bar__item--active" : ""
        ].join(" "),
        onClick: () => {
            if (!isActive && clickFunction)
                clickFunction()
        }
    },
    "div",
    iconName ? 
        [
            createAtom(
                {
                    className: "material-icons",
                    textContent: iconName
                },
                "i"
            ),
            HighlightText(textContent)
        ]
    :
        [
            HighlightText(textContent)
        ]
);

export default NavBarItem;