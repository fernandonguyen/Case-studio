this.RedT = this.RedT || {}

RedT.Sprite = function(sprite) {
	this.active       = true;
	this._node        = null;
	this._frameSprite = sprite;
	this.mask         = null;
	this.maskX        = 0;
	this.maskY        = 0;
	this.maskW        = 0;
	this.maskH        = 0;

	// thay đổi width
	Object.defineProperty(this, 'node',{
		get: function() {return this._node},
		set: function(value) {
			this._node = value;
			if (this._frameSprite) {
				this.maskH        = this._frameSprite.height;
				this._node.width  = this._frameSprite.width;
				this._node.height = this._frameSprite.height;
			}
			return value;
		}
	});
}

RedT.Sprite.prototype.draw = function() {
	if (this.active === true && this._frameSprite !== void 0) {
		if (this.mask !== null) {
			this.maskW = this.mask*this._frameSprite.width;
			RedT.decorator.ctx.drawImage(this._frameSprite, 0, 0, this.maskW, this.maskH, this.maskX, this.maskY, this.maskW, this.maskH);
		}else{
			RedT.decorator.ctx.drawImage(this._frameSprite, 0, 0, this._node._width, this._node._height);
		}
	}
}
