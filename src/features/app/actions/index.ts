import { createAsyncAction as buildAsync } from "typesafe-actions";

export const fetchAccreditations = buildAsync(
  "FETCH_ACCREDITATIONS_REQUEST",
  "FETCH_ACCREDITATIONS_SUCCESS",
  "FETCH_ACCREDITATIONS_FAILURE"
)<void, { accreditations: string[] }, { error: string }>();
