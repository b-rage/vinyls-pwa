import React, { useState } from "react";
import { firebaseApp, userRef } from "../../../firebase";
import { Link } from "react-router-dom";
import CryptoAES from 'crypto-js/aes';
import image from '../../../assets/img/logo192.png';


const Register = (props) => {
  const [username, updateUsername] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");
  const [error, updateError] = useState(false);

  const capitalizeTxt = (txt) => {
    return txt.toLowerCase().replace( /\b./g, function(a){ 
      return a.toUpperCase();
    })
  }

  const handleUsernameChange = (e) => {
      updateError(false);
      const username = e.target.value;
      updateUsername(capitalizeTxt(username));
  };

  const handleEmailChange = (e) => {
    updateError(false);
    const email = e.target.value;
    updateEmail(email);
  };

  const handlePasswordChange = (e) => {
    updateError(false);
    const password = e.target.value;
    updatePassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let exist;

    console.log('username', username)
    if(username == '') {
      updateErrorMessage('Username is required')
      updateError(true);
      return;
    }

    fetch(
      `https://us-central1-vinyls-5ec89.cloudfunctions.net/app/api/users/${username}`,
      {
        method: "GET",
      }
    )
    .then((res) => {
        return res.json();
      })
      .then(data => {
        exist = data.exist;
        if(exist == true){
          updateErrorMessage('Username already exists')
          updateError(true);
        }else{
          firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
    
              const cipherEmail = CryptoAES.encrypt(email, 'secret key 123');
              const cipherPassword = CryptoAES.encrypt(password, 'secret key 123');
    
              localStorage.setItem('email', cipherEmail);
              localStorage.setItem('password', cipherPassword);

              fetch('https://us-central1-vinyls-5ec89.cloudfunctions.net/app/api/users/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: data.user.uid,
                  email: email,
                  username: username,
                  username_upper: username.toUpperCase(),
                }),
              })   
              return true;
            })
            .catch((err) => {
              updateErrorMessage(err.message);
              updateError(true);
              return err;
            })
        }
      })
      .catch(function (error) {
        updateErrorMessage(error.message);
        updateError(true);
        console.log("Error getting documents2: ", error);
      });
       
  };

  return (
    <>
      <div className="content">
        <img src={image} alt="logo-vinyls" className="logo"/>
        {error && <p className="p-error">{errorMessage}</p>}
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
              <Link to="/">
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
