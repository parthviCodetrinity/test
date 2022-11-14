import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reduxReducer from '../reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
const composeEnhancers = composeWithDevTools({
  });
  const store = createStore(
    reduxReducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );
export default store;
