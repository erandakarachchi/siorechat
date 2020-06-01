import React from "react";
import ChatRoom from './views/ChatRoom'
import "./styles/styles.css";


//
export class App extends React.Component {
  render() {
    const { dispatch } = this.props;
      return <div> <ChatRoom/> </div>;
  }
}

export default App;