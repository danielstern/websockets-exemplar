var socket = io.connect('http://localhost',{'forceNew': true});
socket.on('messages', function (data) {

  var html = data.sort(function(a,b){
    return a.ts - b.ts;
  }).map(function(d){
    return (`
      <div class=message>
        <span class='name'>
          ${d.sender}:
        </span>
        <span class='message'>
          ${d.content.text}
        </span>
        <span class='time'>
          ${moment(d.ts).fromNow()}
        </span>
      </div>
    `)
  }).join(" ");

  messages.innerHTML = html;
  message.value = "";

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
