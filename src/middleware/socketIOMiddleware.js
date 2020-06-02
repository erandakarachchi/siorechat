import socketIOClient from "socket.io-client";
import {receiveNewMessage,updateChatRoomState} from "./../actions/socketActions"

//This acts as middleware for all store actions.
const socketMiddleware = () => {
    console.log("MIDDDLEWARE INITIALIZED")
  let webSocket = null;
  // the middleware part of this function
  return store => next => action => {
    //actions that should be handled using websokets are handled here.
    //also actions from the socket io.
    switch (action.type) {
      case 'WS_CONNECT':
        webSocket = socketIOClient(action.host);
        webSocket.on("onNewMessage", messageData => {
          store.dispatch(receiveNewMessage(messageData))
        })
        webSocket.on("joinedChatRoom", room => { 
          console.log("callback",room)
          store.dispatch(updateChatRoomState(room));
      })
        break;
      case "SEND_MESSAGE":
        webSocket.emit("onSendMessage", action.payload)
        break;
      case "NEW_USER":
        webSocket.emit("onNewUserConnect", action.payload);
        break;
      case "NEW_CHAT_ROOM":
        webSocket.emit("joinChatRoom", action.payload);
        break;
    }  
    return next(action);
  };
};


export default socketMiddleware();