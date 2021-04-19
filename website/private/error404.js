import React, { Component } from 'react';
import App from './structure/app';
import HeaderEmpty from './structure/headerEmpty';
import Nav from './structure/nav';
import Aside from './structure/aside';
import Main from './structure/main';
import Main404 from './structure/main404';
import Footer from './structure/footer';

class Error404 extends Component {
  state = {};
  render() {
    return (
      <App>
        <HeaderEmpty />
        <Nav highlight={''} />
        <Aside />
        <Main>
          <Main404 />
        </Main>
        {/*<Footer />*/}
      </App>
    );
  }
}

export default Error404;
