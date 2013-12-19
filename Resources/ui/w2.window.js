exports.create = function(_key, _value) {
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
	setTimeout(function() {
		var image_datas = require('model/fashionbook').getImagesByCategory({
			key : _key,
			value : _value
		});
		var images = [[], []];
		for (var i = 0, len = image_datas.length; i < len; i++) {
			images[i % 2].push(image_datas[i]);
		}
		for (var c = 0; c < 2; c++) {
			cols[c] = Ti.UI.createView({
				width : '49%',
				left : c * 5,
				height : Ti.UI.SIZE
			});
			self.container.add(cols[c]);
			require('./gallerylistview.widget').create(images[c]);
			cols[c].addEventListener('click', function(e) {
				require('ui/full.window').create({
					"index" : e.source.myindex,
					"key" : _key,
					"value_of_key" : _value
				}).open();
			});
		}

	}, 100);
	return self;
};
