import * as React from "react";
import { Button } from "react-native";

import { BackgroundView, Text } from "../../StyledComponents";
import { enhance } from "./enhancer";

export interface WelcomeScreenComponentProps {
  register: () => any;
  loginMnemonic: () => any;
}

export const WelcomeScreenComponent: React.SFC<
  WelcomeScreenComponentProps
> = props => {
  return (
    <BackgroundView>
      <Text>Welcome to Story</Text>
      <Button title="Click here to start" onPress={props.register} />
      <Button title="Restore from mnemonic" onPress={props.loginMnemonic} />
    </BackgroundView>
  );
};

export const WelcomeScreen = enhance(WelcomeScreenComponent);
