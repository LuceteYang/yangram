import React, { Component } from "react";
import Chat from "./presenter";

class Container extends Component {
  state = {
    conversationList:  [{"conversation_id": 1, "message": "test", "message_type": 0, "message_created_at": "2019-03-27T17:30:23.964", "conversation_user_list": "[{\"username\": \"sangmin\", \"profile_image\": \"\"}]", "is_read": 1}],
    windowHeight:0,
    searchInput:"",
    newConversationShow:false
  };
  updateDimensions() {
    console.log(window.innerHeight)
    this.setState({ windowHeight: window.innerHeight });
   }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  _handleInputChange = event => {
    const { target: { value } } = event;
    this.setState({
      searchInput: value
    });
  };
  _newConversationShowFunc = () => {
    this.setState({
      newConversationShow: true
    });
  }
  render() {
    return (
      <Chat
        {...this.props}
        {...this.state}
        handleInputChange={this._handleInputChange}
        newConversationShowFunc={this._newConversationShowFunc}
      />
    );
  }
}

export default Container;