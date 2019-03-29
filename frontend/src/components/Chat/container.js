import React, { Component } from "react";
import Chat from "./presenter";

class Container extends Component {
  state = {
    
  };
  constructor(props){
    super(props);
    this.myRef = React.createRef()
  }
  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop)
 
  componentDidMount() {
    const { getMessageList } = this.props;
    getMessageList(this.props.match.params.cid,0);
  }
  componentWillUnmount() {
    const { resetMessageList } = this.props;
    resetMessageList()
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.cid !== this.props.match.params.cid) {
      const { getMessageList } = this.props;
      getMessageList(nextProps.match.params.cid,0);
    }
  }
  render() {
    console.log(this.props)
    return (
      <Chat
        {...this.props}
        {...this.state}
        refProp={this.myRef}
      />
    );
  }
}

export default Container;