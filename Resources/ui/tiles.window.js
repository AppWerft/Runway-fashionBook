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
		for (var c = 0; c < 2; c++) {
			cols[c] = Ti.UI.createScrollView({
				scrollType : 'vertical',
				width : '49%',
				left : c * 5,
				layout : 'vertical',
				height : Ti.UI.SIZE
			});
			self.container.add(cols[c]);
				cols[c].scrollTo(0, 1000);
			
			cols[c].addEventListener('click', function(e) {
				require('ui/full.window').create({
					"index" : e.source.myindex,
					"key" : _key,
					"value_of_key" : _value
				}).open();
			});
		}
		for (var i = 0; i < image_datas.length && i < 80; i++) {
			cols[i % 2].add(Ti.UI.createImageView({
				image : image_datas[i].lowurl,
				myindex : i,
				width : Ti.UI.FILL,
				height : 0.5 * Ti.Platform.displayCaps.platformWidth * image_datas[i].photoratio,
				top : '5dp'
			}));
		}
	}, 100);
	return self;
};
