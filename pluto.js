var configs     = require('./config'),
  Bot           = require('./lib/bot'),
  JiraCommand   = require('./lib/commands/jira-command'),
  SoCommand     = require('./lib/commands/so-command'),
  request       = require('request'),
  tags          = "";

// Mode DEBUG
  request.debug = true;

// get which config to use
var configKey = process.argv[2];

if (configKey === undefined || !configs.hasOwnProperty(configKey)) {
  throw 'Please provide a valid config profile';
}
var config = configs[configKey];

//Authentification sur l'API Flowdock
var baseUrl = 'https://' + config.userToken + ':whatever@api.flowdock.com/flows/' + config.org + '/' + config.flow;

// request
//   .get(baseUrl)
//   .on('response', function() {
//     console.log("connected");
//   });

// Commande Jira à traiter
var jira = new JiraCommand(config);
jira
  .on("match", function(match) {
    console.log(">>>> Message received");
    jira.connect(match);
  })
  .on("message", function(message) {
    console.log(">>> Jira response : " + message);
  })
  .exec("dgp-8280");
  // .on("error", function(err) {
  //   console.log(">>>>> error : "+err);
  // });

// Commandes so qque chose
//var so = new SoCommand();

// Lancement du BOT
// var bot = new Bot(config);
// bot
//   .listen()
//   .send(config.welcomeMessage)
//   .on('message', function(message) {
//     console.log(">>>>> Message received");
//     var result = so.exec(message.content);
//     if(result !=  false) {
//       // send answer to the chat, beware of the loop!
//       bot.send(result);
//     }
//   })
//   .on('comment', function(comment) {
//     var result = so.exec(comment.content.text);
//     if(result !=  false) {
//       // send answer to the chat, beware of the loop!
//       bot.send(result, comment.tags);
//     }
//   });