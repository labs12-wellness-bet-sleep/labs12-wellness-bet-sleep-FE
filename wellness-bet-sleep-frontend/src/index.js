import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// import {createStore, applyMiddleware, compose} from "redux";
// import {Provider} from "react-redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// import RootReducer from "./Store/Reducers/index.js";


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));

// const app = (
//     <Provider store={store}>
//     <Router><App /></Router>
//     </Provider>
// )

// ReactDOM.render(app, document.getElementById('root'));



serviceWorker.unregister();
