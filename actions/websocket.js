/* global WebSocket */

const moment = require('moment');

const socket = new WebSocket('ws://37.187.181.77:8084');

export const init = (store) => {
  socket.onopen = () => {};
  socket.onmessage = (e) => {
    const data = e.data.split('//');
    let receivedMessageId;
    const receivedMessage = {};
    const dataPayload = data[1];

    switch (data[0]) {
      case '102':
        store.dispatch({
          type: 'LOGIN_SUCCESS',
          value: {
            token: dataPayload,
          },
        });
        break;
      case '103':
        store.dispatch({
          type: 'LOGIN_FAILURE',
          undefined,
        });
        break;
      case '202':
        store.dispatch({
          type: 'ACCOUNT_CREATION_SUCCESS',
          undefined,
        });
        break;
      case '203':
        store.dispatch({
          type: 'ACCOUNT_CREATION_FAILURE',
          undefined,
        });
        break;
      case '302':
        store.dispatch({
          type: 'FOUND_PARTNER',
          value: {
            partnerUsername: dataPayload,
          },
        });
        break;
      case '303':
        if (store.getState().toggleSocket.searching === true) {
          store.dispatch({
            type: 'ATTRACT_PARTNER',
            value: {
              username: store.getState().username,
            },
          });
        }
        break;
      case '402':
        receivedMessageId = store.getState().toggleSocket.messages.length + 1;

        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        receivedMessage._id = receivedMessageId.toString();
        receivedMessage.createdAt = moment();
        receivedMessage.text = dataPayload;
        receivedMessage.user = {};
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        receivedMessage.user._id = 2;

        store.dispatch({
          type: 'RECEIVED_MESSAGE',
          value: {
            receivedMessage,
          },
        });
        break;
      default: break;
    }
  };
};

export const emit = (message) => {
  socket.send(message);
};
