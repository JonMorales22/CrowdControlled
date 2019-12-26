import Audio from './Audio.js';

var audio = new Audio();
var io = require('socket.io-client');
var tmi = require('tmi.js');
var audioCtx = new window.AudioContext;

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: 'johnnycolision',
		password: 'oauth:6kxk06z7ogetovam07h1aixkz3btjl'
	},
	channels: [ 'c9sneaky' ]
});
client.connect();
client.on('message', (channel, tags, message, self) => {
	if(self) return;
  if(message.includes('KEKW'))
    audio.playSound();
});

var button = document.querySelector('#test');

button.onclick = function() {
  console.log('ass');
  audio.playSound();
}