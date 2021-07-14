import React, { Component } from 'react';
import App from './structure/app';
import Page from './structure/page';
import ErrorMain from './structure/errorMain';

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
