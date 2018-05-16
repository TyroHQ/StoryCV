import * as React from "react";

import { AUTH_STATE } from "../../../features/auth/reducers";
import { BackgroundView, Text } from "../StyledComponents";
import { AppHomeScreen } from "./AppHomeScreen";
import { enhance } from "./enhancer";
import { MnemonicEntryScreen } from "./MnemonicEntryScreen";
import { WelcomeScreen } from "./WelcomeScreen";

export type AuthRootProps = {
  authState: AUTH_STATE;
};

export const AuthRootComponent: React.SFC<AuthRootProps> = props => {
  switch (props.authState) {
    case AUTH_STATE.LOGGED_IN:
      return <AppHomeScreen />;
    case AUTH_STATE.LOGGING_IN_MNEMONIC:
      return <MnemonicEntryScreen />;
    case AUTH_STATE.PENDING:
      return (
        <BackgroundView>
          <Text>Logging in...</Text>
        </BackgroundView>
      );
    case AUTH_STATE.LOGGED_OUT:
      return <WelcomeScreen />;
  }
};

export const AuthRoot = enhance(AuthRootComponent);
