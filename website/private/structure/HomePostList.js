import React, { Component } from 'react';
import useDbGet from '../lib/useDbGet';
import MosaicLarge from '../components/MosaicLarge';
import Card from '../components/Card';
import Loading from '../components/Loading';

const HomePostList = (props) => {
  const info = useDbGet('all');

  if (typeof info === 'undefined') return <Loading height="1000vh" />;

  return (
    <React.Fragment>
      <h1 className="markup-h1">My Projects</h1>
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
