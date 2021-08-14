import React, { Component } from 'react';
import Marked from '../components/Marked';
import useParallax from '../lib/useParallax';

import styles from './PostMain.module.css';

const PostMain = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(var(--smart-unit) * ${(value -
      0.25) *
      -20}))`;
    current.style.opacity = Math.max(value * 2 - 0.5, 0);
  });

  return (
    <div ref={parallaxRef} className={styles['marked']}>
      <Marked source={props.info.source} />
    </div>
  );
};

export default PostMain;
