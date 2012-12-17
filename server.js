var irc = require("irc"), 
    server= "irc.fasterize.com",
    botName = "fastbot";

var config = {
    //port: 6667,
    //secure: true,
    selfSigned: true,
    debug: true,
    showErrors: true,
    channels:['#Fast', '#support'],
    certExpired: true
    };


var admins = ['david','stef','abarre'];
var chans = {};

var bot = new irc.Client(server, botName, config);
bot.send('PASS fast');

bot.on('registered', function(msg) {
  bot.say('#Fast','hello, my name is fastbot ;-)');
});

bot.on("message", function(from, to, text, message) {
  //console.log(message);
  var chan = message.args[0];
  if (chan === '#support' && !isAdminPresentIn(chan) ) {
    bot.say('#Fast', "Someone spoke on the support chan !")
  }
  bot.say('#Fast', "¿Que?");
});

bot.on('names', function (channel, nicks) {
  chans[channel] = {};
  chans[channel].users = Object.keys(nicks);
});

bot.on('error', function (err) {
  console.log(err);
});

function isAdminPresentIn(chan) {
  return chans[chan].users.some(function(user){
    return admins.indexOf(user) !== -1;
  });
}
