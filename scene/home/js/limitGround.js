
this.Home = this.Home || {};

Home.limitGround = function() {
	// Loại bỏ đạn lạc, khi đạn lạc khỏi bản đồ
	// giới hạn bản đồ, Phá hủy đạn lạc, tránh phung phí hiệu năng
	let fixBulletBottom = new RedT.Node({_group: 'ground', name:'fixBulletBottom', x:RedT.decorator.canvas.width/2, y:1000,
		width: 5000,
		height: 100});
	let colliderBottomFixx = new RedT.BoxCollider;
	colliderBottomFixx.offset.x = fixBulletBottom._regX;
	colliderBottomFixx.offset.y = fixBulletBottom._regY;
	colliderBottomFixx.size.set(fixBulletBottom.getContentSize());
	fixBulletBottom.addComponent(colliderBottomFixx);

	let fixBulletTop = new RedT.Node({_group: 'ground', name:'fixBulletTop', x:RedT.decorator.canvas.width/2, y:-6000,
		width: 5000,
		height: 100});
	let colliderTopFixx = new RedT.BoxCollider;
	colliderTopFixx.offset.x = fixBulletTop._regX;
	colliderTopFixx.offset.y = fixBulletTop._regY;
	colliderTopFixx.size.set(fixBulletTop.getContentSize());
	fixBulletTop.addComponent(colliderTopFixx);

	let fixBulletLeft = new RedT.Node({_group: 'ground', name:'fixBulletLeft', x:-500, y:0,
		width: 100,
		height: 10000});
	let colliderLeftFixx = new RedT.BoxCollider;
	colliderLeftFixx.offset.x = fixBulletLeft._regX;
	colliderLeftFixx.offset.y = fixBulletLeft._regY;
	colliderLeftFixx.size.set(fixBulletLeft.getContentSize());
	fixBulletLeft.addComponent(colliderLeftFixx);

	let fixBulletRight = new RedT.Node({_group: 'ground', name:'fixBulletRight', x:3398, y:0,
		width: 100,
		height: 10000});
	let colliderRightFixx = new RedT.BoxCollider;
	colliderRightFixx.offset.x = fixBulletRight._regX;
	colliderRightFixx.offset.y = fixBulletRight._regY;
	colliderRightFixx.size.set(fixBulletRight.getContentSize());
	fixBulletRight.addComponent(colliderRightFixx);

	this.ground.addChild(fixBulletTop, fixBulletLeft, fixBulletBottom, fixBulletRight);
}
