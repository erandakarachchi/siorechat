export const webSocketConnect = host => ({ type: 'WS_CONNECT', host });

export const sendNewMessage = messageData => {
    return {
        type: "SEND_MESSAGE",
        payload: messageData
    }
}

export const receiveNewMessage = messageData => {
    console.log("MESSAGE RECIEVED : ", messageData);
    return {
        type: "MESSAGE_RECIEVED",
        payload:messageData
    }
}

export const saveNewUser = user => {
    return {
        type: "NEW_USER",
        payload:user
    }
}

export const joinChatRoom = room => {
    return {
        type: "NEW_CHAT_ROOM",
        payload:room
    }
}

export const updateChatRoomState = room => {
    return {
        type: "SAVE_CHAT_ROOM",
        payload:room,
    }
}

export const saveUsername = username => {
    return {
        type: "SAVE_USERNAME",
        payload:username
    }
}