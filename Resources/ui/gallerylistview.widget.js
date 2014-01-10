exports.create = function(_args) {
	var listviewitems = [];
	var screen_width = Ti.Platform.displayCaps.platformWidth;
	var max = (screen_width >800) ? null : 7;
	for (var i = 0, len = _args.images.length; i < len; i++) {
		if (max && i>max) break;
		listviewitems.push({
			template : 'gallery',
			photo : {
				image : (screen_width > 800) ? _args.images[i].url : _args.images[i].lowurl
			},
			properties : {
				allowsSelection : false,
				itemId : _args.images[i].ndx,
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
	console.log('Info: ' + (Ti.Platform.availableMemory / 1000).toFixed(1) + ' kBytes <--------');

	widget.addEventListener('itemclick', function(_e) {
		var ndx = _e.itemId;
		require('ui/w3.window').create({
			"index" : ndx,
			"key" : _args.key,
			"max" : max,
			"value_of_key" : _args.value
		}).open();

	});
	return widget;
};
