import React, { Component } from 'react';

import App from '../private/structure/app';
import Nav from '../private/structure/nav';
import Aside from '../private/structure/aside';
import Main from '../private/structure/main';
import Footer from '../private/structure/footer';

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

export async function getStaticProps() {
  return { props: {} };
}
