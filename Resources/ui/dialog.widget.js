exports.create = function(_data) {
	if (_data) {
		var options = [];
	
		var keys = ['city', 'type', 'artist'];
		for (var i = 0; i < keys.length; i++)
			options.push(_data[keys[i]]);
		var opts = {
			options : options,
			title : ' … more from:'
		};
		var self = Ti.UI.createOptionDialog({
			options : options,
			title : 'more from …'
		});
		self.show();
		self.addEventListener('click', function(e) {
			if (e.index >= 0)
				require('ui/w2.window').create(keys[e.index], options[e.index],_data.season).open();
		});
	}
};
