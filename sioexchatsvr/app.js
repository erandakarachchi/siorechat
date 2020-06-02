const express = require("express");
const http = require("http")
const socketIO = require("socket.io");


const port = process.env.port | 4001;
const index = require("./routes/index")

const app = express()

app.use(index)

const server = http.createServer(app);

const io = socketIO(server);

let usernames = []

io.on('connection', (socket => {
    console.log("New Client Connected", socket.id)
    socket.on("onSendMessage", (messageData) => {
        console.log(messageData)
        io.sockets.emit("onNewMessage", messageData);
    })
    socket.on("onNewUserConnect", (user) => {
        console.log("NEW USER CONNECTED", user);
    })

    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    })
}))


const usernameTaken = (socket,userdata) => {
    socket.emit("username_status", userdata);
}

server.listen(port,()=>console.log(`Server Listing to port ${port}`))