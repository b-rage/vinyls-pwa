import React, { useState, useEffect } from "react";
import { firebaseApp, userRef } from "../../../firebase";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [username, updateUsername] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const handleUsernameChange = (e) => {
    //props.onCleanError()
    const username = e.target.value;
    updateUsername(username);
  };

  const handleEmailChange = (e) => {
    //props.onCleanError()
    const email = e.target.value;
    updateEmail(email);
  };

  const handlePasswordChange = (e) => {
    //props.onCleanError()
    const password = e.target.value;
    updatePassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        if (!username) {
          return false;
        }

        userRef.child(data.user.uid).set({
          email: email,
          username: username,
        });

        return true;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  };

  return (
    <>
      <div className="content">
        <div className="form-login">
          <form onSubmit={handleSubmit} className="row">
            <div className="col-md-12">
              <input
                className="input-login"
                placeholder="Username"
                type="username"
                onChange={handleUsernameChange}
              />
            </div>
            <div className="col-md-12">
              <input
                className="input-login"
                placeholder="Email"
                type="email"
                onChange={handleEmailChange}
              />
            </div>
            <div className="col-md-12">
              <input
                className="input-login"
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="col-md-12">
              <button className="btn" type="submit">
                Sign Up
              </button>
            </div>
            <div className="col-md-12">
              <Link to="/login" onClick={props.onCleanError}>
                <p className="p">Log In</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
