var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('app'));
app.use('/bower_components',express.static('bower_components'));
server.listen(80);

var messages = [{
  sender:"Jack Burton",
  content:{text:"Everybody relax, I'm here."},
  ts:0
},{
  sender:"Jake Gittes",
  content:{text:"You're dumber than you think I think you are."},
  ts:100
},{
  sender:"Zachariah Rigby",
  content:{text:"You think I'm not serious just because I carry a rabbit?"},
  ts:100
}];

io.on('connection',function(socket){
  console.info("User connected");
  socket.emit('messages',messages);
  socket.on('new-message', function (data) {
    console.log('New Message',data.content.text);
    messages.push(data);
    io.sockets.emit('messages',messages);
  });
})

console.log("Server listening on port 80");
