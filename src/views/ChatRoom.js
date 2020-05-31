import React, { Component } from 'react'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";


export default class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allMessages : []
        }
    }
    
    webSocket = socketIOClient(ENDPOINT);
    componentDidMount() {
        this.webSocket.on("newMessage", (message) => {
            console.log("chat room ", message);
            this.setState(prevState => ({
                allMessages: [...prevState.allMessages, message]
              }))
            
        })
    }
    
    render() {
        return (
            <div>
                <h2>Chat</h2>
                <div>
                    {
                        this.state.allMessages.map((item,i) => <li key={i}>{item}</li>)
                    }

                </div>
            </div>
        )
    }
}
