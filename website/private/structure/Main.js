import React, { Component } from 'react';

import styles from './Main.module.css';
const Main = (props) => {
  return <main className={styles.Main}>{props.children}</main>;
};

export default Main;
