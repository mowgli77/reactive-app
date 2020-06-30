import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter} from "react-router-dom";
import App from "./App";
import store from "./redux/reduxStore";
import {Provider} from "react-redux";

// let renderTree = () => {

// setInterval(() => {
//     store.dispatch({type: 'FAKE'})
// }, 1000);
// let h1 = document.createElement('h1');
// h1.innerHTML = 'Hello';
// document.querySelector('body').appendChild(h1);

    ReactDOM.render(
        <BrowserRouter basename={process.env.PUBLIC_URL} >
            <Provider store={store}>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
// };

// renderTree();
// store.subscribe(renderTree); тепер це робить ф-ія connect

// store.subscribe(() => {
//     let state = store.getState();
//     renderTree(state);
// });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

