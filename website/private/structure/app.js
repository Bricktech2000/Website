import React, { Component } from 'react';
import Head from './head';

import styles from './app.module.css';
import { init } from '../api/rand';
init();

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Head />
        <div className={styles.App}>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default App;
