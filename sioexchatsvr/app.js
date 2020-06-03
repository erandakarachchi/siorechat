const express = require("express");
const http = require("http")
const socketIO = require("socket.io");


const port = process.env.port | 4001;
const index = require("./routes/index")

const app = express()
app.use(index)
const server = http.createServer(app);
const io = socketIO(server);

let currentUsers = [];

io.on('connection', (socket => {
    console.log("New Client Connected", socket.id)
    socket.on("onSendMessage", (messageData) => {
        io.sockets.emit("onNewMessage", messageData);
    })
    socket.on("onNewUserConnect", (user) => {
        console.log("NEW USER CONNECTED", user);
        if (!currentUsers.includes(user.user)) {
            currentUsers.push(user.user);
            socket.emit("onNewUserConnectSuccess", user.user);
        }
    })
    socket.on("joinChatRoom", room => {
        socket.join(room, () => {
            console.log("EMMITTTING")
            socket.emit("joinedChatRoom", room);
        });
    })
    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    })
}))

server.listen(port,()=>console.log(`Server Listing to port ${port}`))