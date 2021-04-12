import React, { Component } from 'react';

import styles from './mosaicFull.module.css';

class MosaicFull extends Component {
  state = {};
  render() {
    return (
      <div className={styles.MosaicFull}>
        {this.props.children.map((child, i) =>
          React.cloneElement(child, {
            key: i,
            dir: Math.random() > 0.5,
            inv: Math.random() > 0.5,
          })
        )}
      </div>
    );
  }
}

export default MosaicFull;
