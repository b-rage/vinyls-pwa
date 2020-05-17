import React, { useState, useEffect } from "react";
import { firebaseApp, userRef } from "../../../firebase";
import { withRouter } from 'react-router-dom';

const RecoveryPassword = (props) => {

  const [email, updateEmail] = useState("");

  const handleEmailChange = (e) => {
    //props.onCleanError()
    const email = e.target.value;
    updateEmail(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) throw console.error("error");

    firebaseApp.auth().sendPasswordResetEmail(email);

    props.history.push('/login');



    /* fetch(`https://vinyls-5ec89.firebaseio.com/api/recovery-password`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email
        }),
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      }); */
  };

  return (
    <>
      <div className="content">
        <p>We will send a email to your account</p>
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
              <button className="btn" type="submit">
                Recovery password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(RecoveryPassword);
