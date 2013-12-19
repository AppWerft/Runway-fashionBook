exports.gallery = {
	properties : {
		height : Ti.UI.SIZE
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : image,
		properties : {
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		}
	}]
};

