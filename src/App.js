import React from "react";
import ChatRoom from './views/ChatRoom'
import ChatDashboard from './views/ChatDashboard'
import "./styles/styles.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

export class App extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Router>
        <div className="parent-container">
          <Switch>
            <Route exact path="/" component={ChatDashboard} />
            <Route path="/chat/:chatRoom" component={ChatRoom} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;