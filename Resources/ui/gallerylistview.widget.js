exports.create = function(_args) {
	var image_items = _args.images;
	var listviewitems = [];
	for (var i = 0, len = image_items.length; i < len; i++) {
		listviewitems.push({
			template : 'gallery',
			photo : {
				image : image_items[i].url
			},
			properties : {
				allowsSelection : false,
				itemId : image_items[i].ndx,
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		});
	}
	var widget = Ti.UI.createListView({
		templates : {
			'gallery' : {
				properties : {
					width : '100%',
				},
				childTemplates : [{
					type : 'Ti.UI.ImageView',
					bindId : 'photo',
					properties : {
						bottom : '5dp',
						width : Ti.UI.FILL,
						defaultImage : '/assets/dummy.png'
					}
				}]
			}
		},
		defaultItemTemplate : 'gallery',
		sections : [Ti.UI.createListSection({
			items : listviewitems
		})]
	});
	widget.addEventListener('itemclick', function(_e) {
		var ndx = _e.itemId;
		require('ui/w3.window').create({
			"index" : ndx,
			"key" : _args.key,
			"value_of_key" : _args.value
		}).open();

	});
	return widget;
};
