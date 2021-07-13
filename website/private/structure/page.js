import React, { Component } from 'react';

import Aside from './aside';
import Nav from './nav';
import Main from './main';
import Footer from './footer';

class Page extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Aside />
        <Nav />
        <Main>{this.props.children}</Main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Page;
