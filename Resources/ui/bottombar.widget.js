exports.create = function() {
	var self = Ti.UI.createView({
		bottom : 0,
		height : '40dp',
		bubbleParent : false
	});
	self.title = Ti.UI.createLabel({
		color : 'white',
		textAlign : 'center',
		text : '',
		bubbleParent : true,
		font : {
			fontSize : '16dp',
			fontFamily : 'PoetsenOne-Regular'
		}
	});
	self.add(Ti.UI.createView({
		backgroundColor : 'black',
		touchEnabled : false,
		opacity : 0.58
	}));
	self.add(self.title);
	self.addEventListener('setText',function(_e){
		self.title.setText(_e.text);
	});
	return self;
};
