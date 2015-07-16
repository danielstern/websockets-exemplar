var express = require('express');
var io = require('socket.io');

var app = new express();
app.get('/',function(req,res){
  res.send("Hello, world!");
});
app.listen(80);
