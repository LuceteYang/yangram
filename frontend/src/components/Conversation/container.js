import React, { Component } from "react";
import Conversation from "./presenter";

class Container extends Component {
  render() {
    return <Conversation {...this.props} />;
  }
}

export default Container;