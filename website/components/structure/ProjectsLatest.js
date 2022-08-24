import React, { Component } from 'react';
import useDbGet from '../../hooks/useDbGet';
import MosaicLarge from '../MosaicLarge';
import Card from '../Card';
import Loading from '../Loading';

import styles from './ProjectsLatest.module.css';

const ProjectsLatest = () => {
  const info = useDbGet('all');

  if (typeof info === 'undefined') return <Loading height="10000vh" />;

  return (
    <div className={styles.ProjectsLatest}>
      <MosaicLarge>
        {Object.keys(info).map((id) => (
          <Card key={id} info={info[id]} />
        ))}
      </MosaicLarge>
    </div>
  );
};

export default ProjectsLatest;
