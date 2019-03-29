import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";
import Conversation from "components/Conversation";
import SearchConversation from "components/SearchConversation";
import ConversationAdd from "components/ConversationAdd";
import Chat from "components/Chat"
import { Route } from "react-router-dom";
const ChatContainer = (props, context) => (
  <div className={styles.conversationsContainer}>
      <div className={styles.conversationsColumn}>
    		<div className={styles.conversationsInfo}>
		       안읽은 대화({props.conversations.filter(function(x){return x.is_read==0}).length}) 
		       <div className={styles.btnNewMessage} onClick={()=>{props.newConversationShowFunc(true)}}><span>+ 새 메시지</span></div>
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
                <div className={styles.searchMessageSection}>
                  <SearchConversation />
                </div>
              )
            }
            {
              props.searchInput.length === 0 && (
                <div className={styles.userConversationSection}>
                  <div className={styles.userConversations}>
                      {props.conversations.map(conversation => {
                        return (<Conversation conversation={conversation} key={conversation.conversation_id} />)
                      })}
                  </div>
                </div>
              )
            }
        </div>
      </div>
      <div className={styles.messagesColumn}>
        {
          props.newConversationShow === false && (
            <Route exact path="/chat/:cid" render={(routeProps) => <Chat {...routeProps} windowHeight={props.windowHeight} />}/>
          )
        }
        {
          props.newConversationShow === true && (
            <div className={styles.newConversationSection} style={{minHeight: props.windowHeight-105, maxHeight: props.windowHeight-105}}>
                <ConversationAdd newConversationShowFunc={props.newConversationShowFunc}/>
            </div>
          )
        }
        {
          props.newConversationShow === false && (
            <Route exact path="/chat" render={() => <MessagesSection windowHeight={props.windowHeight} />}/>
          )
        }
      </div>
  </div>
);

const MessagesSection = props =>  (
    <div className={styles.messagesSection}>
    <div className={styles.recommendMessage} style={{minHeight: props.windowHeight-105, maxHeight: props.windowHeight-105}}>
      <span className={styles.message}>
        새 메시지를 눌러서 대화를 시작해보세요!
      </span>
    </div>
  </div>
)

ChatContainer.propTypes = {
  
};

ChatContainer.contextTypes = {
  
};

export default ChatContainer;