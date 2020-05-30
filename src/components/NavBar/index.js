import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { WithStoreConsumer } from "../store";
import { firebaseApp } from '../../firebase';
import image from '../../assets/img/logo192.png';
import { useAddToHomescreenPrompt } from "../useAddToHomescreenPrompt";

const NavBar = (props) => {

    const [showMenu, setShowMenu] = useState(null);
    const [avatarImgUrl, setAvatarImgUrl] = useState(null);

    const [prompt, promptToInstall] = useAddToHomescreenPrompt();

    useEffect(() => {
      const userId = sessionStorage.getItem('userId');
      setShowMenu(props.context.showMenu);
      getUserInfo(userId); 
    }, []);

    const getUserInfo = (userId) => {

      firebaseApp.firestore().collection('users').doc(userId).get()
         .then(doc => {
            if (doc.empty) {
              console.log('No matching documents.');
              return;
            }
            props.context.setUserInfo(doc.data());
            console.log('props.context.userInfo', props.context.userInfo)
            if(props.context.userInfo && props.context.userInfo.avatarImgUrl) {
              setAvatarImgUrl(props.context.userInfo.avatarImgUrl);
      }
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
        <div className="nav-div" onTouchEnd={onShowMenu}>
          <img src={image} alt="logo-vinyls" className="logo-navbar"/>
        </div>
       <div className="nav-div-right">
        <div className="nav-div-avatar">
         {/*  <p className="p">{props.context.userInfo.username}</p> */}
          <img className='img-profile-small' src={avatarImgUrl ? avatarImgUrl : './img/icon-profile.png'} ></img>
        </div>
        <div className="nav-div-menu" onTouchEnd={onShowMenu}>
          <FontAwesomeIcon icon={faEllipsisV} className="ellipsis-menu-icon"/>
        </div>
        </div>
      </div>
      {showMenu && <div>
        <ul className="main-nav">
          <li className="nav-links-li" onTouchEnd={promptToInstall}>
            <a href="#" className="nav-links">
              Add to Home Screen
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
          <li  className="nav-links-li" onTouchEnd={onLogout}>
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
