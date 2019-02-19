import React from "react";
import Ionicon from "react-ionicons";
<<<<<<< HEAD
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export const LoginForm = (props, context) => (
=======
import styles from "./styles.module.scss";

export const LoginForm = props => (
>>>>>>> a26719cc8c0e86697c142894d364778ec8ff97f0
  <div className={styles.formComponent}>
    <form className={styles.form}>
      <input type="text" placeholder="Username" className={styles.textInput} />
      <input
        type="password"
        placeholder="Password"
        className={styles.textInput}
      />
<<<<<<< HEAD
      <input type="submit" value={context.t("Login in")} className={styles.button} />
=======
      <input type="submit" value="Log in" className={styles.button} />
>>>>>>> a26719cc8c0e86697c142894d364778ec8ff97f0
    </form>
    <span className={styles.divider}>or</span>
    <span className={styles.facebookLink}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#385185" /> Log in
      with Facebook
    </span>
    <span className={styles.forgotLink}>Forgot password?</span>
  </div>
);
<<<<<<< HEAD
LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};

=======
>>>>>>> a26719cc8c0e86697c142894d364778ec8ff97f0

export const SignupForm = props => (
  <div className={styles.formComponent}>
    <h3>Sign up to see photos and videos from your friends.</h3>
    <button className={styles.button}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="white" /> Log in with
      Facebook
    </button>
    <span className={styles.divider}>or</span>
    <form className={styles.form}>
      <input type="email" placeholder="Email" className={styles.textInput} />
      <input type="text" placeholder="Full Name" className={styles.textInput} />
      <input
        type="username"
        placeholder="Username"
        className={styles.textInput}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.textInput}
      />
      <input type="submit" value="Sign up" className={styles.button} />
    </form>
    <p>
      By signing up, you agree to our <span>Terms & Privacy Policy</span>.
    </p>
  </div>
);