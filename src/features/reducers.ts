import { combineReducers } from "redux";

import { reducer as auth, State as AuthState } from "./auth";

export interface RootState {
  auth: AuthState;
}

export const reducer = combineReducers<RootState>({
  auth
});
