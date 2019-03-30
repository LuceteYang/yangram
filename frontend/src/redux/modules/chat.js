// imports
import { actionCreators as userActions } from "redux/modules/user";

// actions
const CONVERSATION_LIST = "CONVERSATION_LIST";
const SEARCH_CONVERSATION = "SEARCH_CONVERSATION";
const ADD_FRONT_MESSAGE_LIST = "ADD_FRONT_MESSAGE_LIST";
const ADD_BACK_MESSAGE_LIST = "ADD_BACK_MESSAGE_LIST";
const RESET_MESSAGE_LIST = "RESET_MESSAGE_LIST";
const SET_MESSAGE_LIST = "SET_MESSAGE_LIST";
const SET_PARTICIPANTANT_INFO = "SET_PARTICIPANTANT_INFO";
const SET_CONVERSATION_READ = "SET_CONVERSATION_READ";

// action creators

function setConversationList(page,list) {
  return {
    type: CONVERSATION_LIST,
    page,
    list
  };
}

function setSearchConversation(list) {
  return {
    type: SEARCH_CONVERSATION,
    list
  };
}

function addFrontMessageList(messages) {
  return {
    type: ADD_FRONT_MESSAGE_LIST,
    messages
  };
}
function setMessageList(messages) {
  return {
    type: SET_MESSAGE_LIST,
    messages
  };
}

function resetMessageList() {
  return {
    type: RESET_MESSAGE_LIST
  };
}
function setConversationRead(conversation_id){
  return {
    type: SET_CONVERSATION_READ,
    conversation_id
  };
}
function addBackMessageList(message) {
  return {
    type: ADD_BACK_MESSAGE_LIST,
    message
  };
}

function setParticipatantInfo(info) {
  return {
    type: SET_PARTICIPANTANT_INFO,
    info
  };
}


// API Actions

function getConversationList(page) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch("/conversations/?page="+page, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      }
      return response.json();
    })
    .then(json => dispatch(setConversationList(page,json['conversationList'])));
  };
}

function getSearchConversation(msg) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch("/conversations/search/?msg="+msg, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      }
      return response.json();
    })
    .then(json => dispatch(setSearchConversation(json['conversations'])));
  };
}
function addConversations(userId) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`/conversations/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'user_id':userId
      })
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
  };
}

function getMessageList(conversation_id, last_message_id) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`/conversations/${conversation_id}/messages/?last_message_id=${last_message_id}`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      }
      return response.json();
    })
    .then(json => {
      if(last_message_id==0){
          dispatch(setParticipatantInfo(json.other_participations));
          dispatch(setMessageList(json.conversation_messages));
          dispatch(setConversationRead(conversation_id))
      }else{
          dispatch(addFrontMessageList(json.conversation_messages));
      }
    })
  };
}

// Initial State

const initialState = {
	conversations:[],
	searchConversations:[],
	chatMessages:[],
  participatantInfo:{
    participant_user: {
      id: "",
      username: "",
      profile_image: null
    }
  }
};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case CONVERSATION_LIST:
      return applySetConversation(state, action);
    case SEARCH_CONVERSATION:
      return applySetSearchConversation(state, action);
    case ADD_FRONT_MESSAGE_LIST:
      return applyAddFrontMessageList(state, action);
    case ADD_BACK_MESSAGE_LIST:
      return applyAddBackMessageList(state, action);
    case SET_MESSAGE_LIST:
      return applySetMessageList(state, action);
    case RESET_MESSAGE_LIST:
      return applyReSetMessageList(state, action);
    case SET_PARTICIPANTANT_INFO:
      return applyParticipatantInfo(state, action);
    case SET_CONVERSATION_READ:
      return applyConversationRead(state, action);
    default:
      return state;
  }
}
// Reducer Functions

function applySetConversation(state, action) {
  const { page, list } = action;
  const { conversations } = state
  return {
	    ...state,
	    conversations:[...list]
	}
}

function applySetSearchConversation(state, action) {
  const { list } = action;
  return {
	    ...state,
	    searchConversations: [...list]
	}
}
function applyAddFrontMessageList(state, action) {
  const { messages } = action;
  const { chatMessages } = state
  return {
	    ...state,
	    chatMessages: [...messages,...chatMessages]
	}
}
function applyAddBackMessageList(state,action){
  const { message } = action;
  const { chatMessages } = state
  console.log('applyAddBackMessageList',message);
  return {
      ...state,
      chatMessages: [...chatMessages,message]
  }
}
function applySetMessageList(state, action) {
  const { messages } = action;
  return {
      ...state,
      chatMessages: [...messages]
  }
  return {...state}
}
function applyReSetMessageList(state, action) {
  return {
      ...state,
      participatantInfo: {
        participant_user: {
            id: "",
            username: "",
            profile_image: null
          }
        },
      chatMessages: []
  }
}
function applyParticipatantInfo(state, action){
  const { info } = action;
    return {
      ...state,
      participatantInfo: info[0]
  }
}
function applyConversationRead(state, action){
    const { conversation_id } = action;
  const { conversations } = state;
  const updatedConversation = conversations.map(conversation => {
    if (conversation.conversation_id == conversation_id) {
      return {
        ...conversation,
        is_read: true
      };
    }
    return conversation;
  });
  return { ...state, conversations: updatedConversation };
  // return {...state}
}

// Exports

const actionCreators = {
  getConversationList,
  getSearchConversation,
  addConversations,
  getMessageList,
  resetMessageList,
  addBackMessageList
};

export { actionCreators };

// Export reducer by default

export default reducer;

