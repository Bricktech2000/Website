import { React, Component } from 'react';
import GetInTouch from '../GetInTouch';
import Link from 'next/link';
import { github } from '../../records/consts';

// TODO:
import { React as _React } from '../svgs/000-react.svg';
import NextJS from '../svgs/000-next-js.svg';
import NodeJS from '../svgs/000-nodejs.svg';
import Ubuntu from '../svgs/000-ubuntu.svg';
import Cloudflare from '../svgs/000-cloudflare.svg';

import styles from './Footer.module.css';
import { Marked as marked } from '../Marked.module.css';

const Footer = (props) => {
  return (
    <div className={styles.Footer}>
      <hr className={marked} />
      TODO:
    </div>
  );

  return (
    <footer className={styles.Footer}>
      <div className={styles.vr}></div>
      <div className={styles.center}>
        <div>
          Created with
          <span>&nbsp;&nbsp;</span>
          <_React />
          <span>&nbsp;&nbsp;</span>
          <NextJS />
          <span>&nbsp;&nbsp;</span>
          <NodeJS />
          <span>&nbsp;&nbsp;</span>
          by Emilien Breton
        </div>
        <div>
          Powered and protected by
          <span>&nbsp;&nbsp;</span>
          <Ubuntu />
          <span>&nbsp;&nbsp;</span>
          <Cloudflare height="200px" />
        </div>
        <div>
          &copy; {new Date().getFullYear()} Emilien Breton &mdash;{' '}
          <Link href="/legal/">
            <a className={marked}>Legal</a>
          </Link>
        </div>
      </div>
      <div className={styles.contact}>
        <GetInTouch />
        <div className={styles.issue}>
          Find an issue with this page?&nbsp;
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
