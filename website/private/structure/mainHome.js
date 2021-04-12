import React, { Component } from 'react';
import Card from '../components/card';
import MosaicSmall from '../components/mosaicSmall';
import getPostInfo from '../../pages/api/getPostInfo';

class MainHome extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1 className="markup-h1">Recent Projects</h1>
        [[Subscribe]]
        <br />
        [[Card]]
        <MosaicSmall>
          <Card info={getPostInfo('TEMPL')} />
          <Card info={getPostInfo('TEMPL')} />
          <Card info={getPostInfo('TEMPL')} />
          <Card info={getPostInfo('TEMPL')} />
        </MosaicSmall>
        <br />
        <br />
        <h1 className="markup-h1">Projects to Try</h1>
        <br />
        [[Card]]
        <br />
        <br />
        <h1 className="markup-h1">Projects by Tag</h1>
        <br />
        [[Tags]]
      </React.Fragment>
    );
  }
}

export default MainHome;
