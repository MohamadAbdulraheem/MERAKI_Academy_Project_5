import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.css"
const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);
function Chat() {
  const [message, setMessage] = useState();

  const sendMessage = () => {
    socket.emit("message", { message });
  };
  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}> Send </button>
    </div>
    
  );
}

export default Chat;
