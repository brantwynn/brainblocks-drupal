/**
 * @file
 * Javascript behaviors for activating the XRB block.
 */

function whenAvailable(name, callback) {
  var interval = 10; // ms
  window.setTimeout(function() {
    if (window[name]) {
      callback(window[name]);
    } else {
      window.setTimeout(arguments.callee, interval);
    }
  }, interval);
}

(function($, drupalSettings) {
  var destination = drupalSettings.brainblocks.xrb_address
  var currency = drupalSettings.brainblocks.currency
  var amount = drupalSettings.brainblocks.amount
  whenAvailable("brainblocks", function(t) {
    if ($('#raiblocks-button').length) {
      // Render the RaiBlocks button
      brainblocks.Button.render({
        // Pass in payment options
        payment: {
          destination: destination,
          currency: currency,
          amount: amount
        },
        // Handle successful payments
        onPayment: function(data) {
          console.log('Payment successful!', data.token);
        }
      }, '#raiblocks-button');
    }
  });
})(jQuery, drupalSettings);
