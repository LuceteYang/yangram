import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: "",
    errorExist: false
  };
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    usernameLogin: PropTypes.func.isRequired,
    newErrorExist: PropTypes.bool.isRequired,
  };
  componentWillReceiveProps = nextProps => {
    const { newErrorExist } = nextProps;
    if(newErrorExist){
      this.setState({
        errorExist: true
      });
    }
  };
  render() {
    const { username, password, errorExist } = this.state;
    return (
      <LoginForm
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        usernameValue={username}
        passwordValue={password}
        errorExist={errorExist}
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
    if(!username || !password){
      return this.setState({
        errorExist: true
      });
    }
    if(password.length<8){
      return this.setState({
        errorExist: true
      });
    }
    usernameLogin(username, password);
  };
  _handleFacebookLogin = response => {
      const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };
}

export default Container;