import React, { Component } from 'react';

import styles from './Main.module.css';

class Main extends Component {
  state = {};
  render() {
    return <main className={styles.Main}>{this.props.children}</main>;
  }
}

export default Main;
