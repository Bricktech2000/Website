import React, { Component } from 'react';
import Button from '../components/button';

import styles from './headerHome.module.css';

class HeaderHome extends Component {
  state = {};
  render() {
    return (
      <header className={styles.Header}>
        <div className={styles['header-gradient']}></div>
        <div className={styles.container}>
          <div className={styles['markup-h1']}>
            Techno
            <wbr />
            Viper
          </div>
          <div className={styles.author}>by Emilien Breton</div>
          <div className={styles.desc}>
            A website for sharing my projects and blogging about tech-related
            stuff!
          </div>
          <Button label="View All Posts" href="/posts"></Button>
        </div>
      </header>
    );
  }
}

export default HeaderHome;
