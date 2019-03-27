import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";
import Conversation from "components/Conversation";

const Chat = (props, context) => (
  <div className={styles.conversationsContainer}>
      <div className={styles.conversationsColumn}>
    		<div className={styles.conversationsInfo}>
		       안읽은 대화(1) 
		       <div className={styles.btnNewMessage} onClick={props.newConversationShowFunc}><span>+ 새 메시지</span></div>
	      </div>
         <div className={styles.conversationsSearch}>
            <div className={styles.searchBox}>
                <Ionicon icon="ios-search-outline" className={styles.searchIcon}/>
                <input 
                  className={styles.searchInput} 
                  type="text" 
                  placeholder="대화 검색하기"
                  value={props.searchConversationValue}
                  onChange={props.handleInputChange}
                 />
            </div>
        </div>
        <div className={styles.conversationsList} style={{minHeight: props.windowHeight-250, maxHeight: props.windowHeight-250}}>
            {
              props.searchInput.length > 0 && (
                <SearchMessageSection/>
              )
            }
            {
              props.searchInput.length === 0 && (
                <UserConversationSection conversationList={props.conversationList} />
              )
            }
        </div>
      </div>
      <div className={styles.messagesColumn}>
        {
          props.newConversationShow === true && (
            <NewConversationSection windowHeight={props.windowHeight} />
          )
        }
        {
          props.newConversationShow === false && (
            <MessagesSection windowHeight={props.windowHeight} />
          )
        }
      </div>
  </div>
);
const SearchMessageSection = props => <div className={styles.searchMessageSection}></div>;

const UserConversationSection = props =>  (
      <div className={styles.userConversationSection}>
        <div className={styles.userConversations}>
            {props.conversationList.map(conversation => (
                <Conversation conversation={conversation} key={conversation.conversation_id} />
            ))}
        </div>
      </div>
    );

const NewConversationSection = props =>  <div className={styles.newConversationSection} style={{minHeight: props.windowHeight-105, maxHeight: props.windowHeight-105}}>newConversationSection</div>
const MessagesSection = props =>  (
    <div className={styles.messagesSection}>
    <div className={styles.recommendMessage} style={{minHeight: props.windowHeight-105, maxHeight: props.windowHeight-105}}>
      <span className={styles.message}>
        새 메시지를 눌러서 대화를 시작해보세요!
      </span>
    </div>
  </div>
)

Chat.propTypes = {
  logout: PropTypes.func.isRequired
};

Chat.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Chat;