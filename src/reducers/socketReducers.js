export const chatRoomReducer = (oldState = { "chatRoomName": "", "username": "","messages":[] }, action) => {
    /*
        Never mutate args from the reducer.  this will cause effects such as component will not re-render.
    */
    Object.freeze(oldState); 
    let state = Object.assign({},oldState);
    switch (action.type) {
        case "SAVE_CHAT_ROOM":
            state.chatRoomName = action.payload;
            break;
        case "SAVE_USERNAME":
            state.username = action.payload;
            break;
        case "MESSAGE_RECIEVED":
            state.messages = [...state.messages,action.payload]
            break;
        default:
            break;
    }
    return state;
}
