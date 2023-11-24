function ServerConnect(){
  const socket = new WebSocket(`ws://port-0-bong-jvvy2blm905km0.sel5.cloudtype.app/`);
}

ServerConnect();
const send_name_e = document.getElementById("send-name");
const send_text_e = document.getElementById("send-text");
const send_to_e = document.getElementById("send-to");
var w_val = 1;

new WebSocket(`ws://port-0-bong-jvvy2blm905km0.sel5.cloudtype.app/`).addEventListener("open", () => {
  console.log("서버와 연결됨") 
})

new WebSocket(`ws://port-0-bong-jvvy2blm905km0.sel5.cloudtype.app/`).addEventListener("message", (message) => {
  console.log("서버에서 메시지를 보냄, 내용 : \"", message.data, "\"")
  if(message.data === "작성 완료"){
    alert(`서버에서 메시지를 보냄, 내용 : " ${message.data} "`)
    send_name_e.value = "";
    send_text_e.value = "";
  }else{
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

new WebSocket(`ws://port-0-bong-jvvy2blm905km0.sel5.cloudtype.app/`).addEventListener("close", () => {
  console.log("서버와 연결이 끊김");
  console.log("서버와 연결 시도 중");
  ServerConnect();
  console.log("다시 서버와 연결 됨");
})


  send_to_e.addEventListener("click", () => {
    if( send_name_e.value !== "" && send_text_e.value !== ""  ){
      var name_v = send_name_e.value;
      var text_v = send_text_e.value;
      
      var socket = new WebSocket(`ws://port-0-bong-jvvy2blm905km0.sel5.cloudtype.app/`);
      new WebSocket(`ws://port-0-bong-jvvy2blm905km0.sel5.cloudtype.app/`).onopen = () => {
        socket.send(JSON.stringify({ "name": name_v, "text": text_v }));
        alert("작성 완료");
        send_name_e.value = "";
        send_text_e.value = "";
      }
    }
  });

