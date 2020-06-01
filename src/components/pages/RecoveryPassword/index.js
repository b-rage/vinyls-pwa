import React, { useState } from "react";
import { firebaseApp } from "../../../firebase";
import { withRouter, Link } from 'react-router-dom';
import image from '../../../assets/img/logo192.png';

const RecoveryPassword = () => {

  const [email, updateEmail] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");
  const [error, updateError] = useState(false);

  const handleEmailChange = (e) => {
    updateError(false);
    const email = e.target.value;
    updateEmail(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      updateErrorMessage('email required');
      throw updateError(true);
    };

    firebaseApp.auth().sendPasswordResetEmail(email)
    .then((data) => {
      updateErrorMessage('check your email account');
      updateError(true);
      return true;
    })
    .catch((err) => {
      updateErrorMessage(err.message);
      updateError(true);
      return err;
    });;

    //props.history.push('/');

  };

  return (
    <>
      <div className="content">
        <img src={image} alt="logo-vinyls" className="logo"/>
        {error && <p className="p-error">{errorMessage}</p>}
        <p className="p">We will send a email to your account</p>
        <div className="form-login">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="input-login"
                placeholder="Email"
                type="email"
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <button className="btn" type="submit">
                Recovery password
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

export default withRouter(RecoveryPassword);
