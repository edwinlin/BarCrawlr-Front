import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInLinks from './SignedInLinks'

const Navbar = props => {
  return (
    <nav className="nav-wrapper grey darken-3">
        <SignedInLinks clearState={props.clearState} handleCreateOrganization={props.handleCreateOrganization}/>
    </nav>
  );
};

export default withRouter(Navbar);
