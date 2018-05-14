import { Wallet, HDNode, utils } from "ethers";
import { SecureStore } from "expo";
import { Epic } from "redux-observable";
import { from as ObservableFrom } from "rxjs";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootAction } from "../../actions";
import { RootState } from "../../reducers";
import {
  createKeys,
  getKeysFromMnemonic,
  getKeysFromStorage
} from "../actions";
import { AUTH_STATE } from "../reducers";

export const getKeysFromStorageEpic: Epic<RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getKeysFromStorage.request)),
    tap(() => console.log("Got a request to fetch keys from storage")),
    switchMap(a =>
      ObservableFrom(
        SecureStore.getItemAsync("user-mnemonic", {
          keychainService: "StoryCV"
        })
      )
    ),
    map((mnemonic: string | null) => {
      if (mnemonic === null) {
        return getKeysFromStorage.failure({
          error: "Could not retrieve mnemonic"
        });
      }

      return getKeysFromMnemonic.request({ mnemonic });
    })
  );

export const getKeysFromMnemonicEpic: Epic<RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getKeysFromMnemonic.request)),
    tap(() => console.log("Got a request to fetch keys from mnemonic")),
    withLatestFrom(state$),
    map(([action, state]) => {
      let mnemonic: string | undefined;
      if (state.auth.state === AUTH_STATE.LOGGING_IN_MNEMONIC) {
        mnemonic = state.auth.mnemonicField;
      }
      if (action.payload.mnemonic !== undefined) {
        mnemonic = action.payload.mnemonic;
      }
      if (mnemonic === undefined) {
        return getKeysFromMnemonic.failure({
          error: "Must provide a mnemonic before requesting keys"
        });
      }
      const wallet = Wallet.fromMnemonic(mnemonic);
      return getKeysFromMnemonic.success({
        privateKey: wallet.privateKey,
        publicKey: wallet.address,
        mnemonicPhrase: mnemonic
      });
    })
  );

export const createKeysEpic: Epic<RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(createKeys.request)),
    tap(() => console.log("Got a request to create new keys")),
    map(action => {
      const mnemonic = HDNode.entropyToMnemonic(utils.randomBytes(16));
      return getKeysFromMnemonic.request({ mnemonic });
    })
  );
