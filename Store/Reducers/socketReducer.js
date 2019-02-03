import { GiftedChat } from 'react-native-gifted-chat';
import NavigatorService from '../../navigator';

const initialState = {
  token: '',
  login: '',
  password: '',
  showLoader: false,
  showError: false,
  messageError: '',
  username: '',
  searching: false,
  partnerUsername: '',
  messages: [],
};

const toggleSocket = (state = initialState, action) => {
  let nextState = {
    ...state,
  };

  switch (action.type) {
    case 'AUTHENTICATE':
      nextState = {
        ...state,
        showLoader: true,
      };

      return nextState;
    case 'CREATE_LOGIN':
      nextState = {
        ...state,
        showLoader: true,
      };

      return nextState;
    case 'GOTO_CREATELOGIN':
      nextState = {
        ...state,
        showError: false,
        showLoader: false,
        messageError: '',
      };

      NavigatorService.navigate('CreateLogin');
      return nextState;
    case 'ACCOUNT_CREATION_SUCCESS':
      nextState = {
        ...state,
        showError: false,
        showLoader: false,
        messageError: '',
      };

      NavigatorService.navigate('Login');
      return nextState;
    case 'ACCOUNT_CREATION_FAILURE':
      nextState = {
        ...state,
        showError: true,
        showLoader: false,
        messageError: 'Login is already used',
      };

      return nextState;
    case 'LOGIN_SUCCESS':
      nextState = {
        ...state,
        token: action.value.token,
        showError: false,
        showLoader: false,
        messageError: '',
      };

      NavigatorService.navigate('Home');
      return nextState;
    case 'LOGIN_FAILURE':
      nextState = {
        ...state,
        showError: true,
        showLoader: false,
        messageError: 'Login or password incorrect',
      };

      return nextState;
    case 'ATTRACT_PARTNER':
      nextState = {
        ...state,
        username: action.value.username,
        searching: true,
        showLoader: true,
      };

      return nextState;
    case 'CANCEL_ATTRACT_PARTNER':
      nextState = {
        ...state,
        searching: false,
        showLoader: false,
      };

      return nextState;
    case 'FOUND_PARTNER':
      nextState = {
        ...state,
        searching: false,
        showLoader: false,
        partnerUsername: action.value.partnerUsername,
      };

      NavigatorService.navigate('Chat');
      return nextState;
    case 'SEND_MESSAGE':
      nextState = {
        ...state,
      };

      nextState.messages = GiftedChat.append(nextState.messages, action.value.receivedMessage);
      return nextState;
    case 'RECEIVED_MESSAGE':
      nextState = {
        ...state,
      };

      nextState.messages = GiftedChat.append(nextState.messages, action.value.receivedMessage);
      return nextState;
    default: return state;
  }
};

export default toggleSocket;
