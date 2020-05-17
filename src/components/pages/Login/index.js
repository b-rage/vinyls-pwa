import React, { useState, useEffect } from "react";
import { firebaseApp, userRef } from "../../../firebase";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

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
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        userRef.child(data.user.uid).once("value", (snapshot) => {
          console.log("snapshot.val()", snapshot.val());
          return snapshot.val();
        });
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
                Log In to Vinyls
              </button>
            </div>
          </form>
        </div>
        <div>
          <Link to="/recovery-psw" onClick={props.onCleanError}>
            <p className="p">Forgot Password?</p>
          </Link>
          <Link to="/register" onClick={props.onCleanError}>
            <p className="p">Sign Up</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;

/* const StyledParraph = styled.p`
    font-size: 15px;
    color: #024e8a;

`; */
