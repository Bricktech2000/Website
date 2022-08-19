import React, { Component } from 'react';
import HomeAbout from './HomeAbout';
import HomeHero from './HomeHero';
import Button from '../Button';

import styles from './HomeHeader.module.css';

const HomeHeader = () => {
  return (
    <div className={styles.HomeHeader}>
      <div />
      <div className={styles.textColumn}>
        <h1>Emilien Breton</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          interdum ornare magna et maximus. Maecenas pellentesque nisi in
          imperdiet suscipit.
        </p>
        <div className={styles.buttons}>
          <Button blank={true} href="#TODO:">
            <i className="fa-lg fas fa-grip-vertical" />
            View Projects
          </Button>
          <Button blank={true} href="#TODO:">
            <i className="fa-lg fas fa-envelope" />
            Get in Touch
          </Button>
        </div>
      </div>
      <div className={styles.imageColumn}>
        <img
          className={styles.editor}
          src="vim-editor-placeholder.png"
          alt="vim editor placeholder"
        />
      </div>
      <div />
    </div>
  );
};

export default HomeHeader;
