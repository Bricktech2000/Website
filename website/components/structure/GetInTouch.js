import React, { Component } from 'react';
import Marked from '../Marked';

import styles from './GetInTouch.module.css';

const GetInTouch = () => {
  return (
    <div className={styles.GetInTouch}>
      <Marked
        source={`
# Get in Touch!

TODO:
        `}
      />
    </div>
  );
};

export default GetInTouch;
