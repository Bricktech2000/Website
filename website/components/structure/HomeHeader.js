import React, { Component } from 'react';
import HomeAbout from './HomeAbout';
import HomeHero from './HomeHero';

import styles from './HomeHeader.module.css';

const HomeHeader = () => {
  return 'header TODO:';
  return (
    <header className={styles.HomeHeader}>
      <HomeHero />
      <HomeAbout />
    </header>
  );
};

export default HomeHeader;
