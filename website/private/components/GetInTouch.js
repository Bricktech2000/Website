import React, { Component } from 'react';

import styles from './GetInTouch.module.css';
import { social } from '../lib/consts';

////https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component
import Mail from '../svgs/043-mail.svg';
import Github from '../svgs/009-github-1.svg';
import Facebook from '../svgs/025-facebook.svg';
import LinkedIn from '../svgs/037-linkedin.svg';
import Document from '../svgs/008-document.svg';

const GetInTouch = () => {
  return (
    <div className={styles.GetInTouch}>
      <div className={styles.text}>
        <p>Get in Touch</p>
        <p className={styles.vr}>│</p>
      </div>
      {/*https://css-tricks.com/snippets/html/mailto-links/*/}
      <div className={styles.icons}>
        <a
          target="_blank"
          href={`mailto:${social.mail}?subject=I'm%20interested%20in%20your%20work!`}
          rel="noreferrer"
        >
          <Mail />
        </a>
        <a target="_blank" href={social.github} rel="noreferrer">
          <Github />
        </a>
        <a target="_blank" href={social.facebook} rel="noreferrer">
          <Facebook />
        </a>
      </div>
    </div>
  );
};

export default GetInTouch;
