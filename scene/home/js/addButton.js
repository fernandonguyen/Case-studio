
// Thêm nút bấm cho thiết bị cảm ứng.

this.Home = this.Home || {};

Home.addButton = function() {

	let btnTop = new RedT.Node({
		name: 'btnTop',
		anchorX: 0,
		anchorY: 0,
		x: 140,
		y: 445,
	});
	btnTop.addComponent(new RedT.Sprite(RedT.decorator.resources['btnTop']));

	let btnLeft = new RedT.Node({
		name: 'btnLeft',
		anchorX: 0,
		anchorY: 0,
		x: 60,
		y: 485,
	});
	btnLeft.addComponent(new RedT.Sprite(RedT.decorator.resources['btnLeft']));

	let btnBottom = new RedT.Node({
		name: 'btnBottom',
		anchorX: 0,
		anchorY: 0,
		x: 140,
		y: 525,
	});
	btnBottom.addComponent(new RedT.Sprite(RedT.decorator.resources['btnBottom']));

	let btnRight = new RedT.Node({
		name: 'btnRight',
		anchorX: 0,
		anchorY: 0,
		x: 220,
		y: 485,
	});
	btnRight.addComponent(new RedT.Sprite(RedT.decorator.resources['btnRight']));


	let btnFire = new RedT.Node({
		name: 'btnFire',
		anchorX: 0,
		anchorY: 0,
		x: 850,
		y: 485,
	});
	btnFire.addComponent(new RedT.Sprite(RedT.decorator.resources['btnFire']));

	console.log(btnFire);

	this.Game.addChild(btnTop, btnLeft, btnBottom, btnRight, btnFire);

	// event btnTop
	btnTop.on('touchstart',  this.onBtnTop_start, this);
	btnTop.on('touchend',    this.onBtnTop_end,   this);
	btnTop.on('touchcancel', this.onBtnTop_end,   this);

	// event btnBottom
	btnBottom.on('touchstart',  this.onBtnBottom_start, this);
	btnBottom.on('touchend',    this.onBtnBottom_end,   this);
	btnBottom.on('touchcancel', this.onBtnBottom_end,   this);


	// event btnLeft
	btnLeft.on('touchstart',  this.onBtnLeft_start, this);
	btnLeft.on('touchend',    this.onBtnLeft_end,   this);
	btnLeft.on('touchcancel', this.onBtnLeft_end,   this);

	// event btnRight
	btnRight.on('touchstart',  this.onBtnRight_start, this);
	btnRight.on('touchend',    this.onBtnRight_end,   this);
	btnRight.on('touchcancel', this.onBtnRight_end,   this);

	// event btnFire
	btnFire.on('touchstart',  this.onBtnFire_start, this);
	btnFire.on('touchend',    this.onBtnFire_end,   this);
	btnFire.on('touchcancel', this.onBtnFire_end,   this);
}

// event btnTop
Home.onBtnTop_start = function() {
	if (this.isPlay && this.player !== null && this.player.yourTurn)
		this.player.keyDownAngle = 1;
}
Home.onBtnTop_end   = function() {
	this.player.keyDownAngle = -1;
}

// event btnBottom
Home.onBtnBottom_start = function() {
	if (this.isPlay && this.player !== null && this.player.yourTurn)
		this.player.keyDownAngle = 0;
}
Home.onBtnBottom_end   = function() {
	this.player.keyDownAngle = -1;
}

// event btnLeft
Home.onBtnLeft_start = function() {
	if (this.isPlay && this.player !== null && this.player.yourTurn) {
		this.playerTo_left();
		this.player.isKeyDown = true;
	}
}
Home.onBtnLeft_end   = function() {
	this.player.isKeyDown = false;
}

// event btnRight
Home.onBtnRight_start = function() {
	if (this.isPlay && this.player !== null && this.player.yourTurn) {
		this.playerTo_right();
		this.player.isKeyDown = true;
	}
}
Home.onBtnRight_end   = function() {
	this.player.isKeyDown = false;
}

// event btnFire
Home.onBtnFire_start = function() {
	if (this.isPlay && this.player !== null && this.player.yourTurn) {
		if(this.player.isKeySpace == false){
			this.sound_changerPow.play();
		}
		this.player.isKeySpace = true;
	}
}
Home.onBtnFire_end   = function() {
	if (this.isPlay && this.player !== null && this.player.yourTurn) {
		this.sound_changerPow.stop();
		this.player.fire();
		this.player.isKeySpace = false;
	}
}

Home.playerTo_left   = function() {
	if (this.player.huong !== 'left') {
		this.player.huong = 'left';
		this.player.scaleX = -1;
		this.player._lineGraphics.node.rotation = this.player._lineGraphics.node.rotation*-1;
		this.player._lineGraphics.node.x = -10;
		this.player._lineRotation = 1;
	}
}

Home.playerTo_right   = function() {
	if (this.player.huong !== 'right') {
		this.player.huong = 'right';
		this.player.scaleX = 1;
		this.player._lineGraphics.node.x = 10;
		this.player._lineGraphics.node.rotation = this.player._lineGraphics.node.rotation*-1;
		this.player._lineRotation = -1;
	}
}
