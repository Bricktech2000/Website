import React, { Component } from 'react';

import styles from './header.module.css';

class Header extends Component {
  state = {};
  render() {
    return (
      <header className={styles.Header}>
        Header Header Header Header Header Header Header Header Header Header
        Header Header Header Header Header Header Header Header Header Header
        Header Header Header Header Header Header Header Header
      </header>
    );
  }
}

export default Header;
