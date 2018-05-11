import { getType } from "typesafe-actions";

import { RootAction } from "../../actions";
import * as actions from "../actions";

import { Loadable, LoadableState } from "../../../common/Loadable";

export type State = Loadable<string>;

export const reducer = (
  state: State = { state: LoadableState.UNKNOWN },
  action: RootAction
): State => {
  switch (action.type) {
    case getType(actions.getSecret.success):
      return {
        state: LoadableState.LOADED,
        item: action.payload.secret
      };
    case getType(actions.getSecret.request):
      return {
        state: LoadableState.PENDING
      };
    case getType(actions.getSecret.failure):
      return {
        state: LoadableState.FAILED,
        error: action.payload.error
      };
  }
  return state;
};
