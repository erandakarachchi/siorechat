import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import ChatRoom from './views/ChatRoom'
const ENDPOINT = "http://127.0.0.1:4001";

const webSocket = socketIOClient(ENDPOINT);
const saveUsername = (username) => {
  console.log("called")
  webSocket.emit("setusername", document.getElementById('username').value)
}

const sendMessage = (message) => {
  webSocket.emit("message",document.getElementById("message").value)
}

function App() {
  const [conStatus, setConStatus] = useState("");
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    webSocket.on("connection_success", data => {
      setConStatus(data);
    })
    webSocket.on("newMessage", message => {
      console.log(message)
      setNewMessage(message)
      
    })

  }, []);

  return (
    <div>
      {conStatus}
      <div>
        <p>Enter your username</p>
        <input id="username"></input>
        <button onClick={saveUsername}>Save Username</button>
      </div>
      <br/>
      <div>
        <input id="message"></input>
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
        <ChatRoom/>
      </div>
    </div>
  );
}

export default App;