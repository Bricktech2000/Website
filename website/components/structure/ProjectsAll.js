import React, { Component } from 'react';
import useDbGet from '../../hooks/useDbGet';
import MosaicLarge from '../MosaicLarge';
import Card from '../Card';
import Loading from '../Loading';

import styles from './ProjectsAll.module.css';

const ProjectsAll = () => {
  const info = useDbGet('all');

  if (typeof info === 'undefined') return <Loading height="10000vh" />;

  return (
    <div className={styles.ProjectsAll}>
      <MosaicLarge>
        {Object.keys(info).map((id) => (
          <Card key={id} info={info[id]} />
        ))}
      </MosaicLarge>
    </div>
  );
};

export default ProjectsAll;
