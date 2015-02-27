var util      = require("util"),
    request   = require("request"),
    EventEmitter   = require("events").EventEmitter;

/**
 * @constructor
 */
var JiraCommand = function (config) {

  this.username = config.jiraUser;
  this.password = config.jiraPass;
  this.matcher = new RegExp('DGP[SM]{0,2}-[0-9]{4}', "i");
}

JiraCommand.prototype = Object.create(EventEmitter.prototype);

/**
 * Evalutate posted messages to see if we have something to do!
 * @param {string} message
*/
JiraCommand.prototype.exec = function(content) {
  var match = this.matcher.exec(content);
  var self = this;
  
  if(match != null) {
    console.log(">>> Send match : %s", match);
    self.emit("match", match);
  }
  else {
    console.log(">>> NO match : %s", match);
  }
  
  return this;
}

JiraCommand.prototype.emitTest = function() {
  var self = this;
  console.log(">> testing emit event");
  self.emit("test", "test");

  return this;
}

JiraCommand.prototype.connect = function(issueNumber) {
  var data = '';
  var self = this;

  request
    .get("https://jira.collaboratif-courrier.fr/jira/rest/api/2/issue/"+issueNumber, {
      'auth': {
        'user': this.username,
        'password': this.password
      },
      'headers':   {
        'Content-Type':   'application/json'
      }
    })
    .on('data', function(chunk) {
      data += chunk;
    })
    .on('end', function() {
      if(data.length) {
        var dataStr = data.toString('utf8').trim();
        if (dataStr.length) {
          var dataObj = JSON.parse(dataStr);
          console.log(">>>>> Emitting");
          self.emit("message", self.buildContent(dataObj));
        }
      }
    });

    return this;
};

JiraCommand.prototype.send = function(config) {
  //TODO : envoi equête à l'API
};

JiraCommand.prototype.buildContent = function(contentObj) {
  //TODO : mise en forme contenu
  var contentStr = contentObj.key + ' : ' + contentObj.fields.summary;

  return contentStr;

};

module.exports = JiraCommand;