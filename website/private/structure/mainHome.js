import React, { Component } from 'react';
import Card from '../components/card';
import TagList from '../components/tagList';
import MosaicSmall from '../components/mosaicSmall';
import Loading from '../components/loading';
import getPostInfo from '../../pages/api/getPostInfo';
import DatabaseSearch from '../api/databaseSearch';

class MainHome extends Component {
  state = {};

  async componentDidMount() {
    this.setState({
      recentIds: await DatabaseSearch({
        opr: 'or',
        tags: [],
        excl: null,
        max: 4,
      }),
      tryItNowIds: await DatabaseSearch({
        opr: 'or',
        tags: ['Try it Now'],
        excl: null,
        max: 4,
      }),
    });
  }

  render() {
    if (
      this.state.recentIds === undefined ||
      this.state.tryItNowIds === undefined
    )
      return <Loading height="400vh" />;
    return (
      <React.Fragment>
        <h1 className="markup-h1">Recent Projects</h1>
        [[Subscribe]]
        <br />
        <MosaicSmall>
          {this.state.recentIds.map((id) => (
            <Card key={id} info={getPostInfo(id)} />
          ))}
        </MosaicSmall>
        <br />
        <br />
        <h1 className="markup-h1">Projects to Try</h1>
        <br />
        <MosaicSmall>
          {this.state.tryItNowIds.map((id) => (
            <Card key={id} info={getPostInfo(id)} />
          ))}
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
