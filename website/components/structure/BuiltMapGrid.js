import React, { Component, useEffect } from 'react';

import MapGrid from './MapGrid';
import About from './About';
import Posts from './Posts';

const BuiltMapGrid = (props) => {
  useEffect(() => {
    console.log('mount');
  }, []);

  return (
    <MapGrid size={[5, 4]} position={props.position}>
      {null} {null} {null} {null} {null}
      {null} <p>home</p> <About /> <Posts /> {null}
      {null} {null} {null} {props.project ?? null} {null}
    </MapGrid>
  );
};

export default BuiltMapGrid;
