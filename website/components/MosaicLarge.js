import React, { Component, useState, useRef, useEffect } from 'react';
import Button from './Button';
import useParallax from '../hooks/useParallax';
import useOnScreen from '../hooks/useOnScreen';

import styles from './MosaicLarge.module.css';

//https://www.emgoto.com/storing-values-with-useref/
let globalClickCount = 6;
let globalUpdate = false;

const MosaicLarge = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(0.5em * ${
      (value - 0.75) * -16
    }))`;
  });

  const [clickCount, setClickCount] = useState(globalClickCount);
  const [update, setUpdate] = useState(globalUpdate);

  const loadCount = Math.pow(Math.pow(2, 1 / 2), clickCount);
  const allLoaded = loadCount >= props.children.length;

  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false);
  useEffect(() => {
    if (allLoaded) return;

    if (isVisible && hasTimeElapsed && update) {
      setHasTimeElapsed(false);
      setClickCount((c) => c + 1);
      globalClickCount++;
    } else if (isVisible) {
      const timeout = setTimeout(() => setHasTimeElapsed(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, hasTimeElapsed, allLoaded, update]);

  return (
    <div className={styles.container}>
      <div className={styles.MosaicLarge} ref={parallaxRef}>
        {props.children
          .slice(0, loadCount)
          .map((child) => React.cloneElement(child))}
      </div>
      <p ref={ref}>{!allLoaded && ''}</p>
      {!update && (
        <Button
          onClick={() => {
            setUpdate(true);
            globalUpdate = true;
          }}
        >
          <i
            className="fas fa-lg fa-play"
            style={{ transform: 'rotate(90deg)' }}
          />
          Load More
        </Button>
      )}
    </div>
  );
};

export default MosaicLarge;
