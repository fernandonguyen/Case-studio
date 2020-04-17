'use strict';

this.RedT = this.RedT || {};

/**
	* RedT.Label
	------ quản lý đối tượng văn bản được vẽ trên canvas ------
*/
RedT.Label = function(options = {}){
	// Thuộc tính active được các định component được vẽ hay không
	this.active       = true;
	/**
		* type: boolean
		* default: true
	*/

	// textAlign căn chỉnh văn bản theo chiều ngang (x, y) so với vị trí và chiều rộng của văn bản(width)
	this.textAlign    = 'center';
	/**
		* type: string
		* default: 'center'
		* các giá trị:
			'start':
			'end':
			'center': căn giữa theo chiều ngang
			'left':   căn lề trái
			'right':  căn lề phải
	*/

	// khoảng cách giữa các dòng
	this.lineHeight   = 23;

	// string được phép thay đổi
	// _string chỉ lưu giá trị text (không được thay đổi)
	this._string      = [];

	// Chuỗi có suống dòng được cắt và lưu tại đây __string
	//this.__string     = [];

	// kích thước chữ
	this.size         = '20';

	// loại kích thước (mặc định: px)
	this.size_type    = 'px';

	// Kiểu chữ
	this.font_type    = 'normal'; // normal, italic, or bold

	// Font chữ
	this.font         = 'Arial';
	/**
		* type: string
		* default: 'Calibri'
	*/

	// node quản lý component này
	this._node     = null;

	//this.maxWidth  = null;

	/**
	this.shadowColor   = null; // shadow color
	this.shadowBlur    = 0;    // shadow blur
	this.shadowOffsetX = 0;    //
	this.shadowOffsetY = 0;    //
	*/

	this.lineWidth   = 0;      // stroke width
	this.strokeStyle = null;   // stroke color

	this.width  = 0;
	this.height = 0;

	// đặt theo dõi giá trị thay đổi
	Object.defineProperty(this, 'string',{
		get: function() {return this._string.join('\n')},
		set: function(value) {
			this._string = String(value).split(/(?:\r\n|\r|\n)/);

			let ctx          = RedT.decorator.ctx;
			ctx.font         = this.font_type + ' ' + this.size + this.size_type + ' ' + this.font;
			ctx.textAlign    = this.textAlign;

			let maxWidth = 0;
			for(let n = 0; n < this._string.length; n++) {
				let metrics = ctx.measureText(this._string[n]);
				let testWidth = metrics.width;
				if (testWidth > maxWidth) {
					maxWidth = testWidth;
				}
			}
			this.width  = maxWidth;
			this.height = this.lineHeight*this._string.length;

			if (this._node) {
				this._node.width  = this.width;
				this._node.height = this.height;
			}

			return value;
		}
	});


	// đặt tùy chọn
	Object.assign(this, options);


	// thay đổi width
	Object.defineProperty(this, 'node',{
		get: function() {return this._node},
		set: function(value) {
			this._node = value;
			this._node.width  = this.width;
			this._node.height = this.height;
			return value;
		}
	});
}

// Vẽ văn bản nên canvas
RedT.Label.prototype.draw = function(){
	if (this.active === true && this._string.length !== 0) {
		let ctx = RedT.decorator.ctx;
		ctx.font      = this.font_type + ' ' + this.size + this.size_type + ' ' + this.font;
		ctx.textAlign = this.textAlign;
		let y = 0;
		if (this.strokeStyle) {
			ctx.strokeStyle = this.strokeStyle;   // stroke color
			ctx.lineWidth   = this.lineWidth;     // stroke width
		}
		for(let n = 0; n < this._string.length; n++) {
			ctx.fillText(this._string[n], 0, y);
			if (this.strokeStyle) {
				ctx.strokeText(this._string[n], 0, y);
			}
			y += this.lineHeight;
		}
	}
}
