import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import dbGet from '../api/dbGet';
import MosaicFull from '../components/mosaicFull';
import Card from '../components/card';

export default function HomePostList(props) {
  //https://stackoverflow.com/questions/53819864/how-to-async-await-in-react-render-function
  const [info, updateInfo] = useState();
  useEffect(() => {
    const getInfo = async () => {
      updateInfo(await dbGet('all'));
    };
    getInfo();
  }, []);

  if (typeof info === 'undefined') return '';

  return (
    <React.Fragment>
      <h1 className="markup-h1">My Projects</h1>
      <br />
      <br />
      <MosaicFull>
        {Object.keys(info).map((id) => (
          <Card key={id} info={info[id]} />
        ))}
      </MosaicFull>
    </React.Fragment>
  );
}
