import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { WithStoreConsumer } from "../store";

const Footer = (props) => {


  return (
    <>
        <div className="footer">
            <div className="row">
                <div>
                    <p className="p-footer">Profile</p>
                </div>
                <div>
                 <p className="p-footer">Add Vinyl</p>
                </div>
            </div>

        </div>
    </>
  );
};

export default WithStoreConsumer(Footer);