import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Profile = (props, context) => (
  <div className={styles.container}>
      <div className={styles.imageUpload}>
        <label>
          <img
            src={props.userData.profile_image ? props.userData.profile_image : require("images/noPhoto.jpg")} 
            alt={props.userData.username}
            className={styles.image}
          />
          <input className={styles.fileInput} onChange={props.onChange} id="file-input" type="file" />
        </label>
      </div>
      <div>
      	{props.userData.username}
      </div>
      <div>
  	  <button className={styles.button} onClick={props.logout}>
	    {context.t("Log Out")}
	  </button>
	  </div>
  </div>
);

Profile.propTypes = {
  logout: PropTypes.func.isRequired
};

Profile.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Profile;