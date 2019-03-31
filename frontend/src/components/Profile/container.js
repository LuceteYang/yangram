import React, { Component } from "react";
import Profile from "./presenter";
import axios from 'axios';

class Container extends Component {
	state = {
	    userData:{
	    	"profile_image":null,
	    	"username":null
	    }
	};
	componentDidMount() {
      let axiosConfig = {
        headers: {
            Authorization: `JWT ${this.props.token}`
        }
      };
      axios.get(`/users/`,axiosConfig)
        .then(res => {
		    this.setState({
		      userData: res.data
		    });
        })
	}
	_onChange = (e) =>{
	    const files = Array.from(e.target.files)
	    console.log(files)
	    // this.setState({ uploading: true })

	    const formData = new FormData()

	    files.forEach((file, i) => {
	      formData.append('profile_image', file)
	    })

	    fetch(`/users/${this.state.userData.username}/`, {
	      method: 'PUT',
	      body: formData,
      	  headers: {
	        Authorization: `JWT ${this.props.token}`
	      }
	    })
	    .then(res => res.json())
	    .then(info => {
	      this.setState({ 
	        userData:{
	        	profile_image:info.profile_image,
	        	username:info.username
	        }
	      })
	    })
	}

	render() {
    	return <Profile {...this.state} {...this.props} onChange={this._onChange} />;
	}
}

export default Container;