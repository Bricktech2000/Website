import React, { Component } from 'react';
import App from './structure/App';
import Page from './structure/Page';
import ErrorMain from './structure/ErrorMain';

import errorTitleMap from './lib/errorTitleMap';
import errorDescMap from './lib/errorDescMap';

class Error extends Component {
  state = {};
  render() {
    var status = this.props.status || 400;
    return (
      <App
        title={errorTitleMap[status]}
        description={errorDescMap[status]}
        image="icon.png"
      >
        <Page>
          <ErrorMain status={status} />
        </Page>
      </App>
    );
  }
}

export default Error;
