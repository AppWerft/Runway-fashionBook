const W = Ti.Platform.displayCaps.platformWidth;
H = W * 0.9 * 170 / 514;
exports.create = function(_callback) {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		navBarHidden : true,
		locked : true,
		backgroundColor : 'white',
		exitOnClose : true
	});

	var label = Ti.UI.createLabel({
		top : '30dp',
		color : 'black',
		text : 'fashionBook',
		font : {
			fontSize : '55dp',
			fontFamily : 'PoetsenOne-Regular'
		}
	});
	var copyright = Ti.UI.createLabel({
		bottom : '-50dp',
		color : 'black',
		textAlign : 'center',
		text : 'All rights by\nPHOTOSTUDIO AXEL SIEBMANN',
		font : {
			fontSize : '18dp',
			fontFamily : 'PoetsenOne-Regular'
		}
	});
	copyright.animate({
		bottom : 0,
		duration : 2000
	});
	self.add(label);
	self.girlscontainer = Ti.UI.createView({
		top : '100dp',
		height : Ti.UI.FILL
	});
	var img1 = Ti.UI.createImageView({
		image : '/assets/intro/1.png',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		opacity : 0
	});
	self.girlscontainer.add(img1);
	img1.animate({
		opacity : 1,
		duration : 3000
	});

	self.add(self.girlscontainer);
	self.add(copyright);
	self.open();
	setTimeout(function() {
		if (Ti.App.Properties.hasProperty('auth'))
			_callback(self);
		else {
			var LoginModule = require('ui/logindialog.widget');
			self.login = new LoginModule();
			self.login.show();
			self.login.addEventListener('success', function() {
				_callback(self);
			});
			self.login.addEventListener('error', function() {
				self.close();
			});
		}
	}, 2000);
	//	_callback();
};
