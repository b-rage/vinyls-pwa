import React, { useEffect, useState } from "react";
import { WithStoreConsumer } from "../../store";
import { firebaseApp, userRef } from "../../../firebase";
import ImageUpload from '../../shared/ImageUpload';



const Profile = (props) => {

    const [imageUrl, setImageUrl] = useState('');
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        props.context.setPageName('profile');  
    },[]);

    const doImageUrl = (url) => {
      setImageUrl(url);

      userRef.child(userId).update({
        avatarImgUrl: url
    });
    }

  return (
    <div className="profile">
      <ImageUpload doImageUrl={doImageUrl} fileType="userImg"  />
      </div>
  );
};

export default WithStoreConsumer(Profile);