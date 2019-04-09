import React from "react";

import withRouter from "react-router-dom"
import {connect} from 'react-redux' //need for redux


class Signup extends React.Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.placeholder]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    // console.log(this.state)
    this.props.submitHandler(this.state);
    this.setState({
      username: "",
      password: ""
    });
  };
  render() {
    return (

        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <input
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button>Sign Up</button>
        </form>
    );
  }
}

export default Signup;
