import React, { Component } from 'react';
import Marked from '../components/marked';
import parallax from '../api/parallax';

import styles from './postMain.module.css';

class PostMain extends Component {
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
      current.style.opacity = Math.max(value * 2 - 0.5, 0);
    });
  }

  render() {
    return (
      <div ref={this.parallaxRef} className={styles['marked']}>
        <Marked source={this.props.info.source} />
      </div>
    );
  }
}

export default PostMain;
