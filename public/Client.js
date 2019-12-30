import Audio from './Audio.js';
import tmi from 'tmi.js';

//this class basically handles state for twitch chat client
//if a user tries to connect to multiple chats it will throw an error 
export default class PoopClient {
	setChannel(name) {
		if(!name)
			throw "Cannot set channel name to null or empty.";
		
		if(isConnected)
			throw "Cannot set channel, disconnect first!";

		options.channels = [name];
		console.log(options.channels);
	}

	async connectPoop(handleMessageEvent) {
		console.log(options);
		if(isConnected) 
			throw `Already connected to ${options.channels[0]}!!`;
		
		if(options.channels.length < 1)
			throw `Cannot connect! No channel specified in options`			

		poopClient = new tmi.Client(options);
		
		await poopClient.connect()
		isConnected=true;
		poopClient.on('message', (channel, tags, message, self) => handleMessageEvent(message))
	}

	async disconnectPoop() {
		if(!isConnected)
			throw "No connection is open!";
		
		await poopClient.disconnect();
		isConnected=false;
		console.log(`Disconnected from ${options.channels[0]}`)
	}
}

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