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
import { Marked as marked } from '../components/Marked.module.css';

const Footer = (props) => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.vr}></div>
      <div className={styles.center}>
        <div>
          Created with <React />
          <span> </span>
          <NextJS />
          <span> </span>
          <NodeJS /> by Emilien Breton
        </div>
        <div>
          Powered and protected by <Ubuntu />
          <span> </span>
          <Cloudflare />
        </div>
        <div>
          &copy; {new Date().getFullYear()} Emilien Breton &#8212;{' '}
          <Link href="/legal/">
            <a className={marked}>Legal</a>
          </Link>
        </div>
      </div>
      <div className={styles.contact}>
        <GetInTouch />
        <div className={styles.issue}>
          Find an issue with this page?{' '}
          <a
            href={github + '/tree/master/website/' + props.github}
            target="_blank"
            rel="noreferrer"
            className={marked}
          >
            Fix it on Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
