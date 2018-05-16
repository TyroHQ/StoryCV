import { connect } from "react-redux";
import { compose } from "recompose";

import {
  Loadable,
  LoadableState,
  with404,
  withLoadedContent,
  withLoader
} from "../../../../common/Loadable";
import { RootState } from "../../../../features/reducers";
import { AUTH_STATE } from "../../../../features/auth/reducers";

// import { selectors as get } from "../../features/auth";
type ReduxState = Loadable<{ secret: string }>;
const withRedux = connect((state: RootState): ReduxState => {
  const keys = state.auth;
  if (keys.state !== AUTH_STATE.LOGGED_IN)
    return { state: LoadableState.UNKNOWN };
  return {
    state: LoadableState.LOADED,
    item: {
      secret: keys.mnemonicPhrase
    }
  };
});

export const enhance = compose<{ secret: string }, {}>(
  withRedux,
  withLoader,
  with404,
  withLoadedContent
);
