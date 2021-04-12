import React, { Component } from 'react';

import styles from './headerPost.module.css';

class HeaderPost extends Component {
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

export default HeaderPost;
