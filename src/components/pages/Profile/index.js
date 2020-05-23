import React, { useEffect, useState } from "react";
import { WithStoreConsumer } from "../../store";
import { firebaseApp } from '../../../firebase';
import Resizer from 'react-image-file-resizer';
import {base64StringToBlob}  from 'blob-util';


const Profile = (props) => {

  const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        props.context.setPageName('profile')    
    },[]);

  const onUpload = async event => {

    let fileInput = false
    if(event.target.files && event.target.files[0]) {
        fileInput = true
    }

    if(fileInput) {

      const file = event.target.files[0];

      let _type;

      if(file.type === 'image/jpeg') {
        _type = 'JPEG';
      }else if(file.type === 'image/png') {
        _type = 'PNG';
      }
      
      const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 500, 500, _type, 100, 0,
        uri => {
          resolve(uri);
        },
        'base64'
        );
      });

      const _image = await resizeFile(file);
      const contentType = file.type;
      let b64Data;
      if(file.type === 'image/jpeg') {
        b64Data = _image.slice(23);
      }else if(file.type === 'image/png') {
        b64Data = _image.slice(22);
      }
      const blob = base64StringToBlob(b64Data, contentType);

      setTimeout(function(){ 
        const storageRef = firebaseApp.storage().ref(`/userImg/${file.name}`);
        const task = storageRef.put(blob);

        task.then(snapshot => {
            return snapshot.ref.getDownloadURL()
          }).then(downUrl => {
              setImageUrl(downUrl);
          }); 
      }, 100);

    
    }
  }

  return (
      <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
          <input className="input-class" type="file" onChange={onUpload}/>
          <img className="image-class"  src={imageUrl} alt='' />
      </>
  );
};

export default WithStoreConsumer(Profile);