import React, { useState } from "react";
import { firebaseApp, userRef } from "../../../firebase";


const AddVinyl = (props) => {
  const [username, updateUsername] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");
  const [error, updateError] = useState(false);

  const handleUsernameChange = (e) => {
      if (e.target.value && e.target.value == '') {
        updateErrorMessage('username is required')
        updateError(true);
      }else{
        updateError(false);
        const username = e.target.value;
        updateUsername(username);
      }
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

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        if (!username) {
          return false;
        }


        /* userRef.child(data.user.uid).set({
          email: email,
          username: username,
        }); */

        return true;
      })
      .catch((err) => {
        updateErrorMessage(err.message);
        updateError(true);
        return err;
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
          </form>
        </div>
      </div>
    </>
  );
};

export default AddVinyl;