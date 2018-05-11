import { Epic } from "redux-observable";
import { epics as auth } from "./auth";
import { combineEpics } from "redux-observable";
import { RootAction } from "./actions";
import { RootState } from "./reducers";

const allEpics: { [k: string]: Epic<RootAction, RootState> } = { ...auth };
export const rootEpic: Epic<RootAction, RootState> = combineEpics(
  ...Object.keys(allEpics).map((k: keyof typeof allEpics) => allEpics[k])
);
