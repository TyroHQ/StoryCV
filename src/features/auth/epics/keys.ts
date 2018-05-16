import { Wallet, HDNode, utils } from "ethers";
import { SecureStore } from "expo";
import { Epic } from "redux-observable";
import { from as ObservableFrom, Observable } from "rxjs";
import {
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
  mapTo,
  catchError
} from "rxjs/operators";
import { isActionOf, ActionsUnion } from "typesafe-actions";

import { RootAction } from "../../actions";
import { RootState } from "../../reducers";
import {
  createKeys,
  getKeysFromMnemonic,
  getKeysFromStorage,
  clearKeys
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
        // publicKey: "-- TBC --"
      });
    })
  );

const getWallet = async (mnemonic: string) => {
  await new Promise(r => setTimeout(r, 1000));

  console.log("Getting walet", mnemonic);
  const wallet = Wallet.fromMnemonic(mnemonic);
  console.log("Got wallet", wallet);
  // const wallet = {
  //   privateKey: "private",
  //   address: "address"
  // };
  return wallet;
};

export const getKeysFromMnemonicEpic: Epic<RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getKeysFromMnemonic.request)),
    withLatestFrom(state$),
    switchMap(async ([action, state]): Promise<RootAction> => {
      // console.log("Got login request " + Date.now() / 1000);
      let mnemonic: string | undefined;
      if (state.auth.state === AUTH_STATE.LOGGING_IN_MNEMONIC) {
        mnemonic = state.auth.mnemonicField;
        // console.log("Got action from state ");
      }
      if (action.payload.mnemonic !== undefined) {
        // console.log("Got mnemonic from action");
        // console.log(action.payload.mnemonic);
        mnemonic = action.payload.mnemonic;
      }
      if (mnemonic === undefined) {
        return getKeysFromMnemonic.failure({
          error: "Must provide a mnemonic before requesting keys"
        });
      }
      // console.log("Identified mnemonic " + mnemonic + Date.now() / 1000);
      try {
        const wallet = await getWallet(mnemonic);
        // console.log("Generated private key " + Date.now() / 1000);

        try {
          await SecureStore.setItemAsync(
            STORY_KEYCHAIN_KEYS.MNEMONIC,
            mnemonic,
            {
              keychainService: STORY_KEYCHAIN_SERVICE
            }
          );
          await SecureStore.setItemAsync(
            STORY_KEYCHAIN_KEYS.PRIVATE_KEY,
            wallet.privateKey,
            {
              keychainService: STORY_KEYCHAIN_SERVICE
            }
          );
          return getKeysFromMnemonic.success({
            privateKey: wallet.privateKey,
            publicKey: wallet.address,
            mnemonicPhrase: mnemonic
          });
        } catch (e) {
          return getKeysFromMnemonic.failure({
            error: "Could not store mnemonic in secure storage"
          });
        }
      } catch (e) {
        return getKeysFromMnemonic.failure({ error: e.message });
      }
    })
  );

export const createKeysEpic: Epic<RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(createKeys.request)),
    // tap(() =>
    // console.log("Got a request to create new keys " + Date.now() / 1000)
    // ),
    map(action => {
      const mnemonic = HDNode.entropyToMnemonic(utils.randomBytes(16));
      return getKeysFromMnemonic.request({ mnemonic });
    })
  );

export const clearKeysEpic: Epic<RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(clearKeys.request)),
    switchMap(a =>
      // console.log("Asked to clear keys " + Date.now() / 1000) ||
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
    // tap(()=> console.log("cleared " + Date.now() / 1000)),
    mapTo(clearKeys.success()),
    catchError(e => ObservableFrom([clearKeys.failure({ error: e.message })]))
  );
