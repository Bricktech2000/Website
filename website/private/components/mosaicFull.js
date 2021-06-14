import React, { Component } from 'react';
import generator from '../api/rand';
import parallax from '../api/parallax';

import styles from './mosaicFull.module.css';

class MosaicFull extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.rand = generator();

    [this.componentDidMount, this.componentWillUnmount, this.parallaxRef] =
      parallax((current, value) => {
        current.style.transform = `translateY(calc(var(--smart-unit) * ${
          (value - 0.25) * -20
        }))`;
      });
  }

  render() {
    return (
      <div className={styles.MosaicFull} ref={this.parallaxRef}>
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
