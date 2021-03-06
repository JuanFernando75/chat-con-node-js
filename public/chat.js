//make connection
//var socket = io.connect('http://localhost:6001');
var socket = io();

//query dom
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var send = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//emit events
send.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

//listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML +=  "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' está escribiendo...</em></p>';
});
