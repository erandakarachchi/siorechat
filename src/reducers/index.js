import { combineReducers } from "redux";
import joinChatReducer from "./joinChat"
import { chatRoomReducer} from "./socketReducers"

const rootReducer = combineReducers({
    joinChat: joinChatReducer,
    chatReducer:chatRoomReducer
})

export default rootReducer;