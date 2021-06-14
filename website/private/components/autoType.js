import React, { Component } from 'react';

import styles from './autoType.module.css';

class AutoType extends Component {
  state = { currentKeyword: 0, currentLength: 0 };

  componentDidMount = () => {
    this.update();
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  update = () => {
    var keyword = this.props.keywords[this.state.currentKeyword];

    if (this.state.currentLength >= 2 * (keyword.length + 2)) {
      this.setState({
        currentLength: 0,
        currentKeyword:
          (this.state.currentKeyword + 1) % this.props.keywords.length,
      });
      return (this.timeout = setTimeout(this.update));
    }
    this.setState({
      currentLength: this.state.currentLength + 1,
      string: keyword.substr(
        0,
        keyword.length -
          Math.abs(this.state.currentLength - (keyword.length - 1))
      ), // + '\xa0', //&nbsp;
    });

    return (this.timeout = setTimeout(
      this.update,
      100 -
        75 * (this.state.currentLength > keyword.length) +
        750 * (this.state.currentLength == keyword.length) +
        100 * (this.state.currentLength == 0)
    ));
  };

  render() {
    return (
      <div
        className={styles.container}
        style={{
          width:
            this.props.keywords.reduce(
              (acc, curr) => Math.max(curr.length, acc),
              0
            ) +
            2 +
            'ch',
        }}
      >
        {this.state.string}
        <div className={styles.cursor}>|</div>
      </div>
    );
  }
}

export default AutoType;
