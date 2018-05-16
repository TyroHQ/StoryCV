import { Wallet, HDNode, utils } from "ethers";
import { SecureStore } from "expo";
import { Epic } from "redux-observable";
import { from as ObservableFrom, Observable } from "rxjs";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { isActionOf, ActionsUnion } from "typesafe-actions";

import { RootAction } from "../../actions";
import { RootState } from "../../reducers";
import {
  createKeys,
  getKeysFromMnemonic,
  getKeysFromStorage
} from "../actions";
import { AUTH_STATE } from "../reducers";
import {
  STORY_KEYCHAIN_SERVICE,
  STORY_KEYCHAIN_KEYS
} from "../../../../config";

export const getKeysFromStorageEpic: Epic<RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getKeysFromStorage.request)),
    switchMap(a =>
      ObservableFrom(
        SecureStore.getItemAsync(STORY_KEYCHAIN_KEYS.PRIVATE_KEY, {
          keychainService: STORY_KEYCHAIN_SERVICE
        })
      )
    ),
    switchMap(
      (privateKey: string | null) =>
        ObservableFrom(
          SecureStore.getItemAsync(STORY_KEYCHAIN_KEYS.MNEMONIC, {
            keychainService: STORY_KEYCHAIN_SERVICE
          })
        ),
      (privateKey: string | null, mnemonic: string | null) => [
        privateKey,
        mnemonic
      ]
    ),
    map(([privateKey, mnemonicPhrase]) => {
      if (privateKey === null) {
        return getKeysFromStorage.failure({
          error: "Could not retrieve private key"
        });
      }
      if (mnemonicPhrase === null) {
        return getKeysFromStorage.failure({
          error: "Could not retrieve mnemonic"
        });
      }

      const wallet = new Wallet(privateKey);

      return getKeysFromStorage.success({
        privateKey,
        mnemonicPhrase,
        publicKey: wallet.address
      });
    })
  );

export const getKeysFromMnemonicEpic: Epic<RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getKeysFromMnemonic.request)),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      console.log("Got login request " + Date.now() / 1000);
      let mnemonic: string | undefined;
      if (state.auth.state === AUTH_STATE.LOGGING_IN_MNEMONIC) {
        mnemonic = state.auth.mnemonicField;
        console.log("Got action from state ");
      }
      if (action.payload.mnemonic !== undefined) {
        console.log("Got mnemonic from action");
        console.log(action.payload.mnemonic);
        mnemonic = action.payload.mnemonic;
      }
      if (mnemonic === undefined) {
        return [
          getKeysFromMnemonic.failure({
            error: "Must provide a mnemonic before requesting keys"
          })
        ];
      }
      let mnemonicSafe = mnemonic;
      console.log("Identified mnemonic " + mnemonic + Date.now() / 1000);
      try {
        const wallet = Wallet.fromMnemonic(mnemonicSafe);
        console.log("Generated private key " + Date.now() / 1000);

        return ObservableFrom(
          SecureStore.setItemAsync(STORY_KEYCHAIN_KEYS.MNEMONIC, mnemonic, {
            keychainService: STORY_KEYCHAIN_SERVICE
          })
            .then(() => {
              console.log(
                "Saved mnemonic in secure storage " + Date.now() / 1000
              );
              SecureStore.setItemAsync(
                STORY_KEYCHAIN_KEYS.PRIVATE_KEY,
                wallet.privateKey,
                {
                  keychainService: STORY_KEYCHAIN_SERVICE
                }
              );
            })
            .then(() => {
              console.log(
                "Saved privkey in secure storage " + Date.now() / 1000
              );
              return getKeysFromMnemonic.success({
                privateKey: wallet.privateKey,
                publicKey: wallet.address,
                mnemonicPhrase: mnemonicSafe
              });
            })
            .catch(() =>
              getKeysFromMnemonic.failure({
                error: "Could not store mnemonic in secure storage"
              })
            )
        );
      } catch (e) {
        return [getKeysFromMnemonic.failure({ error: e.message })];
      }
    })
  );

export const createKeysEpic: Epic<RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(createKeys.request)),
    tap(() =>
      console.log("Got a request to create new keys " + Date.now() / 1000)
    ),
    map(action => {
      const mnemonic = HDNode.entropyToMnemonic(utils.randomBytes(16));
      return getKeysFromMnemonic.request({ mnemonic });
    })
  );

export const clearKeysEpic: Epic<RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(getKeysFromStorage.request)),
    switchMap(a =>
      ObservableFrom(
        Promise.all([
          SecureStore.deleteItemAsync(STORY_KEYCHAIN_KEYS.MNEMONIC, {
            keychainService: STORY_KEYCHAIN_SERVICE
          }),
          SecureStore.deleteItemAsync(STORY_KEYCHAIN_KEYS.PRIVATE_KEY, {
            keychainService: STORY_KEYCHAIN_SERVICE
          })
        ])
      )
    ),
    switchMap(
      (privateKey: string | null) =>
        ObservableFrom(
          SecureStore.getItemAsync(STORY_KEYCHAIN_KEYS.MNEMONIC, {
            keychainService: STORY_KEYCHAIN_SERVICE
          })
        ),
      (privateKey: string | null, mnemonic: string | null) => [
        privateKey,
        mnemonic
      ]
    ),
    map(([privateKey, mnemonicPhrase]) => {
      if (privateKey === null) {
        return getKeysFromStorage.failure({
          error: "Could not retrieve private key"
        });
      }
      if (mnemonicPhrase === null) {
        return getKeysFromStorage.failure({
          error: "Could not retrieve mnemonic"
        });
      }

      const wallet = new Wallet(privateKey);

      return getKeysFromStorage.success({
        privateKey,
        mnemonicPhrase,
        publicKey: wallet.address
      });
    })
  );
