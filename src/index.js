import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Router} from "react-router-dom";
import MyNav from './components/navbar.js'
import history from './history';
import {Login,Register} from "./pages/LoginOrRegister";





import {initState, middlewares, reducer} from "./state";
import {StateProvider} from "./helperComponent/stateProvider";
import Notes from "./pages/Notes";
import Aviso from "./components/aviso";


ReactDOM.render(
  <StateProvider initialState={initState} reducer={reducer} middlewares={middlewares}>
    <>
      <MyNav/>
      <Aviso/>
      <Router history={history}>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/registro" component={Register}/>
        <Route path="/user/:user/notes" component={Notes}/>

      </Router>
    </>

  </StateProvider>
  , document.getElementById('root')
)
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
