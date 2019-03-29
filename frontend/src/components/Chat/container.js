import React, { Component } from "react";
import Chat from "./presenter";

class Container extends Component {
  state = {
    
  };
 
  componentDidMount() {
    // const { getConversationList } = this.props;
    // getConversationList(0);
  }
  render() {
    return (
      <Chat
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default Container;