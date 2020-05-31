const express = require("express");
const http = require("http")
const socketIO = require("socket.io");


const port = process.env.port | 4001;
const index = require("./routes/index")

const app = express()
app.use(index)

const server = http.createServer(app);

const io = socketIO(server);
let interval;
io.on('connection', (socket => {
    console.log("New Client Connected")
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client Disconnected");
        clearInterval(interval);
    })
}))

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI2", response); 
}

server.listen(port,()=>console.log(`Server Listing to port ${port}`))