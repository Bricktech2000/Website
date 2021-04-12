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
    var func = (start, end) =>
      this.props.children.slice(start, end).map((child, i) =>
        React.cloneElement(child, {
          key: i,
          dir: directions[start + i],
          inv: Math.random() > 0.5,
        })
      );

    return (
      <div className={styles.MosaicSmall}>
        <div>{func(0, 2)}</div>
        <div>{func(2, 4)}</div>
      </div>
    );
  }
}

export default MosaicSmall;
