import React, { Component } from 'react';
import Date from '../components/Date';
import Marked from '../components/Marked';

import styles from './PageHeader.module.css';

const PageHeader = (props) => {
  return (
    <header className={styles.PageHeader}>
      <div className={styles['markup-h1'] + ' markup-h1' + ' fade-right-1'}>
        {props.info.title}
      </div>
      <div></div>
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
