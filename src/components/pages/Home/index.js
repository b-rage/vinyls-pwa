import React, { useEffect, useState } from "react";
import { WithStoreConsumer } from "../../store";
import imageAndroidIos from '../../../assets/img/android-ios.png';



const Home = (props) => {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => { 
    let dontShowAgain = props.context.userInfo && props.context.userInfo.dontShowAgain;
    props.context.setPageName('home');
    if(dontShowAgain) {
      setShowModal(true);
    }
  },[]);

    


  return (
    <div className="home">

      {showModal && <div className="row">

      </div>}
      {!showModal && 
      <div style={{position: 'relative', minHeight: '80vh'}}>
        <div style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%'}}>
          <div className="row">
            <p className="p-title">Add to homescreen's device</p>
          </div>
          <div className="row">
            <img src={imageAndroidIos}  style={{width: '100%', maxWidth: '500px'}} alt="add to homescreen image" />
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
              <button className="btn-inverse" >Don't show again</button>
            </div>
            <div style={{width: '50%', textAlign: 'center'}}>
              <button className="btn-inverse">Close</button>
            </div>
          </div>
        </div>
      </div>}
      
    </div>
  );
};

export default WithStoreConsumer(Home);
