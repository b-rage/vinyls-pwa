import React, { useEffect } from "react";
import { WithStoreConsumer } from "../../store";


const Profile = (props) => {

    useEffect(() => {
        props.context.setPageName('profile')
        console.log('CONTACTS---------')
    
    },[]);

  return (
    <div className="home">
      <div className="row">

      </div>
      Profile
      
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home<br></br>
      <br></br>home home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home<br></br>
      <br></br>home home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home<br></br>
      <br></br>home home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home<br></br>
      <br></br>home home<br></br>
      <br></br>home home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home
      <br></br>
      home<br></br>
      <br></br>home
    </div>
  );
};

export default WithStoreConsumer(Profile);