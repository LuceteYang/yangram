import React from "react";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";

const ConversationAdd = (props, context) => (
  <>
    <div className={styles.newConversationTitle}>
      <span>새 메시지</span><span onClick={()=>{props.newConversationShowFunc(false)}}><Ionicon className={styles.closeIcon} icon="ios-close"/></span>
    </div>
    <div className={styles.usersSearch}>
      <div className={styles.searchBox}>
          <Ionicon icon="ios-search-outline" className={styles.searchIcon}/>
          <input 
            className={styles.searchInput} 
            type="text" 
            placeholder="닉네임 검색하기"
            value={props.searchUserValue}
            onChange={props.handleInputChange}
            />
      </div>
    </div>
    <div className={styles.searchUserList}>
      {props.userList.map(user => (
          <UserList user={user} key={user.id} addConversation={props.addConversation} />
          ))}
    </div>
  </>
);
const UserList = props => (
  <div className={styles.item} onClick={() => { props.addConversation(props.user)}} >
    <div className={styles.image}>
      <img src={props.user.profile_image || require("images/noPhoto.jpg")} alt="" className={styles.image} />
    </div>
    <div className={styles.content}>
        <span className={styles.name}>{props.user.username}</span>
        <div className={styles.meta}>{props.user.name}</div>
        <div className={styles.messageData}></div>
    </div>
  </div>
)
export default ConversationAdd;