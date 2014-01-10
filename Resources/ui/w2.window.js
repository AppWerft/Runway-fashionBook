exports.create = function(_key, _value) {
	var TiTouchGallery = require('ui/gallerylistview.widget');
	var self = Titanium.UI.createWindow({
		fullscreen : true,
		navBarHidden : true,
		backgroundColor : 'black',
		orientationModes : [Titanium.UI.PORTRAIT]
	});
	self.container = Ti.UI.createView({
		layout : 'horizontal'
	});
	self.add(self.container);
	var label = Ti.UI.createLabel({
		text : _value,
		color : 'white',
		top : '10dp',
		zIndex : 999,
		width : Ti.UI.FILL,
		textAlign : 'center',
		opacity : 0.6,
		height : Ti.UI.SIZE,
		font : {
			fontSize : '40dp',
			fontFamily : 'PoetsenOne-Regular'
		}
	});
	self.add(label);
	var cols = [];
	var image_datas = require('model/fashionbook').getImagesByCategory({
		key : _key,
		value : _value
	});
	var images = [[], []];
	for (var i = 0, len = image_datas.length; i < len; i++) {
		// save the index for linking to next view
		image_datas[i].ndx = i;
		images[i % 2].push(image_datas[i]);
	}
	// Preparing of both cols:
	for (var c = 0; c < 2; c++) {
		cols[c] = Ti.UI.createView({
			width : '49%',
			left : c * 5,
			height : Ti.UI.SIZE
		});
		// both cols put into window:
		self.container.add(cols[c]);
		cols[c].add(TiTouchGallery.create({
			images : images[c],
			key : _key,
			value : _value
		}));
	}
	return self;
};
