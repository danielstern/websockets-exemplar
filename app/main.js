var socket = io.connect('http://localhost',{'forceNew':true});
socket.on("messages", function(data){
    console.info(data);
})