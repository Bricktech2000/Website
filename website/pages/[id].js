import React, { Component } from 'react';

import App from '../private/structure/app';
import HeaderPost from '../private/structure/headerPost';
import Nav from '../private/structure/nav';
import Aside from '../private/structure/aside';
import Main from '../private/structure/main';
import MainPost from '../private/components/mainPost';
import Footer from '../private/structure/footer';

export default function Post() {
  return (
    <App>
      <HeaderPost />
      <Nav />
      <Aside />
      <Main>
        <MainPost />
      </Main>
      <Footer />
    </App>
  );
}
