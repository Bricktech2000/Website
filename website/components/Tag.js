import React, { Component } from 'react';
import tagMap from '../records/tagMap';

import styles from './Tag.module.css';

const Tag = (props) => {
  return (
    <div
      className={
        styles.Tag +
        ' ' +
        styles[tagMap[props.label]] +
        ' ' +
        styles[props.active ? 'on' : 'off']
      }
    >
      {props.label}
    </div>
  );
};

export default Tag;
