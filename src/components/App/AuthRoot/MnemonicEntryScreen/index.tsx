import * as React from "react";
import { Button, TextInput, View as PlainView } from "react-native";
import { Text } from "react-native";
import { enhance } from "./enhancer";
import styled from "styled-components";

export interface MnemonicEntryScreenComponentProps {
  mnemonic: string;
  onMnemonicChange: (mnemonic: string) => any;
  onSubmit: () => any;
}
const View = styled(PlainView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MnemonicEntryScreenComponent: React.SFC<
  MnemonicEntryScreenComponentProps
> = props => {
  return (
    <View>
      <Text>Enter your mnemonic string:</Text>
      <TextInput
        multiline
        onChangeText={props.onMnemonicChange}
        value={props.mnemonic}
      />
      <Button title="Login" onPress={props.onSubmit} />
    </View>
  );
};

export const MnemonicEntryScreen = enhance(MnemonicEntryScreenComponent);
