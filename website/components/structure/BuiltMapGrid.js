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
  const [history, setHistory] = useState([]);

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
    ...Object.fromEntries(history.map((id, i) => [id, [4 + i, 2]])),
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
  }, [router, history]);

  // https://stackoverflow.com/questions/56857880/how-to-get-history-and-match-in-this-props-in-nextjs
  useEffect(() => {
    const routeChangeHandler = (url) => {
      const page = url.split('/')[1];
      if (history[history.length - 2] !== page) setHistory([...history, page]);
      else setHistory(history.slice(0, -1));

      if (!postMap.includes(page)) setHistory([]);
    };

    router.events.on('routeChangeComplete', routeChangeHandler);
    return () => router.events.off('routeChangeComplete', routeChangeHandler);
  }, [history, router]);

  return (
    <MapGrid
      size={[6 + history.length, 4]}
      position={position}
      onPositionChange={async (position) => {
        setPosition(position);
        const route = positionToRoute[position[1]][position[0]];
        if (route !== null) router.push(route);
      }}
    >
      {[
        ...[
          null,
          null,
          null,
          null,
          null,
          null,
          ...new Array(history.length).fill(null),
        ],
        ...[
          null,
          ErrorComponent,
          <p>home</p>,
          <About />,
          <Pinned />,
          null,
          ...new Array(history.length).fill(null),
        ],
        ...[
          null,
          null,
          null,
          <Posts />,
          ...history.map((id) => <Post id={id} />),
          null,
          null,
        ],
        ...[
          null,
          null,
          null,
          null,
          null,
          null,
          ...new Array(history.length).fill(null),
        ],
      ]}
    </MapGrid>
  );
};

export default BuiltMapGrid;
