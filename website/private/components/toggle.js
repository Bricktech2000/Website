import React, { Component } from 'react';

import styles from './toggle.module.css';

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
          styles.container + ' ' + (this.state.active ? styles.active : '')
        }
      >
        <div className={styles.toggle}>
          <div className={styles.thumb}></div>
        </div>
      </div>
    );
  }
}

export default Toggle;
