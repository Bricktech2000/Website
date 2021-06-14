import React, { Component } from 'react';
import generator from '../api/rand';
import parallax from '../api/parallax';

import styles from './mosaicSmall.module.css';

class MosaicSmall extends Component {
  state = {};

  constructor() {
    super();
    this.rand = generator();
    this.firstIsRow = this.rand() > 0.5;
    this.secondIsRow = !this.firstIsRow;

    [this.componentDidMount, this.componentWillUnmount, this.parallaxRef] =
      parallax((current, value) => {
        current.style.transform = `translateY(calc(var(--smart-unit) * ${
          (value - 0.25) * -20
        }))`;
      });
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
          inv: this.rand() > 0.5,
        })
      );

    return (
      <div className={styles.MosaicSmall} ref={this.parallaxRef}>
        <div>{func(0, 2)}</div>
        <div>{func(2, 4)}</div>
      </div>
    );
  }
}

export default MosaicSmall;
