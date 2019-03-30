import React, { Component } from "react";
import Chat from "./presenter";

class Container extends Component {
  state = {
    inputMessage: ""
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
        if(prevProps.chatMessages.length>0 && prevProps.chatMessages[0].id != this.props.chatMessages[0].id){
          console.log("페이징")
          this.scrollToClient();
        }else{
          console.log("새메시지 추가, 첫 로딩")
          this.scrollToBottom();
        }
      }
  }
  componentDidMount() {
    console.log("componentDidMount",this.props.match.params.cid)
    const { getMessageList } = this.props;
    getMessageList(this.props.match.params.cid,0);
    this._connectwebsocket(this.props.match.params.cid)
    this.myRef.current.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    console.log("componentWillUnmount",this.props.match.params.cid)
    const { resetMessageList } = this.props;
    resetMessageList()
    this.myRef.current.removeEventListener('scroll', this.handleScroll);
    this.ws.close();
  }
  //이거랑
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps",this.props.match.params.cid)
    if (nextProps.match.params.cid !== this.props.match.params.cid) {
      const { getMessageList } = this.props;
      this.ws.close();
      getMessageList(nextProps.match.params.cid,0);
      this._connectwebsocket(nextProps.match.params.cid)
      this.myRef.current.addEventListener('scroll', this.handleScroll);
    }
  }
  scrollToClient = () => {
      this.myRef.current.scrollTop = this.myRef.current.clientHeight
  }
  scrollToBottom = () => {
      this.myRef.current.scrollTop = this.myRef.current.scrollHeight
  }
  loading = true
  handleScroll =  (event)=> {
    if(this.myRef.current.scrollTop<2){
      console.log(this.loading)
      if(this.loading){
        const { getMessageList } = this.props;
        this.loading=false;
        if(this.props.chatMessages[0]){
          getMessageList(this.props.match.params.cid,this.props.chatMessages[0].id);  
        }
      }
    }
  }
  ws
  _connectwebsocket(cid){
    const webURL = `ws://localhost:8000/ws/chat/${cid}/`
    this.ws = new WebSocket(webURL)
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      const result = JSON.parse(evt.data)
      this.props.addBackMessageList(result.message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
    }
  }
  _handleKeyPress = event => {
    if(event.charCode == 13){
      event.preventDefault();
      this._sendMessage()      
    }
  }
  _sendMessage = ()=>{
    if(this.state.inputMessage==="") return
      this.ws.send(JSON.stringify({
        'type':'group',
        'message': this.state.inputMessage
    }))
    this.setState({
      "inputMessage": ""
    });
  }
  _handleInputChange = event => {
    const { target: { value, name } } = event;
    this.setState({
      "inputMessage": value
    });
  };  
  render() {
    return (
      <Chat
        {...this.props}
        {...this.state}
        refProp={this.myRef}
        sendMessage={this._sendMessage}
        handleInputChange={this._handleInputChange}
        handleKeyPress= {this._handleKeyPress}
      />
    );
  }
}

export default Container;