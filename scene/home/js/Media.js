//Sound

this.Home = this.Home || {};

Home.Media = function() {
	this.sound_fire       = new RedT.Sound('sound_fire');
	this.sound_toPlayer   = new RedT.Sound('sound_toPlayer');
	this.sound_changerPow = new RedT.Sound('sound_changerPow');
	this.sound_xiaopao    = new RedT.Sound('sound_xiaopao');
	this.sound_feather    = new RedT.Sound('sound_feather');
	this.sound_1192       = new RedT.Sound('sound_1192');

	this.sound_1192._audio.loop     = true;
	this.sound_1192._audio.autoplay = true;
	this.sound_1192.play();
}
