import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
let util = require('util');

const axios = require('axios');

const Axios = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}

});

export const initState = {
  username: "",

  token: null,
  notes: [],
  note: "",
  error: null
};

export const reducer = (state, payload) => {
  switch (payload.type) {
    case "STORE_USER":
      let {username, id} = payload;
      return {...state, username, id};
    case "STORE_TOKEN":
      console.log("STORE_TOKEN " + util.inspect(payload));
      return {...state, token: payload.token};
    case "STORE_NOTE":
      return {...state, note: [payload.note, ...state.notes]};
    case "STORE_LOADED_NOTES":
      return {...state, notes: payload.notes};
    case "REMOVE_STORED_USER":
      return {...state, token: null, id: null};
    case "STORE_ERROR":
      return {...state, error: payload.error};
    default:
      return state;
  }
};

export const createUser = (username, password) => dispatch => {

  Axios.post("/api/users/create/", {username, password})
    .then(response =>{
      dispatch({type: "STORE_USER", username: response.data.username, id: response.data.id});
    })
    .then(()=> dispatch(loginUser(username,password)))
    .catch(response =>dispatch(displayError(response.error.response.request.responseText )))

};

export const loginUser = (username, password) => dispatch => {
  console.log("haciendo login con " + username);
  Axios.post("/auth/token/login", {username, password})
    .then(response => {
      let token = response.data.auth_token;
      dispatch({type: "STORE_TOKEN", token})
    })
    .catch(response => dispatch(displayError(response.error.response.request.responseText)))
};

export const logout = () => dispatch => {
  dispatch("REMOVE_STORED_USER")
};

export const addNote = (note) => (dispatch,getState) => {
  Axios.post("/apiv2/tasks/new", {text: note}, {headers: {Authorization: "Token " + getState().token}})
    .then(() => {
      dispatch({type : "STORE_NOTE", note});

    })
    .catch(error => dispatch(displayError(error)));
};

export const getNotes = (user) => dispatch => {
  Axios.get(`/apiv2/user/tasks`)
    .then(response=>{
      dispatch({type : "STORE_LOADED_NOTES",notes: response.data.notes});
    })
    .catch(response => dispatch(displayError(response.error.response.request.responseText)))
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
export const middlewares = [thunk, logger];





