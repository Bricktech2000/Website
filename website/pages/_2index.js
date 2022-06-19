import React, { Component } from 'react';

import App from '../components/structure/App';
import BuiltMapGrid from '../components/structure/BuiltMapGrid';

import HomeHeader from '../components/structure/HomeHeader';
import Aside from '../components/structure/Aside';
import Main from '../components/structure/Main';
import HomePinned from '../components/structure/HomePinned';
import Posts from '../components/structure/Posts';
import Footer from '../components/structure/Footer';
import About from '../components/structure/About';

const Home = () => {
  return (
    <App
      title="Project Portfolio"
      description="A portfolio for sharing various projects"
      image="picture.jpg"
    >
      <BuiltMapGrid position={[1, 1]} />
    </App>
  );
};

export default Home;
