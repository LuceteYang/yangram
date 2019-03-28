// imports
import { actionCreators as userActions } from "redux/modules/user";

// actions
const CONVERSATION_LIST = "CONVERSATION_LIST";
const SEARCH_CONVERSATION = "SEARCH_CONVERSATION";
const MESSAGE_LIST = "MESSAGE_LIST";

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

function addMessageList(messages) {
  return {
    type: MESSAGE_LIST,
    messages
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
      // .then(json => dispatch(addMessageList(json)));
  };
}

function getMessageList(conversation_id, last_message_id) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`/conversations/${conversation_id}/messages/?last_message_id${last_message_id}`, {
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
    .then(json => dispatch(addMessageList(json)));
  };
}

// Initial State

const initialState = {
	conversations:[],
	searchConversations:[],
	chatMessages:[]
};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case CONVERSATION_LIST:
      return applySetConversation(state, action);
    case SEARCH_CONVERSATION:
      return applySetSearchConversation(state, action);
    case MESSAGE_LIST:
      return applyAddMessageList(state, action);
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
function applyAddMessageList(state, action) {
  const { messages } = action;
  const { chatMessages } = state
 //  return {
	//     ...state,
	//     chatMessages: [...chatMessages, ...messages]
	// }
  return {...state}
}

// Exports

const actionCreators = {
  getConversationList,
  getSearchConversation,
  addConversations,
  getMessageList
};

export { actionCreators };

// Export reducer by default

export default reducer;

