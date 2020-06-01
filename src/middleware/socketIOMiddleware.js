import socketIOClient from "socket.io-client";

const socketMiddleware = () => {
    console.log("MIDDDLEWARE")
  let socket = null;
  // the middleware part of this function
  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }
        // connect to the remote host
        socket =socketIOClient(action.host);
        console.log('SCOEKT CALLED',socket)
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();