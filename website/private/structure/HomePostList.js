import React, { Component } from 'react';
import useDbGet from '../lib/useDbGet';
import MosaicLarge from '../components/MosaicLarge';
import Card from '../components/Card';
import Loading from '../components/Loading';
import ToggleSubscribe from '../components/ToggleSubscribe';

import { Marked as marked } from '../components/Marked.module.css';
import styles from './HomePostList.module.css';

const HomePostList = () => {
  const info = useDbGet('all');

  if (typeof info === 'undefined') return <Loading height="10000vh" />;

  return (
    <div className={styles.HomePostList}>
      <div className={styles.header}></div>
      <h1 className={marked}>All Projects</h1>
      <ToggleSubscribe />

      <br />
      <MosaicLarge>
        {Object.keys(info).map((id) => (
          <Card key={id} info={info[id]} />
        ))}
      </MosaicLarge>
      <br />
    </div>
  );
};

export default HomePostList;
