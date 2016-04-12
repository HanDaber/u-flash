var dpd = require('dpd-js-sdk')( process.env.BE_URI );
dpd.trackers = dpd("/trackers");

function prettyPrint( object ){
  return JSON.stringify( object, null, 4 )
}

/**
 * GET /trackers
 * Trackers page.
 */
exports.getTrackers = function(req, res) {
  // dpd.trackers.get({'userID': res.locals.user.id }, function( results, err ){
  //   if( err ) console.error(err)
  //   else {
  //     if( results.length < 1 ){
  //       res.send('<h3>No results</h3>')
  //     }
  //     else {
  //       res.send('<pre>'+prettyPrint( results )+'</pre>')
        res.render('home', {
          title: 'Your Trackers'
        });
  //     }
  //   }
  // })
};
