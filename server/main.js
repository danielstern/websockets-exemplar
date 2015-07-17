var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('app'));
app.use('/bower_components',express.static('bower_components'));
server.listen(80);

var messages = [{
  userId:1,
  userName:"Asha Greyjoy",
  content:{
    text:"The stone tree of the Stonetrees.",
    link:"http://awoiaf.westeros.org/index.php/House_Stonetree"
    /*AFFC : 227 */
  },
  likedBy:[1],
  ts:Date.now() - 10000
},{
  userId:2,
  userName:"Arya Stark",
  content:{
    text:"We'll come see this inn.",
    link:"http://gameofthrones.wikia.com/wiki/Inn_at_the_Crossroads"
  },
  likedBy:[2,3],
  ts:Date.now() - 100000
},{
  userId:3,
  userName:"Cersei Lannister",
  content:{
    text:"Her scheming forced this on me.",
    link:"http://gameofthrones.wikia.com/wiki/Margaery_Tyrell"
  },
  likedBy:[],
  ts:Date.now() - 1000000
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
