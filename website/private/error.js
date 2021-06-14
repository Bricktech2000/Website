import React, { Component } from 'react';
import App from './structure/app';
import HeaderEmpty from './structure/headerEmpty';
import Aside from './structure/aside';
import Main from './structure/main';
import MainError from './structure/mainError';

import errorTitleMap from './api/errorTitleMap';
import errorDescMap from './api/errorDescMap';

class Error extends Component {
  state = {};
  render() {
    return (
      <App
        title={errorTitleMap[this.props.status || 400]}
        description={errorDescMap[this.props.status || 400]}
        image="icon.png"
      >
        <HeaderEmpty />
        <Aside />
        <Main>
          <MainError status={this.props.status || 400} />
        </Main>
      </App>
    );
  }
}

export default Error;
