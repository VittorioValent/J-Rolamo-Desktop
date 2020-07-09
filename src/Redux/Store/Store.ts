import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../Reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const composeEnhancers = composeWithDevTools({
  name: "Redux",
  trace: true,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
