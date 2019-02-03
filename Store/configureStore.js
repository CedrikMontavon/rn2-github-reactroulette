import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getRootReducer from './Reducers/rootReducer';
import { init, emit } from '../actions/websocket';

export default function getStore() {
  const store = createStore(
    getRootReducer(),
    undefined,
    applyMiddleware(thunk.withExtraArgument({ emit })),
  );

  init(store);
  return store;
}
