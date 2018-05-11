import { RootAction } from "../../actions";
import { Epic } from "redux-observable";
import { from as ObservableFrom } from "rxjs";
import { SecureStore } from "expo";
// const secureStore = Expo.SecureStor;

import {
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  ignoreElements
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

// import * as get from "../selectors";
import { RootState } from "../../reducers";
import { getSecret, secretUpdate } from "../actions";

export const getSecretEpic: Epic<RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(getSecret.request)),
    tap(() => console.log("Got a get request")),
    switchMap(a =>
      ObservableFrom(
        SecureStore.getItemAsync(a.payload, { keychainService: "TestService" })
      )
    ),
    map(secret => {
      if (secret === null) {
        return getSecret.failure({ error: "Secret was null" });
      }
      return getSecret.success({ secret });
    })
  );

export const setSecretEpic: Epic<RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(secretUpdate.request)),
    tap(() => console.log("Got a set request")),
    switchMap(
      a =>
        ObservableFrom(
          SecureStore.setItemAsync(a.payload.key, a.payload.value, {
            keychainService: "TestService"
          })
        ),
      (action, result): RootAction[] => [
        secretUpdate.success(),
        getSecret.request(action.payload.key)
      ]
    ),
    mergeMap((x: RootAction[]) => x)
  );
