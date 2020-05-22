import React, { useState, useEffect } from "react";
import { firebaseApp, userRef } from "../../../firebase";
import { Link } from "react-router-dom";
import CryptoENC from 'crypto-js/enc-utf8';
import CryptoAES from 'crypto-js/aes';
import image from '../../../assets/img/logo192.png';

const Login = (props) => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  useEffect(() => {
    if(localStorage.getItem('email') && localStorage.getItem('email').length > 0) {
      const _email = localStorage.getItem('email');
      const _cipherEmail = CryptoAES.decrypt(_email.toString(), 'secret key 123');
      updateEmail(_cipherEmail.toString(CryptoENC));
      const _password = localStorage.getItem('password');
      const _cipherPassword = CryptoAES.decrypt(_password.toString(), 'secret key 123');
      updatePassword(_cipherPassword.toString(CryptoENC));
    }
  },[])

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
        <img src={image} alt="logo-vinyls" className="logo"/>
        <div className="form-login">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="input-login"
                placeholder="Email"
                type="email"
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div>
              <input
                className="input-login"
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <div>
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
