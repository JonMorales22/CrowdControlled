import PoopClient from "./Client.js"

var client = new PoopClient();
var button = document.querySelector('#test');
var connectButton = document.querySelector('#connect');
var disconnectButton = document.querySelector('#disconnect');
var form = document.querySelector("#channelname")

button.onclick = function() {
	playC4();
}

connectButton.onclick = function(e) {
    var name = form.value;
    if(!form.value)
        name="neytiri";

    client.setChannel(name);
    client.connectPoop();
}

disconnectButton.onclick = function() {
    client.disconnectPoop();
}


function playC4() {
	audio.playSound("c4");
}

function playG4() {
	audio.playSound("g4");
}