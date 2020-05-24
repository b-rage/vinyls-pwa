import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { WithStoreConsumer } from "../store";
import { firebaseApp } from '../../firebase';
import image from '../../assets/img/logo192.png';

const NavBar = (props) => {

    const [showMenu, setShowMenu] = useState(null);
    const avatarImgUrl = props.context.userInfo.avatarImgUrl;

    useEffect(() => {
      const userId = sessionStorage.getItem('userId');
      setShowMenu(props.context.showMenu);
      getUserInfo(userId);     
    }, []);

    const getUserInfo = (userId) => {
      try { 
        firebaseApp.database().ref("users")
          .child(userId).once('value', snapshot => {
              props.context.setUserInfo(snapshot.val());
              console.log('userInfo', snapshot.val())  
            return snapshot.val();
          });           
      } catch (error) {
          console.log('error', error);
      } 
    }

    const onLogout = () => {
      firebaseApp.auth().signOut()
        .then(() => {
            sessionStorage.removeItem('userId');
            props.history.push('/');
        })
        .catch(err => {
            console.log('err', err);
        })
    }

    const onShowMenu = () => {
        props.context.setShowMenu(!showMenu);
        setShowMenu(!showMenu);
    }

    const onHome = () => {
        props.context.setShowMenu(!showMenu);
        setShowMenu(!showMenu);
    }
  return (
    <>
      <div className="navbar">
        <div className="nav-div" onClick={onShowMenu}>
          <img src={image} alt="logo-vinyls" className="logo-navbar"/>
        </div>
       <div className="nav-div-right">
        <div className="nav-div-avatar">
         {/*  <p className="p">{props.context.userInfo.username}</p> */}
          <img className='img-profile-small' src={avatarImgUrl ? avatarImgUrl : './img/icon-profile.png'} ></img>
        </div>
        <div className="nav-div-menu">
          <FontAwesomeIcon icon={faEllipsisV} onClick={onShowMenu} className="ellipsis-menu-icon"/>
        </div>
        </div>
      </div>
      {showMenu && <div>
        <ul className="main-nav">
          <li className="nav-links-li" onClick={onHome}>
            <a href="#" className="nav-links">
              Home
            </a>
          </li>
          <li  className="nav-links-li">
            <a href="#" className="nav-links">
              Products
            </a>
          </li>
          <li  className="nav-links-li">
            <a href="#" className="nav-links">
              About Us
            </a>
          </li>
          <li  className="nav-links-li">
            <a href="#" className="nav-links">
              Contact Us
            </a>
          </li>
          <li  className="nav-links-li">
            <a onClick={onLogout} className="nav-links">
              Logout
            </a>
          </li>
        </ul>
      </div>}
    </>
  );
};

export default withRouter(WithStoreConsumer(NavBar));
