import React from "react";
import {getState} from "../helperComponent/stateProvider";
import {addNote} from "../state";

function Notes(){
  let [{notes},dispatch] = getState();
  let note = React.createRef();


  let notesComponents = notes.map((n, i) => <div key={i}>n</div>);

  return(
    <div>
      <h3>Notas</h3>
      {notesComponents}
      <h4>Agregar una nueva nota</h4>
      <input type="text" ref={note} placeholder="mi nueva nota"/>
      <button onClick={dispatch(addNote(note.current.value))}>Agregar</button>
    </div>
  )

}

export default Notes;
