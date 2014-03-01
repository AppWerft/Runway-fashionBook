exports.create = function(_options) {
	var image_datas = require('model/fashionbook').getImagesByCategory({
		key : _options.key,
		value : _options['value_of_key']
	});
	var self = Titanium.UI.createWindow({
		fullscreen : true,
		navBarHidden : false,
		backgroundColor : 'black'
	});
	self.container = Ti.UI.createView();
	self.add(self.container);
	var images_of_gallery = [];
	var total = image_datas.length;
	for (var i = 0; i < total; i++) {
		if (_options.max && i > _options.max)
			break;
		images_of_gallery.push(image_datas[i].url);
	}
	self.zoomview = Ti.App.TouchGallery.createTouchGallery({
		images : images_of_gallery,
		currentPage : _options.index
	});
	self.container.add(self.zoomview);

	return self;
};
