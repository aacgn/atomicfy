import { createMolecule, createOrganism } from "@aacgn/atomic";
import "./index.css";

import { NavBarItems } from "../../utils/enums/navbar-items.enum";

import NavBarItem from "../NavBarItem/index";

const NavBar = (activeItem) => createOrganism(
    {
        className: "nav-bar"
    },
    "div",
    [
        createMolecule(
            {
                className: "nav-bar__logo",
                src: "assets/logo_white.png"
            },
            "img"
        ),
        NavBarItem(activeItem === NavBarItems.HOME, "/home", '<i class="fas fa-home"></i>', "Home"),
        NavBarItem( activeItem === NavBarItems.SEARCH, "/search", '<i class="fas fa-search"></i>', "Search")
    ]
);

export default NavBar;