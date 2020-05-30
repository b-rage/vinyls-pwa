import React, { useState, useEffect } from "react";
import { WithStoreConsumer } from "../../store";
import { firebaseApp } from "../../../firebase";
import ImageUpload from '../../shared/ImageUpload';


const AddVinyl = (props) => {

  const [title, updateTitle] = useState("");
  const [author, updateAuthor] = useState("");
  const [password, updatePassword] = useState("");
  const [errorMessage, updateErrorMessage] = useState("");
  const [error, updateError] = useState(false);

  const [imageUrl, setImageUrl] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    props.context.setPageName('add-vinyl'); 
  },[]);

  const onShowImageUpload = (val) => {
    setShowImageUpload(val);
  }

  const addImage = () => {
    setShowImageUpload(true);
  }

  const doImageUrl = (url) => {
    setImageUrl(url);
  }

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
    console.log('title, author, ', title, author, )
    if(title == '') {
      updateErrorMessage('Title is required')
      updateError(true);
    }else if(author == '') {
      updateErrorMessage('Author is required')
      updateError(true);
    }else{
      firebaseApp.firestore().collection('vinyls')
      .add({
        title: title,
        author: author,
        vinylImgUrl: imageUrl,
        userId: userId
      })
      .then((doc) => {
        console.log('doc', doc)
      })
      .catch(err => {
          console.log('err', err);
      }); 
    }  
  };

  return (
    <div className="profile">
      {!showImageUpload && <div className="add-vinyl-container">
        <div className="form-login">
          <form onSubmit={handleSubmit} style={{textAlign: 'center', paddingTop: '10px'}}>
            {/* <p className="p-title">Add Vinyl</p> */}
            <div>
              <img style={{width: '100px', paddingBottom: '10px'}}  src={imageUrl ? imageUrl : './img/vinyl.png'} />
            </div>
            <div>
              <button className="btn-add-vinyl" onTouchEnd={addImage}>Add Vinyl Image</button>
            </div>
            <div>
              <input
                className="input-form"
                placeholder="Title"
                type="text"
                onChange={handleTitleChange}
                autoComplete="off"
                style={{textTransform: 'capitalize'}}
              />
            </div>
            <div>
              <input
                className="input-form"
                placeholder="Author"
                type="text"
                onChange={handleAuthorChange}
                autoComplete="off"
                style={{textTransform: 'capitalize'}}
              />
            </div>
            <div>
              <input
                className="input-form"
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
                autoComplete="off"
              />
            </div>
            {error && <p className="p-error" style={{paddingTop: '0px'}}>{errorMessage}</p>}
            <div>
              <button className="btn" type="submit">
                Add Vinyl
              </button>
            </div>
          </form>
        </div>
      </div>}
      {showImageUpload && <div className="modal-image">
        <ImageUpload doImageUrl={doImageUrl} onShowImageUpload={onShowImageUpload} fileType="vinylImg"  />
      </div>}
    </div>
  );
};

export default WithStoreConsumer(AddVinyl);