var userId = localStorage.getItem("userId") || Math.random() * 1e12;
localStorage.setItem("userId",userId);

var socket = io.connect('http://localhost',{'forceNew': true});
socket.on('messages', function (data) {

  var html = data.sort(function(a,b){
    return a.ts - b.ts;
  }).map(function(d){
    return (`
      <div class=message>
        <div class='name'>
          ${d.userName}:
        </div>
        <a href=${d.content.link} class='message' target=blank>
          ${d.content.text}</a>
        <div class='time'>
           ${moment(d.ts).fromNow()}
        </div>
      </div>
    `)
  }).join(" ");

  messages.innerHTML = html;
  message.value = "";
  linkAddress.value = "";
});

function addMessage(e){
  var payload = {
    content:{
      text:document.getElementById("message").value,
      link:document.getElementById("linkAddress").value,
    },
    userName:document.getElementById("username").value,
    userId:userId,
    likedBy:[],
    ts:Date.now()
  };

  socket.emit("new-message",payload)
  return false;
}
