import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export const configureStore = () => {
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

  // configure middlewares
  const middlewares = [thunk];

  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, enhancer);

  return store;
};
