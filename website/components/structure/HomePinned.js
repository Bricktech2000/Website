import React, { Component } from 'react';
import useDbGet from '../../hooks/useDbGet';
import MosaicSmall from '../MosaicSmall';
import Card from '../Card';
import Loading from '../Loading';

import { Marked as marked } from '../Marked.module.css';
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
