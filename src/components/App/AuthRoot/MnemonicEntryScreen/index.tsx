import * as React from "react";
import { Button, TextInput } from "react-native";

import { BackgroundView, Text } from "../../StyledComponents";
import { enhance } from "./enhancer";

export interface MnemonicEntryScreenComponentProps {
  mnemonic: string;
  onMnemonicChange: (mnemonic: string) => any;
  onSubmit: () => any;
}

export const MnemonicEntryScreenComponent: React.SFC<
  MnemonicEntryScreenComponentProps
> = props => {
  return (
    <BackgroundView>
      <Text>Enter your mnemonic string:</Text>
      <TextInput
        multiline
        numberOfLines={3}
        onChangeText={props.onMnemonicChange}
        value={props.mnemonic}
      />
      <Button title="Login" onPress={props.onSubmit} />
    </BackgroundView>
  );
};

export const MnemonicEntryScreen = enhance(MnemonicEntryScreenComponent);
