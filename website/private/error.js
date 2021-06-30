import React, { Component } from 'react';
import App from './structure/app';
import HeaderEmpty from './structure/headerEmpty';
import Aside from './structure/aside';
import Nav from './structure/nav';
import Main from './structure/main';
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
        <HeaderEmpty />
        <Aside />
        <Nav />
        <Main>
          <MainError status={status} />
        </Main>
      </App>
    );
  }
}

export default Error;
