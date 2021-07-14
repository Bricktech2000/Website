import React, { Component } from 'react';

import Aside from './Aside';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';

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
