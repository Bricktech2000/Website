import React, { Component } from 'react';

import App from '../private/structure/app';
import HeaderHome from '../private/structure/headerHome';
import Aside from '../private/structure/aside';
import Main from '../private/structure/main';
import MainHome from '../private/structure/mainHome';
import Footer from '../private/structure/footer';

export default function Home() {
  return (
    <App>
      <HeaderHome />
      <Aside />
      <Main>
        <MainHome tag="posts" />
      </Main>
      <Footer />
    </App>
  );
}

/*export async function getStaticProps() {
  return { props: {} };
}*/
