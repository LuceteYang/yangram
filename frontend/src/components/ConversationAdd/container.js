import React, { Component } from "react";
import ConversationAdd from "./presenter";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';
import querystring from 'querystring';


class Container extends Component {
	state = {
		searchInput:""
	};
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
      this.props.searchByUsernameUsers(value);
    }, 1000);
  };
  _addConversation = (data) =>{
    confirmAlert({
      title: data.username+'님과 대화를 시작하시겠습니까?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
              let axiosConfig = {
                headers: {
                    Authorization: `JWT ${this.props.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
              };
              let stringData = querystring.stringify({"user_id":data.id});
              axios.post(`/conversations/`,stringData,axiosConfig)
                .then(res => {
                  this.props.goChat(res.data.conversation_id)
                })
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }
  render() {
    console.log(this.props)
    return <ConversationAdd 
    	{...this.props}
        {...this.state}
    	handleInputChange={this._handleInputChange}
      addConversation={this._addConversation}
	/>;
  }
}

export default Container;