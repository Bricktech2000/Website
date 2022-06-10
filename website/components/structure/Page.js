import React, { Component } from 'react';

import Aside from './Aside';
import Main from './Main';
import Footer from './Footer';
import Nav from './Nav';

const Page = (props) => {
  return (
    <React.Fragment>
      <Aside />
      <Main>{props.children}</Main>
      <Footer github={props.github} />
      <Nav />
    </React.Fragment>
  );
};

export default Page;
