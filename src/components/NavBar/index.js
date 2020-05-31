import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { WithStoreConsumer } from "../store";
import { firebaseApp } from '../../firebase';
import image from '../../assets/img/logo192.png';


const NavBar = (props) => {

    const [showMenu, setShowMenu] = useState(false);
    const [avatarImgUrl, setAvatarImgUrl] = useState(null);



    useEffect(() => {
      const userId = sessionStorage.getItem('userId');
      setShowMenu(props.context.showMenu);
      getUserInfo(userId); 
    }, [props.context.userInfo.avatarImgUrl]);

    const getUserInfo = (userId) => {

      firebaseApp.firestore().collection('users').doc(userId).get()
         .then(doc => {
            if (doc.empty) {
              console.log('No matching documents.');
              return;
            }
            props.context.setUserInfo(doc.data());
            if(doc.data() && doc.data().avatarImgUrl) {
              setAvatarImgUrl(doc.data().avatarImgUrl);
            }
            console.log('object', props.context.userInfo)
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
    }

    const onLogout = () => {
      setShowMenu(false);
      props.context.setShowMenu(false);
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
        <div className="nav-div" onMouseUp={onShowMenu}>
          <img src={image} alt="logo-vinyls" className="logo-navbar"/>
        </div>
       <div className="nav-div-right">
        <div className="nav-div-avatar">
         {/*  <p className="p">{props.context.userInfo.username}</p> */}
          <img className='img-profile-small' src={avatarImgUrl ? avatarImgUrl : './img/icon-profile.png'} ></img>
        </div>
        <div className="nav-div-menu" onMouseUp={onShowMenu}>
          <FontAwesomeIcon icon={faEllipsisV} className="ellipsis-menu-icon"/>
        </div>
        </div>
      </div>
      {showMenu && <div>
        <ul className="main-nav">
          <li className="nav-links-li" onTouchEnd={onHome} onMouseUp={onHome}>
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
          <li  className="nav-links-li" onTouchEnd={onLogout} onMouseUp={onLogout}>
            <a href="#" className="nav-links">
              Logout
            </a>
          </li>
        </ul>
      </div>}
    </>
  );
};

export default withRouter(WithStoreConsumer(NavBar));
