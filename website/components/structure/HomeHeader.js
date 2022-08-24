import React, { Component } from 'react';
import VimEditor from './VimEditor';
import Button from '../Button';

import styles from './HomeHeader.module.css';

const HomeHeader = () => {
  return (
    <header className={styles.HomeHeader}>
      <div />
      <div className={styles.textColumn}>
        <h1>Emilien Breton</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          interdum ornare magna et maximus. Maecenas pellentesque nisi in
          imperdiet suscipit.
        </p>
        <div className={styles.buttons}>
          <Button href="#projects">
            <i className="fa-lg fas fa-grip-vertical" />
            View Projects
          </Button>
          <Button href="#contact">
            <i className="fa-lg fas fa-envelope" />
            Get in Touch
          </Button>
        </div>
      </div>
      <div className={styles.imageColumn}>
        <VimEditor />
        {/* <img
          className={styles.editor}
          src="vim-editor-placeholder.png"
          alt="vim editor placeholder"
        /> */}
      </div>
      <div />
    </header>
  );
};

export default HomeHeader;
