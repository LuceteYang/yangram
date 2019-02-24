import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Profile = (props, context) => (
  <div className={styles.actions}>
      <button className={styles.button} onClick={props.logout}>
        {context.t("Log Out")}
      </button>
  </div>
);

Profile.propTypes = {
  logout: PropTypes.func.isRequired
};

Profile.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Profile;