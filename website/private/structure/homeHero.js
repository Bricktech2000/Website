import React, { Component } from 'react';
import AutoType from '../components/autoType';
import parallax from '../lib/parallax';

import styles from './homeHero.module.css';

////https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component
import Mail from '../svgs/043-mail.svg';
import Github from '../svgs/009-github-1.svg';
import Facebook from '../svgs/025-facebook.svg';
import LinkedIn from '../svgs/037-linkedin.svg';
import Document from '../svgs/008-document.svg';

class HeaderHome extends Component {
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
      <header className={styles.Header}>
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
          <div className={styles.icons}>
            {/*https://css-tricks.com/snippets/html/mailto-links/*/}
            <a
              target="_blank"
              href="mailto:bricktech2000@gmail.com?subject=I'm%20interested%20in%20your%20work!"
            >
              <Mail />
            </a>
            <a target="_blank" href="https://github.com/Bricktech2000/">
              <Github />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/emilien.breton.71"
            >
              <Facebook />
            </a>
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

export default HeaderHome;
