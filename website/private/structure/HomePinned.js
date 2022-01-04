import React, { Component } from 'react';
import useDbGet from '../lib/useDbGet';
import MosaicSmall from '../components/MosaicSmall';
import Card from '../components/Card';
import Loading from '../components/Loading';
import Marked from '../components/Marked.js';

import { Marked as marked } from '../components/Marked.module.css';
import styles from './HomePinned.module.css';

const HomePinned = () => {
  const info = useDbGet('pinned');

  if (typeof info === 'undefined') return <Loading height="400vh" />;

  return (
    <React.Fragment>
      <h1 className={marked}>Pinned Projects</h1>
      <em className={marked}>
        Some larger scale projects to show what I'm capable of
      </em>
      <br />
      <br />
      <br />
      <MosaicSmall>
        {Object.keys(info)
          .slice(0, 4)
          .map((id) => (
            // <div key={id} className={styles.Pair}>
            // <Card key={'Card'} info={info[id]} />
            // <Marked key={'Marked'} source={info[id].pinned} />
            // </div>
            <Card key={id} info={info[id]} />
          ))}
      </MosaicSmall>
    </React.Fragment>
  );
};

export default HomePinned;
