import React, { Component, useRef, useEffect } from 'react';
import AutoType from '../AutoType';
import GameOfLife from '../GameOfLife';

import styles from './HomeHero.module.css';

const HomeHero = () => {
  const imageRef = useRef(null);
  const callback = () => {
    const rect = imageRef.current.getBoundingClientRect();
    const maxDimension = Math.max(rect.width, rect.height);
    const canvas = imageRef.current.firstChild;
    canvas.style.width = maxDimension + 'px';
    canvas.style.height = maxDimension + 'px';
  };

  useEffect(() => {
    window.addEventListener('resize', callback);
    callback();
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  return (
    <div className={styles.HomeHero}>
      <div className={styles.color}></div>
      <div ref={imageRef} className={styles.image}>
        <GameOfLife size={100} />
      </div>
      <div className={styles.overlay}>
        <div className={styles.title}>Let me show you what I can do.</div>
        <div className={styles.desc}>
          I'm <div className={styles.emphasis}>Emilien Breton</div>, and I love{' '}
          <AutoType
            keywords={['programming', 'electronics', 'engineering']}
          ></AutoType>
        </div>
        <div className={'outline ' + styles.arrow}>
          <i className="fas fa-3x fa-angle-down"></i>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
