import * as React from "react";
import { Text } from "react-native";
import { BackgroundView, Title, HighlightedText } from "../../StyledComponents";
import { enhance } from "./enhancer";
import { Button } from "react-native";

export interface AppHomeScreenComponentProps {
  publicKey: string;
  privateKey: string;
  mnemonicString: string;
  logout: () => any;
}

export const AppHomeScreenComponent: React.SFC<
  AppHomeScreenComponentProps
> = props => {
  return (
    <BackgroundView>
      <Title>App Home Screen</Title>
      <Title>Public Key:</Title>
      <HighlightedText selectable>{props.publicKey}</HighlightedText>
      <Title>Private Key:</Title>
      <HighlightedText selectable>{props.privateKey}</HighlightedText>
      <Title>Mnemonic String: {/* <TouchableHighlight> */}</Title>
      <HighlightedText selectable>{props.mnemonicString}</HighlightedText>
      <Text> </Text>
      {/* </TouchableHighlight> */}
      <Button title="Log out" onPress={props.logout} />
    </BackgroundView>
  );
};

export const AppHomeScreen = enhance(AppHomeScreenComponent);
