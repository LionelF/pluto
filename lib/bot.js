var request   = require('request'),
  Emitter     = require('events').EventEmitter,
  Buffer      = require('buffer').Buffer;


var Bot = function(config) {
	this.config = config;
};

// I need to be an Emitter
Bot.prototype = Object.create(Emitter.prototype);


/**
 * Listening the flow stream for new user messages
*/
Bot.prototype.listen = function() {
	var self = this;

  request
  	.get('https://stream.flowdock.com/flows/'+ this.config.org +'/' + this.config.flow, {
      'auth': {
      	'user': this.config.userToken
    	}
    })
    .on('data', function(data) {
    	if(data.length) {
    		var dataStr = data.toString('utf8').trim();
        console.log(dataStr);
        if (dataStr.length) {
    			var dataObj = JSON.parse(dataStr);
  				if (dataObj.event == 'message') {
            var emitType = "message";
          }
          else if(dataObj.event == 'comment') {
            var emitType = "comment";
          }

          self.emit(emitType, dataObj);
        }
    	}
    });

  return this;
};

/**
 * Sending messages to the flow
 * @param {string} message
 * @param {array} tags : needed to send response back to the thread
*/
Bot.prototype.send = function(message, tags) {
  var messageObject = {
    'content':            message,
    'external_user_name': this.config.botName,
    'tags':               tags || []
  };
  var messageString = JSON.stringify(messageObject);

  console.log('sending message: ' + message);
  request
    .post({
      'url':  'https://api.flowdock.com/messages/chat/' + this.config.apiToken,
      'body': messageString,
      'encoding': 'utf8',
      'headers':   {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(messageString, 'utf8'),
        'Accept':         'application/json'
      }
    })
    .on('data', function(data) {
      console.log('send feedback', data.toString());
    });

  return this;
};

module.exports = Bot;