/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
	var nav = ['home', 'trackers', 'shipments'],
		resource = req.params.resource || 'home',
		title = 'shipment'

	if( resource in nav ){
		title = resource
	}

	res.render('home', {
		title: title
	});
};