import * as React from "react";
import { Text } from "react-native";
import { View as PlainView } from "react-native";
import styled from "styled-components";
import { enhance } from "./enhancer";
const View = styled(PlainView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export interface AppHomeScreenComponentProps {
  publicKey: string;
  privateKey: string;
  mnemonicString: string;
}

const PinkText = styled(Text)`
  color: hotpink;
`;

export const AppHomeScreenComponent: React.SFC<
  AppHomeScreenComponentProps
> = props => {
  return (
    <View>
      <Text>App Home Screen</Text>
      <Text>
        Public Key: <PinkText>{props.publicKey}</PinkText>
      </Text>
      <Text>
        Private Key: <PinkText>{props.privateKey}</PinkText>
      </Text>
      <Text>
        Mnemonic String: <PinkText>{props.mnemonicString}</PinkText>
      </Text>
    </View>
  );
};

export const AppHomeScreen = enhance(AppHomeScreenComponent);
