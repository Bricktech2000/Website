import React, { Component } from 'react';

import App from '../private/structure/App';
import HomeHeader from '../private/structure/HomeHeader';
import Aside from '../private/structure/Aside';
import Main from '../private/structure/Main';
import HomePostList from '../private/structure/HomePostList';
import Footer from '../private/structure/Footer';

const Home = () => {
  return (
    <App
      title="Project Portfolio"
      description="A website for sharing my projects and blogging about tech-related stuff!"
      image="icon.png"
    >
      <HomeHeader />
      <Aside />
      <Main>
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
