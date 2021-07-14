import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import dbGet from '../lib/dbGet';
import MosaicSmall from '../components/MosaicSmall';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default function PostRelated(props) {
  var id = props.info.id;
  //https://stackoverflow.com/questions/53819864/how-to-async-await-in-react-render-function
  const [info, updateInfo] = useState();
  useEffect(() => {
    const getInfo = async () => {
      updateInfo(await dbGet('like', id));
    };
    getInfo();
  }, []);

  if (typeof info === 'undefined') return <Loading height="400vh" />;

  return (
    <React.Fragment>
      <h1 className="markup-h1">Related Posts</h1>
      <br />
      <br />
      <MosaicSmall>
        {Object.keys(info).map((id) => (
          <Card key={id} info={info[id]} />
        ))}
      </MosaicSmall>
    </React.Fragment>
  );
}
