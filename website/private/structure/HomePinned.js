import React, { Component } from 'react';
import useDbGet from '../lib/useDbGet';
import MosaicSmall from '../components/MosaicSmall';
import Card from '../components/Card';
import Loading from '../components/Loading';

import { Marked as marked } from '../components/Marked.module.css';
import styles from './HomePinned.module.css';

const HomePinned = () => {
  const info = useDbGet('pinned');

  if (typeof info === 'undefined') return <Loading height="400vh" />;

  return (
    <div className={styles.HomePinned}>
      <h1 className={marked}>Pinned Projects</h1>
      <br />
      <MosaicSmall>
        {Object.keys(info)
          .slice(0, 4)
          .map((id) => (
            <Card key={id} info={info[id]} />
          ))}
      </MosaicSmall>
    </div>
  );
};

export default HomePinned;
