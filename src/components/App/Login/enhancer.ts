import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import { withLoadedContent } from "../../../common/Loadable";
import { getSecret, secretUpdate } from "../../../features/auth/actions";
import { RootState } from "../../../features/reducers";

const withRedux = connect(
  (state: RootState) => {
    return {};
  },
  {
    getKeyPair: getSecret.request,
    setNewSecret: secretUpdate.request
    // loadWebsiteSettings: settings.request
  }
);

type WithDataFetcherProps = {
  getKeyPair: typeof getSecret.request;
  setNewSecret: typeof secretUpdate.request;
};
const withDataFetcher = lifecycle<WithDataFetcherProps, {}>({
  componentDidMount() {
    this.props.getKeyPair("FirstSecret");
  }
});

export const enhance = compose<{ secret: string } & WithDataFetcherProps, {}>(
  withRedux,
  withDataFetcher
);
