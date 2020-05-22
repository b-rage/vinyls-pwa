import React, { useState, useEffect } from "react";
import { firebaseApp, userRef } from "../../../firebase";
import { Link } from "react-router-dom";
import CryptoAES from 'crypto-js/aes';
import image from '../../../assets/img/logo192.png';


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

        const cipherEmail = CryptoAES.encrypt(email, 'secret key 123');
        const cipherPassword = CryptoAES.encrypt(password, 'secret key 123');

        localStorage.setItem('email', cipherEmail);
        localStorage.setItem('password', cipherPassword);

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
        <img src={image} alt="logo-vinyls" className="logo"/>
        <div className="form-login">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="input-login"
                placeholder="Username"
                type="text"
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <input
                className="input-login"
                placeholder="Email"
                type="email"
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <input
                className="input-login"
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <button className="btn" type="submit">
                Sign Up
              </button>
            </div>
            <div>
              <Link to="/" onClick={props.onCleanError}>
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
