this.RedT = this.RedT || {};

(function() {
	class PhysicsBody extends RedT.Component {
		constructor() {
			super();

			this.active = true;
			this._node  = null;

			// type: loại cơ thể
			// 1: chuyển dộng
			// 2: cố định
			this.type   = '1';

			// hệ số nảy ngược lại khi va trạm

			// tỉ lệ trọng lực
	        this._gravityScale =   1;

			// ma sát (0 - 1)
	        //this._linearDamping =  0;

	        // ma sát góc (0 - 1)
	        //this._angularDamping = 0;

	        // vận tốc
	        this._linearVelocity = RedT.v2(0, 0);

	        // vận tốc góc
	        //this._angularVelocity: 0;

	        // loại bỏ xoay khi va chạp
	        //this._fixedRotation:   false;

	        // tích lũy của trọng lực
	        this._gravityAccumulation = RedT.v2(0, 0);
		}
	}

	RedT.PhysicsBody = PhysicsBody;
})()
