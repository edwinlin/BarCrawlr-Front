import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";

const SignedInLinks = (props) => {
  return (
    <ul className="right">
    <li onClick={props.handleCreateOrganization}><NavLink to='/authorized'>Team</NavLink></li>
    <li onClick={() => {
      localStorage.removeItem("token");
      props.clearState();
    }}><NavLink to='/'>Log Out</NavLink></li>

    </ul>
  );
};

export default withRouter(SignedInLinks);
