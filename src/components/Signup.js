import React from "react";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    password_confirmation: ""
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
      password: "",
      password_confirmation: ""
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
          <input
            type="password"
            placeholder="password_confirmation"
            value={this.state.password_confirmation}
            onChange={this.changeHandler}
          />
          <button>Sign Up</button>
        </form>
    );
  }
}

export default Signup;
