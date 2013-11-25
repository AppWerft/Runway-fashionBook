exports.create = function() {
	var self = Ti.UI.createView({
		bottom : 0,
		height : '60dp',
		bubbleParent : false
	});
	self.title = Ti.UI.createLabel({
		color : 'white',
		textAlign : 'center',
		text : '',
		bubbleParent : true,
		font : {
			fontSize : '26dp',
			fontFamily : 'PoetsenOne-Regular'
		}
	});
	self.add(Ti.UI.createView({
		backgroundColor : 'black',
		touchEnabled : false,
		opacity : 0.5
	}));
	self.add(Ti.UI.createImageView({
		image : '/m.png',
		width : '15dp',
		touchEnabled : false,
		right : 0,
		top : 0
	}));
	self.add(self.title);
	return self;
};
