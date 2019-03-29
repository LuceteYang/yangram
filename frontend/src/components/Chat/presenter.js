import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Chat = (props, context) => (
  <>
    <div className={styles.conversationInfo}>
      { props.participatantInfo.participant_user__username}
    </div>
    <div className={styles.messageList} style={{minHeight: props.windowHeight-340, maxHeight: props.windowHeight-340}}>
      <div className={styles.messages} ref={props.refProp}>
        {props.chatMessages.map(message => {
          return (<Message message={message} participantId={props.participatantInfo.participant_user__id} key={message.id} />)
        })}
      </div>
    </div>
    <div className={styles.messageFormSection}>
      <form id="message-form" className={styles.messageForm} action="/conversations/{{other_participations.0.conversation_id}}/message/" method="post">
        <textarea id="conversation-message-input" className={styles.message} name="message" placeholder="메시지 입력" required></textarea>
        <div className={styles.btnSendMessage}>보내기</div>
      </form>
    </div>
</>
  )
const Message =  props =>  {
  const completedClass = props.participantId==props.message.participant__participant_user__id ? '' : styles.self;

  return(
    <div className={ `${styles.message} ${completedClass}`}>
    <div className={styles.content}>
      {props.participantId}
      {props.message.message}
      {props.message.participant__participant_user__id}
    </div>
    <div className={styles.messageDate}>
      {props.message.created_at}
    </div>
  </div>
)
}
Chat.propTypes = {
  
};

Chat.contextTypes = {
  
};

export default Chat;