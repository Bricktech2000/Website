import React, { Component, useState, useContext } from 'react';
import Button from './Button';
import useParallax from '../lib/useParallax';

import styles from './MosaicLarge.module.css';

//https://www.emgoto.com/storing-values-with-useref/
var globalClickCount = 4;

const MosaicLarge = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(0.5em * ${
      (value - 0.75) * -16
    }))`;
  });

  const [clickCount, setClickCount] = useState(globalClickCount);

  return (
    <div className={styles.container}>
      <div className={styles.MosaicLarge} ref={parallaxRef}>
        {props.children
          .slice(0, Math.pow(2, clickCount))
          .map((child) => React.cloneElement(child))}
      </div>
      {Math.pow(2, clickCount) < props.children.length && (
        <Button
          label="Load More"
          onClick={() => {
            setClickCount((c) => c + 1);
            globalClickCount++;
          }}
        />
      )}
    </div>
  );
};

export default MosaicLarge;
