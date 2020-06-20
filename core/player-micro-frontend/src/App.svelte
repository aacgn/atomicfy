<script>
	import SpotifyWebApi from "spotify-web-api-node";

	const spotifyApi = new SpotifyWebApi({});

	// Screen variables
	let token = '';
	let currentAlbum = {
		imgSrc: '', 
		name: '',
		artistName: ''
	};
	let isPlaying = false;
	let isSuffle = false;
	let isRepeat = false;
	let isMute = false;

	let deviceId = null;

	const requestCurrentTrack = () => {
		spotifyApi
		.getCurrentlyPlaying()
		.then(
			(data) => {
				const bodyData = data.body;

				if (bodyData) {
					isPlaying = bodyData.is_playing;

					const album = bodyData.item.album;

					currentAlbum = {
						...currentAlbum,
						name: album.name,
						artistName: album.artists.map(a => a.name).join(", "),
						imgSrc: album.images[0].url
					}
				}
				else {
					requestRecentlyPlayed()
				}
			},
			(err) => {
				console.log(err);
			}
		)
	};

	const requestRecentlyPlayed = () => {
		spotifyApi
		.getRecentlyPlayed()
		.then(
			(data) => {
				const album = data.body.items[0].track.album;

				if (album) 
					currentAlbum = {
						...currentAlbum,
						name: album.name,
						artistName: album.artists.map(a => a.name).join(", "),
						imgSrc: album.images[0].url
					}
			}, 
			(err) => {
				console.log(err);
			}
		);
	}

	const configureSpotifyPlayer = () => {
		const player = new Spotify.Player({
			name: "Atomicfy Web Player",
			getOAuthToken: cb => { cb(token); }
		});

		// Playback status updates
		player.addListener('player_state_changed', state => {
			isSuffle = state.shuffle;
			isPlaying = !state.paused;
			isRepeat = state.repeat_mode > 0;

			if (isPlaying)
				requestCurrentTrack()
		 });

		// Ready
		player.addListener('ready', ({ device_id }) => {
			deviceId = device_id;
		});

		// Not Ready
		player.addListener('not_ready', ({ device_id }) => {
			deviceId = null;
		});

		// Connect to the player!
		player.connect();
	}

	const onClickSuffle = () => {
		if (token)
			spotifyApi.startUserPlayback(!isSuffle, deviceId);
	}

	const onClickPrevious = () => {
		if (token)
			spotifyApi.previousUserPlayback(deviceId);
	}

	const onClickPauseOrPlay = () => {
		if (token) {
			if (isPlaying) {
				spotifyApi.pauseUserPlayback(deviceId);
			}
			else {
				spotifyApi.startUserPlayback(deviceId);
			}
		}
	}

	const onClickNext = () => {
		if (token)
			spotifyApi.nextUserPlayback(deviceId);
	}

	const onClickRepeat = () => {
		if (token)
			spotifyApi.repeatUserPlayback(isRepeat ? 0 : 1, deviceId);
	}

	const onClickVolume = () => {
		if (token) {
			spotifyApi.changeVolumeUserPlayback(isMute ? 100 : 0, deviceId);
			isMute = !isMute;
		}
	}

    window.addEventListener("message", (messageEvent) => {
      const event = messageEvent.data;
      if (event && event.hasAtomicSignature) {

        switch(event.event) {
          case "authorizedUser":
			  token = event.data.accessToken;
			  spotifyApi.setAccessToken(token);

			  requestCurrentTrack();
			  configureSpotifyPlayer();
            break;
          default:
            break;
        }
      }
    });

	window.onSpotifyWebPlaybackSDKReady = () => { }
</script>

<main>
	<div class="player">
		<div class="player__album">
			<div class="album__img">
				{#if currentAlbum.imgSrc}
					<img src={currentAlbum.imgSrc} alt="" />
				{:else}
					<div>
						<i class="material-icons">image_not_supported</i>
					</div>
				{/if}
			</div>
			<div class="album__info">
				<span class="album__text album__text--primary"> {currentAlbum.name} </span>
				<span class="album__text"> {currentAlbum.artistName} </span>
			</div>
		</div>
		<div class="player__control">
			<div class="control__container">
				<i class="{
					isSuffle ? 
					'material-icons control__icon control__icon--active control__icon--small' 
					: 'material-icons control__icon control__icon--small'
					}"
					on:click={onClickSuffle}
				>
					shuffle
				</i>
				<i class="material-icons control__icon control__icon--small" on:click={onClickPrevious}>skip_previous</i>
				{#if !isPlaying}
					<i class="material-icons control__icon" on:click={onClickPauseOrPlay}>play_circle_outline</i>
				{:else}
					<i class="material-icons control__icon" on:click={onClickPauseOrPlay}>pause_circle_outline</i>
				{/if}
				<i class="material-icons control__icon control__icon--small" on:click={onClickNext}>skip_next</i>
				<i class="{
					isRepeat ? 
					'material-icons control__icon control__icon--active control__icon--small'
					: 'material-icons control__icon control__icon--small'
					}"
					on:click={onClickRepeat}
				>
					repeat
				</i>
			</div>
		</div>
		<div class="control__container">
			{#if !isMute}
				<i class="material-icons control__icon control__icon--small" on:click={onClickVolume}>volume_up</i>
			{:else}
				<i class="material-icons control__icon control__icon--small" on:click={onClickVolume}>volume_off</i>
			{/if}
		</div>
	</div>
</main>

<style>

@import url('https://fonts.googleapis.com/css?family=Proxima+Nova');

.player {
	display: flex;
	justify-content: space-between;
    align-items: center;
	padding: 8px;
    height: 100%;
    max-height: 80vh;
	background-color: #282828;
}

.player__album {
	display: flex;
	justify-content: center;
	align-items: center;
}

.album__img img {
    width: 50px;
    height: 50px;
}

.album__img div {
	width: 50px;
	height: 50px;
	background-color: rgba(179, 179, 179, 0.4);
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
}

.album__info {
	display: flex;
	flex-direction: column;
	margin-left: 5px;
}

.album__text {
	font-family: 'proxima-nova', sans-serif;
	font-size: 10px;
    color: #b3b3b3;
}

.album__text--primary {
	font-size: 12px;
	color: #ffffff;
	margin-bottom: 5px;
}

.player__control {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.control__container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.control__icon {
	cursor: pointer;
    color: #b3b3b3;
	margin: 5px 15px 5px 15px;
	font-size: 2rem;
	-webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
}

.control__icon--active, .control__icon:hover {
    color: #fff;
}

.control__icon--small {
	font-size: 1rem;
}

</style>