var util = require("util");
/**
 * @constructor
 */
var Command = function(config) {
  this.matcher = new RegExp(config.matcher, "i");//
};

/**
 * Evalutate posted messages to see if we have something to do!
 * @param {string} message
*/
Command.prototype.exec = function(message) {
  this.message = message;
  var match = this.matcher.exec();

  return match;
}

module.exports = Command;