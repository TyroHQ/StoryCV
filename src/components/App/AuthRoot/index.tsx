import * as React from "react";
import { Text, View as PlainView } from "react-native";

import { AUTH_STATE } from "../../../features/auth/reducers";
import { AppHomeScreen } from "./AppHomeScreen";
import { enhance } from "./enhancer";
import { MnemonicEntryScreen } from "./MnemonicEntryScreen";
import { WelcomeScreen } from "./WelcomeScreen";
import styled from "styled-components";

export type AuthRootProps = {
  authState: AUTH_STATE;
};

const View = styled(PlainView)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AuthRootComponent: React.SFC<AuthRootProps> = props => {
  switch (props.authState) {
    case AUTH_STATE.LOGGED_IN:
      return <AppHomeScreen />;
    case AUTH_STATE.LOGGING_IN_MNEMONIC:
      return <MnemonicEntryScreen />;
    case AUTH_STATE.PENDING:
      return (
        <View>
          <Text>Logging in...</Text>
        </View>
      );
    case AUTH_STATE.LOGGED_OUT:
      return <WelcomeScreen />;
  }
};

export const AuthRoot = enhance(AuthRootComponent);
