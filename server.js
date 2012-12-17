// Get the lib
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

// Create the bot name
var bot = new irc.Client(server, botName, config);
bot.send('PASS fast');

bot.on('registered', function(msg) {
  bot.say('#Fast','hello, my name is fastbot ;-)');
});

// Listen for any message, PM said user when he posts
bot.addListener("message", function(from, to, text, message) {
  console.log(message);
  bot.say(from, "¿Que?");
});

bot.on('error', function (err) {
  console.log(err);
});

