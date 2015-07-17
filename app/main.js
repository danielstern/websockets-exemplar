var socket = io.connect('http://localhost',{'forceNew': true});
socket.on('messages', function (data) {

  var html = `${data.map(function(d){
    return `<div>${d.sender} : ${d.content.text}</div>`
  }).join(" ")}`;

  messages.innerHTML = html;

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
