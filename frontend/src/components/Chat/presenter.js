import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Chat = (props, context) => (
  <Fragment>
    <div className={styles.conversationInfo}>
      { props.participatantInfo.participant_user.username}
      
    </div>
    <div id="message-container" ref={props.refProp} className={styles.messageList} style={{minHeight: props.windowHeight-340, maxHeight: props.windowHeight-340}}>
      <div className={styles.messages}>
        {props.chatMessages.map(message => {
          return (<Message message={message} participantId={props.participatantInfo.participant_user.id} key={message.id} />)
        })}
      </div>
    </div>
    <div className={styles.messageFormSection}>
      <form className={styles.messageForm}>
        <textarea onKeyPress={props.handleKeyPress} value={props.inputMessage} onChange={props.handleInputChange} id="conversation-message-input" className={styles.message} name="message" placeholder="메시지 입력" required></textarea>
        <div className={styles.btnSendMessage} onClick={props.sendMessage}>보내기</div>
      </form>
    </div>
</Fragment>
  )

const Message =  props =>  {
  const completedClass = props.participantId==props.message.participant.participant_user.id ? '' : styles.self;
  return(
    <div className={ `${styles.message} ${completedClass}`}>
    <div className={styles.content}>
      {props.message.message.split("\n").map(function(item,key) {
          return <Fragment key={key}>{item}<br/></Fragment>
      })}
    </div>
    <div className={styles.messageDate}>
      {props.message.created_time}
    </div>
  </div>
)
}
Chat.propTypes = {
  
};

Chat.contextTypes = {
  
};

export default Chat;