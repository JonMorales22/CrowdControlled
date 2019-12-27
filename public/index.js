import PoopClient from "./Client.js"

var client = new PoopClient();
var button = document.querySelector('#test');
var connectButton = document.querySelector('#connect');
var form = document.querySelector("#channelname")

button.onclick = function() {
	playC4();
}

connectButton.onclick = function(e) {
    console.log(form.value);
    client.setChannel(form.value);
    client.connectPoop();
}

function playC4() {
	audio.playSound("c4");
}

function playG4() {
	audio.playSound("g4");
}