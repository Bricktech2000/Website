import React, { Component, useEffect } from 'react';

import MapGrid from './MapGrid';
import About from './About';
import Posts from './Posts';
import Pinned from './Pinned';

const BuiltMapGrid = (props) => {
  return (
    <MapGrid
      size={[5, 4]}
      position={props.position}
      onPositionChange={props.onPositionChange}
    >
      {null} {null} {null} {null} {null}
      {null} <p>home</p> <About /> <Pinned /> {null}
      {null} {null} <Posts /> {props.project ?? null} {null}
      {null} {null} {null} {null} {null}
    </MapGrid>
  );
};

export default BuiltMapGrid;
