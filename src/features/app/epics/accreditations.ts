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
  ignoreElements,
  mapTo
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

// import * as get from "../selectors";
import { RootState } from "../../reducers";
import { fetchAccreditations } from "../actions";

export const fetchAccreditationsEpic: Epic<RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(fetchAccreditations.request)),
    tap(() => console.log("Trying to fetch accreditations")),
    mapTo(fetchAccreditations.failure({ error: "Not yet implemented" }))
  );
