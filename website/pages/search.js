import React, { Component } from 'react';

import App from '../components/struct/app';
import Nav from '../components/struct/nav';
import Aside from '../components/struct/aside';
import Main from '../components/struct/main';
import Footer from '../components/struct/footer';

export default function Home() {
  return (
    <App>
      <Nav highlight="search" />
      <h1 style={{ padding: 'calc(var(--smart-unit) * 5)' }}>Search</h1>
      {/*<Aside />
      <Main />
      <Footer />*/}
    </App>
  );
}
