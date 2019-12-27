import Audio from './Audio.js';
import tmi from 'tmi.js';

var defaultChannel = "neytiri"
var audio = new Audio();
var isConnected = false;
var options = {
	options: { debug: false },
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
 
var poopClient = new tmi.Client();

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
		if(!name)
			throw "Cannot set channel name to null or empty."
		
		options.channels = [name];
		console.log(options.channels);
	}

	async connectPoop() {
		console.log(options);
		if(isConnected) 
			throw `Already connected to ${options.channels[0]}!!`;
		
		if(options.channels.length < 1)
			this.setChannel(defaultChannel)
				

		poopClient = new tmi.Client(options);
		
		await poopClient.connect()
		isConnected=true;
		poopClient.on('message', (channel, tags, message, self) => this.handleMessageEvent(message))
	}

	handleMessageEvent(message) {
		console.log(message);
		var message = message.toLowerCase();

		if(message.includes("kekw")) {
			audio.playSound("c4");
			return;
		}
		if(message.includes("pog")) {
			audio.playSound("e4");	
			return;
		}
		if(message.includes("lul")) {
			audio.playSound("g4");
			return;
		}
		if(message.includes(":)")) {
			audio.playSound("d4");
			return;
		}
	}

	async disconnectPoop() {
		if(!isConnected)
			throw "No connection is open!";
		
		await poopClient.disconnect();
		isConnected=false;
		console.log(`Disconnected from ${options.channels[0]}`)
	}

}

// connectButton.onclick = function() {
// 	client.disconnect().then(console.log("disconnected"));
// }

