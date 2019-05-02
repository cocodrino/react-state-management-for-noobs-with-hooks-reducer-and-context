import React from "react";
import {getState} from "../helperComponent/stateProvider";
import {Axios} from "../state";
import {Button, NavLink} from "reactstrap";

function Notes(props) {
  let [{notes, userRegistered, userNotesOwner, token}, dispatch] = getState();
  let note = React.createRef();

  let addNote = (note) => {
    console.log("token es " + token);
    Axios.post("/apiv2/tasks/new", {text: note}, {headers: {Authorization: "Token " + token}})
      .then(() => {
        dispatch({type: "STORE_NOTE", note});

      })
      .catch(error => {
        dispatch({type: "STORE_ERROR", error});
        setTimeout(() => {
          dispatch({type: "STORE_ERROR", error: null})
        }, 3000)
      })
  };

  const getNotes = (user) => {
    Axios.get(`/apiv2/${user}/tasks`)
      .then(response => {
        dispatch({type: "STORE_LOADED_NOTES", notes: response.data, userNotesOwner: user});
      })
      .catch(response => {
        console.error("error > " + response);
        dispatch({type: "STORE_ERROR", response});
        setTimeout(() => {
          dispatch({type: "STORE_ERROR", error: null})
        }, 3000)
      })
  };

  if (props.match.params.user !== userNotesOwner) {
    getNotes(props.match.params.user);
    console.log(props.match.params.user);
  }


  let notesComponents = notes.map((n, i) => <div className="nota" key={n.id}>{1 + i}. {n.text}</div>);

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
        <Button color="info" onClick={() => addNote(note.current.value)}>Agregar</Button>
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
