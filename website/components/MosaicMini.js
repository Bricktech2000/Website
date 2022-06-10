import React, { Component, useState } from 'react';

import styles from './MosaicMini.module.css';

const MosaicMini = (props) => {
  return (
    <div className={styles.MosaicMini}>
      {props.children.map((child, i) =>
        React.cloneElement(child, {
          key: i,
          dir: 1,
          inv: 0,
          mini: true,
        })
      )}
    </div>
  );
};

export default MosaicMini;
