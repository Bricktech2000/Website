import React, { Component } from 'react';

import App from '../components/structure/App';
import HomeHeader from '../components/structure/HomeHeader';
import Aside from '../components/structure/Aside';
import Main from '../components/structure/Main';
import HomePinned from '../components/structure/HomePinned';
import HomePostList from '../components/structure/HomePostList';
import Footer from '../components/structure/Footer';

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
