import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import { RootState } from "../../../features/reducers";
import { AUTH_STATE } from "../../../features/auth/reducers";
import { getKeysFromStorage } from "../../../features/auth/actions";

const withRedux = connect(
  (state: RootState) => {
    return {
      authState: state.auth.state
    };
  },
  {
    getKeys: getKeysFromStorage.request
  }
);

type WithDataFetcherProps = {
  getKeys: typeof getKeysFromStorage.request;
};
const withDataFetcher = lifecycle<WithDataFetcherProps, {}>({
  componentDidMount() {
    this.props.getKeys();
  }
});

export const enhance = compose<{ authState: AUTH_STATE }, {}>(
  withRedux,
  withDataFetcher
);
