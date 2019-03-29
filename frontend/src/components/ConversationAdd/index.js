import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as chatActions } from "redux/modules/chat";
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
      dispatch(chatActions.getConversationList(0))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);