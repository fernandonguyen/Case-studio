 
 this.RedT = this.RedT || {};

/** 
 * Nhóm node
 * chỉ dành cho va chạm *
 */

(function(RedT) {
	RedT.groupMatrix = {
		player: {
			bom:    true,
			ground: true,
		},
		dan: {
			bot:    true,
			ground: true,
		},
		bot: {
			dan:    true,
			ground: true,
		},
		bom: {
			player: true,
			ground: true,
		},
		ground: {
			player: true,
			dan:    true,
			bot:    true,
			bom:    true,
		}
	};
})(RedT);
