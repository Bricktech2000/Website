import React, { Component } from 'react';
import Card from '../components/card';
import TagList from '../components/tagList';
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
        <MosaicSmall>
          <Card info={getPostInfo('Template')} />
          <Card info={getPostInfo('Template')} />
          <Card info={getPostInfo('Template')} />
          <Card info={getPostInfo('Template')} />
        </MosaicSmall>
        <br />
        <br />
        <h1 className="markup-h1">Projects to Try</h1>
        <br />
        <MosaicSmall>
          <Card info={getPostInfo('Template')} />
          <Card info={getPostInfo('Template')} />
          <Card info={getPostInfo('Template')} />
          <Card info={getPostInfo('Template')} />
        </MosaicSmall>
        <br />
        <br />
        <h1 className="markup-h1">Projects by Tag</h1>
        <br />
        <TagList />
      </React.Fragment>
    );
  }
}

export default MainHome;
