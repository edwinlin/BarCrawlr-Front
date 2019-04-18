import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import Login from './Login'
import Signup from './Signup'

const SliderForm = props => {

  return (
    <div className="container" id="container">
        <div className="form-container sign-up-container">
          <Signup submitHandler={(userInfo)=>props.signupSubmitHandler(userInfo)} />
        </div>
        <div className="form-container sign-in-container">
          <Login submitHandler={(userInfo)=>props.loginSubmitHandler(userInfo)} />
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                        To keep connected with us please login with your personal info
                    </p>
                    <button onClick={() => document.getElementById('container').classList.remove('right-panel-active')} className="ghost" id="signIn">Log In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button onClick={() => document.getElementById('container').classList.add('right-panel-active')} className="ghost" id="signUp">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default withRouter(SliderForm);
