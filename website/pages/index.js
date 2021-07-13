import React, { Component } from 'react';

import App from '../private/structure/app';
import HomeHero from '../private/structure/homeHero';
import Aside from '../private/structure/aside';
import Main from '../private/structure/main';
import HomePostList from '../private/structure/homePostList';
import Footer from '../private/structure/footer';

export default function Home() {
  return (
    <App
      title="Project Portfolio"
      description="A website for sharing my projects and blogging about tech-related stuff!"
      image="icon.png"
    >
      <HomeHero />
      <Aside />
      <Main>
        <HomePostList />
      </Main>
      <Footer />
    </App>
  );
}

/*export async function getStaticProps() {
  return { props: {} };
}*/
