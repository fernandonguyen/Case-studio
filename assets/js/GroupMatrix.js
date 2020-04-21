 
 this.RedT = this.RedT || {};

/** 
 * Nhóm node
 * chỉ dành cho va chạm *
 */

(function(RedT) {
	RedT.groupMatrix = {
		player1: {
			dan2:   true,
			ground: true,
		},
		player2: {
			dan1:   true,
			ground: true,
		},
		dan1: {
			player2: true,
			ground:  true,
		},
		dan2: {
			player1: true,
			ground:  true,
		},
	};
})(RedT);
