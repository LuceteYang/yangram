import { connect } from "react-redux";
import { actionCreators as chatActions } from "redux/modules/chat";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { chat: { chatMessages, participatantInfo } } = state;
  return {
    chatMessages,
    participatantInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMessageList: (conversation_id, last_message_id) => {
    	dispatch(chatActions.getMessageList(conversation_id, last_message_id));
    },
    resetMessageList: () =>{
		  dispatch(chatActions.resetMessageList());	
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);