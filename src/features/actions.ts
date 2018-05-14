import { ActionsUnion } from "typesafe-actions";

import { actions as auth } from "./auth";
import { actions as app } from "./app";

const actions = {
  ...auth,

  ...app
};

export type RootAction = ActionsUnion<typeof actions>;
