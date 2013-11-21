exports.post = function(_args) {
	function post2wall(e) {
		if (!e.success)
			return;
		console.log('Info: user is logged in into facebook, start retrieving image ' + _args.image);
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				console.log('Info: got image, length: ' + this.responseData);
				Ti.Android && Ti.UI.createNotification({
					message : 'Start posting to facebook.',
					duration : Ti.UI.NOTIFICATION_DURATION_SHORT
				}).show();
				var data = {
					message : "TEST MESSAGE",
					caption : "TEST CAPTION",
					picture : this.responseData
				};
				console.log('Info: try to post this data: ' + JSON.stringify(data));
				fb.requestWithGraphPath('me/photos', data, 'POST', function(e) {
					console.log('Info: facebook answer:' + JSON.stringify(e));
					_args.onfinish && _args.onfinish();
				});
			}
		});
		xhr.open('GET', _args.image);
		xhr.send();
	};
	/* starting of module */
	var fb = require('facebook');
	fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
	fb.permissions = ['publish_stream'];
	fb.forceDialogAuth = true;
	console.log('Info: test if facebook object is valide: ' + fb.authorize);
	if (fb.loggedIn === false) {
		fb.authorize();
		fb.addEventListener('login', post2wall);
	} else
		post2wall({
			success : true
		});
};
