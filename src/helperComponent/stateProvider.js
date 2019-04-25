import React, {createContext, useContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import useMiddleware from "react-usemiddleware";

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, middlewares, children}) => {


  let reduceBuilder = middlewares ?
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMiddleware(reducer, initialState, middlewares)
    :
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={reduceBuilder}>
      {children}
    </StateContext.Provider>
  )
};


StateProvider.propTypes = {
  /**
   * @return {React.Node}
   */
  children: PropTypes.node.isRequired,

  /**
   * Object containing initial state value.
   */
  initialState: PropTypes.shape({}).isRequired,

  /**
   *
   * @param {object} state
   * @param {object} action
   *
   */
  reducer: PropTypes.func.isRequired,
  middlewares: PropTypes.array
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getState = () => useContext(StateContext);
