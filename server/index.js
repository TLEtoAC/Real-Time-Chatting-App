import express from "express";
import { Server } from "socket.io";
import router from "./routes/userroutes.js";
import http from "http";
import socketsetup from "./controller/socket.js";
const app = express();

//for the socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:"*", // For dev, allow all
    methods: ["GET", "POST"],
  },
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//called the route
app.use("/", router);
socketsetup(io);


server.listen(5000, () => {
    console.log("Server running on port 3000");
})