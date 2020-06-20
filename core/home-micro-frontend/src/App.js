import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import ScaleLoader from "react-spinners/ScaleLoader";
import ItemCard from "./components/ItemCard/index";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: "Undefined",
      data: []
    };

    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    this.setState(
      {
        ...this.state,
        loading: false,
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
            const spotifyApi = new SpotifyWebApi({});

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
                <ItemCard
                  key={track.id}
                  imgSrc={track.imgSrc}
                  name={track.name}
                  description={track.description}
                ></ItemCard>
              ))}
            </div>
          </span>
        }
      </div>
    );
  }
}

export default App;
