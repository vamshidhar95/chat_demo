var socket = io();
var user_id = Math.floor(1000 + Math.random() * 9000);
// Get the Input element
let textInput = document.getElementById("input-text");
var wage = document.getElementById("wage");
textInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        onSendMessage(e.target.value);
    }else{
        // onInputTextChange(e.target.value);
    }
});

function printChat(userChatData){
        
    let chatView = document.getElementById("messages");
    let htmlData = "";

    for(let index=0; index<userChatData.length; index++){
        const className = (index%2 == 0) ? "my-chat" : "client-chat";
        htmlData += "<p class="+className+">"+userChatData[index].message +"</p>";
    }

    let index = userChatData.length-1;

    while(index >= 0){
        const className = (userChatData[index].name == user_id) ? "my-chat" : "client-chat";
        htmlData += "<p class="+className+">"+userChatData[index].message +"</p>";
        index--;
    }

    chatView.innerHTML = htmlData;
    
}

function onSendMessage(msg) {
    if(msg != "") {
        socket.emit('msg', {message: msg, user: user_id});
    }
}
socket.on('newmsg', function(data) {
    console.log(data);
    let html = document.getElementById('messages').innerHTML;
    const className = (data.user == user_id) ? "my-chat" : "client-chat";
    document.getElementById('messages').innerHTML = '<p class='+className+'>' + data.message + '</p>' + html;
    textInput.value = "";
})