import * as React from "react";
import { Text } from "react-native";
import styled from "styled-components";

import { enhance } from "./enhancer";

const PinkText = styled(Text)`
  color: hotpink;
`;

export type SecretComponentProps = {
  secret: string;
};

export const SecretComponent: React.SFC<SecretComponentProps> = props => {
  return <PinkText>The secret is {props.secret}</PinkText>;
};

export const Secret = enhance(SecretComponent);
