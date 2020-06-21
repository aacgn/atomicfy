import { createExternalSource, createPage, navigateTo, dispatchEvent, createTemplate, createOrganism, updateContext } from "@aacgn/atomic";
import "./index.css";

import { NavBarItems } from "../../utils/enums/navbar-items.enum";

import NavBar from "../../components/NavBar/index";

import SpotifyWebApi from "spotify-web-api-node";

const HomePage = () => createPage(
    {
        name: "home",
        context: {
            myPlaylistsList: []
        },
        mount: function(){
            return createTemplate({
                className: "home"
            }, 
            'div', 
            [
                NavBar(NavBarItems.HOME, this.context.myPlaylistsList),
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
            window.addEventListener("userActionDenied", () => {
                alert("Only spotify premium users can use that application!");
            });

            window.addEventListener("playUserPlayback", (event) => {
                dispatchEvent("playUserPlayback", event.detail, ["player"]);
            });

            const authorizedUser = window.localStorage.getItem("authorizedUser");

            if (!authorizedUser)
                navigateTo("/");

            const authorizedUserParse = JSON.parse(authorizedUser);

            setTimeout(() => {
                dispatchEvent("authorizedUser", authorizedUserParse, ["home", "player"]);
            }, 3000);

            const spotifyApi = new SpotifyWebApi({});

            spotifyApi.setAccessToken(authorizedUserParse.accessToken);

            spotifyApi.getUserPlaylists(null, {
                limit: 20
            })
            .then(
            (data) => {
                const myPlaylistsList = data.body.items.map(
                    (i) => {
                        return {
                            name: i.name,
                            context_uri: i.uri
                        }
                    }
                );
                updateContext(ref, 'myPlaylistsList', myPlaylistsList);
            }, 
            (err) => {
                console.log(err);
            });
        }
    }
);

export default HomePage;