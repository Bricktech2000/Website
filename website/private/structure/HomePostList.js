import React, { Component } from 'react';
import useDbGet from '../lib/useDbGet';
import MosaicLarge from '../components/MosaicLarge';
import Card from '../components/Card';
import Loading from '../components/Loading';

import { Marked as marked } from '../components/Marked.module.css';

const HomePostList = (props) => {
  const info = useDbGet('all');

  if (typeof info === 'undefined') return <Loading height="1000vh" />;

  return (
    <React.Fragment>
      <h1 className={marked}>My Projects</h1>
      <br />
      <br />
      <MosaicLarge>
        {Object.keys(info)
          .filter((id) => !info[id].parent)
          .map((id) => (
            <Card key={id} info={info[id]} />
          ))}
      </MosaicLarge>
    </React.Fragment>
  );
};

export default HomePostList;
