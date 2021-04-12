import React, { Component } from 'react';

import App from '../components/struct/app';
import HeaderHome from '../components/struct/headerHome';
import Nav from '../components/struct/nav';
import Aside from '../components/struct/aside';
import Main from '../components/struct/main';
import MainHome from '../components/mainHome';
import Footer from '../components/struct/footer';

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
