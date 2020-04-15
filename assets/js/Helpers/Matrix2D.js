this.RedT = this.RedT || {};
(function(){
	RedT.Matrix2D = function() {
		this.a  = 1;
		this.b  = 0;
		this.c  = 0;
		this.d  = 1;
		this.tx = 0;
		this.ty = 0;
	}
	let p = RedT.Matrix2D.prototype;
	p.update = function(a, b, c, d, tx, ty) {
		this.a  = a;
		this.b  = b;
		this.c  = c;
		this.d  = d;
		this.tx = tx;
		this.ty = ty;
		return void 0;
	};

	p.updateTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
		let cos = 1;
		let sin = 0;
		if (rotation%360) {
			let r = rotation*RedT.DEG_TO_RAD;
			cos = Math.cos(r);
			sin = Math.sin(r);
		}

		if (skewX || skewY) {
			skewX *= RedT.DEG_TO_RAD;
			skewY *= RedT.DEG_TO_RAD;
			this.update(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
			this.update(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
		} else {
			this.update(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
		}

		if (regX || regY) {
			this.tx -= regX*this.a+regY*this.c; 
			this.ty -= regX*this.b+regY*this.d;
		}
		return void 0;
	};
})();
