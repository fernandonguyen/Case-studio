this.RedT = this.RedT || {};

RedT.PropertyNode = function(node) {
	// thay đổi tâm X
	Object.defineProperty(node, 'anchorX',{
		get: function() {return this._anchorX},
		set: function(value) {
			this._anchorX = Number(value);
			this._regX   = this._width*this._anchorX;
			this.updateTransform();
			return value;
		}
	});

	// thay đổi tâm Y
	Object.defineProperty(node, 'anchorY',{
		get: function() {return this._anchorY},
		set: function(value) {
			this._anchorY = Number(value);
			this._regY    = this._height*this._anchorY;
			this.updateTransform();
			return value;
		}
	});

	// thay đổi width
	Object.defineProperty(node, 'width',{
		get: function() {return this._width},
		set: function(value) {
			this._width = Number(value);
			this._regX  = this._width*this._anchorX;
			this.updateTransform();
			return value;
		}
	});

	// thay đổi height
	Object.defineProperty(node, 'height',{
		get: function() {return this._height},
		set: function(value) {
			this._height = Number(value);
			this._regY   = this._height*this._anchorY;
			this.updateTransform();
			return value;
		}
	});

	// thay đổi vị trí con khi vị chí cha thay đổi (định dạng container)
	Object.defineProperty(node, 'x',{
		get: function() {return this._x},
		set: function(value) {
			this._x = Number(value);
			this.setChildLocalPosition();
			return value;
		}
	});

	// thay đổi vị trí con khi vị chí cha thay đổi (định dạng container)
	Object.defineProperty(node, 'y',{
		get: function() {return this._y},
		set: function(value) {
			this._y = Number(value);
			this.setChildLocalPosition();

			return value;
		}
	});


	// thay đổi scale con khi scale cha thay đổi (định dạng container)
	Object.defineProperty(node, 'scale',{
		get: function() {return this._scale},
		set: function(value) {
			this._scale  = Number(value);
			this._scaleX = this._scale;
			this._scaleY = this._scale;
			this.setChildScale();
			return value;
		}
	});

	// thay đổi scale con khi scale cha thay đổi (định dạng container)
	Object.defineProperty(node, 'scaleX',{
		get: function() {return this._scaleX},
		set: function(value) {
			this._scaleX = Number(value);
			this.setChildScale();
			return value;
		}
	});

	// thay đổi scale con khi scale cha thay đổi (định dạng container)
	Object.defineProperty(node, 'scaleY',{
		get: function() {return this._scaleY},
		set: function(value) {
			this._scaleY = Number(value);
			this.setChildScale();
			return value;
		}
	});

	// thay đổi góc xoay
	Object.defineProperty(node, 'rotation',{
		get: function() {return this._rotation},
		set: function(value) {
			this._rotation = Number(value);
			this.setChildRotation();
			return value;
		}
	});
}
