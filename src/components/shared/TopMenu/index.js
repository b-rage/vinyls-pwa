import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { WithStoreConsumer } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";


const TopMenu = (props) => {

    const [name, setName] = useState('');

    useEffect(() => {

        setTimeout(function(){ setName(props.context.pageName); }, 100);
        console.log('topmenu---------', name)
        

    },[props.context.pageName]);

    const gotoHome = () => {
        props.history.push('/index');
    }

    const gotoContacts = () => {
        props.history.push('/contacts');
    }


  return (
      <div className="row top-menu">
          <div className={name == 'home' ? "top-menu-btn-active" : "top-menu-btn"} onTouchEnd={gotoHome}>
          
              <p className="top-menu-p" ><FontAwesomeIcon icon={faGlobe} className="top-menu-icon"/>HOME</p>
          </div>
          <div className={name == 'contacts' ? "top-menu-btn-active" : "top-menu-btn"} onTouchEnd={gotoContacts}>
              <p className="top-menu-p" ><FontAwesomeIcon icon={faUsers} className="top-menu-icon"/>CONTACTS</p>
          </div>
          <div className={name == 'search' ? "top-menu-btn-active" : "top-menu-btn"}>
              <p className="top-menu-p" ><FontAwesomeIcon icon={faSearch} className="top-menu-icon"/>SEARCH</p>
          </div>
          <div className={name == 'chat' ? "top-menu-btn-active" : "top-menu-btn"}>
              <p className="top-menu-p" ><FontAwesomeIcon icon={faCommentDots} className="top-menu-icon"/>CHAT</p>
          </div>
{/*           <div className={name == 'home' ? "top-menu-btn-active" : "top-menu-btn"}>
              <p className="top-menu-p" >FEEDS</p>
          </div> */}
      </div>

  );
};

export default withRouter(WithStoreConsumer(TopMenu));