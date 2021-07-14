import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import dbGet from '../lib/dbGet';
import MosaicLarge from '../components/MosaicLarge';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default function HomePostList(props) {
  //https://stackoverflow.com/questions/53819864/how-to-async-await-in-react-render-function
  const [info, updateInfo] = useState();
  useEffect(() => {
    const getInfo = async () => {
      updateInfo(await dbGet('all'));
    };
    getInfo();
  }, []);

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
}
