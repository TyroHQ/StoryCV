import * as React from "react";
import { Text as PlainText, View as PlainView } from "react-native";
import { Provider } from "react-redux";
import styled from "styled-components";

import { Login } from "./Login";
import { store } from "./store";

const View = styled(PlainView)`
  flex: 1;
  background-color: papayawhip;
  align-items: center;
  justify-content: center;
`;

const Text = styled(PlainText)`
  color: hotpink;
`;

export type AppProps = {};

export const App: React.SFC<AppProps> = props => {
  return (
    <View>
      <Text>Here I am!</Text>

      <Provider store={store}>
        <Login />
      </Provider>
    </View>
  );
};
