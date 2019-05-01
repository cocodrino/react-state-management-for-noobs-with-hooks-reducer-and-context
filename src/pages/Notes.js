import React from "react";
import {getState} from "../helperComponent/stateProvider";
import {addNote, getNotes,} from "../state";
import {Button, NavLink} from "reactstrap";

function Notes(props) {
  let [{notes, userRegistered,userNotesOwner, token}, dispatch] = getState();
  let note = React.createRef();

  if(props.match.params.user !== userNotesOwner){
    dispatch(getNotes(props.match.params.user));
    console.log(props.match.params.user);
  }


  let notesComponents = notes.map((n,i) => <div className="nota" key={n.id}>{1+i}.    {n.text}</div>);

  let userPath = `/user/${props.userRegistered}/notes`;
  let addComponent;
  if (!token) {
    //si no hay token no debe mostrar elemento para agregar mensajes sino un aviso
    addComponent = <div>Debes estar registrado para poder agregar notas</div>
  } else {
    // si el usuario está registrado pero intenta agregar notas en un usuario que no es de él
    if (userNotesOwner !== userRegistered) addComponent =
      <div>Estas no son tus notas, puedes ir a tus notas <NavLink href={userPath}>aqui</NavLink></div>
    else
      addComponent = <div>
        <h4>Agregar una nueva nota</h4>
        <input type="text" ref={note} placeholder="mi nueva nota"/>
        <Button color="info" onClick={() => dispatch(addNote(note.current.value))}>Agregar</Button>
      </div>

  }

  return (
    <div className="App-header">
      <h3>Notas</h3>
      {notesComponents}
      <div className="add_notes_area">
        {addComponent}
      </div>

    </div>
  )

}

export default Notes;
