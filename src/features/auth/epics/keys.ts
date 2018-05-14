import { Wallet, HDNode, utils } from "ethers";
import { SecureStore } from "expo";
import { Epic } from "redux-observable";
import { from as ObservableFrom } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootAction } from "../../actions";
import { RootState } from "../../reducers";
import {
  createKeys,
  getKeysFromMnemonic,
  getKeysFromStorage
} from "../actions";

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
    map(action => {
      const wallet = Wallet.fromMnemonic(action.payload.mnemonic);
      return getKeysFromMnemonic.success({
        privateKey: wallet.privateKey,
        publicKey: wallet.address,
        mnemonicPhrase: action.payload.mnemonic
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
