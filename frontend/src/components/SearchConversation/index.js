import { connect } from "react-redux";
import { actionCreators as photoActions } from "redux/modules/chat";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { chat: { searchConversations } } = state;
  return {
    searchConversations
  };
};

export default connect(mapStateToProps, null)(Container);
