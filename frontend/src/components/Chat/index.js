import { connect } from "react-redux";
import { actionCreators as chatActions } from "redux/modules/chat";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { chat: { conversations } } = state;
  return {
    conversations
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getConversationList: (page) => {
      dispatch(chatActions.getConversationList(page));
    },
    getSearchConversation: (msg) => {
      dispatch(chatActions.getSearchConversation(msg));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);