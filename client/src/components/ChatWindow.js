import React, { useEffect, useState } from "react";

function ChatWindow({ socket }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Listen for 'message' events from the server
  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });

      // Clean up the effect
      return () => socket.off("message");
    }
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    // Emit a 'message' event to the server
    socket.emit("message", newMessage);
    setNewMessage("");
  };

  // Render your component
  return (
    <div className="grid-container form-container">
      <div className="chat-history">
        {/* Render your messages here */}
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>

      {/* Add a form to send a message */}
      <form onSubmit={sendMessage}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button className="button" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
