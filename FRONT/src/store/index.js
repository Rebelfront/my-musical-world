// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';

// == Import : local
import rootReducer from 'src/reducers';
// import logMiddleware from '../middleware/logMiddleware';
import authenticationMW from 'src/middleware/authenticationMW';

// == Enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    // logMiddleware,
    authenticationMW,
  ),
);

// == Store
const store = createStore(
  rootReducer,
  // preloadedState,
  enhancers,
);

// == Export
export default store;
