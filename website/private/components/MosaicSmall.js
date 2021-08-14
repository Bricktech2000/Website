import React, { Component } from 'react';
import generator from '../lib/rand';
import useParallax from '../lib/useParallax';

import styles from './MosaicSmall.module.css';

const MosaicSmall = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(var(--smart-unit) * ${(value -
      0.25) *
      -20}))`;
  });

  const rand = generator();
  const firstIsRow = rand() > 0.5;
  const secondIsRow = !firstIsRow;

  const directions = [firstIsRow, firstIsRow, secondIsRow, secondIsRow];
  //https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
  const func = (start, end) =>
    props.children.slice(start, end).map((child, i) =>
      React.cloneElement(child, {
        key: i,
        dir: directions[start + i],
        inv: rand() > 0.5,
      })
    );

  return (
    <div className={styles.MosaicSmall} ref={parallaxRef}>
      <div>{func(0, 2)}</div>
      <div>{func(2, 4)}</div>
    </div>
  );
};

export default MosaicSmall;
