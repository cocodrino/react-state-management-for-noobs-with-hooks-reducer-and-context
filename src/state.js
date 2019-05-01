import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
let util = require('util');

const axios = require('axios');

const Axios = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}

});

export const initState = {
  userRegistered: "",
  userNotesOwner:"",
  token: "",
  notes: [],
  note: "",
  error: null
};

export const reducer = (state, payload) => {
  switch (payload.type) {
    case "STORE_USER":
      let {username} = payload;
      return {...state, userRegistered : username};
    case "STORE_TOKEN":
      console.log("STORE_TOKEN " + util.inspect(payload));
      return {...state, token: payload.token};
    case "STORE_NOTE":
      return {...state, notes: [{text:payload.note}, ...state.notes]};
    case "STORE_LOADED_NOTES":
      return {...state, notes: payload.notes.reverse(), userNotesOwner:payload.userNotesOwner};
    case "REMOVE_STORED_USER":
      return {...state, token: null, userRegistered: null};
    case "STORE_ERROR":
      return {...state, error: util.inspect(payload.error) };
    default:
      return state;
  }
};

export const createUser = (username, password) => dispatch => {

  Axios.post("/api/users/create/", {username, password})
    .then(response =>{
      dispatch({type: "STORE_USER", username: response.data.username});
    })
    .then(()=> dispatch(loginUser(username,password)))
    .catch(response => {
      console.error("error > " + JSON.stringify(response.response.data));
      dispatch(displayError(JSON.stringify(response.response.data)))})

};

export const loginUser = (username, password) => dispatch => {
  console.log("haciendo login con " + username);
  Axios.post("/auth/token/login", {username, password})
    .then(response => {
      console.log("response de login es \n" + util.inspect(response));
      let token = response.data.auth_token;
      dispatch({type: "STORE_USER", username: username});
      dispatch({type: "STORE_TOKEN", token, username});
      dispatch(getNotes(username));
    })
    .catch(response => {
      console.log("error " + util.inspect(response));
      dispatch(displayError("Error en login, por favor intente de nuevo"))
    })
};
//{"username":"other","password":"5678qwqw"}
export const logout = () => dispatch => {
  dispatch({type: "REMOVE_STORED_USER"})
};

export const addNote = (note) => (dispatch,getState) => {
  console.log("token es " + getState().token);
  Axios.post("/apiv2/tasks/new", {text: note}, {headers: {Authorization: "Token " + getState().token}})
    .then(() => {
      dispatch({type : "STORE_NOTE", note});

    })
    .catch(error => {
      console.error("error agregando nota " + util.inspect(error));
      dispatch(displayError(error))});
};

export const getNotes = (user) => dispatch => {
  Axios.get(`/apiv2/${user}/tasks`)
    .then(response=>{
      dispatch({type : "STORE_LOADED_NOTES",notes: response.data,userNotesOwner:user});
    })
    .catch(response => {
      console.error("error > " + response);
      dispatch(displayError(response.error.response.request.responseText))})
};

export const displayError = (error) => dispatch => {
  dispatch({type: "STORE_ERROR", error});
  setTimeout(() => {
    dispatch({type: "STORE_ERROR", error: null})
  }, 3000)
};

// acciones del ejemplo
export const loadAction = () => async dispatch => {
  dispatch({type: "LOAD"});
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const {title: payload} = await res.json();
  dispatch(loadedAction(payload));
};

const loadedAction = payload => {
  return {type: "LOADED", payload};
};

const logger = createLogger({diff:true});

const myLogger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result
};

export const middlewares = [thunk, logger,myLogger];





