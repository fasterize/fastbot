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
bot.send('PASS', 'fast');

bot.on('registered', function(msg) {
  bot.say('#Fast','hello, my name is fastbot ;-)');
});

bot.on("message#support", function(nick, text, message) {
  if (!isAdminPresentIn('#support') ) {
    bot.say('#Fast', nick + " spoke on the support chan ! It says : '" + text + "'")
  }
});
bot.on('pm', function(nick, text, message) {
  bot.say(nick, "¿Que?");
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
