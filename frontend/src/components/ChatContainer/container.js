import React, { Component } from "react";
import ChatContainer from "./presenter";

class Container extends Component {
  state = {
    windowHeight:0,
    searchInput:"",
    newConversationShow:false
  };
  updateDimensions() {
    this.setState({ windowHeight: window.innerHeight });
   }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    const { getConversationList } = this.props;
    getConversationList(0);
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  searchTimeout

  _handleInputChange = event => {
    const { target: { value } } = event;
    this.setState({
      searchInput: value
    });
    if(value.length==0){
      return
    }
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.props.getSearchConversation(value);
    }, 1000);
  };
  _newConversationShowFunc = (bool) => {
    this.setState({
      newConversationShow: bool
    });
  }
  render() {
    return (
      <ChatContainer
        {...this.props}
        {...this.state}
        handleInputChange={this._handleInputChange}
        newConversationShowFunc={this._newConversationShowFunc}
      />
    );
  }
}

export default Container;