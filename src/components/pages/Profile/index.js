import React, { useEffect, useState } from "react";
import { WithStoreConsumer } from "../../store";
import { firebaseApp, userRef } from "../../../firebase";
import ImageUpload from '../../shared/ImageUpload';



const Profile = (props) => {

    const [imageUrl, setImageUrl] = useState('');
    const [showImageUpload, setShowImageUpload] = useState(false);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        props.context.setPageName('profile'); 
        setImageUrl(props.context.userInfo.avatarImgUrl); 
    },[props.context.userInfo.avatarImgUrl]);

    const onShowImageUpload = (val) => {
      setShowImageUpload(val);
    }

    const editImage = () => {
      setShowImageUpload(true);
    }

    const doImageUrl = (url) => {
      setImageUrl(url);
      props.context.setUserInfo({...props.context.state, avatarImgUrl: url});

      userRef.child(userId).update({
        avatarImgUrl: url
    });
    }

  return (
    <div className="profile">
      {!showImageUpload && <div className="row-profile">
        <div>
          <p className="p-title">{props.context.userInfo.username}</p>
        </div>
        <div className="col-image-profile">
          <img className="image-profile" src={imageUrl ? imageUrl : './img/icon-profile.png'} alt="profile image" />
        </div>
        <div>
         <button className="btn-edit-profile" onTouchEnd={editImage}>Edit Image</button>
        </div>
      </div>}
      {showImageUpload && <div className="modal-image">
        <ImageUpload doImageUrl={doImageUrl} onShowImageUpload={onShowImageUpload} fileType="userImg"  />
      </div>}
    </div>
  );
};

export default WithStoreConsumer(Profile);