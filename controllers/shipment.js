// var dpd = require('dpd-js-sdk')( process.env.BE_URI );
// dpd.shipments = dpd("/shipments");

/**
 * GET /shipments
 * shipments page.
 */
exports.getShipments = function(req, res) {
    res.render('home', {
      title: 'Shipment '
    });
};
