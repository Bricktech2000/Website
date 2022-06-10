import React, { Component } from 'react';
import useParallax from '../hooks/useParallax';

import styles from './MosaicSmall.module.css';

const MosaicSmall = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(0.5em * ${
      (value - 0.75) * -16
    }))`;
  });

  return (
    <div className={styles.MosaicSmall} ref={parallaxRef}>
      {props.children.map((child, i) => React.cloneElement(child))}
    </div>
  );
};

export default MosaicSmall;
