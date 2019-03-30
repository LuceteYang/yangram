import React, { Component } from "react";
import Chat from "./presenter";

class Container extends Component {
  state = {
    
  };
  constructor(props){
    super(props);
    this.myRef = React.createRef()
  }
  //이거
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate",this.props.match.params.cid)
      if (this.props.chatMessages.length > prevProps.chatMessages.length && this.props.match.params.cid == prevProps.match.params.cid) {
        // this.myRef.current.scrollTop = this.myRef.current.clientHeight
        this.loading=true;
        this.scrollToBottom();
        this.myRef.current.addEventListener('scroll', this.handleScroll);
      }
      if (this.props.chatMessages.length == prevProps.chatMessages.length && this.props.match.params.cid == prevProps.match.params.cid) {
        this.loading=false;
      }
  }
    scrollToBottom = () => {
        this.myRef.current.scrollTop = this.myRef.current.clientHeight
    }
    loading = true
    handleScroll =  (event)=> {
      if(this.myRef.current.scrollTop<2){
        if(this.loading){
          const { getMessageList } = this.props;
          this.loading=false;
          getMessageList(this.props.match.params.cid,this.props.chatMessages[0].id);
        }
      }
      
    }
  componentDidMount() {
    console.log("componentDidMount",this.props.match.params.cid)
    const { getMessageList } = this.props;
    getMessageList(this.props.match.params.cid,0);
  }
  componentWillUnmount() {
    console.log("componentWillUnmount",this.props.match.params.cid)
    const { resetMessageList } = this.props;
    resetMessageList()
    this.myRef.current.removeEventListener('scroll', this.handleScroll);
  }
//이거랑
componentWillReceiveProps(nextProps) {
  console.log("componentWillReceiveProps",this.props.match.params.cid)
    if (nextProps.match.params.cid !== this.props.match.params.cid) {
      const { getMessageList } = this.props;
      getMessageList(nextProps.match.params.cid,0);
    }
  }
  render() {
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