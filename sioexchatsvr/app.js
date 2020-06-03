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
    socket.on("onSendMessage", (messageData) => {
        io.in(messageData.chatRoom).emit('onNewMessage', messageData);
    })
    socket.on("onNewUserConnect", (user) => {
        if (!currentUsers.includes(user.user)) {
            currentUsers.push(user.user);
            socket.emit("onNewUserConnectSuccess", user.user);
        }
    })
    socket.on("joinChatRoom", room => {
        socket.join(room, () => {
            socket.emit("joinedChatRoom", room);
        });
    })
    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    })
}))

server.listen(port,()=>console.log(`Server Listing to port ${port}`))