import React, { Component } from 'react'
import socketIOClient from "socket.io-client";
import { Button, InputGroup, FormControl } from 'react-bootstrap'

const ENDPOINT = "http://127.0.0.1:4001";
const webSocket = socketIOClient(ENDPOINT);

export default class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameSaved :false,
            allMessages: []
        }
        this.usernameRef = React.createRef()
        this.chatMessageRef = React.createRef()
        this.saveUsername = this.saveUsername.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showChatForm = this.showChatForm.bind(this);
        this.showUsernameForm = this.showUsernameForm.bind(this);
    }
    saveUsername = () => {
        if (this.usernameRef.current.value) {
            webSocket.emit("set_username", this.usernameRef.current.value);
        }

    }
    sendMessage = () => {
        if (this.chatMessageRef.current.value) {
            webSocket.emit("message",this.chatMessageRef.current.value)
        }
    }

    componentDidMount() {
        webSocket.on("new_message", (message) => {
            this.setState(prevState => ({
                allMessages: [...prevState.allMessages, message]
            }))
        })

        webSocket.on("username_status", message => {
            this.usernameRef.current.value = ""
            this.setState({
                usernameSaved:message
            })
        })
    }

    showUsernameForm = () => {
        return (
            <div className="chat-controll-container">
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.usernameRef}
                        placeholder="Enter username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </div>
            <div>
                <Button className="chat-button" onClick={this.saveUsername}>Save Username</Button>
            </div>
        </div>
        )
    }
    showChatForm = () => {
        return (
            <div className="chat-controll-container">
                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Message</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            ref={this.chatMessageRef}
                            placeholder="Enter message "
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div>
                    <Button className="chat-button" onClick={this.sendMessage}>Chat</Button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="chat-container">
                {
                    (!this.state.usernameSaved)?this.showUsernameForm():this.showChatForm()
                }
                <div>
                    <h2>Chat</h2>
                    <div className="chat-box">
                        {
                            this.state.allMessages.map((item, i) => <p key={i}>{item}</p>)
                        }

                    </div>
                </div>
            </div>
        )
    }
}