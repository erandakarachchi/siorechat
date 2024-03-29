import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore ,applyMiddleware ,compose } from 'redux';
import rootReducer from "./reducers";
import {Provider} from "react-redux";
import socketIOMiddleware from "./middleware/socketIOMiddleware"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   applyMiddleware(socketIOMiddleware),
// )

const store = createStore(rootReducer, composeEnhancers(
      applyMiddleware(socketIOMiddleware)
    ));
// const store = createStore(
//   rootReducer,
//   applyMiddleware(socketIOMiddleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App store={store}/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
