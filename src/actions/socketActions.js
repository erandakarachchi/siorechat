export const webSocketConnect = host => ({ type: 'WS_CONNECT', host });

export const sendNewMessage = messageData => {
    return {
        type: "SEND_MESSAGE",
        payload: messageData
    }
}