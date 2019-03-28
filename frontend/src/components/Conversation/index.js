import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Conversation = (props, context) => {
  let parseUserList = JSON.parse(props.conversation['conversation_user_list'])
  return (
    <>
    <Link
      className={styles.item}
      to={{ pathname: '/chat/'+props.conversation.conversation_id}}
      key={props.conversation.conversation_id}
      style={{backgroundColor: props.conversation.is_read!=0?'#f9f9fc':'white'}}
    >
    <div className={styles.image}>
        <img src={parseUserList[0].profile_image ? '/media/'+parseUserList[0].profile_image : require("images/noPhoto.jpg")} alt="" className={styles.image} />
    </div>
    <div className={styles.content}>
        <span className={styles.name}>{parseUserList[0].username}</span>
      <div className={styles.meta}>
        {props.conversation.message_created_at}
      </div>
      <div className={styles.messageData}>
        {props.conversation.message || "아직 대화 내용이 없습니다."}
      </div>
    </div>
    </Link>
  </>
)
};

Conversation.propTypes = {
  
};

Conversation.contextTypes = {
  
};
export default Conversation;