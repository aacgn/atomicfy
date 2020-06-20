import React from "react";
import "./App.css";

import SpotifyWebApi from "spotify-web-api-node";

import ItemCard from "./components/ItemCard/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Loading...",
      data: []
    };

    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    this.setState(
      {
        ...this.state,
        name: data.message,
        data: data.playlists.items.map(
          (item) => {
            return {
              id: item.id,
              imgSrc: item.images[0].url,
              name: item.name,
              description: item.description
            }
          }
        )
      }
    )
  }

  componentDidMount() {
    window.addEventListener("message", (messageEvent) => {
      const event = messageEvent.data;
      if (event && event.hasAtomicSignature) {

        switch(event.event) {
          case "authorizedUser":
            const spotifyApi = new SpotifyWebApi({
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET
            });

            spotifyApi.setAccessToken(event.data.accessToken);
    
            spotifyApi.getFeaturedPlaylists({
              country: "BR",
              limit: 23
            })
            .then(
              (data) => {
                console.log(data.body);
                this.handleData(data.body);
            }, 
            (err) => {
              console.log(err);
            });
            break;
          default:
            break;
        }
      }
    })
  }

  render() {
    return (
      <div className="home">
        <span className="home__title">
          {
            this.state.name
          }
          <div className="home__list">
            {this.state.data.map((track) => (
              <ItemCard
                key={track.id}
                imgSrc={track.imgSrc}
                name={track.name}
                description={track.description}
              ></ItemCard>
            ))}
          </div>
        </span>
      </div>
    );
  }
}

export default App;
