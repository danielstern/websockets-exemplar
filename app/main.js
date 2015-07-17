
var userId = localStorage.getItem("userId") || randomId();
localStorage.setItem("userId",userId);

function randomId(){
  return Math.floor(Math.random() * 1e12);
}

var messagesCache;
var socket = io.connect('http://localhost',{'forceNew': true});
socket.on('messages', function (data) {
  messagesCache = data;
  render();
  message.value = "";
  linkAddress.value = "";
});

function render(){
  var html = messagesCache.sort(function(a,b){
    return a.ts - b.ts;
  }).map(function(d,i){
    return (`
      <form class=message onsubmit="return likeMessage(messagesCache[${i}])">
        <div class='name'>
          ${d.userName}:
        </div>
        <a href=${d.content.link} class='message' target=blank>
          ${d.content.text}</a>
        <div class='time'>
           ${moment(d.ts).fromNow()}
        </div>
        <input type=submit class='likes-count' value="${d.likedBy.length} Hearts">

        </button>
      </form>
    `)
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function likeMessage(message){

  var index = message.likedBy.indexOf(userId);
  if (index < 0) {
    message.likedBy.push(userId);
  } else {
    message.likedBy.splice(index,1);
  }

  socket.emit("update-message",message);
  render();
  return false;
}

function addMessage(e){
  var payload = {
    content:{
      text:document.getElementById("message").value,
      link:document.getElementById("linkAddress").value,
    },
    messageId:randomId(),
    userName:document.getElementById("username").value,
    userId:userId,
    likedBy:[],
    ts:Date.now()
  };

  socket.emit("new-message",payload)
  return false;
}
