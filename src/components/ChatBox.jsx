import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const socket = io.connect("https://gleqbackend-production.up.railway.app/");

const ChatBox = ({ groupId, minimized, toggle }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const token = localStorage.getItem("studysync_token");
  const decoded = jwtDecode(token);
  const senderName = decoded.name;
  const senderId = decoded.id;

  useEffect(() => {
    
    socket.emit("joinGroup", groupId);

    
    axios.get(`https://gleqbackend-production.up.railway.app/chat/${groupId}`).then(res => {
      if (res.data.status) setMessages(res.data.messages);
    });

     socket.on("newMessage", (msg) => {
      if (msg.groupId === groupId) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [groupId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    socket.emit("sendMessage", {
      groupId,
      senderName,
      senderId,
      text: message
    });
    setMessage("");
  };

  return (
    <div className={`flex flex-col border border-gray-300 rounded-xl bg-white shadow-md transition-all duration-300 ${minimized ? "h-12" : "h-96"} w-full`}>
      <div className="flex justify-between items-center p-2 bg-blue-950 cursor-pointer rounded-xl" onClick={toggle}>
        <h4 className="text-sm font-semibold text-white">💬 Chat</h4>
      </div>

      {!minimized && (
        <>
          <div className="flex-1 overflow-y-auto p-2 text-sm space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`px-3 py-2 rounded-lg shadow-sm w-fit max-w-[80%] ${msg.senderId === senderId ? "ml-auto bg-indigo-100" : "bg-white"}`}>
                <strong className="text-blue-900">{msg.senderName}</strong>: {msg.text}
                <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="flex items-center p-2 border-t">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
             
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none text-sm"
            />
            <button 
            onClick={handleSend} 
            className="ml-2 bg-blue-950 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-900 cursor-pointer font-medium">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
