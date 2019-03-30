import React from "react";
import styles from "../Conversation/styles.module.scss";
import { Link } from "react-router-dom";

const SearchConversation = props => (
  	<>
	    {props.searchConversations.map(conversation =>(
          <ConversationResult conversation={conversation} key={conversation.conversation_id} />
        )
      )}
    </>
);

const ConversationResult = props => {
  let parseUserList = JSON.parse(props.conversation['conversation_user_list'])
  return (
  <Link 
    className={styles.item}
    key={props.conversation.conversation_id}
    to={{ pathname: '/chat/'+props.conversation.conversation_id}}
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
        {props.conversation.message}
      </div>
    </div>
  </Link>
  )
}

export default SearchConversation;