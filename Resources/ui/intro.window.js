const W = Ti.Platform.displayCaps.platformWidth;
H = W * 0.9 * 170 / 514;
exports.create = function(_callback) {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		locked : true,
		backgroundColor : 'white',
		exitOnClose : true
	});
	if (Ti.Android) {
		self.addEventListener('open', function() {
			console.log('Info: start menu');
			var activity = self.getActivity();
			var actionBar = activity.actionBar;
			console.log(actionBar);
			if (actionBar) {
				activity.onCreateOptionsMenu = function(e) {
					console.log('Start menu');
					e.menu.add({
						title : "Sharing",
						icon : '/assets/share.png',
						showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
						itemId : 0
					}).addEventListener("click", function() {
						var intent = Ti.Android.createIntent({
							action : Ti.Android.ACTION_SEND,
							type : "text/plain"
						});
						intent.putExtra(Ti.Android.EXTRA_TEXT, 'Some text that we want to share');
						intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
						Ti.Android.currentActivity.startActivity(intent);
					});
					e.menu.add({
						title : "Favorize",
						icon : '/assets/star.png',
						showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
						itemId : 1
					}).addEventListener("click", function() {
						Ti.UI.createNotification({
							message : 'This model faved'
						}).show();
					});
				};
			}
		});
	}
	var label = Ti.UI.createLabel({
		top : '20dp',
		color : 'black',
		text : 'fashionBook',
		font : {
			fontSize : '49dp',
			fontFamily : 'PoetsenOne-Regular'
		}
	});
	var intro = Ti.UI.createLabel({text:'An alle Fashion Groupies!! dieses „App“ ist für all diejenigen, die gierig sind auf neue Trends, die Anregung suchen, um einen eigenen, individuellen Stil für sich zu kreieren.\n\nEr ist als „Schlüsselloch“ gedacht, um die jungen Modehungrigen an der Welt der großen Kreation teilnehmen zu lassen, und sie zu mutigen und  gewagten Eigenkompositionen zu inspirieren.
'});
	var copyright = Ti.UI.createLabel({
		bottom : '-50dp',
		color : 'yellow',
		zIndex : 9999,
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
	//self.add(label);
	self.girlscontainer = Ti.UI.createView({
		top : '0dp',
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
	copyright.animate({
		bottom : '-60dp',
		duration : 3000
	});
	setTimeout(function() {
		_callback(self);
	}, 5000);

	//	_callback();
};
