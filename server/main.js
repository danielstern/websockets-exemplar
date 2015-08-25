var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//app.get('/',function(req,res){
//    res.send("Hello world.");
//    console.log("Something connected to express.");
//});

app.use(express.static('app'));

io.on('connection',function(socket){
    console.log("Something connected to Socket.io");
    socket.emit("messages",["Hello","Hi there","How are you?"]);
})

server.listen(80);