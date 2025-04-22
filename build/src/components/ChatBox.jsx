import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Backend URL

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(""); // Username input
  const [file, setFile] = useState(null); // File upload
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Fetch chat history
    axios.get("http://localhost:5000/chat-history").then((response) => {
      setMessages(response.data);
    });

    // Listen for new messages
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Notify when users join/leave
    socket.on("userJoined", (name) => {
      setMessages((prev) => [...prev, { text: `${name} joined the chat.`, sender: "system" }]);
    });

    socket.on("userLeft", (name) => {
      setMessages((prev) => [...prev, { text: `${name} left the chat.`, sender: "system" }]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() && !file) return;

    const newMessage = {
      text: input,
      sender: username || "Anonymous",
      file: null,
    };

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios.post("http://localhost:5000/upload", formData).then((response) => {
        newMessage.file = response.data.fileUrl;
        socket.emit("sendMessage", newMessage);
        setMessages([...messages, newMessage]);
      });
    } else {
      socket.emit("sendMessage", newMessage);
      setMessages([...messages, newMessage]);
    }

    setInput("");
    setFile(null);
    setImagePreview(null);
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Live Chat</h2>

      {/* Username input */}
      {!username && (
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 border rounded-md w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}

      {/* Chat Messages */}
      <div className="h-60 overflow-y-auto border-b p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg text-sm ${
              msg.sender === username ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black mr-auto"
            } max-w-[75%]`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
            {msg.file && (
              <div>
                {msg.file.endsWith(".jpg") || msg.file.endsWith(".png") ? (
                  <img src={msg.file} alt="Uploaded" className="w-24 h-24 rounded mt-2" />
                ) : (
                  <a href={msg.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View File
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input & Send Button */}
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l-md"
          placeholder="Type a message..."
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="px-2 bg-gray-300 text-black cursor-pointer rounded-md">
          📎
        </label>
        <button onClick={sendMessage} className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
          Send
        </button>
      </div>

      {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 mt-2" />}
    </div>
  );
};

export default ChatBox;
