import React from 'react';
import {useGlobal} from "reactn";
import {getState} from "../helperComponent/stateProvider";
import {createUser, loginUser} from "../state";

// PODRIAMOS CREAR UN SOLO COMPONENTE QUE DE ACUERDO AL PROP HAGA REGISTRO O LOGIN
// NO OBSTANTE, PARA NO COMPLICAR EL CÖDIGO VOY A MANTENERLO COMO DOS COMPONENTES
export function Register(props) {
  let username = React.createRef();
  let password = React.createRef();

  const [state, dispatch] = getState();

  if (state.token) {
    props.history.push(`/user/${state.id}/notes`);
  }

  let handleClick = () => {
    console.log("username es " + username.current.value + " password " + password.current.value);
    dispatch(createUser(username.current.value,password.current.value));

  };

  let mensaje =  "Por favor ingrese sus datos para el Registro";

  return (
    <div className="app">
      <h2>{mensaje}</h2>
      <input type="text" ref={username} placeholder="nombre de usuario"/>
      <input type="text" ref={password} placeholder="password"/>
      <button onClick={handleClick}>OK</button>
    </div>
  )
}

export function Login(props) {
  let username = React.createRef();
  let password = React.createRef();

  const [state, dispatch] = getState();

  // si hay token significa que ya está logueado, no tiene por qué ver esta página, lo redireccionamos al home
  if (state.token) {
    props.history.push(`/user/${state.id}/notes`);
  }

  let handleClick = () => {
    console.log("username es " + username.current.value + " password " + password.current.value);
    dispatch(loginUser(username.current.value,password.current.value));

  };

  let mensaje =  "Por favor ingrese sus datos para logearse";

  return (
    <div className="app">
      <h2>{mensaje}</h2>
      <input type="text" ref={username} placeholder="nombre de usuario"/>
      <input type="text" ref={password} placeholder="password"/>
      <button onClick={handleClick}>OK</button>
    </div>
  )
}
