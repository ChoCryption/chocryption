var stego = require('./lib/steg.js');

//Simple functional testing
stego.encode('cho.png', 'testmessage', 'output7');

stego.decode('output7.png', function(err, message) {
  console.log(message);
  return message;
});

