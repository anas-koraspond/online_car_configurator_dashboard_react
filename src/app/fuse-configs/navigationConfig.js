const navigationConfig = [{
   'id': 'applications',
   'title': 'Options',
   'type': 'group',
   'icon': 'apps',
   'children': [{
      'id': 'vehicles',
      'title': 'Vehicles',
      'type': 'item',
      'icon': 'commute',
      'url': '/vehicles'
   },
   {
      'id': 'wheels',
      'title': 'Wheels',
      'type': 'item',
      'icon': 'camera',
      'url': '/wheels'
   },
   {
      'id': 'tires',
      'title': 'Tires',
      'type': 'item',
      'icon': 'album',
      'url': '/tires'
   },
   {
      'id': 'suspensions',
      'title': 'Suspensions',
      'type': 'item',
      'icon': 'all_inbox',
      'url': '/suspensions'
   },
   {
      'id': 'shocks',
      'title': 'Shocks',
      'type': 'item',
      'icon': 'confirmation_number',
      'url': '/shocks'
   },
   {
      'id': 'frontbumpers',
      'title': 'Front Bumpers',
      'type': 'item',
      'icon': 'credit_card',
      'url': '/frontbumpers'
   },
   {
      'id': 'rearbumpers',
      'title': 'Rear Bumpers',
      'type': 'item',
      'icon': 'call_to_action',
      'url': '/rearbumpers'
   },
   {
      'id': 'fenders',
      'title': 'Fenders',
      'type': 'item',
      'icon': 'cast_connected',
      'url': '/fenders'
   },
   {
      'id': 'grilles',
      'title': 'Grilles',
      'type': 'item',
      'icon': 'account_balance',
      'url': '/grilles'
   },
   {
      'id': 'headlights',
      'title': 'Headlights',
      'type': 'item',
      'icon': 'highlight',
      'url': '/headlights'
   },
   {
      'id': 'hoods',
      'title': 'Hoods',
      'type': 'item',
      'icon': 'table_chart',
      'url': '/hoods'
   },
   {
      'id': 'bedcovers',
      'title': 'Bed Covers',
      'type': 'item',
      'icon': 'calendar_today',
      'url': '/bedcovers'
   },
   {
      'id': 'bedaccessories',
      'title': 'Bed Accessories',
      'type': 'item',
      'icon': 'event_note',
      'url': '/bedaccessories'
   },
   {
      'id': 'additionallights',
      'title': 'Additional Lights',
      'type': 'item',
      'icon': 'blur_circular',
      'url': '/additionallights'
   },
   {
      'id': 'hitchs',
      'title': 'Hitchs',
      'type': 'item',
      'icon': 'event_seat',
      'url': '/hitchs'
   }],
},
{
   'type': 'divider',
   'id'  : 'divider-2'
},
{
   'id': 'settings',
   'title': 'Settings',
   'type': 'group',
   'icon': 'apps',
   'children': [{
      'id': 'logos',
      'title': 'Logos',
      'type': 'item',
      'icon': 'photo_library',
      'url': '/logos'
   }]
}];

export default navigationConfig;