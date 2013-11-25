const BASEURL = Ti.App.Properties.getString('baseurl');

var cats = require('model/db').cats;

exports.getImagesByCategory = function(_args) {
	var bar = [], key = _args.key, value = _args.value, foo = JSON.parse(Ti.App.Properties.getString('imagecache'));
	for (var i = 0; i < foo.length; i++) {
		if (foo[i][key] == value)
			bar.push(foo[i]);
	}
	foo = null;
	return bar;
};

exports.init = function(_args) {
	if (!Ti.Network.online)
		alert('Diese App braucht das Internet.');
	var xhr = Ti.Network.createHTTPClient({
		onerror : function(e) {
			console.log('Error: XHR' + e.error);
			if (Ti.App.Properties.hasProperty('imagecache'))
				_args && _args.onload(JSON.parse(Ti.App.Properties.getString('imagecache')));
		},
		onload : function(e) {
			try {
				var images = JSON.parse(this.responseText);
			} catch(E) {
				Ti.App.Properties.removeProperty('imagecache');
				_args && _args.onerror();
				console.log('Error: no internet connection to server');
				return;
			}
			var datas = [];
			for (var i = 0; i < images.length; i++) {
				var image = images[i];
				try {
					var data = {
						city : (cats.city[image.city]) ? cats.city[image.city] : image.city,
						season : image.season,
						type : (cats.type[image.type]) ? cats.type[image.type] : image.type,
						artist : image.artist,
						agency : (cats.artist[image.artist]) ? cats.artist[image.artist].name : image.artist,
						url : BASEURL + 'images/high/' + image.file,
						lowurl : BASEURL + 'images/low/' + image.file,
						photoratio : image.ratio,
						filesize : image.filesize,
						order : image.order
					};
				} catch(E) {
					console.log(E);
				}
				datas.push(data);
			}
			Ti.App.Properties.setString('imagecache', JSON.stringify(datas));
			_args && _args.onload(datas);
		}
	});
	xhr.open('GET', BASEURL);
	console.log('Info: retrieving ' + BASEURL);
	xhr.send();
};
