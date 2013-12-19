exports.create = function(image_items) {
	var widget = Ti.UI.createListView({
		templates : {
			'gallery' : require('./TEMPLATES').gallery,
		},
		defaultItemTemplate : 'gallery'
	});
	var images = [];
	for (var i = 0; i < image_items.length; i++) {
		images.push({
			template : 'gallery',
			image : {
				image : image_items[i].url
			},
			properties : {
				allowsSelection : false,
				itemId : JSON.stringify(image_items[i]),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		});
	}
	widget.setSections([Ti.UI.createListSection({
		items : images
	})]);
	return widget;
};
