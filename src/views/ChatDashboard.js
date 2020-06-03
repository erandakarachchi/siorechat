import React, { Component } from 'react'
import { Button, InputGroup, FormControl} from 'react-bootstrap'
import { connect } from 'react-redux';
import { webSocketConnect, joinChatRoom } from "./../actions/socketActions"
import {Redirect } from "react-router-dom"

const ENDPOINT = "http://127.0.0.1:4001";

class ChatDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.dispatch = this.props.dispatch;
        this.chatRoomRef = React.createRef()
        this.saveChatRoom = this.joinToChatRoom.bind(this);
        this.renderChatRoom = this.renderChatRoom.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
    }
    componentDidMount() {
        console.log("COMPONENT MOUNTED")
        this.dispatch(webSocketConnect(ENDPOINT));
    }

    joinToChatRoom = () => {
        if (this.chatRoomRef.current.value) {
            this.dispatch(joinChatRoom(this.chatRoomRef.current.value))
        }
        this.chatRoomRef.current.value = "";
    }

    renderChatRoom = () => {
        return (
            <div>
                <div >
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Chat Room</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            ref={this.chatRoomRef}
                            placeholder="Enter Chat Room Name"
                            aria-label="chatroomname"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div>
                    <Button className="chat-button" onClick={this.joinToChatRoom}>Enter Chat Room</Button>
                </div>
            </div>
        )
    }

    renderAlert = (chatRoomName) => {
        return (
            <Redirect to={`/chat/${chatRoomName}`}/>
        )
    }

    render() {
        console.log('PROPS CHAT ROOM ', this.props.chatData.chatRoom);
        return (
            <div className="chat-room-container">
                {
                    (!this.props.chatData.chatRoom.chatRoomName) ? this.renderChatRoom() : this.renderAlert(this.props.chatData.chatRoom.chatRoomName)
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("MAP STATE TO PROPS : ", state);
    return { chatData: state };
}

export default connect(mapStateToProps)(ChatDashboard);