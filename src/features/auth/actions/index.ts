import {
  createAsyncAction as buildAsync,
  createStandardAction as buildAction
} from "typesafe-actions";

export const chooseMnemonicLogin = buildAction("CHOOSE_MNEMONIC_LOGIN")();
export const updateMnemonicField = buildAction("UPDATE_MNEMONIC_FIELD")<
  string
>();

export const createKeys = {
  request: buildAction("CREATE_KEYS_REQUEST")()
};

export const getKeysFromStorage = {
  request: buildAction("GET_KEYS_FROM_STORAGE_REQUEST")(),
  failure: buildAction("GET_KEYS_FROM_STORAGE_FAILURE")<{ error: string }>()
};

export const getKeysFromMnemonic = buildAsync(
  "GET_KEYS_FROM_MNEMONIC_REQUEST",
  "GET_KEYS_FROM_MNEMONIC_SUCCESS",
  "GET_KEYS_FROM_MNEMONIC_FAILURE"
)<
  { mnemonic?: string },
  { publicKey: string; privateKey: string; mnemonicPhrase: string },
  { error: string }
>();
