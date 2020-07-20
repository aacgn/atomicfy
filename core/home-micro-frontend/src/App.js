import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import ScaleLoader from "react-spinners/ScaleLoader";
import ItemCard from "./components/ItemCard/index";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    
    // State
    this.state = {
      loading: true,
      name: "Undefined",
      data: []
    };

    // Attributes
    this.spotifyApi = new SpotifyWebApi({});
  }

  requestFeaturedPlaylists = () => {
    this.spotifyApi.getFeaturedPlaylists({
      country: "BR",
      limit: 23
    })
    .then(
      (data) => {
        this.setState(
          {
            ...this.state,
            loading: false,
            name: data.body.message,
            data: data.body.playlists.items.map(
              (item) => {
                return {
                  id: item.id,
                  imgSrc: item.images[0].url,
                  name: item.name,
                  description: item.description,
                  context_uri: item.uri
                }
              }
            )
          }
        )
    }, 
    (err) => {
      console.log(err);
    });
  }

  playUserPlayback = (context_uri) => {
    const postMessageData = {
      hasAtomicSignature: true,
      event: "custom_event",
      data: {
        name: "playUserPlayback",
        data: context_uri
      }
    }

    window.parent.postMessage(postMessageData, "*");
  }

  componentDidMount() {
    const contextStore =  window.AtomicContextStore;

    if (contextStore)
      var authorizedUser = contextStore["app"] ? contextStore["app"]["authorizedUser"] : null;
      if (authorizedUser)
        this.spotifyApi.setAccessToken(authorizedUser.accessToken);
        this.requestFeaturedPlaylists();
  }

  render() {
    return (
      <div className="home">
        {
          this.state.loading ?
            <div className="home__loading">
              <ScaleLoader
                size={150}
                color={"white"}
                loading={this.state.loading}
              />
          </div>
        :
          <span className="home__title">
            {
              this.state.name
            }
            <div className="home__list">
              {this.state.data.map((track) => (
                <div key={track.id} onClick={ () => this.playUserPlayback(track.context_uri) }>
                  <ItemCard
                    imgSrc={track.imgSrc}
                    name={track.name}
                    description={track.description}
                  ></ItemCard>
                </div>
              ))}
            </div>
          </span>
        }
      </div>
    );
  }
}

export default App;
