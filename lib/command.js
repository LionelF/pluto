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
  console.log(">>> Analyse du message : "+message);
  console.log('>>>> Matcher : '+this.matcher);
  var match = this.matcher.exec(message);
  console.log('>>>> Match : '+match);
  return match;
}

module.exports = Command;