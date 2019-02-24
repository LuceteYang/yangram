import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: "",
    errorMessage:""
  };
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    usernameLogin: PropTypes.func.isRequired
  };
  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <LoginForm
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        usernameValue={username}
        passwordValue={password}
        errorMessage={errorMessage}
        handleFacebookLogin={this._handleFacebookLogin}
        handleUsernameLogin={this._handleUsernameLogin}
      />
    );
  }
  _handleInputChange = event => {
    const { target: { value, name } } = event;
    this.setState({
      [name]: value
    });
  };
  _handleSubmit = event => {
    const { usernameLogin } = this.props;
    const { username, password } = this.state;
    event.preventDefault();
    usernameLogin(username, password);
  };
  _handleFacebookLogin = response => {
      const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };
}

export default Container;