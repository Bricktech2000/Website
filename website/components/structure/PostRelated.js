import React, { Component } from 'react';
import useDbGet from '../../hooks/useDbGet';
import MosaicSmall from '../MosaicSmall';
import Card from '../Card';
import Loading from '../Loading';

import { Marked as marked } from '../Marked.module.css';
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
          .slice(0, 6)
          .map((id) => (
            <Card key={id} info={info[id]} />
          ))}
      </MosaicSmall>
    </div>
  );
};

export default PostRelated;
