import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Conversation = (props, context) => (
  <>
    <Link
      className={styles.item}
      to={{ pathname: '/chat/'+props.conversation.conversation_id}}
      key={props.conversation.conversation_id}>
    <div className={styles.image}>
        <img src={props.conversation.conversation_user_list[0].profile_image || require("images/noPhoto.jpg")} alt="" className={styles.image} />
    </div>
    <div className={styles.content}>
        <span className={styles.name}>{props.conversation.conversation_user_list[0].username}</span>
      <div className={styles.meta}>
        {props.conversation.message_created_at}
      </div>
      <div className={styles.messageData}>
        {props.conversation.message}
      </div>
    </div>
    </Link>
  </>
);

Conversation.propTypes = {

};

Conversation.contextTypes = {

};

export default Conversation;