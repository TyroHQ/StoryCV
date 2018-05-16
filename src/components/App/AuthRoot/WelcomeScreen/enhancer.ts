import { connect } from "react-redux";
import { compose } from "recompose";

import { WelcomeScreenComponentProps } from ".";
import {
  chooseMnemonicLogin,
  createKeys
} from "../../../../features/auth/actions";

type ReduxActionProps = Pick<
  WelcomeScreenComponentProps,
  "register" | "loginMnemonic"
>;
const withDispatchers = connect<null, ReduxActionProps>(null, {
  register: createKeys.request,
  loginMnemonic: chooseMnemonicLogin
});

export const enhance = compose<WelcomeScreenComponentProps, {}>(
  withDispatchers
);
