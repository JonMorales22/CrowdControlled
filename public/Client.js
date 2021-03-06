import tmi from 'tmi.js';
import { eventManager } from './EventManager';

//this class basically handles state for twitch chat client
//if a user tries to connect to multiple chats it will throw an error 
export default class PoopClient {
	setChannel(name) {
		if(!name)
			throw "Cannot set channel name to null or empty.";
		
		if(isConnected)
			throw "Cannot set channel, disconnect first!";

		options.channels = [name];
		//console.log(options.channels);
	}

	async connectPoop() {
		console.log(options);
		if(isConnected) 
			throw `Already connected to ${options.channels[0]}!!`;
		
		if(options.channels.length < 1)
			throw `Cannot connect! No channel specified in options`			

		client = new tmi.Client(options);
		
		await client.connect()
		isConnected=true;

		client.on('message', (channel, tags, message, self) => {
			eventManager.emitMessageReceivedEvent(message);
		});
	}

	async disconnectPoop() {
		if(!isConnected)
			throw "No connection is open!";
		
		await client.disconnect();
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
	//these two idnetity fields left undefined b/c we don't need them apparently
	//previosuly I had oath token present here and in the git history, but I created a new one so we should be SAFU
	identity: {
		username: undefined,
		password: undefined
	},
	channels: []
}
 
var client = new tmi.Client();