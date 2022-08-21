import React, { Component } from 'react';
import Date from '../Date';
import Marked from '../Marked';

import styles from './PostSubHeader.module.css';
import { Marked as marked } from '../Marked.module.css';

const PostSubHeader = (props) => {
  return (
    <header className={styles.PostSubHeader}>
      <h1 className={marked}>{props.info.title}</h1>
      <p>
        <Date date={props.info.date} />
        <Marked source={props.info.desc} />
      </p>
    </header>
  );
};

export default PostSubHeader;
