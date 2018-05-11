import { buildAction } from "typesafe-actions";

export const getSecret = {
  request: buildAction("LOAD_SECRET").payload<string>(),
  failure: buildAction("LOAD_SECRET_FAILED").payload<{
    error: string;
  }>(),
  success: buildAction("LOAD_SECRET_SUCCEEDED").payload<{
    secret: string;
  }>()
};

export const secretUpdate = {
  request: buildAction("UPDATE_SECRET").payload<{
    key: string;
    value: string;
  }>(),
  failure: buildAction("UPDATE_SECRET_FAILED").payload<{
    error: string;
  }>(),
  success: buildAction("UPDATE_SECRET_SUCEEDED").empty()
};
