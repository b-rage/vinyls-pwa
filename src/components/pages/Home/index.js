import React, { useEffect } from "react";
import signOut from "../../../api/signOut";
import { WithStoreConsumer } from "../../store";

const Home = (props) => {
  /*     useEffect(() => {
        setTimeout(() => props.context.setIsLoggedIn(props.isLoggedIn), 500);
      }, [props.isLoggedIn]); */

  const onLogout = () => {
    signOut();
  };

  return (
    <div className="home">
      home
      
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

export default WithStoreConsumer(Home);
