import React from "react";
<<<<<<< HEAD
import PropTypes from "prop-types";
=======
>>>>>>> a26719cc8c0e86697c142894d364778ec8ff97f0
import styles from "./styles.module.scss";

const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.column}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
<<<<<<< HEAD
          <li className={styles.listItem}>{context.t("About Us")}</li>
          <li className={styles.listItem}>{context.t("Support")}</li>
          <li className={styles.listItem}>{context.t("Blog")}</li>
          <li className={styles.listItem}>{context.t("Press")}</li>
          <li className={styles.listItem}>{context.t("API")}</li>
          <li className={styles.listItem}>{context.t("Jobs")}</li>
          <li className={styles.listItem}>{context.t("Privacy")}</li>
          <li className={styles.listItem}>{context.t("Terms")}</li>
          <li className={styles.listItem}>{context.t("Directory")}</li>
          <li className={styles.listItem}>{context.t("Language")}</li>
=======
          <li className={styles.listItem}>About Us</li>
          <li className={styles.listItem}>Support</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Press</li>
          <li className={styles.listItem}>API</li>
          <li className={styles.listItem}>Jobs</li>
          <li className={styles.listItem}>Privacy</li>
          <li className={styles.listItem}>Terms</li>
          <li className={styles.listItem}>Directory</li>
          <li className={styles.listItem}>Language</li>
>>>>>>> a26719cc8c0e86697c142894d364778ec8ff97f0
        </ul>
      </nav>
    </div>
    <div className={styles.column}>
      <span className={styles.copyright}>© 2019 Yangram</span>
    </div>
  </footer>
);
<<<<<<< HEAD
Footer.contextTypes = {
  t: PropTypes.func.isRequired
};

=======
>>>>>>> a26719cc8c0e86697c142894d364778ec8ff97f0

export default Footer;