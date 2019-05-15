import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
<<<<<<< HEAD
import { MultiThemeProvider } from '@material-ui/core/styles/MuiThemeProvider';
// import theme from './material-ui-theme'
=======

// ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

>>>>>>> 9d55577319eec988f8b7022b3d1b4240a3cea933
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import RootReducer from "./Store/Reducers/index.js";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

const app = (
<<<<<<< HEAD
    
    <Provider store={store}>
        <Router>
        {/* <MultiThemeProvider > */}
            <App />
        {/* </MultiThemeProvider> */}
        </Router>
=======
    <Provider store={store}>
    <Router><App /></Router>
>>>>>>> 9d55577319eec988f8b7022b3d1b4240a3cea933
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));



serviceWorker.unregister();
