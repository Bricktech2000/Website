import { /*React, */ Component } from 'react';
import GetInTouch from '../components/GetInTouch';
import Link from 'next/link';
import { github } from '../lib/consts';

import React from '../svgs/000-react.svg';
import NextJS from '../svgs/000-next-js.svg';
import NodeJS from '../svgs/000-nodejs.svg';
import Ubuntu from '../svgs/000-ubuntu.svg';
import Cloudflare from '../svgs/000-cloudflare.svg';
import styles from './Footer.module.css';

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className={styles.Footer}>
        <div className={styles.vr}></div>
        <div className={styles.center}>
          <div>
            Created with <React /> <NextJS /> <NodeJS /> by Emilien Breton
          </div>
          <br />
          <div>
            Powered and protected by <Ubuntu /> <Cloudflare />
          </div>
          <br />
          <div>
            &copy; {new Date().getFullYear()} Emilien Breton
          </div> &#8212;{' '}
          <Link href="/legal/">
            <a className="markup-link">Legal</a>
          </Link>
        </div>
        <div className={styles.contact}>
          <GetInTouch />
          <div className={styles.issue}>
            Find an issue with this page?{' '}
            <a
              href={github + '/tree/master/website/' + this.props.github}
              target="_blank"
              rel="noreferrer"
              className="markup-link"
            >
              Fix it on Github
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
