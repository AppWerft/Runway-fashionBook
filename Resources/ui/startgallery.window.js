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
					bottom : '40dp'
				});
				parent_window.add(scrollableView);
				bottombar = require('ui/bottombar.widget').create();
				parent_window.add(bottombar);
				bottombar.fireEvent('setText', {
					text : _allImages[0].agency
				});
				parent_window.backgroundImage = '';
				parent_window.backgroundColor = '#111';
				setTimeout(function() {
					parent_window.locked = false;
				}, 200);
				scrollableView.addEventListener('scroll', function(_e) {
					bottombar.fireEvent('setText', {
						text : _allImages[_e.currentPage].agency
					});
				});
				scrollableView.addEventListener('singletap', function(_e) {
					// bug in docu!  ulr is index
					require('ui/dialog.widget').create(_allImages[_e.url]);
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
					Ti.Android.currentActivity.finsh();
					return true;
				}
			});
			dialog.show();
		});
	});
};
