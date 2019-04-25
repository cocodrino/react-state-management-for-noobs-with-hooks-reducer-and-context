import React,{ useContext }  from 'react';
import logo from './logo.svg';
import './App.css';
import {StateContext,loadAction} from "./state";

function App() {
  const [state, dispatch] = useContext(StateContext)();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => dispatch(loadAction())}>LOAD</button>
        <span>{state.data}</span>
      </header>
    </div>
  );
}

export default App;