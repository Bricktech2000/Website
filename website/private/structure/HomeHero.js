import React, { Component } from 'react';
import AutoType from '../components/AutoType';

import styles from './HomeHero.module.css';

const HomeHero = () => {
  return (
    <div className={styles.HomeHero}>
      <div className={styles.color}></div>
      <div className={styles.image}></div>
      <div className={styles.overlay}>
        <div className={styles.title}>Let me show you what I can do.</div>
        <div className={styles.desc}>
          I'm Emilien Breton, and I love{' '}
          <AutoType
            keywords={['programming', 'electronics', 'robotics']}
          ></AutoType>
        </div>
        <div className={styles.cta}>View Projects</div>
        {/*https://en.wikipedia.org/wiki/Box-drawing_character*/}
        <div className={styles.arrow}>╲╱</div>
      </div>
    </div>
  );
};

export default HomeHero;
