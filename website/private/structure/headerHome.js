import React, { Component } from 'react';
import AutoType from '../components/autoType';

import styles from './headerHome.module.css';

class HeaderHome extends Component {
  state = {};
  render() {
    return (
      <header className={styles.Header}>
        <div className={styles.color}></div>
        <div className={styles.image}></div>
        <div className={styles.about}>
          <h1 className="markup-h1">A Bit More About Me</h1>
          <img src="/icon.png" />
          <p>
            Minim nulla id eiusmod ea quis exercitation in deserunt. Non
            excepteur exercitation ullamco consectetur Lorem officia. Occaecat
            est do et ex dolor consequat sit sunt laboris do aliquip nisi. Sit
            adipisicing nostrud proident velit commodo proident qui cillum
            aliquip qui sunt et incididunt.
          </p>
          <div className={styles.icons}>O O O O</div>
        </div>
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
      </header>
    );
  }
}

export default HeaderHome;
