import React, { Component } from 'react';

import App from '../private/structure/App';
import HomeHeader from '../private/structure/HomeHeader';
import Aside from '../private/structure/Aside';
import Main from '../private/structure/Main';
import HomePostList from '../private/structure/HomePostList';
import HomePinned from '../private/structure/HomePinned';
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

/*export async function getStaticProps() {
  return { props: {} };
}*/

export default Home;
