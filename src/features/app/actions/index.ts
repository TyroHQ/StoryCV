import {
  createAsyncAction as buildAsync,
  createStandardAction as buildAction,
  createStandardAction
} from "typesafe-actions";

export const fetchAccreditations = buildAsync(
  "FETCH_ACCREDITATIONS_REQUEST",
  "FETCH_ACCREDITATIONS_FAILURE",
  "FETCH_ACCREDITATIONS_SUCCESS"
)<void, { error: string }, { accreditations: string[] }>();
