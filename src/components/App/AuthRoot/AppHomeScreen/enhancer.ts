import { connect } from "react-redux";
import { compose } from "recompose";

import { AppHomeScreenComponentProps } from ".";
import {
  Loadable,
  LoadableState,
  with404,
  withLoadedContent
} from "../../../../common/Loadable";
import { AUTH_STATE } from "../../../../features/auth/reducers";
import { RootState } from "../../../../features/reducers";
import { clearKeys } from "../../../../features/auth/actions";

const withRedux = connect((state: RootState): Loadable<
  Pick<
    AppHomeScreenComponentProps,
    "publicKey" | "privateKey" | "mnemonicString"
  >
> => {
  if (state.auth.state !== AUTH_STATE.LOGGED_IN) {
    return { state: LoadableState.FAILED };
  }
  return {
    state: LoadableState.LOADED,
    item: {
      publicKey: state.auth.publicKey,
      privateKey: state.auth.privateKey,
      mnemonicString: state.auth.mnemonicPhrase
    }
  };
});

const withDispatcher = connect(null, {
  logout: clearKeys.request
});

export const enhance = compose<AppHomeScreenComponentProps, {}>(
  withRedux,
  with404,
  withLoadedContent,
  withDispatcher
);
