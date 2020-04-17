this.RedT = this.RedT || {};

(function() {
	// quản lý va chạm
	RedT.CollisionManager = function(){
		this.enabled = false;

		// mảng các node đăng ký va chạm
		this._collision = [];

		// trọng lực
		this._gravity:    RedT.v2(0, 0);
	}
	let p = RedT.CollisionManager.prototype;

	// time = 1/fps
	p.update = function(time){
		//
	}

	// kiểm tra nhóm va trạm
	p.checkGroup = function(){
	}
})()
