import React, { Component } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import {webSocketConnect,sendNewMessage,saveNewUser} from "./../actions/socketActions"
import { connect } from 'react-redux';


class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameSaved: false,
            allMessages: [],
            username: "",
        }
        this.dispatch = this.props.dispatch
        this.usernameRef = React.createRef()
        this.chatMessageRef = React.createRef()
        this.saveUsername = this.saveUsername.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showChatForm = this.showChatForm.bind(this);
        this.showUsernameForm = this.showUsernameForm.bind(this);
    }
    saveUsername = () => {
        if (this.usernameRef.current.value) {
            this.dispatch(saveNewUser({
                "user": this.usernameRef.current.value
            }));
        }
    }
    
    sendMessage = () => {
        console.log('Message dispatched')
        if (this.chatMessageRef.current.value) {
            this.dispatch(sendNewMessage(
                {
                    "user": this.state.username,
                    "message": this.chatMessageRef.current.value
                }
            ))
            this.chatMessageRef.current.value = ""
        }
    }

    componentDidMount() {
        this.dispatch(webSocketConnect(ENDPOINT));
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
            <div>
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
                <div>
                    <hr/>
                    <h2>Chat</h2>
                    <div className="chat-box">
                        {
                            // this.state.allMessages.map((messageData, i) => <p key={i}>{messageData.user} : {messageData.message}</p>)
                        }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="chat-container">
                {
                    this.showUsernameForm()
                }
                {
                    this.showChatForm()
                }
            </div>
        )
    }
   
}
function mapStateToProps(state) {
    return {
        todos: state.todos
    };
  }
export default connect(mapStateToProps)(ChatRoom);