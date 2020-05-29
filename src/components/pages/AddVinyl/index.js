import React, { useState, useEffect } from "react";
import { WithStoreConsumer } from "../../store";
import { firebaseApp, userRef } from "../../../firebase";


const AddVinyl = (props) => {

  const [title, updateTitle] = useState("");
  const [author, updateAuthor] = useState("");
  const [password, updatePassword] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");
  const [error, updateError] = useState(false);

  useEffect(() => {
    props.context.setPageName('add-vinyl'); 
  },[]);

  const handleTitleChange = (e) => {
      if (e.target.value && e.target.value == '') {
        updateErrorMessage('title is required')
        updateError(true);
      }else{
        updateError(false);
        const title = e.target.value;
        updateTitle(title);
      }
  };

  const handleAuthorChange = (e) => {
    if (e.target.value && e.target.value == '') {
      updateErrorMessage('author is required')
      updateError(true);
    }else{
      updateError(false);
      const author = e.target.value;
      updateAuthor(author);
    }
  };

  const handlePasswordChange = (e) => {
    updateError(false);
    const password = e.target.value;
    updatePassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
  };

  return (
    <>
      <div className="add-vinyl-container">
        {error && <p className="p-error">{errorMessage}</p>}
        <div className="form-login">
          <form onSubmit={handleSubmit} style={{textAlign: 'center'}}>
            <p className="p-title">Add Vinyl</p>
            <div>
              <input
                className="input-form"
                placeholder="Title"
                type="text"
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <input
                className="input-form"
                placeholder="Author"
                type="text"
                onChange={handleAuthorChange}
              />
            </div>
            <div>
              <input
                className="input-form"
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

export default WithStoreConsumer(AddVinyl);