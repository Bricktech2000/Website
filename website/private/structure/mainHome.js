import React, { Component } from 'react';
import Card from '../components/card';
import CardTypes from '../components/cardTypes';
import TagList from '../components/tagList';
import MosaicSmall from '../components/mosaicSmall';
import Loading from '../components/loading';
import ToggleSubscribe from '../components/toggleSubscribe';
import getPostInfo from '../api/getPostInfo';
import DatabaseSearch from '../api/databaseSearch';

class MainHome extends Component {
  state = {};

  async componentDidMount() {
    var recentIds = await DatabaseSearch({
      opr: 'or',
      tags: [],
      excl: null,
      max: 4,
    });
    var tryItNowIds = await DatabaseSearch({
      opr: 'or',
      tags: ['Try it Now'],
      excl: null,
      max: 4,
    });

    this.setState({
      recentIds: recentIds,
      tryItNowIds: tryItNowIds,
      postInfos: await getPostInfo(recentIds.concat(tryItNowIds)),
    });
  }

  render() {
    if (
      this.state.recentIds === undefined ||
      this.state.tryItNowIds === undefined ||
      this.state.postInfos === undefined
    )
      return <Loading height="400vh" />;

    return (
      <React.Fragment>
        <h1 className="markup-h1">Recent Projects</h1>
        <ToggleSubscribe />
        <CardTypes />
        <br />
        <MosaicSmall>
          {this.state.recentIds.map((id) => (
            <Card key={id} info={this.state.postInfos[id]} />
          ))}
        </MosaicSmall>
        <br />
        <br />
        <h1 className="markup-h1">Projects to Try</h1>
        <br />
        <MosaicSmall>
          {this.state.tryItNowIds.map((id) => (
            <Card key={id} info={this.state.postInfos[id]} />
          ))}
        </MosaicSmall>
        <br />
        <br />
        <h1 className="markup-h1">Projects by Tag</h1>
        <br />
        <TagList scroll={true} />
      </React.Fragment>
    );
  }
}

export default MainHome;
