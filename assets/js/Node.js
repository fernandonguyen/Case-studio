'use strict';
this.RedT = this.RedT || {};
(function(){
	RedT.Node = function(options = {}) {
		Object.defineProperty(this, 'id', {
			value: RedT.idNode++
		});

		//
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

		// Mỏ neo (đặt vị trí tâm cho node 0-1)
		this._anchorX   = 0.5;
		this._anchorY   = 0.5;

		// vị trí tâm
		this._regX      = 0;
		this._regY      = 0;

		this.name       = 'new Node';
		this.type       = null;

		RedT.PropertyNode(this);

		// đặt tùy chọn
		Object.assign(this, options);
	}

	// Prototype
	let p = RedT.Node.prototype;
	// kiểm tra node có được vẽ trên canvas không
	p.checkActive = function(){
		return this._active && this.__active;
	}

	// Cập nhật Transform
	p.updateTransform = function(){
		this.matrix.updateTransform(this.getX(), this.getY(), this.getScaleX(), this.getScaleY(), this.getRotation(), this._skewX, this._skewY, this._regX, this._regY);
	}

	p.getX = function(){
		return this._x+this.__x;
	}

	p.getY = function(){
		return this._y+this.__y;
	}

	p.getScaleX = function(){
		return this._scaleX*this.__scaleX;
	}

	p.getScaleY = function(){
		return this._scaleY*this.__scaleY;
	}

	p.getRotation = function(){
		return this._rotation+this.__rotation;
	}

	// Tính lại vị trí trên màn hình của tất cả các children của children ...
	p.setChildLocalPosition = function(){
		this.updateTransform();
		this.children.forEach((child)=>{
			child.__x = 0;
			child.__y = 0;
			RedT.setChildPosition(child, child.parent);
			child.setChildLocalPosition();
		});
	}

	// Tính lại scale của tất cả các children của children ...
	p.setChildScale = function(){
		this.updateTransform();
		this.children.forEach(function(child){
			child.__scaleX = 1;
			child.__scaleY = 1;
			RedT.setParentScale(child, child.parent);
			child.setChildScale();
		});
	}

	// Tính lại scale của tất cả các children của children ...
	p.setChildRotation = function(){
		this.updateTransform();
		this.children.forEach(function(child){
			child.__rotation = 0;
			RedT.setParentRotation(child, child.parent);
			child.setChildRotation();
		});
	}

	// Lấy danh sách child trước khi thêm vào con
	p.addChild = function(children){
		let paramArray = (children instanceof Array) ? children : arguments;
		for (let i = 0; i < paramArray.length; i++) {
			let child = paramArray[i];
			this.addOneChild(child);
		}
	}

	// thêm một child
	p.addOneChild = function(child){
		child.parent = this;
		this.children.push(child);
		// lấy Scale cha cho các child
		RedT.setParentScale(child, child.parent);
		child.setChildScale();
		// Lấy vị cha cho node hiện tại
		RedT.setParentRotation(child, child.parent);
		child.setChildRotation();
		// lấy vị chí cha cho các child
		RedT.setChildPosition(child, child.parent);
		child.setChildLocalPosition();
	}

	p.getComponent = function(component){
		return this.components.find(function(element){
			return element instanceof component;
		});
	}

	p.addComponent = function(component){
		component.node = this;
		this.components.push(component);
	}

	/**
	 * Remove a component
	 * @method: removeComponent
	 * @param:  Component
	 * @return: boolean
	*/
	p.removeComponent = function(component){
		return void 0;
	}

	// vẽ 
	p.draw = function(){
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
				this.components.forEach((component)=>{
					component.onEnable !== void 0 && component.onEnable();
				});
			}
			this.update !== void 0 && this.update(1/60);
			this.components.forEach((component)=>{
				component.update !== void 0 && component.update(1/60);
			});
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

	// Phá hủy node
	p.destroy = function(){
		this.active = false;
		if (this.parent !== null) {
			//
		}
	}

	// Thêm sự kiện
	p.on = function(type, callback, target){
		this._bindEvent = this._bindEvent || new RedT.EventNode(this);
		this._bindEvent.on(type, callback, target);
	}

	// Xóa sự kiện
	p.off = function(type, callback, target){
		if (this._bindEvent) {
			this._bindEvent.off(type);
		}
	}
})();
