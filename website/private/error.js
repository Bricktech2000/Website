import React, { Component } from 'react';
import App from './structure/app';
import Page from './structure/page';
import MainError from './structure/mainError';

import errorTitleMap from './api/errorTitleMap';
import errorDescMap from './api/errorDescMap';

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
          <MainError status={status} />
        </Page>
      </App>
    );
  }
}

export default Error;
