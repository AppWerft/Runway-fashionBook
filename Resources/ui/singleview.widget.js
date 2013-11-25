exports.create = function(_image) {
	var self = Ti.UI.createView({
		backgroundColor : 'black',
		data : _image,
		bottom : '60dp',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});
	self.add(Ti.UI.createImageView({
		image : _image.url,
		data : _image,
		bottom : '60dp',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	}));
	return self;
};
