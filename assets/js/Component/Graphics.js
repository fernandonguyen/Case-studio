
this.RedT = this.RedT || {}

class Graphics extends RedT.Component {
	constructor() {
		super();
		// mảng các phương thức vẽ;
		this.cmds = [];

		this.style = {
			strokeStyle: 'black',
			fillStyle: 'white',
			lineCap: 'butt',
			lineJoin: 'miter',
			miterLimit: 10,
			setLineDash: [],
		};
	}

	moveTo (x, y) {
		this.cmds.push(['moveTo', [x, y]]);
	}

	lineTo (x, y) {
		this.cmds.push(['lineTo', [x, y]]);
	}

	bezierCurveTo (c1x, c1y, c2x, c2y, x, y) {
		this.cmds.push(['bezierCurveTo', [c1x, c1y, c2x, c2y, x, y]]);
	}

	quadraticCurveTo (cx, cy, x, y) {
		this.cmds.push(['quadraticCurveTo', [cx, cy, x, y]]);
	}

	arc (cx, cy, r, startAngle, endAngle, counterclockwise) {
		//Helper.arc(this, cx, cy, r, startAngle, endAngle, counterclockwise);
	}

	ellipse (cx, cy, rx, ry) {
		//Helper.ellipse(this, cx, cy, rx, ry);
	}

	circle (cx, cy, r) {
		//Helper.ellipse(this, cx, cy, r, r);
	}

	rect (x, y, w, h) {
		this.moveTo(x, y);
		this.lineTo(x, y + h);
		this.lineTo(x + w, y + h);
		this.lineTo(x + w, y);
		this.close();
	}

	roundRect (x, y, w, h, r) {
		//Helper.roundRect(this, x, y, w, h, r);
	}

	clear () {
		this.cmds.length = 0;
	}

	close () {
		this.cmds.push(['closePath', []]);
	}

	lineDash (v){
		this.style.setLineDash = v;
	}
	stroke () {
		this.cmds.push(['stroke', []]);
	}

	fill () {
		this.cmds.push(['fill', []]);
	}

	strokeColor (v){
		this.cmds.push(['strokeStyle', v]);
		this.style.strokeStyle = v;
	}

	fillColor(v) {
		var fillStyle = 'rgba(' + (0 | v.r) + ',' + (0 | v.g) + ',' + (0 | v.b) + ',' + v.a / 255 + ')';
		this.cmds.push(['fillStyle', fillStyle]);
		this.style.fillStyle = fillStyle;
	}

	lineWidth (v) {
		this.cmds.push(['lineWidth', v]);
		this.style.lineWidth = v;
	}

	lineCap (v) {
		// butt, butt, round, square
		this.cmds.push(['lineCap', v]);
		this.style.lineCap = v;
	}
	lineJoin (v) {
		/**
		 * bevel, round, miter
		*/
		this.cmds.push(['lineJoin', v]);
		this.style.lineJoin = v;
	}

	miterLimit (v) {
		this.cmds.push(['miterLimit', v]);
		this.style.miterLimit = v;
	}

	draw () {
		let ctx = RedT.decorator.ctx;

		let matrix = this.node.matrix;
		let a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d,
			tx = matrix.tx, ty = matrix.ty;
		ctx.setTransform(a, b, c, d, tx, ty);
		ctx.save();

		ctx.globalAlpha = this.node.opacity / 255;

		let style = this.style;
		ctx.strokeStyle = style.strokeStyle;
		ctx.fillStyle = style.fillStyle;
		ctx.lineWidth = style.lineWidth;
		ctx.lineJoin = style.lineJoin;
		ctx.miterLimit = style.miterLimit;
		ctx.setLineDash(style.setLineDash);

		let endPath = true;
		let cmds = this.cmds;
		for (let i = 0, l = cmds.length; i < l; i++) {
			let cmd = cmds[i];
			let ctxCmd = cmd[0], args = cmd[1];

			if (ctxCmd === 'moveTo' && endPath) {
				ctx.beginPath();
				endPath = false;
			}
			else if (ctxCmd === 'fill' || ctxCmd === 'stroke' || ctxCmd === 'fillRect') {
				endPath = true;
			}

			if (typeof ctx[ctxCmd] === 'function') {
				ctx[ctxCmd].apply(ctx, args);
			}
			else {
				ctx[ctxCmd] = args;
			}
		}

		ctx.restore();

		return 1;
	}
}
RedT.Graphics = Graphics;
