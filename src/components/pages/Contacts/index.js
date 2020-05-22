import React, { useEffect } from "react";
import { WithStoreConsumer } from "../../store";


const Contacts = (props) => {

    useEffect(() => {
        props.context.setPageName('contacts')
        console.log('CONTACTS---------')
    
    },[]);

  return (
    <div className="home">
      <div className="row">

      </div>
      CONTACTS
      
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

export default WithStoreConsumer(Contacts);