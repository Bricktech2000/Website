import React, { Component } from 'react';

import styles from './Toggle.module.css';

class Toggle extends Component {
  state = { active: false };

  componentDidMount() {
    this.setActive(this.props.active);
  }

  setActive(active) {
    this.setState({ active: active });
    return active;
  }

  render() {
    return (
      <div
        onClick={this.props.onClick.bind(null, [
          this.state.active,
          this.setActive.bind(this),
        ])}
        className={
          styles.Toggle + ' ' + (this.state.active ? styles.active : '')
        }
      >
        <div className={styles.child}>
          <div className={styles.thumb}></div>
        </div>
      </div>
    );
  }
}

export default Toggle;
