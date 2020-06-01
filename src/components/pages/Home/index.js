import React, { useEffect, useState } from "react";
import { WithStoreConsumer } from "../../store";
import imageAndroidIos from '../../../assets/img/android-ios.png';
import { firebaseApp } from "../../../firebase";



const Home = (props) => {

  const [showModal, setShowModal] = useState(false);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {  
    props.context.setPageName('home');
    firebaseApp.firestore().collection('users').doc(userId).get()
      .then(doc => {
        if (doc.empty) {
          console.log('No matching documents.');
          return;
        }
        if(!doc.data().dontShowAgain) {
          setShowModal(true);
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      }); 
  },[]);

  const onClose = () => {
    setShowModal(false);
  }

  const dontShowAgain = () => {
    setShowModal(false);
    props.context.setUserInfo({...props.context.state, dontShowAgain: true});
    firebaseApp.firestore().collection('users').doc(userId).update({
      dontShowAgain: true
    });
  }
    


  return (
    <div className="home">

      {!showModal && <div className="row">

      </div>}
      {showModal && 
      <div style={{position: 'relative', minHeight: '80vh', backgroundColor: 'white'}}>
        <div style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%'}}>
          <div className="row">
            <p className="p-title">Add to homescreen's device</p>
          </div>
          <div className="row">
            <img src={imageAndroidIos}  style={{width: '100%', maxWidth: '500px'}} alt="add to homescreen" />
          </div>
          <div className="row">
            <div style={{width: '50%'}}>
              <p className="p-title">Android Chrome</p>
            </div>
            <div style={{width: '50%'}}>
              <p className="p-title">IOS Safari</p>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div style={{width: '50%', textAlign: 'center'}}>
              <button className="btn-inverse" onMouseUp={dontShowAgain} onTouchEnd={dontShowAgain} >Don't show again</button>
            </div>
            <div style={{width: '50%', textAlign: 'center'}}>
              <button className="btn-inverse" onMouseUp={onClose} onTouchEnd={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>}
      
    </div>
  );
};

export default WithStoreConsumer(Home);
