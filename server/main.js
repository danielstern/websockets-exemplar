var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/',function(req,res){
  res.send("Hello, world!");
});
app.listen(80);

io.on('connection',function(socket){
  socket.emit('messages',[{sender:"Jack Burton",content:{text:"Everybody relax, I'm here."},ts:0}]);
  socket.on('new-message', function (data) {
    console.log('new message',data);
  });
})
