import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons";
import { faCompactDisc} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { WithStoreConsumer } from "../store";

const Footer = (props) => {

  const [name, setName] = useState('');

  useEffect(() => {

    setTimeout(function(){ setName(props.context.pageName); }, 100);

  },[props.context.pageName]);

  const gotoProfile = () => {
      props.history.push('/profile');
  }

  const gotoAddVinyl = () => {
      props.history.push('/add-vinyl');
  }


  return (
    <>
        <div className="footer">
            <div className="row">
              <div className={name == 'profile' ? "bottom-menu-btn-active" : "bottom-menu-btn"} onTouchEnd={gotoProfile} onMouseUp={gotoProfile}>
                <FontAwesomeIcon icon={faUser} className="bottom-menu-icon"/>
                <p className="p-footer">Profile</p>
              </div>
              <div className={name == 'add-vinyl' ? "bottom-menu-btn-active" : "bottom-menu-btn"} onTouchEnd={gotoAddVinyl} onMouseUp={gotoAddVinyl}>
                <FontAwesomeIcon icon={faCompactDisc} className="bottom-menu-icon"/>
                <p className="p-footer">Add Vinyl</p>
              </div>
            </div>

        </div>
    </>
  );
};

export default withRouter(WithStoreConsumer(Footer));