import React, { Component } from 'react';
import useDbGet from '../lib/useDbGet';
import MosaicLarge from '../components/MosaicLarge';
import Card from '../components/Card';
import Loading from '../components/Loading';

import { Marked as marked } from '../components/Marked.module.css';

const HomePostList = () => {
  const info = useDbGet('all');

  if (typeof info === 'undefined') return <Loading height="10000vh" />;

  return (
    <React.Fragment>
      <h1 className={marked}>All Projects</h1>
      <em className={marked}>
        Most projects I worked on since the creation of this portfolio
      </em>
      <br />
      <br />
      <br />
      <MosaicLarge>
        {Object.keys(info).map((id) => (
          <Card key={id} info={info[id]} />
        ))}
      </MosaicLarge>
    </React.Fragment>
  );
};

export default HomePostList;
