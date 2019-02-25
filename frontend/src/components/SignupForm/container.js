import React, { Component } from "react";
import PropTypes from "prop-types";
import SignupForm from "./presenter";

class Container extends Component {
  state = {
    email: "",
    name: "",
    username: "",
    password: "",
    errorMessage:""
  };
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired
  };
  // {"username":["This field may not be blank."],"name":["This field may not be blank."]}
  componentWillReceiveProps = nextProps => {
    const { errorMessage } = nextProps;
    if(errorMessage){
      this.setState({
        errorMessage: errorMessage
      });
    }
  };
  render() {
    const { email, name, username, password, errorMessage } = this.state;
    return (
      <SignupForm
        emailValue={email}
        nameValue={name}
        usernameValue={username}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        errorMessage={errorMessage}
        handleFacebookLogin={this._handleFacebookLogin}
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
    const { username, password, email, name } = this.state;
    const { createAccount } = this.props;
    event.preventDefault();
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailReg.test(email)){
      return this.setState({
        errorMessage: "Enter a valid email address."
      });
    }
    if(!password){
       this.setState({
        errorMessage: "This password is too short. It must contain at least 8 characters."
      });
       return
    }
    if(password.length<8){
      this.setState({
        errorMessage: "This password is too short. It must contain at least 8 characters."
      });
      return
    }
    if(!username){
      return this.setState({
        errorMessage: "username may not be blank."
      });
    }
    if(!name){
      return this.setState({
        errorMessage: "name may not be blank."
      });
    }
    createAccount(username, password, email, name);
  };
  _handleFacebookLogin = response => {
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };
}

export default Container;