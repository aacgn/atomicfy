import { createMolecule, createOrganism, createAtom } from "@aacgn/atomic";
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
        NavBarItem('<i class="material-icons">home</i>', "Home", activeItem === NavBarItems.HOME, "/home"),
        NavBarItem('<i class="material-icons">search</i>', "Search", activeItem === NavBarItems.SEARCH, "/search"),
        NavBarItem('<i class="material-icons">view_headline</i>', "Your library"),
        createMolecule(
            {
                className: "nav-bar__playlists",
                textContent: "Playlists"
            }
        ),
        NavBarItem('<i class="material-icons">add_box</i>', "Create Playlist"),
        NavBarItem('<i class="material-icons">book</i>', "Liked Songs"),
        createMolecule(
            {
                className: "nav-bar__separator"
            },
            "div"
        )
    ]
);

export default NavBar;