'use strict';

this.RedT = this.RedT || {};

RedT.Node = function() {
	this._onLoad    = false;
	this.active     = true;
	this._active    = true;
	this.__active   = true;

	// nhóm
	this.group      = 'default';

	this.color      = '#000000'; // màu sắc

	this._scale     = 1;

	this._scaleX    = 1;
	this._scaleY    = 1;

	this.__scaleX   = 1;
	this.__scaleY   = 1;


	// Mỏ neo (đặt vị trí tâm)
	this._anchorX   = 0.5;
	this._anchorY   = 0.5;

	// Ngiêng
	this._skewX     = 0;
	this._skewY     = 0;

	this.__skewX    = 0;
	this.__skewY    = 0;

	// Vị trí vẽ
	this._x         = 0;    // vị trí node trong node cha
	this._y         = 0;    // vị trí node trong node cha

	this.__x        = 0;    // vị trí toàn bộ node tra trên màn hình
	this.__y        = 0;    // vị trí toàn bộ node tra trên màn hình

	// chiều rộng
	this._width     = 0;    // chiều rộng của node
	// chiều cao
	this._height    = 0;    // chiều cao của node

	this.components      = [];   // các component
	this.renderComponent = null;   // component render

	this.children   = [];   // các node con

	this.parent     = null; // node tra

	this.opacity    = 255;  // độ trong suốt
	this._opacity   = 255;  // độ trong suốt của node hiện tại
	this.__opacity  = 255;  // độ trong suốt node tra

	// đặt góc xoay
	this._rotation  = 0;    // góc xoay
	this.__rotation = 0;    // góc xoay của các node tra

	this.matrix     = new RedT.Matrix2D;

	this._regX      = 0;
	this._regY      = 0;

	this.name       = 'new Node';
	this.type       = null;

	// thay đổi width
	Object.defineProperty(this, 'width',{
		get: function() {return this._width},
		set: function(value) {
			this._width = Number(value);
			this._regX = this._width/2;
			this.updateTransform();
			return value;
		}
	});

	// thay đổi height
	Object.defineProperty(this, 'height',{
		get: function() {return this._height},
		set: function(value) {
			this._height = Number(value);
			this._regY = this._height/2;
			this.updateTransform();
			return value;
		}
	});

	// thay đổi vị trí con khi vị chí cha thay đổi (định dạng container)
	Object.defineProperty(this, 'x',{
		get: function() {return this._x},
		set: function(value) {
			this._x = Number(value);
			this.setChildLocalPosition();
			return value;
		}
	});

	// thay đổi vị trí con khi vị chí cha thay đổi (định dạng container)
	Object.defineProperty(this, 'y',{
		get: function() {return this._y},
		set: function(value) {
			this._y = Number(value);
			this.setChildLocalPosition();

			return value;
		}
	});


	// thay đổi scale con khi scale cha thay đổi (định dạng container)
	Object.defineProperty(this, 'scale',{
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
	Object.defineProperty(this, 'scaleX',{
		get: function() {return this._scaleX},
		set: function(value) {
			this._scaleX = Number(value);
			this.setChildScale();
			return value;
		}
	});

	// thay đổi scale con khi scale cha thay đổi (định dạng container)
	Object.defineProperty(this, 'scaleY',{
		get: function() {return this._scaleY},
		set: function(value) {
			this._scaleY = Number(value);
			this.setChildScale();
			return value;
		}
	});

	// thay đổi góc xoay
	Object.defineProperty(this, 'rotation',{
		get: function() {return this._rotation},
		set: function(value) {
			this._rotation = Number(value);
			this.setChildRotation();
			return value;
		}
	});


	// Cập nhật Transform
	this.updateTransform = function(){
		this.matrix.updateTransform(this.getX(), this.getY(), this.getScaleX(), this.getScaleY(), this.getRotation(), this._skewX, this._skewY, this._regX, this._regY);
	}

	this.getX = function(){
		return this._x+this.__x;
	}

	this.getY = function(){
		return this._y+this.__y;
	}

	this.getScaleX = function(){
		return this._scaleX*this.__scaleX;
	}

	this.getScaleY = function(){
		return this._scaleY*this.__scaleY;
	}

	this.getRotation = function(){
		return this._rotation+this.__rotation;
	}

	// Tính lại vị trí trên màn hình của tất cả các children của children ...
	this.setChildLocalPosition = function(){
		this.updateTransform();
		this.children.forEach((child)=>{
			child.__x = 0;
			child.__y = 0;
			RedT.setChildPosition(child, child.parent);
			child.setChildLocalPosition();
		});
	}

	// Tính lại scale của tất cả các children của children ...
	this.setChildScale = function(){
		this.updateTransform();
		this.children.forEach(function(child){
			child.__scaleX = 1;
			child.__scaleY = 1;
			RedT.setParentScale(child, child.parent);
			child.setChildScale();
		});
	}

	// Tính lại scale của tất cả các children của children ...
	this.setChildRotation = function(){
		this.updateTransform();
		this.children.forEach(function(child){
			child.__rotation = 0;
			RedT.setParentRotation(child, child.parent);
			child.setChildRotation();
		});
	}


	// thêm children và đặt parent
	this.addChild = function(child){
		child.parent = this;
		this.children.push(child);

		RedT.setParentScale(child, child.parent);
		child.setChildScale();

		RedT.setParentRotation(child, child.parent);
		child.setChildRotation();

		RedT.setChildPosition(child, child.parent);
		child.setChildLocalPosition();
	}

	this.getComponent = function(component){
		return this.components.find(function(element){
			return element instanceof component;
		});
	}

	this.addComponent = function(component){
		component.node = this;
		this.components.push(component);
	}

	/**
	 * Remove a component
	 * @method: removeComponent
	 * @param:  Component
	 * @return: boolean
	*/
	this.removeComponent = function(component){
		return void 0;
	}

	//
	this.destroy = function(){
		this.active = false;
		if (this.parent !== null) {
			//
		}
	}

	this.draw = function(){
		if (this.active === true) {
			this.update && this.update();
			let ctx = RedT.decorator.ctx;
			ctx.setTransform(this.matrix.a, this.matrix.b, this.matrix.c, this.matrix.d, this.matrix.tx, this.matrix.ty);
			ctx.fillStyle   = this.color;
			ctx.globalAlpha = this.opacity/255;

			if (this._onLoad === false) {
				// gọi vòng đời onLoad
				this._onLoad = true;
				this.onLoad   !== void 0 && this.onLoad();
				this.onEnable !== void 0 && this.onEnable();
			}
			this.components.forEach((component)=>{
				component.draw !== void 0 && component.draw();
			});
			this.children.forEach((child)=>{
				child.draw();
			});
			//ctx.setTransform(1, 0, 0, 1, 0, 0);
			//ctx.clearRect(0, 0, 2, 2);
		}
		return void 0;
	}
}

// vòng đời
/**
RedT.Node.prototype.onLoad    = function(){};
RedT.Node.prototype.start     = function(){};
RedT.Node.prototype.onEnable  = function(){};
RedT.Node.prototype.onDisable = function(){};
RedT.Node.prototype.onDestroy = function(){};
*/
