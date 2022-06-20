import React, { Component } from 'react';

import App from '../components/structure/App';
import BuiltMapGrid from '../components/structure/BuiltMapGrid';

const Pinned = () => {
  return (
    <App title={'title'} description={'desc'} image={'img'}>
      <BuiltMapGrid position={[4, 1]} project={null} error={null} />
    </App>
  );
};

export default Pinned;
