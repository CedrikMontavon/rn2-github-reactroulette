const send = action => (dispatch, getState, { emit }) => {
  dispatch(action);

  switch (action.type) {
    case 'AUTHENTICATE':
      emit(`101//${action.value.login}//${action.value.password}`);
      break;
    case 'CREATE_LOGIN':
      emit(`201//${action.value.login}//${action.value.password}`);
      break;
    case 'ATTRACT_PARTNER':
      emit(`301//${action.value.username}//${getState().toggleSocket.token}`);
      break;
    case 'CANCEL_ATTRACT_PARTNER':
      emit(`311//${getState().toggleSocket.token}`);
      break;
    case 'SEND_MESSAGE':
      emit(`401//${action.value.receivedMessage.text}//${getState().toggleSocket.token}`);
      break;
    default: break;
  }
};

export default send;
