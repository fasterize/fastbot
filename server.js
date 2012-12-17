var irc = require("irc"), 
    server= "irc.fasterize.com",
    botName = "fastbot";

var config = {
    //port: 6667,
    //secure: true,
    selfSigned: true,
    debug: true,
    showErrors: true,
    channels:['#Fast fast'],
    certExpired: true
    };

var bot = new irc.Client(server, botName, config);
bot.send('PASS fast');

bot.on('registered', function(msg) {
  bot.say('#Fast','hello, my name is fastbot ;-)');
});

bot.on("message", function(from, to, text, message) {
  bot.say('#Fast', "¿Que?");
});

bot.on('error', function (err) {
  console.log(err);
});

