import * as React from "react";
import { Provider } from "react-redux";

import { AuthRoot } from "./AuthRoot";
import { store } from "./store";

export type AppProps = {};

export const App: React.SFC<AppProps> = props => {
  return (
    <Provider store={store}>
      <AuthRoot />
    </Provider>
  );
};
