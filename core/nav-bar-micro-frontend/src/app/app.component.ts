import { Component, OnInit } from '@angular/core';
import SpotifyWebApi from "spotify-web-api-node";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public items = new Array();

  constructor() { }

  ngOnInit() {
    const contextStore =  (<any>window).AtomicContextStore;

    if (contextStore)
      var authorizedUser = contextStore["app"] ? contextStore["app"]["authorizedUser"] : null;
      if (authorizedUser) {
        const spotifyApi = new SpotifyWebApi({});
        spotifyApi.setAccessToken(authorizedUser.accessToken);

        spotifyApi.getUserPlaylists(null, {
          limit: 20
        })
        .then(
        (data: any) => {
          this.items = data.body.items.map(
            (i) => {
                return {
                    name: i.name,
                    context_uri: i.uri
                }
            }
          );
        }, 
        (err) => {
          console.log(err);
        });
      }
  }

  public onClickHome(): void {}

  public onClickPlaylistItem(item: any): void {
    const postMessageData = {
      hasAtomicSignature: true,
      event: "custom_event",
      data: {
        name: "playUserPlayback",
        data: item.context_uri
      }
    }

    window.parent.postMessage(postMessageData, "*");
  }

}
