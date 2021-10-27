var express  = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(6001, function(){console.log("Puerto 6001");});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log("Si se conecto con el socket", socket.id);

    //handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
