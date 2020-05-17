import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { WithStoreConsumer } from "../store";

const NavBar = (props) => {

    const [showMenu, setShowMenu] = useState(null);

    useEffect(() => {
        setShowMenu(props.context.showMenu);
        }, []);

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
      <div className="row navbar">
        <div className="col-md-6"  onClick={onShowMenu}>
          <FontAwesomeIcon icon={faBars} className="bar" color="white"/>
        </div>
        <div className="col-md-6"></div>
      </div>
      {showMenu && <div className="row">
        <ul class="main-nav">
          <li class="nav-links-li" onClick={onHome}>
            <a href="#" class="nav-links">
              Home
            </a>
          </li>
          <li  class="nav-links-li">
            <a href="#" class="nav-links">
              Products
            </a>
          </li>
          <li  class="nav-links-li">
            <a href="#" class="nav-links">
              About Us
            </a>
          </li>
          <li  class="nav-links-li">
            <a href="#" class="nav-links">
              Contact Us
            </a>
          </li>
          <li  class="nav-links-li">
            <a href="#" class="nav-links">
              Blog
            </a>
          </li>
        </ul>
      </div>}
    </>
  );
};

export default WithStoreConsumer(NavBar);
