import React, { Component, useState, useRef, useEffect } from 'react';
import useParallax from '../lib/useParallax';
import useOnScreen from '../lib/useOnScreen';

import styles from './MosaicLarge.module.css';

//https://www.emgoto.com/storing-values-with-useref/
var globalClickCount = 3;

const MosaicLarge = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(0.5em * ${
      (value - 0.75) * -16
    }))`;
  });

  const [clickCount, setClickCount] = useState(globalClickCount);

  const loadCount = Math.pow(1.5, clickCount);
  const allLoaded = loadCount >= props.children.length;

  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false);
  useEffect(() => {
    if (allLoaded) return;

    if (isVisible && hasTimeElapsed) {
      setHasTimeElapsed(false);
      setClickCount((c) => c + 1);
      globalClickCount++;
    } else if (isVisible) {
      const timeout = setTimeout(() => setHasTimeElapsed(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, hasTimeElapsed]);

  return (
    <div className={styles.container}>
      <div className={styles.MosaicLarge} ref={parallaxRef}>
        {props.children
          .slice(0, loadCount)
          .map((child) => React.cloneElement(child))}
      </div>
      <p ref={ref}>{!allLoaded && 'Loading more...'}</p>
    </div>
  );
};

export default MosaicLarge;
