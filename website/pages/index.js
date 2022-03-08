import React, { Component } from 'react';

import App from '../private/structure/App';
import HomeHeader from '../private/structure/HomeHeader';
import Aside from '../private/structure/Aside';
import Main from '../private/structure/Main';
import HomePinned from '../private/structure/HomePinned';
import HomePostList from '../private/structure/HomePostList';
import Footer from '../private/structure/Footer';

const Home = () => {
  return (
    <App
      title="Project Portfolio"
      description="A portfolio for sharing various projects"
      image="picture.jpg"
    >
      <HomeHeader />
      <Aside />
      <Main>
        <HomePinned />
        <HomePostList />
      </Main>
      <Footer github="pages/index.js" />
    </App>
  );
};

import subscribe from './api/subscribe';

export async function getServerSideProps() {
  subscribe();
  return { props: {} };
}

export default Home;
