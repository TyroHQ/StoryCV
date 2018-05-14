import { combineReducers } from "redux";

import { RootAction } from "../../actions";
import * as accreditations from "./accreditations";

export type State = {
  readonly accreditations: accreditations.State;
};

export const reducer = combineReducers<State, RootAction>({
  accreditations: accreditations.reducer
});
