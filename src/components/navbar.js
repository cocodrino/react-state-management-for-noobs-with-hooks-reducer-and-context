import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


import {getState} from "../helperComponent/stateProvider";


function SignComponente(){
  const [state, dispatch] = getState();

  // si hay token mostrar el NavLink para salir, sino mostrar los de registrarse o login
  let component = state.token ?
    <NavItem>
      <NavLink onClick={() =>  dispatch({type: "REMOVE_STORED_USER"})}>Salir</NavLink>
    </NavItem>
    :
    <NavItem>
      <NavLink href="/registro">Registrarse</NavLink>
      <NavLink href="/login">Login</NavLink>
    </NavItem>;

  return(
    <>
      {component}
    </>
  )

}


export default class MyNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      modalIsOpen: false,
      modalIsLogin:true //si es falso se considera que el modal es de registro
    };
  }
  toggle() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }
  render() {
    return (
      <div>

        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/">Mi App de Prueba</NavbarBrand>

          <Nav className="ml-auto" navbar>
            <SignComponente/>
          </Nav>

        </Navbar>
      </div>
    );
  }
}
