import React, { Component } from 'react';
import App from './structure/app';
import HeaderEmpty from './structure/headerEmpty';
import Aside from './structure/aside';
import Main from './structure/main';
import MainError from './structure/mainError';

class Error extends Component {
  state = {};
  render() {
    return (
      <App>
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
