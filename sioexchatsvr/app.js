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
    notifyConnection(socket);
    socket.on("set_username", (username) => {
        if (!usernames.includes(username)) {
            usernames.push(username);
            console.log(usernames)
            usernameTaken(socket,true);
        } else {
            usernameTaken(socket,false);
        }
    })

    socket.on("message", (message) => {
        socket.broadcast.emit("new_message", message);
    })

    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    })
}))

const notifyConnection = socket => {
    const response = "You are connected to the server"
    socket.emit("connection_success", response);
}

const usernameTaken = (socket,status) => {
    socket.emit("username_status", status);
}

server.listen(port,()=>console.log(`Server Listing to port ${port}`))