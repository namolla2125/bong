const socket = new WebSocket(`ws://port-0-bong-jvvy2blm905km0.sel5.cloudtype.app/`);

const send_name_e = document.getElementById("send-name");
const send_text_e = document.getElementById("send-text");
const send_to_e = document.getElementById("send-to");

socket.addEventListener("open", () => {
  console.log("서버와 연결됨") 
})

socket.addEventListener("message", (message) => {
  console.log("서버에서 메시지를 보냄, 내용 : \"", message.data, "\"")
  if(message.data === "작성 완료"){
    alert(`서버에서 메시지를 보냄, 내용 : " ${message.data} "`)
    send_name_e.value = "";
    send_text_e.value = "";
  }else{
    console.log('a')
    const serverToDBData = JSON.parse(message.data)
    
    serverToDBData.forEach(d => {
      var mainDiv = document.createElement('div');
      var dateH3 = document.createElement('h3');
      var hp = document.createElement('p');
      var p = document.createElement('p');
      var sapBong = document.getElementById("bong");
      var hr = document.createElement("hr");
      dateH3.innerText = d.date;
     
      hp.innerText = "작성자 : " + d.name;
      
      p.innerText = d.detail;

      mainDiv.appendChild(dateH3);
      mainDiv.appendChild(hp);
      mainDiv.appendChild(p);
      mainDiv.appendChild(hr);
      
      sapBong.appendChild(mainDiv);
    });
  }
  
})

socket.addEventListener("close", () => {
  console.log("서버와 연결이 끊김")
})


send_to_e.onclick = function(){
  if( send_name_e.value !== "" && send_text_e.value !== ""  ){
    var name_v = send_name_e.value;
    var text_v = send_text_e.value;
    socket.send(JSON.stringify({ "name": name_v, "text": text_v }));
  }
}

