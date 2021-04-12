import React, { Component } from 'react';

import App from '../../components/struct/app';
import Nav from '../../components/struct/nav';
import Aside from '../../components/struct/aside';
import Main from '../../components/struct/main';
import Footer from '../../components/struct/footer';

export default function Home() {
  return (
    <App>
      <Nav />
      {/*<Aside />
      <Main />
      <Footer />*/}
    </App>
  );
}
