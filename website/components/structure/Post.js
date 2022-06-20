import React, { Component } from 'react';

import useDbGet from '../../hooks/useDbGet';
import PostHeader from './PostHeader';
import PostMain from './PostMain';
import PostRelated from './PostRelated';
import Loading from '../Loading';

const Post = (props) => {
  const { id } = props;

  const info = useDbGet('exact', id);

  const loading = info === undefined || info[id] === undefined;
  // const currentId = !loading && Object.keys(info)[0];

  return loading ? (
    <Loading height="1000vh" />
  ) : (
    <div style={{ flexDirection: 'column' }}>
      <PostHeader info={info[id]} />
      <PostMain info={info[id]} />
      <PostRelated info={info[id]} />
    </div>
  );
};

export default Post;
