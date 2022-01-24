import React, { Component } from 'react';
import useDbGet from '../lib/useDbGet';
import MosaicSmall from '../components/MosaicSmall';
import Card from '../components/Card';
import Loading from '../components/Loading';

import { Marked as marked } from '../components/Marked.module.css';
import styles from './PostRelated.module.css';

const PostRelated = (props) => {
  const id = props.info.id;
  const info = useDbGet('like', id);

  if (typeof info === 'undefined') return <Loading height="400vh" />;

  return (
    <div className={styles['PostRelated']}>
      <h1 className={marked}>Related Posts</h1>
      <MosaicSmall>
        {Object.keys(info)
          .filter((id) => !info[id].parent)
          .slice(0, 4)
          .map((id) => (
            <Card key={id} info={info[id]} />
          ))}
      </MosaicSmall>
    </div>
  );
};

export default PostRelated;
