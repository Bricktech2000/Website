import React, { Component } from 'react';
import Marked from '../components/Marked';

import App from '../components/structure/App';
import HomeHeader from '../components/structure/HomeHeader';
import Aside from '../components/structure/Aside';
import Skills from '../components/structure/Skills';
import About from '../components/structure/About';
import Projects from '../components/structure/Projects';
import Contact from '../components/structure/Contact';
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
      <Main>
        <About />
        <Skills />
        <Projects />
        {/* <HomePinned /> */}
        {/* <HomePostList /> */}
        <Contact />
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
