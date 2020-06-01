import { combineReducers } from "redux";
import joinChatReducer from "./joinChat"

const rootReducer = combineReducers({
    joinChat:joinChatReducer
})

export default rootReducer;