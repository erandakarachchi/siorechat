export const chatRoomReducer = (state = "", action) => {
    switch (action.type) { 
        case "SAVE_CHAT_ROOM":
            console.log('save cht room state')
            return state = action.payload;
        default:
            return state;
    }
}
