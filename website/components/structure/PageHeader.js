import React, { Component } from 'react';
import Date from '../Date';
import Marked from '../Marked';

import styles from './PageHeader.module.css';
import { Marked as marked } from '../Marked.module.css';

const PageHeader = (props) => {
  return (
    <header className={styles.PageHeader}>
      <h1 className={marked + ' fade-right-1'}>{props.info.title}</h1>
      <p className={'fade-right-2'}>
        <Marked source={props.info.desc} />
      </p>
      <div className={styles.tags + ' fade-right-3'}>
        <Date date={props.info.date} />
      </div>
    </header>
  );
};

export default PageHeader;
