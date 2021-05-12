import React, { Component } from 'react';
import generator from '../api/rand';

import styles from './mosaicFull.module.css';

class MosaicFull extends Component {
  state = {};

  constructor() {
    super();
    this.rand = generator();
  }

  render() {
    return (
      <div className={styles.MosaicFull}>
        {this.props.children.map((child, i) =>
          React.cloneElement(child, {
            dir: this.rand() > 0.5,
            inv: this.rand() > 0.5,
          })
        )}
      </div>
    );
  }
}

export default MosaicFull;
