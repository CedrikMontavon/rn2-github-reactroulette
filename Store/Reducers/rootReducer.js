import { combineReducers } from 'redux';
import toggleSocket from './socketReducer';
import toggleCameraPicture from './cameraReducer';

export default function getRootReducer() {
  return combineReducers({
    toggleSocket,
    toggleCameraPicture,
  });
}
