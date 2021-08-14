import React, { Component, useState } from 'react';
import Button from './Button';
import generator from '../lib/rand';
import useParallax from '../lib/useParallax';

import styles from './MosaicLarge.module.css';

const MosaicLarge = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(var(--smart-unit) * ${(value -
      0.25) *
      -20}))`;
  });

  //this is the most hacky solution ever
  //modifying a property on an import to keep track of a value... can't get much worse than that
  generator.clickCount = generator.clickCount || 3;
  const [clickCount, setClickCount] = useState(generator.clickCount);

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
            generator.clickCount++;
          }}
        />
      )}
    </div>
  );
};

export default MosaicLarge;
