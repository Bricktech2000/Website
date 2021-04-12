import React, { Component } from 'react';

import App from '../private/structure/app';
import HeaderHome from '../private/structure/headerHome';
import Nav from '../private/structure/nav';
import Aside from '../private/structure/aside';
import Main from '../private/structure/main';
import MainHome from '../private/components/mainHome';
import Footer from '../private/structure/footer';

export default function Home() {
  return (
    <App>
      <HeaderHome />
      <Nav />
      <Aside />
      <Main>
        <MainHome />
      </Main>
      <Footer />
    </App>
  );
}
