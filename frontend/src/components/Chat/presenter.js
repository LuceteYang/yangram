import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Chat = (props, context) => (
  <>
  /*<div style={{minHeight: props.windowHeight-105, maxHeight: props.windowHeight-105}}>*/
        <div className={styles.conversationInfo}>
          {% for participant in other_participations %}
                {{ participant.participant_user__display_name }} 
                <span>
                {% if participant.participant_user__business_field %}
                  {{ participant.participant_user__business_field }}
                {% endif %}
                </span>
          {% endfor %}
        </div>
        <div className={styles.messageList}>
          <div className={styles.messages}>
              {% for conv_message in conversation_messages reversed %}
                <div class="{% if conv_message.is_mine == True %}self{% endif %} message" data-mid="{{conv_message.id}}">
                  <div className={styles.content}>
                    {{ conv_message.message| linebreaks | urlize | url_target_blank }}
                  </div>
                  <div className={styles.messageDate}>
                    {{ conv_message.created_at |date:'H:i' | customtime }}
                  </div>
                </div>
                {% with previous_element=conversation_messages|reversePrevious:forloop.counter0 %}
                  {{ previous_element |safe}}
                {% endwith %}
              {% endfor %}  
          </div>
        </div>
        <div className={styles.messageFormSection}>
            <form id="message-form" className={styles.messageForm} action="/conversations/{{other_participations.0.conversation_id}}/message/" method="post">
              {% csrf_token %}
                  <textarea id="conversation-message-input" className={styles.message} name="message" placeholder="메시지 입력" required></textarea>
                  <div id="btn-send-message">보내기</div>
            </form>
          </div>
  </>
);

Chat.propTypes = {
  
};

Chat.contextTypes = {
  
};

export default Chat;