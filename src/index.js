import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import {initState, middlewares, reducer} from "./state";
import {StateProvider} from "./helperComponent/stateProvider";


ReactDOM.render(
  <StateProvider initialState={initState} reducer={reducer} middlewares={middlewares}>
    <App/>
  </StateProvider>
  , document.getElementById('root')
)
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
