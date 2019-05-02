let util = require('util');

const axios = require('axios');

export const Axios = axios.create({
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
      let err = payload.error ? util.inspect(payload.error) : payload.error;

      return {...state, error: err};
    default:
      return state;
  }
};


















