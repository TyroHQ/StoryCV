import {
  createAsyncAction as buildAsync,
  createStandardAction as buildAction,
  ActionsUnion
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
  { mnemonic: string },
  { publicKey: string; privateKey: string; mnemonicPhrase: string },
  { error: string }
>();

type Foo = ActionsUnion<typeof createKeys>;
