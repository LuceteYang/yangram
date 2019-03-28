import React, { Component } from "react";
import SearchConversation from "./presenter";

class Container extends Component {
  render() {
    return <SearchConversation {...this.props} />;
  }
}

export default Container;