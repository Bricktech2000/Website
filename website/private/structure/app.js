import React, { Component } from 'react';
import Head from './head';

import styles from './app.module.css';

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
