var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// app.get('/',function(req,res){
//   res.sendFile(__dirname +'/app/index.html',{root:'../'});
// });

app.use(express.static('app'));
app.use('/bower_components',express.static('bower_components'));
server.listen(80);

io.on('connection',function(socket){
  socket.emit('messages',[{sender:"Jack Burton",content:{text:"Everybody relax, I'm here."},ts:0}]);
  socket.on('new-message', function (data) {
    console.log('new message',data);
  });
})
