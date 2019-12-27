import Audio from './Audio.js';
import tmi from 'tmi.js';

var audio = new Audio();
var isConnected = false;
var options = {
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: 'johnnycolision',
		password: 'oauth:6kxk06z7ogetovam07h1aixkz3btjl'
	},
	channels: []
}
 
var poopClient;

// client.on('message', (channel, tags, message, self) => {
// 	if(self) return;
	  
// 	if(message.includes('KEKW')) {
// 		audio.play("c4");
// 	}
// 	if(message.includes('AYAYA')) {
// 		audio.play("g4");
// 	}
// });

export default class PoopClient {
	setChannel(name) {
		options.channels = [name];
		console.log(options.channels);
	}

	connectPoop() {
		console.log(options);
		if(isConnected) { 
			throw `Already connected to ${options.channels[0]}!!`;
			return;
		}

		poopClient = new tmi.Client(options);
		
		poopClient.connect().then(() => {
			isConnected=true;
		
			poopClient.on('message', (channel, tags, message, self) => {
				if(self) return;
				
				console.log(message);
	
				if(message.includes('KEKW')) {
					audio.playSound("c4");
				}
				if(message.includes('AYAYA')) {
					audio.playSound("g4");
				}
			});
		})
	}

	disconnect() {
		if(!isConnected) throw "No connection is open!";
		
		client.disconnect.then(() => {
			isConnected = false;
			console.log(`Disconnected from ${options.channels[0]}`)
		});
	}

}

// connectButton.onclick = function() {
// 	client.disconnect().then(console.log("disconnected"));
// }

