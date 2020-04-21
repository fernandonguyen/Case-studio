
this.RedT = this.RedT || {};

class MoveTo {
	constructor(duration, position, y){
		this.endPosition   = RedT.v2();

		if (typeof position === 'object') {
			y = position.y;
			position = position.x;
		}
		this.endPosition.x = position;
		this.endPosition.y = y;

		this.positionDelta = RedT.v2();

		this.isInit        = false;
		this.isDone        = false;
		this.time          = 0;
		this.duration      = duration;
	}
	init(target){
		if (this.isInit === false) {
			this.target = target;
			this.isInit = true;
			this.positionDelta.x = this.endPosition.x-target._x;
        	this.positionDelta.y = this.endPosition.y-target._y;
		}
	}
	update(dt){
		if (this.isDone)
			return void 0;

		this.target.x += this.positionDelta.x * dt / this.duration;
		this.target.y += this.positionDelta.y * dt / this.duration;
		this.time += dt;

		if (this.time >= this.duration) {
			this.isDone = true;
			this.target.x = this.endPosition.x;
			this.target.y = this.endPosition.y;
		}
	}
	destroy(){
		delete this.target;
		delete this.endPosition;
		delete this.positionDelta;
	}
}

RedT.moveTo = function(duration, position, y) {
	return new MoveTo(duration, position, y);
}
