import React, { Component } from 'react';
import Marked from '../Marked';

import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.About}>
      <Marked
        source={`
# About

TODO:
        `}
      />
    </div>
  );
};

export default About;
