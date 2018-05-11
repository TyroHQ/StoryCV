import * as React from "react";
import { Text, View as PlainView, Button } from "react-native";
import styled from "styled-components";
import { Secret } from "./Secret";

import { enhance } from "./enhancer";

const View = styled(PlainView)`
  flex: 1;
  background-color: papayawhip;
  align-items: center;
  justify-content: center;
`;

const PinkText = styled(Text)`
  color: hotpink;
`;

export type LoginComponentProps = {
  secret: string;
  setNewSecret: (payload: { key: string; value: string }) => any;
  getKeyPair: (payload: string) => any;
};

export const LoginComponent: React.SFC<LoginComponentProps> = props => {
  return (
    <View>
      <Text>This is typescript!</Text>
      <Secret />
      <Button
        title="Update secret!"
        onPress={() =>
          props.setNewSecret({
            key: "FirstSecret",
            value: `Secret ${Math.round(Math.random() * 100)}`
          })
        }
      />
    </View>
  );
};

export const Login = enhance(LoginComponent);
