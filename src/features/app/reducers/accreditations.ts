import { getType } from "typesafe-actions";

import { RootAction } from "../../actions";
import * as actions from "../actions";
import { LoadableState, Loadable } from "../../../common/Loadable";

export type State = Loadable<string[]>;

export const reducer = (
  state: State = { state: LoadableState.UNKNOWN },
  action: RootAction
): State => {
  switch (action.type) {
    case getType(actions.fetchAccreditations.request):
      return {
        state: LoadableState.PENDING
      };
    case getType(actions.fetchAccreditations.failure):
      return {
        state: LoadableState.FAILED,
        error: action.payload.error
      };
    case getType(actions.fetchAccreditations.success):
      return {
        state: LoadableState.LOADED,
        item: action.payload.accreditations
      };
  }
  return state;
};
