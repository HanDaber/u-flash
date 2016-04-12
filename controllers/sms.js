var SMS = require('../models/SMS');
var dpd = require('dpd-js-sdk')( process.env.BE_URI );
dpd.trackers = dpd("/trackers");

function prettyPrint( object ){
  return JSON.stringify( object, null, 4 )
}
/**
 * Split into declaration and initialization for better startup performance.
 */
var twilio;
twilio = require('twilio')( process.env.TWILIO_SID, process.env.TWILIO_TOKEN )

/**
 * GET /sms
 * List of SMSs.
 */
exports.getSms = function( req, res ){
  SMS.find({}, function( err, docs ){
    // docs is an array
    if( err ){ res.send( err ) }
    else { 
      var str = prettyPrint( docs )
      res.send('<pre>'+str+'</pre>') 
    }
  });
};

/**
 * POST /sms
 * Receive url from Twilio.
 */
exports.postSms = function( req, res, next ){
  res.header('Content-Type', 'text/xml');

  var body = req.param('Body').trim();
  console.log( body )
  var to = req.param('To').replace('+', '');
  var from = req.param('From').replace('+', '');
  console.log( from )

  dpd.trackers.get({'Phone': {'phoneNumber': from } }, function( results, err ){
    if( err ) console.error(err)
    else {
      if( results.length < 1 ){}
      else {
        var tracker = results[ 0 ],
          log = tracker.Log || []

        log.push( body )

        tracker.Log = log
        
        dpd.trackers.put( tracker.id, tracker, function( result, error ){
          if( error ) console.error(error)
          else {
            console.log( result )
          }
        });
      }
      console.dir( results )
    }
  });

  // req.assert('number', 'Phone number is required.').notEmpty();
  // req.assert('message', 'Message cannot be blank.').notEmpty();

  // var errors = req.validationErrors();

  // if (errors) {
  //   req.flash('errors', errors);
  //   return res.redirect('/sms');
  // }

  var sms = new SMS({
    phoneNumber: from,
    messages: [ body ]
  });
  // SMS.findOne({ phoneNumber: from }, function( err, existingSMS ){
  //   if( existingSMS ){
  //     var msgs = existingSMS.messages
  //     msgs.push( body )
  //     existingSMS.messages = msgs
  //     existingSMS.save(function( err ){
  //       // if( err ){ return next(err) }
  //     });
  //   }
  //   sms.save(function( err) {
  //     // if( err ){ return next(err) }
  //   });
  // });

  var message = {
    to: from,
    from: '19256607165',
    body: 'Hey, "'+body+'" right back atcha, buddy!'
  };
  // twilio.sendMessage(message, function( err, responseData) {
  //   if (err) {
  //     // return next(err.message);
  //     console.log(err)
  //   } else {
  //     console.log('done.\n')
  //   }
  //   // req.flash('success', { msg: 'Text sent to ' + responseData.to + '.'});
  //   // res.redirect('/sms');
  // });
  res.end()
  // return next(null)
};
