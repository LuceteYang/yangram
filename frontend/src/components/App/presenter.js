import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import styles from "./styles.module.scss";
import Auth from "components/Auth";
import Footer from "components/Footer";
import Navigation from "components/Navigation";
import Feed from "components/Feed";
import Explore from "components/Explore";
import Search from "components/Search";
import Profile from "components/Profile";


const App = props => (
  <Fragment>
    {props.isLoggedIn ? <Fragment><Navigation /><PrivateRoutes /></Fragment> : <PublicRoutes/>}
    <Footer />
  </Fragment>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};


const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search/:searchTerm" component={Search} />
    <Route path="/profile" component={Profile} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />,
    <Route path="/recover" render={() => "recover password"} />
  </Switch>
);

export default App;