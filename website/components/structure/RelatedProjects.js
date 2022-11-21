import React, { Component } from 'react';
import useDbGet from '../../hooks/useDbGet';
import MosaicSmall from '../MosaicSmall';
import Card from '../Card';
import Loading from '../Loading';

import { Marked as marked } from '../Marked.module.css';
import styles from './RelatedProjects.module.css';

const RelatedProjects = (props) => {
  const id = props.info.id;
  const info = useDbGet('like', id);

  if (typeof info === 'undefined') return <Loading height="400vh" />;

  return (
    <div className={styles.RelatedProjects}>
      <h1 className={marked}>Related Projects</h1>
      <MosaicSmall>
        {Object.keys(info)
          .filter((id) => !info[id].parent)
          .map((id) => (
            <Card key={id} info={info[id]} />
          ))}
      </MosaicSmall>
    </div>
  );
};

export default RelatedProjects;
