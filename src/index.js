import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import App from "./App";
import store from "./redux/reduxStore";
import {Provider} from "react-redux";

ReactDOM.render(
        <HashRouter>
            <Provider store={store}>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </Provider>
        </HashRouter>,
        document.getElementById('root')
    );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

