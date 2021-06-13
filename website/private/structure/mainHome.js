import React, { Component } from 'react';
import databaseSearch from '../api/databaseSearch';
import Loading from '../components/loading';
import Card from '../components/card';
import MosaicFull from '../components/mosaicFull';
import getPostInfo from '../api/getPostInfo';

class MainPosts extends Component {
  state = {};

  fetchData = async () => {
    var ids = await databaseSearch({
      opr: 'or',
      tags: ['posts'],
      excl: null,
      max: 1000,
    });
    this.setState({
      tag: this.props.tag,
      ids: ids,
      postInfos: await getPostInfo(ids),
    });
  };

  //https://stackoverflow.com/questions/36486213/react-shouldcomponentupdate-is-called-even-when-props-or-state-for-that-compon
  shouldComponentUpdate(nextProps) {
    if (this.state.tag !== nextProps.tag) {
      this.fetchData();
      return false;
    }
    return true;
  }

  render() {
    if (this.state.ids === undefined) {
      this.fetchData();
      return <Loading height="10000vh" />;
    }

    return (
      <React.Fragment>
        <h1 className="markup-h1">My Projects</h1>
        <br />
        <MosaicFull>
          {this.state.ids.map((id, i) => (
            <Card key={id} info={this.state.postInfos[id]} />
          ))}
        </MosaicFull>
      </React.Fragment>
    );
  }
}

export default MainPosts;
