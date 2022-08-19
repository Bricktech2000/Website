import React, { Component } from 'react';

import styles from './GetInTouch.module.css';
import { social } from '../records/consts';

const GetInTouch = () => {
  return (
    <div className={styles.GetInTouch}>
      <div className={styles.text}>
        <p>Get in Touch</p>
        <p className={styles.vr}></p>
      </div>
      {/*https://css-tricks.com/snippets/html/mailto-links/*/}
      {/* TODO: */}
      <div className={styles.icons}>
        <a target="_blank" href={social.github} rel="noreferrer">
          <span>Github</span>
          <i className="fab fa-lg fa-github"></i>
        </a>
        <a target="_blank" href={social.linkedin} rel="noreferrer">
          <span>LinkedIn</span>
          <i className="fab fa-lg fa-linkedin"></i>
        </a>
        <a target="_blank" href={`mailto:${social.mail}`} rel="noreferrer">
          <span>Mail</span>
          <i className="fas fa-lg fa-envelope"></i>
        </a>
        <a target="_blank" href={social.discord} rel="noreferrer">
          <span>Discord</span>
          <i className="fab fa-lg fa-discord"></i>
        </a>
      </div>
    </div>
  );
};

export default GetInTouch;
