import React, { Component } from 'react';
import useDbGet from '../../hooks/useDbGet';
import MosaicSmall from '../MosaicSmall';
import Card from '../Card';
import Loading from '../Loading';

import { Marked as marked } from '../Marked.module.css';
import styles from './Pinned.module.css';
import Button from '../Button';

const Pinned = () => {
  const info = useDbGet('pinned');

  if (typeof info === 'undefined') return <Loading height="400vh" />;

  return (
    <div className={styles.Pinned}>
      <h1 className={marked}>
        <i className="fa-xs fas fa-th-list"></i>
        Pinned Projects
      </h1>
      <br />
      <br />
      <MosaicSmall>
        {Object.keys(info)
          .slice(0, 6)
          .map((id) => (
            <Card key={id} info={info[id]} />
          ))}
      </MosaicSmall>
      <Button
        className={styles.button}
        label="See All Projects"
        blank={false}
        href="/posts"
      />
    </div>
  );
};

export default Pinned;
