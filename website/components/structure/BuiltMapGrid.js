import React, { Component, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import MapGrid from './MapGrid';
import About from './About';
import Posts from './Posts';
import Pinned from './Pinned';
import Post from './Post';
import ErrorMain from './ErrorMain';

import errorMap from '../../records/errorMap';
import postMap from '../../records/postMap';
import pageMap from '../../records/pageMap';

const BuiltMapGrid = (props) => {
  const positionToRoute = [
    [null, null, null, null, null, null],
    [null, null, '/', '/about', '/pinned', null],
    [null, null, null, '/posts', null, null],
    [null, null, null, null, null, null],
  ];
  const routeToPosition = {
    ['']: [2, 1],
    about: [3, 1],
    pinned: [4, 1],
    posts: [3, 2],
    ...Object.fromEntries(postMap.map((id) => [id, [4, 2]])),
    ...Object.fromEntries(errorMap.map((id) => [id, [1, 1]])),
  };

  var ErrorComponent = null;
  if (errorMap.includes(props.page))
    ErrorComponent = <ErrorMain status={props.page} />;
  if (routeToPosition[props.page] === undefined)
    ErrorComponent = <ErrorMain status={'404'} />;
  var PostComponent = null;
  if (postMap.includes(props.page)) PostComponent = <Post id={props.page} />;

  const actualPosition = routeToPosition[props.page] ?? [1, 1];
  const [position, setPosition] = useState(actualPosition);
  const router = useRouter();
  useEffect(() => {
    setPosition(actualPosition);
  }, [router]);

  return (
    <MapGrid
      size={[6, 4]}
      position={position}
      onPositionChange={async (position) => {
        setPosition(position);
        const route = positionToRoute[position[1]][position[0]];
        if (route !== null) router.push(route);
      }}
    >
      {null} {null} {null} {null} {null} {null}
      {null} {ErrorComponent} <p>home</p> <About /> <Pinned /> {null}
      {null} {null} {null} <Posts /> {PostComponent} {null}
      {null} {null} {null} {null} {null} {null}
    </MapGrid>
  );
};

export default BuiltMapGrid;
