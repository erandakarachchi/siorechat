import React from "react";
import ChatRoom from './views/ChatRoom'
import ChatDashboard from './views/ChatDashboard'
import "./styles/styles.css";

export class App extends React.Component {
  render() {
    const { dispatch } = this.props;
    return <div className="parent-container">
      <ChatDashboard />
      {/* <ChatRoom/> */}
    </div>;
  }
}

export default App;