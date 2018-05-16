import * as React from "react";
import { Text, View as PlainView, Button } from "react-native";

import { enhance } from "./enhancer";
import styled from "styled-components";

const View = styled(PlainView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export interface WelcomeScreenComponentProps {
  register: () => any;
  loginMnemonic: () => any;
}

export const WelcomeScreenComponent: React.SFC<
  WelcomeScreenComponentProps
> = props => {
  return (
    <View>
      <Text>Welcome to Story</Text>
      <Button title="Click here to start" onPress={props.register} />
      <Button title="Restore from mnemonic" onPress={props.loginMnemonic} />
    </View>
  );
};

export const WelcomeScreen = enhance(WelcomeScreenComponent);
