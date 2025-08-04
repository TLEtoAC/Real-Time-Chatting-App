const onlineUsers = new Map();

let messages = [];

export default function socketsetup(io) {
  io.on("connection", (socket) => {
    const username = socket.handshake.auth?.username || "Unknown";
    console.log(`user :${username} connected id:${socket.id}`);

    onlineUsers.set(socket.id, username);
    socket.emit("load_messages", messages);
  
   io.emit("user_joined", {
      message: {
        sender: "Server",
        text: `${username} joined the chat`,
       time: new Date().toLocaleTimeString(),
     },
     users: Array.from(onlineUsers.values()),
   });

    
    socket.on("chat message", (msg) => {
     // console.log("Received message:", msg);
      const formattedMsg = {
        sender: username,
        text: msg,
        time: new Date().toLocaleTimeString(),
      };
      io.emit("new_message", formattedMsg);
      messages.push(formattedMsg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      io.emit("user_left", {
        message: {
          sender: "Server",
          text: `${username} left the chat`,
          time: new Date().toLocaleTimeString(),
        },
        users: Array.from(onlineUsers.values()),
      });
      onlineUsers.delete(socket.id);
    });
    });
  
   
}



