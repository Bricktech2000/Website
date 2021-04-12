import React, { Component } from 'react';
import Card from './card';
import getPageInfo from '../pages/api/getPageInfo';

class MainHome extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1 className="markup-h1">Recent Projects</h1>
        [[Subscribe]]
        <br />
        [[Card]]
        <Card id="search" info={getPageInfo('search')} />
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
