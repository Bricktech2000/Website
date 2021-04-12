import React, { Component } from 'react';

import styles from './mosaicSmall.module.css';

class MosaicSmall extends Component {
  state = {};

  constructor() {
    super();
    this.firstIsRow = Math.random() > 0.5;
    this.secondIsRow = !this.firstIsRow;
  }

  render() {
    var directions = [
      this.firstIsRow,
      this.firstIsRow,
      this.secondIsRow,
      this.secondIsRow,
    ];
    //https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
    return (
      <div className={styles.mosaic}>
        {this.props.children.map((child, i) =>
          React.cloneElement(child, { key: i, dir: directions[i] })
        )}
      </div>
    );
  }
}

export default MosaicSmall;
