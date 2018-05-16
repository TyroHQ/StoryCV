import { Epic } from "redux-observable";
import {
  filter,
  mapTo,
  withLatestFrom,
  switchMap,
  map,
  tap,
  catchError
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootAction } from "../../actions";
import { RootState } from "../../reducers";
import { fetchAccreditations } from "../actions";
import { ajax as rxajax, AjaxRequest, ajax } from "rxjs/ajax";
import { toRXAjax, Request, canonicalRequest } from "../../../common/ajax";
import { Observable, from, of } from "rxjs";
import { AUTH_STATE } from "../../auth/reducers";
import { Wallet } from "ethers";

// const secureStore = Expo.SecureStor;
interface LoggedInState {
  state: AUTH_STATE.LOGGED_IN;
  privateKey: string;
  publicKey: string;
  mnemonicPhrase: string;
}
const privateKeys = (state$: Observable<RootState>) =>
  state$.pipe(
    map(s => s.auth),
    filter((s): s is LoggedInState => s.state === AUTH_STATE.LOGGED_IN),
    map(s => s.privateKey)
  );

// import * as get from "../selectors";
export const fetchAccreditationsEpic: Epic<RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(fetchAccreditations.request)),
    // tap(() => console.log("Trying to fetch accreditations")),
    withLatestFrom(privateKeys(state$)),
    switchMap(([action, privateKey]) => {
      const wallet = new Wallet(privateKey);
      const address = wallet.address;
      const r: Request = {
        method: "get",
        scheme: "https",
        host: "vus67hiepd.execute-api.eu-west-1.amazonaws.com",
        path: `/dev/accreditations/${address}`
      };
      const Authorization = wallet.signMessage(canonicalRequest(r));
      r.headers = { Authorization };
      return rxajax(toRXAjax(r));
    }),
    tap(a => console.log("Request succeeded") || console.log(a)),
    mapTo(fetchAccreditations.failure({ error: "Not yet implemented" })),
    catchError(
      e =>
        console.error("things broke") ||
        console.error(e) ||
        of(fetchAccreditations.failure({ error: e.message }))
    )
  );
