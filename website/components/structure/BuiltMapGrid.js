import React, { Component, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import MapGrid from './MapGrid';
import About from './About';
import Posts from './Posts';
import Pinned from './Pinned';
import Post from './Post';
import ErrorMain from './ErrorMain';
import Secret from './Secret';

import errorMap from '../../records/errorMap';
import postMap from '../../records/postMap';
import pageMap from '../../records/pageMap';

const BuiltMapGrid = (props) => {
  const positionToRoute = [
    [null, null, null, null, null, null],
    [null, 'secret', null, null, null, null],
    [null, null, '', 'about', 'pinned', null],
    [null, null, null, 'posts', null, null],
    [null, null, null, null, null, null],
  ];

  const positionToIcon = [
    [null, null, null, null, null, null],
    [null, 'fas fa-key', null, null, null, null],
    [null, 'fas fa-bomb', 'fas fa-home', 'fas fa-user', 'fas fa-th-list', null],
    [null, null, null, 'fas fa-th', 'fas fa-file', null],
    [null, null, null, null, null, null],
  ];

  const routeToPosition = {
    ['']: [2, 2],
    about: [3, 2],
    pinned: [4, 2],
    posts: [3, 3],
    ['secret']: [1, 1],
    ...Object.fromEntries(postMap.map((id) => [id, [4, 3]])),
    ...Object.fromEntries(errorMap.map((id) => [id, [1, 2]])),
  };

  var ErrorComponent = null;
  if (errorMap.includes(props.page))
    ErrorComponent = <ErrorMain status={props.page} />;
  if (routeToPosition[props.page] === undefined)
    ErrorComponent = <ErrorMain status={'404'} />;
  const [actualSecret, setActualSecret] = useState(false);
  var SecretComponent = null;
  if (props.page == 'secret')
    SecretComponent = <Secret actual={actualSecret} />;
  var PostComponent = null;
  if (postMap.includes(props.page)) PostComponent = <Post id={props.page} />;

  const actualPosition = routeToPosition[props.page] ?? [1, 2];
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
        if (router.asPath.split('/')[1] == 'secret' && route == 'secret')
          setActualSecret(true);
        else if (route !== null) router.push('/' + route);
      }}
      iconAtPosition={(position) => positionToIcon[position[1]][position[0]]}
    >
      {[
        ...[null, null, null, null, null, null],
        ...[null, SecretComponent, null, null, null, null],
        ...[null, ErrorComponent, <p>home</p>, <About />, <Pinned />, null],
        ...[null, null, null, <Posts />, PostComponent, null],
        ...[null, null, null, null, null, null],
      ]}
    </MapGrid>
  );
};

export default BuiltMapGrid;
