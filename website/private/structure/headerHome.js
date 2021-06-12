import React, { Component } from 'react';
import AutoType from '../components/autoType';
import parallax from '../api/parallax';

import styles from './headerHome.module.css';

////https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component
import Mail from '../svgs/043-mail.svg';
import Facebook from '../svgs/025-facebook.svg';
import Github from '../svgs/009-github-1.svg';
import LinkedIn from '../svgs/037-linkedin.svg';
import Document from '../svgs/008-document.svg';

class HeaderHome extends Component {
  state = {};

  constructor(props) {
    super(props);

    [this.componentDidMount, this.componentDidUnmount, this.parallaxRef] =
      parallax((current, value) => {
        value = Math.min(value * 1.5, 1);
        current.style.transform = `translateY(${Math.pow(1 - value, 3) * 15}%)`;
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
          <p ref={this.parallaxRefDesc}>
            Minim nulla id eiusmod ea quis exercitation in deserunt. Non
            excepteur exercitation ullamco consectetur Lorem officia. Occaecat
            est do et ex dolor consequat sit sunt laboris do aliquip nisi. Sit
            adipisicing nostrud proident velit commodo proident qui cillum
            aliquip qui sunt et incididunt.
          </p>
          <div className={styles.icons}>
            {/*https://css-tricks.com/snippets/html/mailto-links/*/}
            <a
              target="_blank"
              href="mailto:bricktech2000@gmail.com?subject=I'm%20interested%20in%20your%20work!"
            >
              <Mail />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/emilien.breton.71"
            >
              <Facebook />
            </a>
            <a target="_blank" href="https://github.com/Bricktech2000/">
              <Github />
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
