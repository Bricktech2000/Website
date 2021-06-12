import React, { Component } from 'react';
import AutoType from '../components/autoType';
import parallax from '../api/parallax';

import styles from './headerHome.module.css';

class HeaderHome extends Component {
  state = {};

  constructor(props) {
    super(props);

    [this.componentDidMount, this.componentDidUnmount, this.parallaxRef] =
      parallax(
        [this.componentDidMount, this.componentDidUnmount],
        (current, value) => {
          value = Math.min(value * 2, 1);
          current.style.transform = `translateY(${(1 - value) * 50}%)`;
          current.style.opacity = Math.pow(value * 2, 4);
        }
      );
  }

  render() {
    return (
      <header className={styles.Header}>
        <div className={styles.color}></div>
        <div className={styles.image}></div>
        <div className={styles.about}>
          <h1 className="markup-h1" ref={this.parallaxRef}>
            A Bit More About Me
          </h1>
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
