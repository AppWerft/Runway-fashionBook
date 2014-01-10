exports.create = function(_args) {
	function getImage(_callback) {
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				_callback(this.responseData);
			},
			onerror : function() {
				console.log(this.error + ' ' + _args.image);
			}
		});
		xhr.open('GET', _args.image);
		console.log( 'URL: ' + _args.image);
		xhr.send();
	}

	var self = require('vendor/pathmenu').createMenu({
		buttonImage : '/assets/share.png',
		radius : 200,
		iconList : [{
			image : '/assets/star.png',
			id : 'star'
		}, {
			image : '/assets/iphone.png',
			id : 'wallpaper'
		}, {
			image : '/assets/facebook.png',
			id : 'facebook'
		}]
	});
	console.log('Info: Path menue created ' + _args);
	self.initMenu();
	self.addEventListener('iconClick', function(e) {
		switch (e.id) {
			case 'wallpaper' :
				getImage(function(imageblob) {
					console.log('Blob='+imageblob);
					/*Ti.UI.createNotification({
					 message : 'Photo set as wallpaper of your ' + Ti.Platform.getModel()
					 }).show();*/
					try {
						Ti.Media.Android.setSystemWallpaper(imageblob, true);
					} catch(E) {
						console.log('Error: cannot set wallpaper ' + E);
					}
					self.resetMenu();
				});

				break;
			case	  'save' :
				getImage(function(imageblob) {
					f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "runway	.jpg");
					f.write(image);
					Ti.UI.createNotification({
						message : 'Photo saved'
					}).show();
					self.resetMenu();
				});
				break;
			case  'facebook' :
				require('ui/facebook.widget').post({
					image : _args.image
				});
				break;
			case 'star' :
				var ratingbar = require("titutorial.ratingbar");
				var ratingBar = ratingbar.createRatingBar({
					top : 50,
					left : 15,
					rating : 2,
					stars : 6,
					stepSize : 1.5,
					isIndicator : false
				});
				_args.parent.add(ratingBar);
				break;
		}
	});
	self.resetMenu = function() {

		setTimeout(function() {
			self.initMenu();
		}, 100);
	};
	return self;
};
