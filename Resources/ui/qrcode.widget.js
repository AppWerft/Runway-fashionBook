exports.start = function(_args) {
	var Barcode = require('ti.barcode');
	Barcode.allowRotation = true;
	Barcode.displayedMessage = '';
	Barcode.useLED = true;
	var overlay = Ti.UI.createView({
		backgroundColor : 'transparent',
	});
	overlay.message = Ti.UI.createView({
		backgroundColor : 'black',
		bottom : 0,
		height : '50dp'
	});
	overlay.message.add(Ti.UI.createImageView({
		left : 0,
		width : '24dp',
		height : '24dp',
		image : '/assets/qr.png'
	}));
	overlay.add(overlay.message);
	var cancelButton = Ti.UI.createButton({
		title : 'Cancel',
		textAlign : 'center',
		color : '#000',
		backgroundColor : '#fff',
		font : {
			fontSize : '18dp'
		},
		width : '220dp',
		height : '36dp',
		top : '10dp'
	});
	cancelButton.addEventListener('click', function() {
		Barcode.cancel();
	});
	overlay.add(cancelButton);
	Barcode.capture({
		animate : true,
		overlay : overlay,
		showCancel : false,
		showRectangle : true,
		keepOpen : false
	});
	Barcode.addEventListener('cancel', function(e) {
		Barcode.cancel();
	});
	Barcode.addEventListener('success', function(e) {
		Ti.API.info('Success called with barcode: ' + e.result);
		_args.onsuccess && _args.onsuccess(e.result);
		Barcode.cancel();
	});
};
