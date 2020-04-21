
this.Home = this.Home || {};

Home.createPlayer = function() {
	// Khởi tạo nhân vật

	// người chơi 1 (bên trái)
	this.player1 = new Player;
	this.player1._group     = 'player1';
	this.player1._fireGroup = 'dan1';


	// người chơi 2 (bên phải)
	this.player2 = new Player;
	this.player2._group     = 'player2';
	this.player2._fireGroup = 'dan2';
	this.player2.huong      = 'left';
	this.player2.scaleX     = -1;
	this.player2._nodeLine.rotation = 10;
	this.player2._lineRotation      = 1;
	this.player2.x                  = 2530;

	//
	this.ground.addChild(this.player1, this.player2);
}
