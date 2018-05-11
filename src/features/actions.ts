import { ActionsUnion } from "typesafe-actions";

import { actions as auth } from "./auth";

const actions = {
  ...auth
};

export type RootAction = ActionsUnion<typeof actions>;
