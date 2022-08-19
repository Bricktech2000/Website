import React, { Component } from 'react';
import useDbGet from '../../hooks/useDbGet';
import MosaicSmall from '../MosaicSmall';
import Card from '../Card';
import Loading from '../Loading';

import styles from './ProjectsPinned.module.css';

const ProjectsPinned = () => {
  const info = useDbGet('pinned');

  if (typeof info === 'undefined') return <Loading height="400vh" />;

  return (
    <div className={styles.ProjectsPinned}>
      <MosaicSmall>
        {Object.keys(info)
          .slice(0, 6)
          .map((id) => (
            <Card key={id} info={info[id]} />
          ))}
      </MosaicSmall>
    </div>
  );
};

export default ProjectsPinned;
