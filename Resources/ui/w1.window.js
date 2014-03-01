exports.create = function() {
	require('ui/intro.window').create(function(self) {
		var frame = Ti.UI.createView({
			backgroundColor : 'black'
		});
		self.add(frame);
		// adding of menu:
		
		require('model/fashionbook').init({
			onerror : function() {
				alert('Probleme bei der Datenspiegelung. Bitte App nochmals starten.');
				self.close();
			},
			onload : function(_allImages) {
				///////////////////
				var images_in_touchgallery = [];
				var total = _allImages.length;
				for (var i = 0; i < total; i++) {
					images_in_touchgallery.push(_allImages[i].url);
				}
				var touchgallery = Ti.App.TouchGallery.createTouchGallery({
					images : images_in_touchgallery,
				});
				if (Ti.App.Properties.hasProperty('galpos'))
					touchgallery.setCurrentPage(Ti.App.Properties.getInt('galpos'));
				frame.add(touchgallery);
				bottombar = require('ui/bottombar.widget').create();
				frame.add(bottombar);
				bottombar.fireEvent('setText', {
					text : _allImages[0].agency
				});
				setTimeout(function() {
					self.locked = false;
				}, 200);
				touchgallery.addEventListener('scroll', function(_e) {
					bottombar.fireEvent('setText', {
						text : _allImages[_e.currentPage].agency
					});
					Ti.App.Properties.setInt('galpos', _e.currentPage);
					var modus = (_allImages[_e.currentPage].photoratio > 1) ? Ti.UI.PORTRAIT : Ti.UI.LANDSCAPE;
					self.setOrientationModes([modus]);
				});
				touchgallery.addEventListener('singletap', function(_e) {
					// bug in docu!  ulr is index
					require('ui/dialog.widget').create(_allImages[_e.url]);
				});
				self.activity.onPrepareOptionsMenu = function() {
					require('ui/dialog.widget').create(_allImages[touchgallery.currentPage]);

				};
				Ti.Android && Ti.UI.createNotification({
					message : total + ' fashion pictures received'
				}).show();
			}
		});
		
		
		
		/* Terminating of App after BackButton clicking */
		self.addEventListener('androidback', function() {
			if (self.locked == true)
				return false;
			var dialog = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['OK', 'Cancel'],
				message : 'You really want to terminate this app?',
				title : 'End'
			});
			dialog.addEventListener('click', function(e) {
				if (e.index === e.source.cancel) {
					return false; 
				} else {
					Ti.Android && Ti.UI.createNotification({
						message : 'FashionBook finished'
					}).show();
					self.close();
					setTimeout(function() {     
						Ti.Android.currentActivity.finish();
						require('bencoding.android.tools').createPlatform().exitApp();
					}, 1000);
					return true;
				}
			});
			dialog.show();
		});
	});
};
