import {
  createAsyncAction as buildAsync,
  createStandardAction as buildAction
} from "typesafe-actions";

// export const getSecret = buildAsync(
//   "LOAD_SECRET_REQUEST",
//   "LOAD_SECRET_SUCCESS",
//   "LOAD_SECRET_FAILURE"
// )<string, { error: string }, { secret: string }>();

// export const updateSecret = buildAsync(
//   "UPDATE_SECRET_REQUEST",
//   "UPDATE_SECRET_SUCCESS",
//   "UPDATE_SECRET_FAILURE"
// )<{ key: string; value: string }, { error: string }, void>();

export const chooseMnemonicLogin = buildAction("CHOOSE_MNEMONIC_LOGIN")();
export const updateMnemonicField = buildAction("CHOOSE_MNEMONIC_LOGIN")<
  string
>();

export const getKeysFromStorage = buildAsync(
  "GET_KEYS_FROM_STORAGE_REQUEST",
  "GET_KEYS_FROM_STORAGE_SUCCESS",
  "GET_KEYS_FROM_STORAGE_FAILURE"
)<void, { error: string }, { publicKey: string; privateKey: string }>();

export const getKeysFromMnemonic = buildAsync(
  "GET_KEYS_FROM_MNEMONIC_REQUEST",
  "GET_KEYS_FROM_MNEMONIC_SUCCESS",
  "GET_KEYS_FROM_MNEMONIC_FAILURE"
)<
  { mnemonic: string },
  { error: string },
  { publicKey: string; privateKey: string }
>();
