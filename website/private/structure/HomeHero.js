import React, { Component } from 'react';
import AutoType from '../components/AutoType';
import parallax from '../lib/parallax';
import GetInTouch from '../components/GetInTouch';

import styles from './HomeHero.module.css';

class HomeHero extends Component {
  state = {};

  constructor(props) {
    super(props);

    [
      this.componentDidMount,
      this.componentWillUnmount,
      this.parallaxRef,
    ] = parallax((current, value) => {
      value = Math.min(value * 1.5, 1);
      current.style.transform = `translateY(calc(var(--smart-unit) * ${Math.pow(
        1 - value,
        3
      ) * 15}))`;
      current.style.opacity = value;
    });
  }

  render() {
    return (
      <header className={styles.HomeHero}>
        <div className={styles.color}></div>
        <div className={styles.image}></div>
        <div className={styles.about} ref={this.parallaxRef}>
          <h1 className="markup-h1">A Bit More About Me</h1>
          <img src="/icon.png" />
          <p>
            {/*
            programming portfolio examples
            https://www.freecodecamp.org/news/15-web-developer-portfolios-to-inspire-you-137fb1743cae/
            https://www.dejan.works/about/
            https://www.dejan.works/files/Dejan_Markovic_CV.pdf
            */}
            Problem solving and critical thinking are two of my most prominent
            skills. I love exploring new hobbies and interests to find out where
            they take me. Despite this, I often become unmotivated when not
            challenged; I can't stand inefficiency. In my opinion, coming up
            with creative ideas isn't sufficient. Acting on them and reflecting
            on the outcome is where the learning and self-improvement really
            take place.
          </p>
          <div className={styles.GetInTouch}>
            <GetInTouch />
          </div>
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

export default HomeHero;
