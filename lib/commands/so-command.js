var util = require('util');

/**
 * @constructor
 */
function SoCommand() {
  
  this.types = {
    'jira':       'http://i.imgur.com/Zjwo4.gif',
    'shame':      'http://i.imgur.com/GVDjO.gif',
    'flag':       'http://i.imgur.com/oN1Er.gif',
    'crazy':      'http://i188.photobucket.com/albums/z284/oblongman7/Scrubs/b6488ee3.gif',
    'notme':      'http://i.imgur.com/V9MavVa.gif',
    'desperate':  'http://media.tumblr.com/tumblr_lsdhbmlL611qhjgo1.gif',
    'waiting':    'http://i.imgur.com/aJaBc.gif',
    'success':    'http://i.imgur.com/AKtqu.gif',
    'dubious':    'http://i.imgur.com/qX3nQi1.gif',
    'baddone':    'http://i.imgur.com/LaOykFc.gif',
    'incredible': 'http://i.imgur.com/D26gL.gif',
    'deploy':     'http://i1.kym-cdn.com/photos/images/original/000/234/786/bf7.gif',
    'badumtss':   'http://fuuu.us/363.png',
    'cerealguy':  'http://fuuu.us/144.png',
    'cute':       'http://fuuu.us/447.png',
    'deskflip':   'http://fuuu.us/217.png',
    'fuckyeah':   'http://fuuu.us/12.png',
    'genius':     'http://fuuu.us/292.png',
    'itssomething': 'http://fuuu.us/408.png',
    'lol':        'http://fuuu.us/176.png',
    'longneck':   'http://fuuu.us/107.png',
    'megusta':    'http://fuuu.us/35.png',
    'notbad':     'http://fuuu.us/172.png',
    'nothing':    'http://fuuu.us/230.png',
    'pokerface':  'http://fuuu.us/268.png',
    'rageguy':    'http://fuuu.us/61.png',
    'sir':        'http://fuuu.us/389.png',
    'troll':      'http://fuuu.us/86.png',
    'charles':    'http://fuuu.us/86.png',
    'true':       'http://fuuu.us/285.png',
    'win':        'http://fuuu.us/188.png',
    'likeaboss':  'http://d2tq98mqfjyz2l.cloudfront.net/image_cache/135188305038018_animate.gif'
  };

  this.matcher = new RegExp('^so\\s('+Object.keys(this.types).join('|')+')$');//
}

/**
 * Evalutate posted messages to see if we have something to do!
 * @param {string} message
*/
SoCommand.prototype.exec = function(message) {
  var match = this.matcher.exec(message);
  console.log('>>>> Match : '+ match);
  
  if(match != null)
    return this.types[match[1]];
  else 
    return false;
}


SoCommand.prototype.send = function() {
  //TODO : envoi equête à l'API
}

module.exports = SoCommand;