import React, { Component } from 'react';
import Button from '../components/button';

import styles from './headerHome.module.css';

class HeaderHome extends Component {
  state = {};
  render() {
    return (
      <header className={styles.Header}>
        <div className={styles.color}></div>
        <div className={styles.image}></div>
        <div className={styles.about}>about</div>
        <div className={styles.overlay}>
          <div className={styles.title}>Let me show you what I can do.</div>
          <div className={styles.desc}>
            I'm Emilien Breton, and I love [TODO]
          </div>
          <div className={styles.cta}>View Projects</div>
          <div className={styles.arrow}>╲╱</div>
        </div>
      </header>
    );
  }
}

export default HeaderHome;
