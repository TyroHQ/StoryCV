import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";

import { MnemonicEntryScreenComponentProps } from ".";
import {
  Loadable,
  LoadableState,
  with404,
  withLoadedContent
} from "../../../../common/Loadable";
import { AUTH_STATE } from "../../../../features/auth/reducers";
import { RootState } from "../../../../features/reducers";
import {
  updateMnemonicField,
  getKeysFromMnemonic
} from "../../../../features/auth/actions";

type ReduxStateProps = Pick<MnemonicEntryScreenComponentProps, "mnemonic">;
const withState = connect((state: RootState): Loadable<ReduxStateProps> => {
  if (state.auth.state !== AUTH_STATE.LOGGING_IN_MNEMONIC) {
    return { state: LoadableState.FAILED };
  }
  return {
    state: LoadableState.LOADED,
    item: {
      mnemonic: state.auth.mnemonicField
    }
  };
});

type ReduxActionProps = Pick<
  MnemonicEntryScreenComponentProps,
  "onMnemonicChange" | "onSubmit"
>;
const withDispatchers = connect<null, ReduxActionProps>(null, {
  onMnemonicChange: updateMnemonicField,
  onSubmit: (mnemonic?: string) => getKeysFromMnemonic.request({ mnemonic })
});

export const enhance = compose<MnemonicEntryScreenComponentProps, {}>(
  withState,
  with404,
  withLoadedContent,
  withDispatchers,
  withHandlers({
    onSubmit: (props: {
      mnemonic: string;
      onSubmit: (m: string) => any;
    }) => () => {
      props.onSubmit(props.mnemonic);
    }
  })
);
