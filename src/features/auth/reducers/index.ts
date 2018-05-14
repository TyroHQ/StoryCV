import { getType } from "typesafe-actions";

import { RootAction } from "../../actions";
import * as actions from "../actions";

export const enum AUTH_STATE {
  LOGGED_OUT,
  PENDING,
  LOGGED_IN,
  LOGGING_IN_MNEMONIC
}

export type State =
  | { state: AUTH_STATE.LOGGED_OUT | AUTH_STATE.PENDING }
  | {
      state: AUTH_STATE.LOGGED_IN;
      privateKey: string;
      publicKey: string;
    }
  | {
      state: AUTH_STATE.LOGGING_IN_MNEMONIC;
      mnemonicField: string;
    };

export const reducer = (
  state: State = { state: AUTH_STATE.LOGGED_OUT },
  action: RootAction
): State => {
  switch (action.type) {
    case getType(actions.getKeysFromStorage.request):
    case getType(actions.getKeysFromMnemonic.request):
      return {
        state: AUTH_STATE.PENDING
      };
    case getType(actions.getKeysFromMnemonic.failure):
    case getType(actions.getKeysFromStorage.failure):
      return {
        state: AUTH_STATE.LOGGED_OUT
      };
    case getType(actions.getKeysFromStorage.success):
    case getType(actions.getKeysFromMnemonic.success):
      return {
        state: AUTH_STATE.LOGGED_IN,
        privateKey: action.payload.privateKey,
        publicKey: action.payload.publicKey
      };
    case getType(actions.chooseMnemonicLogin):
      return { state: AUTH_STATE.LOGGING_IN_MNEMONIC, mnemonicField: "" };
    case getType(actions.updateMnemonicField):
      return {
        state: AUTH_STATE.LOGGING_IN_MNEMONIC,
        mnemonicField: action.payload
      };
  }
  return state;
};
