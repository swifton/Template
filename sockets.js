var url = "ws://" + location.host + "/socket";
var socket;
window.onload = function() {
	socket = new WebSocket(url);
	socket.onmessage = function(event) {handle_socket_message(event);}
}

