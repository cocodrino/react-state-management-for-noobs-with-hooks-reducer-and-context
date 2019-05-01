import React from 'react'
import {getState} from "../helperComponent/stateProvider";
import {Alert} from "reactstrap";

export default function Aviso(){
  let [{error}] = getState();

  let aviso = error ? <Alert color="danger"> {error} </Alert> : <></>;

  return(
    <>
      {aviso}
    </>
  )
}
