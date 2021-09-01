import React, { Component, useState, useContext } from 'react';
import useParallax from '../lib/useParallax';

import styles from './MosaicSmall.module.css';
import RandContext from '../lib/RandContext';

const MosaicSmall = (props) => {
  const rand = useContext(RandContext)();

  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(0.5em * ${(value - 0.25) *
      -20}))`;
  });

  const firstIsRow = rand() > 0.5;
  const secondIsRow = !firstIsRow;

  const directions = [firstIsRow, firstIsRow, secondIsRow, secondIsRow];
  //https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
  const func = (start, end) =>
    props.children.slice(start, end).map((child, i) =>
      React.cloneElement(child, {
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
