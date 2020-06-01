import socketIOClient from "socket.io-client";

//This acts as middleware for all store actions.
const socketMiddleware = () => {
    console.log("MIDDDLEWARE")
  let webSocket = null;
  // the middleware part of this function
  return store => next => action => {
    switch (action.type) {
        case 'WS_CONNECT':
            webSocket = socketIOClient(action.host);
        case "SEND_MESSAGE":
            webSocket.emit("received_new_message",action.payload)
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();