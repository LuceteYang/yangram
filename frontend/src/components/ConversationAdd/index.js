import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import Container from "./container";
import { push } from "react-router-redux";

const mapStateToProps = (state, ownProps) => {
  const { user: { userList, token } } = state;
  return {
    userList,
    token
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchByUsernameUsers: (searchTerm) => {
      dispatch(userActions.searchByUsernameUsers(searchTerm));
    },
    goChat: (conversation_id)=>{
      dispatch(push('/chat/'+conversation_id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);