import React from 'react';
import {getState} from "../helperComponent/stateProvider";
import {Button} from "reactstrap";
import {Axios} from "../state";

let util = require("util");

// PODRIAMOS CREAR UN SOLO COMPONENTE QUE DE ACUERDO AL PROP HAGA REGISTRO O LOGIN
// NO OBSTANTE, PARA NO COMPLICAR EL CÖDIGO VOY A MANTENERLO COMO DOS COMPONENTES
export function Register(props) {
  let username = React.createRef();
  let password = React.createRef();

  const [state, dispatch] = getState();

  if (state.token) {
    console.log("estado es\n" + state);
    props.history.push(`/user/${state.userRegistered}/notes`);
  }

  const loginUser = (username, password) => {
    console.log("haciendo login con " + username);
    Axios.post("/auth/token/login", {username, password})
      .then(response => {
        console.log("response de login es \n" + util.inspect(response));
        let token = response.data.auth_token;
        dispatch({type: "STORE_USER", username: username});
        dispatch({type: "STORE_TOKEN", token, username});

      })
      .catch(response => {
        console.log("error " + util.inspect(response));
        dispatch({type: "STORE_ERROR", error: JSON.stringify(response.response.data)});
        setTimeout(() => {
          dispatch({type: "STORE_ERROR", error: null})
        }, 3000)

      })
  };

  let handleClick = () => {
    let usernameValue = username.current.value;
    let passwordValue = password.current.value;
    Axios.post("/api/users/create/", {username: usernameValue, password: passwordValue})
      .then(response => {
        dispatch({type: "STORE_USER", username: response.data.username});
      })
      .then(() => loginUser(usernameValue, passwordValue))
      .catch(response => {
        console.log("error " + util.inspect(response));
        dispatch({type: "STORE_ERROR", error: JSON.stringify(response.response.data)});
        setTimeout(() => {
          dispatch({type: "STORE_ERROR", error: null})
        }, 3000)
      })


  };

  let mensaje = "Por favor ingrese sus datos para el Registro";

  return (
    <div className="App-header">
      <h2>{mensaje}</h2>
      <input type="text" ref={username} placeholder="nombre de usuario"/>
      <input type="password" ref={password} placeholder="password"/>
      <Button size="lg" color="primary" onClick={handleClick}>OK</Button>
    </div>
  )
}

export function Login(props) {
  let username = React.createRef();
  let password = React.createRef();

  const [state, dispatch] = getState();

  // si hay token significa que ya está logueado, no tiene por qué ver esta página, lo redireccionamos al home
  if (state.token) {
    console.log("estado es\n" + util.inspect(state));
    props.history.push(`/user/${state.userRegistered}/notes`);
  }

  let handleClick = () => {
    let usernameValue = username.current.value;
    let passwordValue = password.current.value;
    Axios.post("/auth/token/login", {username: usernameValue, password: passwordValue})
      .then(response => {
        console.log("response de login es \n" + util.inspect(response));
        let token = response.data.auth_token;
        dispatch({type: "STORE_USER", username: usernameValue});
        dispatch({type: "STORE_TOKEN", token, usernameValue});

      })
      .catch(response => {
        console.log("error " + util.inspect(response));
        dispatch({type: "STORE_ERROR", error: "Error en login, por favor intente de nuevo"});
        setTimeout(() => {
          dispatch({type: "STORE_ERROR", error: null})
        }, 3000)
      })


  };

  let mensaje = "Por favor ingrese sus datos para logearse";

  return (
    <div className="App-header">
      <h2>{mensaje}</h2>
      <input type="text" ref={username} placeholder="nombre de usuario"/>
      <input type="password" ref={password} placeholder="password"/>
      <Button color="primary" onClick={handleClick}>OK</Button>
    </div>
  )
}
