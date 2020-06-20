<script>
	export const music = { 
		imgSrc: 'https://upload.wikimedia.org/wikipedia/pt/a/a7/Ventura_Los_Hermanos.jpg', 
		name: 'Samba a Dois',
		artistName: 'Los Hermanos'
	};
</script>

<main>
	<div class="player">
		<div class="player__album">
			<div class="album__img">
				<img src={music.imgSrc} alt="" />
			</div>
			<div class="album__info">
				<span class="album__text album__text--primary"> {music.name} </span>
				<span class="album__text"> {music.artistName} </span>
			</div>
		</div>
		<div class="player__control">
			<div class="control__container">
				<i class="material-icons control__icon control__icon--small">shuffle</i>
				<i class="material-icons control__icon control__icon--small">skip_previous</i>
				<i class="material-icons control__icon">play_circle_outline</i>
				<i class="material-icons control__icon control__icon--small">skip_next</i>
				<i class="material-icons control__icon control__icon--small">repeat</i>
			</div>
			<div class="control__container">
				<span class="control__text">0:00</span>
				<div class="control__bar"></div>
				<span class="control__text">3:06</span>
			</div>
		</div>
		<div class="control__container">
			<i class="material-icons control__icon control__icon--small">playlist_play</i>
			<i class="material-icons control__icon control__icon--small">computer</i>
			<i class="material-icons control__icon control__icon--small">volume_up</i>
			<div class="control__bar" style="width: 100px;"></div>
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
	height: 50px;
	width: 50px;
}

.album__info {
	display: flex;
	flex-direction: column;
	margin-left: 5px;
}

.album__text {
	font-family: 'proxima-nova', sans-serif;
	font-size: 10px;
	color: #cccccc;
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
    width: 500px;
}
.control__container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.control__icon {
	cursor: pointer;
	color: #bbbbbb;
	margin: 5px 15px 5px 15px;
	font-size: 2rem;
}

.control__icon--small {
	font-size: 1rem;
}

.control__text {
	font-family: 'proxima-nova', sans-serif;
	font-size: 10px;
	color: #cccccc;
	margin-right: 5px;
	margin-left: 5px;
}

.control__bar {
    height: 4px;
	border-radius: 4px;
	width: 100%;
	background-color: #bbbbbb;
}

</style>