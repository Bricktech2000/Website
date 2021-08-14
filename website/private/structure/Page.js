import React, { Component } from 'react';

import Aside from './Aside';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';

const Page = (props) => {
  return (
    <React.Fragment>
      <Aside />
      <Nav />
      <Main>{props.children}</Main>
      <Footer github={props.github} />
    </React.Fragment>
  );
};

export default Page;
