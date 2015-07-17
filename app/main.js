var socket = io.connect('http://localhost',{'forceNew': true});
socket.on('messages', function (data) {

  console.log(data);
  var html = "";
  data.forEach(function(d){
    html+=`<div>${d.sender} : ${d.content.text}</div>`
  });
  messages.innerHTML = html;

  //socket.emit('my other event', { my: 'data' });
});

function addMessage(e){

  var payload = {
    content:{
      text:document.getElementById("message").value,
    },
    sender:document.getElementById("username").value,
    ts:Date.now()
  };

  console.info("adding message",payload);
  socket.emit("new-message",payload)

  return false;
}
