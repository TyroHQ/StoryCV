import { combineReducers } from "redux";

import { RootAction } from "../../actions";
import * as keys from "./keys";

export type State = {
  readonly keys: keys.State;
};

export const reducer = combineReducers<State, RootAction>({
  keys: keys.reducer
});
