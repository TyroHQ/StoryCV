import { rootEpic } from "../../features/epics";
import { reducer, RootState } from "../../features/reducers";
import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "remote-redux-devtools";

export const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools || compose;
function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [epicMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  const store = createStore(reducer, initialState!, enhancer);
  return store;
}

// pass an optional param to rehydrate state on app start
export const store = configureStore();

// export store singleton instance
export default store;
