import { Epic } from "redux-observable";
import { filter, ignoreElements, mapTo, tap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootAction } from "../../actions";
import {
  clearKeys,
  getKeysFromMnemonic,
  getKeysFromStorage,
  loggedIn
} from "../../auth/actions";
import { RootState } from "../../reducers";
import { fetchAccreditations } from "../actions";

// const secureStore = Expo.SecureStor;

// import * as get from "../selectors";
export const kickoffEpic: Epic<RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(loggedIn)),
    mapTo(fetchAccreditations.request())
  );

export const errorDisplay: Epic<RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(
      isActionOf([
        fetchAccreditations.failure,
        clearKeys.failure,
        getKeysFromMnemonic.failure,
        getKeysFromStorage.failure
      ])
    ),
    // TODO: show something to user?
    tap(action => console.error(action.payload.error)),
    ignoreElements()
  );
