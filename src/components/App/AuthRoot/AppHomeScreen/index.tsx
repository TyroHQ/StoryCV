import * as React from "react";
import { Text } from "react-native";
import { View as PlainView } from "react-native";
import styled from "styled-components";
import { enhance } from "./enhancer";
import { Button } from "react-native";
import { TouchableHighlight } from "react-native";
const View = styled(PlainView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export interface AppHomeScreenComponentProps {
  publicKey: string;
  privateKey: string;
  mnemonicString: string;
  logout: () => any;
}

const PinkText = styled(Text)`
  color: hotpink;
`;

const Title = styled(Text)`
  font-size: 20;
  font-weight: bold;
  text-align: left;
`;

const HomeView = styled(View)`
  align-items: flex-start;
`;

export const AppHomeScreenComponent: React.SFC<
  AppHomeScreenComponentProps
> = props => {
  return (
    <HomeView>
      <Title>App Home Screen</Title>
      <Title>Public Key:</Title>
      <PinkText selectable>{props.publicKey}</PinkText>
      <Title>Private Key:</Title>
      <PinkText selectable>{props.privateKey}</PinkText>
      <Title>Mnemonic String: {/* <TouchableHighlight> */}</Title>
      <PinkText selectable>{props.mnemonicString}</PinkText>
      <Text> </Text>
      {/* </TouchableHighlight> */}
      <Button title="Log out" onPress={props.logout} />
    </HomeView>
  );
};

export const AppHomeScreen = enhance(AppHomeScreenComponent);
