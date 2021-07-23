import React, { Component } from 'react';
import Button from './Button';
import generator from '../lib/rand';
import parallax from '../lib/parallax';

import styles from './MosaicLarge.module.css';

class MosaicLarge extends Component {
  state = { clickCount: 3 };

  constructor(props) {
    super(props);

    [
      this.componentDidMount,
      this.componentWillUnmount,
      this.parallaxRef,
    ] = parallax((current, value) => {
      current.style.transform = `translateY(calc(var(--smart-unit) * ${(value -
        0.25) *
        -20}))`;
    });
  }

  render() {
    this.rand = generator();
    console.log(this.state.clickCount);
    return (
      <div className={styles.container}>
        <div className={styles.MosaicLarge} ref={this.parallaxRef}>
          {this.props.children
            .slice(0, Math.pow(2, this.state.clickCount))
            .map((child, i) =>
              React.cloneElement(child, {
                dir: this.rand() > 0.5,
                inv: this.rand() > 0.5,
              })
            )}
        </div>
        {Math.pow(2, this.state.clickCount) < this.props.children.length && (
          <Button
            label="Load More"
            onClick={() =>
              this.setState({ clickCount: this.state.clickCount + 1 })
            }
          />
        )}
      </div>
    );
  }
}

export default MosaicLarge;
