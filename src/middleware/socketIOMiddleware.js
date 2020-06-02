import socketIOClient from "socket.io-client";
import {receiveNewMessage} from "./../actions/socketActions"

//This acts as middleware for all store actions.
const socketMiddleware = () => {
    console.log("MIDDDLEWARE")
  let webSocket = null;
  // the middleware part of this function

  return store => next => action => {


    //actions that should be handled using websokets are handled here.
    //also actions from the socket io.

    switch (action.type) {
        case 'WS_CONNECT':
          webSocket = socketIOClient(action.host);
          webSocket.on("connection_success", data => {
            console.log("ON Connect : ",data);
          })
          webSocket.on("new_message", messageData => {
            console.log("NEW MESSAGE : ", messageData)
            store.dispatch(receiveNewMessage(messageData))
            })
        
        case "SEND_MESSAGE":
          webSocket.emit("received_new_message", action.payload)
          console.log('Message Send');        
    }  

    return next(action);
  };
};

export default socketMiddleware();