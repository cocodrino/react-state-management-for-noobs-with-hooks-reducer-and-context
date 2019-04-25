import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import {createContext} from "react";

export const initState = {
  data: "not loaded"
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD":
      return { data: "loading..." };
    case "LOADED":
      return { data: action.payload };
    default:
      return state;
  }
};

export const loadAction = () => async dispatch => {
  dispatch({ type: "LOAD" });
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const { title: payload } = await res.json();
  dispatch(loadedAction(payload));
};

const loadedAction = payload => {
  return { type: "LOADED", payload };
};

const logger = createLogger();
export const middlewares = [thunk, logger];
export const StateContext = createContext(null);





