this.RedT = this.RedT || {};
(function(){
	RedT.Vec2 = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	let p = RedT.Vec2.prototype;

	p.magSqr = function () {
	    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
	}

	p.normalizeSelf = function () {
	    let magSqr = Math.pow(this.x, 2) + Math.pow(this.y, 2);
	    if (magSqr === 1.0 || magSqr === 0.0){
	        return this;
	    }

	    let invsqrt = 1.0 / Math.sqrt(magSqr);
	    this.x *= invsqrt;
	    this.y *= invsqrt;
	    return this;
	}

	p.mulSelf = function (num) {
	    this.x *= num;
	    this.y *= num;
	    return this;
	}

	RedT.v2 = function(x, y) {
		return new RedT.Vec2(x, y);
	}

})();
