import * as React from "react";
import { Text as PlainText, View } from "react-native";
import styled from "styled-components";

export const BackgroundView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  backgroundColor: white;jk
`;

export const Text = styled(PlainText)`
  font-family: serif;
`;

export const HighlightedText = styled(Text)`
  color: hotpink;
`;

export const Title = styled(Text)`
  font-size: 20;
  font-weight: bold;
`;
