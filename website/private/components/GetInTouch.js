import React, { Component } from 'react';

import styles from './GetInTouch.module.css';
import { social } from '../lib/consts';

const GetInTouch = () => {
  return (
    <div className={styles.GetInTouch}>
      <div className={styles.text}>
        <p>Get in Touch</p>
        <p className={styles.vr}>│</p>
      </div>
      {/*https://css-tricks.com/snippets/html/mailto-links/*/}
      <div className={styles.icons}>
        <a target="_blank" href={`mailto:${social.mail}`} rel="noreferrer">
          <span>Mail</span>
          <i className="fa fa-lg fa-envelope"></i>
        </a>
        <a target="_blank" href={social.github} rel="noreferrer">
          <span>Github</span>
          <i className="fa fa-lg fa-github-square"></i>
        </a>
        <a target="_blank" href={social.facebook} rel="noreferrer">
          <span>Facebook</span>
          <i className="fa fa-lg fa-facebook-square"></i>
        </a>
      </div>
    </div>
  );
};

export default GetInTouch;
