var express  = require('express');
var socket = require('socket.io');
var PORT = process.env.PORT || 6001;

//App setup
var app = express();
var server = app.listen(PORT, function(){console.log("Puerto " + PORT);});

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
