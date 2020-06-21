import { createMolecule, createOrganism, navigateTo, dispatchEvent } from "@aacgn/atomic";
import "./index.css";

import { NavBarItems } from "../../utils/enums/navbar-items.enum";

import NavBarItem from "../NavBarItem/index";
import HighlightText from "../HighlightText";

const NavBar = (activeItem, playlistList) => {

    const mountTree = [
        createMolecule(
            {
                className: "nav-bar__logo",
                src: "assets/logo_white.png"
            },
            "img"
        ),
        NavBarItem("Home", "home", () => navigateTo("/home"), activeItem === NavBarItems.HOME),
        NavBarItem("Search", "search"),
        NavBarItem("Your library", "view_headline"),
        createMolecule(
            {
                className: "nav-bar__playlists",
                textContent: "Playlists"
            },
            "span"
        ),
        NavBarItem("Create Playlist", "add_box"),
        NavBarItem("Liked Songs", "book"),
        createMolecule(
            {
                className: "nav-bar__separator"
            },
            "div"
        )
    ];

    if (playlistList) {
        var moleculeMountTree = [];
        playlistList.forEach(playlist => {
            moleculeMountTree.push(HighlightText(playlist.name, () => dispatchEvent("playUserPlayback", playlist.context_uri, ["player"])))
        });
        const molecule = createMolecule(
            {
                className: "nav-bar__playlists-list"
            },
            "div",
            moleculeMountTree
        )
        mountTree.push(molecule);
    }

    return createOrganism(
        {
            className: "nav-bar"
        },
        "div",
        mountTree
    );
}

export default NavBar;