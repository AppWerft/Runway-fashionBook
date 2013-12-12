exports.create = function() {
	require('ui/intro.window').create(function(parent_window) {
		require('model/fashionbook').init({
			onerror : function() {
				alert('Probleme bei der Datenspiegelung. Bitte App nochmals starten.');
				parent_window.close();
			},
			onload : function(_allImages) {
				var imagesinScrollableView = [];
				var total = _allImages.length;
				for (var i = 0; i < total; i++) {
					imagesinScrollableView.push(_allImages[i].url);
				}
				var scrollableView = Ti.App.TouchGallery.createTouchGallery({
					images : imagesinScrollableView,
					width : Ti.UI.FILL,
					height : Ti.UI.FILL
				});
				parent_window.add(scrollableView);
//				scrollableView.bottombar = require('ui/bottombar.widget').create();
				parent_window.backgroundImage = '';
				parent_window.backgroundColor = '#111';
				setTimeout(function() {
					parent_window.locked = false;
				}, 5000);
//				scrollableView.add(scrollableView.bottombar);
				scrollableView.addEventListener('singletap', function(_e) {
					var image = _images[_e.currentView];
					require('ui/dialog.widget').create(image);
				});

				Ti.Android && Ti.UI.createNotification({
					message : total + ' fashion pictures received'
				}).show();
			}
		});

		parent_window.addEventListener('androidback', function() {
			if (parent_window.locked == true)
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
					parent_window.close();
					return true;
				}
			});
			dialog.show();
		});
	});
};
