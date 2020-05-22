import React, { useEffect, useState } from "react";
import { Route, withRouter, Redirect } from 'react-router-dom';
import { firebaseApp } from "./firebase";
import { StoreProvider } from "./components/store";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import RecoveryPassword from "./components/pages/RecoveryPassword";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Contacts from "./components/pages/Contacts";
import TopMenu from "./components/shared/TopMenu";
import Profile from "./components/pages/Profile";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {}, []);

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
        <Route
          exact
          path="/"
          render={() => (!isLoggedIn ? <Login /> : <Redirect to="/index" />)}
        />
        <Route
          exact
          path="/register"
          render={() => (!isLoggedIn ? <Register /> : <Redirect to="/index" />)}
        />
        <Route
          exact
          path="/recovery-psw"
          render={() =>
            !isLoggedIn ? <RecoveryPassword /> : <Redirect to="/index" />
          }
        />
        {isLoggedIn ? (
          <>
            <NavBar />
            <TopMenu/>
            <Footer />
            </>
        ) : null}
            <Route exact path="/index" render={() =>
                isLoggedIn ? (
                  <Home isLoggedIn={isLoggedIn}/>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route exact path="/contacts" render={() =>
                isLoggedIn ? (
                  <Contacts isLoggedIn={isLoggedIn}/>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route exact path="/profile" render={() =>
                isLoggedIn ? (
                  <Profile isLoggedIn={isLoggedIn}/>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          
      </div>
    </StoreProvider>
  );
}

export default withRouter(App);

/* 

serve -s build

yarn build

surge --domain https://prova-pwa.surge.sh

 */
