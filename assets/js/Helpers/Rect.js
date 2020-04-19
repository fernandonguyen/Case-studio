
this.RedT = this.RedT || {};

(function(RedT){
	// tạo thông tin hình chữ nhật
	RedT.Rect = function(x, y, w, h){
		 if (x && typeof x === 'object') {
	        y = x.y;
	        w = x.width;
	        h = x.height;
	        x = x.x;
	    }
	    this.x      = x || 0;
	    this.y      = y || 0;
	    this.width  = w || 0;
	    this.height = h || 0;
	}

	let p = RedT.Rect.prototype;

	/**
	 * Kiểm tra giao nhau của hình hiện tại với hình đã cho
	 */
	p.intersects = function (rect) {
	    let maxax = this.x + this.width,
	        maxay = this.y + this.height,
	        maxbx = rect.x + rect.width,
	        maxby = rect.y + rect.height;
	    return !(maxax < rect.x || maxbx < this.x || maxay < rect.y || maxby < this.y);
	};

	// Tạo nhanh ma trận chữ nhật
	RedT.rect = function(x, y, w, h) {
		return new RedT.Rect(x, y, w, h);
	}
})(RedT);
