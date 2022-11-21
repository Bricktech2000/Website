import React, { Component } from 'react';
import Date from '../Date';
import Marked from '../Marked';

import styles from './PostSubHeader.module.css';
import { Marked as marked } from '../Marked.module.css';

const PostSubHeader = (props) => {
  return (
    <header className={styles.PostSubHeader}>
      <h1 className={marked}>{props.info.title}</h1>
      <div className={styles.desc}>
        <Date date={props.info.date} />
        <Marked source={props.info.desc} />
      </div>
    </header>
  );
};

export default PostSubHeader;
