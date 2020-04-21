
this.RedT = this.RedT || {};

class DelayTime {
	constructor(duration){
		this.isDone   = false;
		this.time     = 0;
		this.duration = duration;
	}
	update(dt){
		if (this.isDone)
			return void 0;

		this.time += dt;

		if (this.time >= this.duration) {
			this.isDone = true;
		}
	}
}

RedT.delayTime = function(duration) {
	return new DelayTime(duration);
}
