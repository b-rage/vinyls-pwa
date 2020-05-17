import React, { useEffect, useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { firebaseApp } from "./firebase";
import { StoreProvider } from './components/store';
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import RecoveryPassword from "./components/pages/RecoveryPassword";
import NavBar from './components/NavBar'

function App(props) {

  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    
  }, []);

  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user.uid", user.uid);
      setIsLoggedIn(true);
    } else {
      console.log("No User Logged In");
      setIsLoggedIn(false);
    }
  });



  return (
    <StoreProvider>
      <div className="App">
        <Route path="/login" render={() => !isLoggedIn ? <Login /> : <Redirect to="/" />} />
        <Route path="/register" render={() => !isLoggedIn ? <Register /> : <Redirect to="/" />} />
        <Route path="/recovery-psw" render={() => !isLoggedIn ? <RecoveryPassword /> : <Redirect to="/" />} />
        <NavBar />
        <Route exact path="/" render={() => isLoggedIn ? <Home  isLoggedIn={isLoggedIn} /> : <Redirect to="/login" /> } />       
      </div>
    </StoreProvider>
  );
}

export default App;

/* 

serve -s build

yarn build

surge --domain https://prova-pwa.surge.sh

 */
