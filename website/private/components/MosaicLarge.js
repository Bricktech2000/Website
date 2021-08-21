import React, { Component, useState } from 'react';
import Button from './Button';
import generator from '../lib/rand';
import useParallax from '../lib/useParallax';

import styles from './MosaicLarge.module.css';

//https://www.emgoto.com/storing-values-with-useref/
var globalClickCount = 3;

const MosaicLarge = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(var(--smart-unit) * ${(value -
      0.25) *
      -20}))`;
  });

  const [clickCount, setClickCount] = useState(globalClickCount);
  const rand = generator();

  return (
    <div className={styles.container}>
      <div className={styles.MosaicLarge} ref={parallaxRef}>
        {props.children.slice(0, Math.pow(2, clickCount)).map((child, i) =>
          React.cloneElement(child, {
            dir: rand() > 0.5,
            inv: rand() > 0.5,
          })
        )}
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
