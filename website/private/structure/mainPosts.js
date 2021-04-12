import React, { Component } from 'react';
import DatabaseSearch from '../api/databaseSearch';
import TagList from '../components/tagList';
import Loading from '../components/loading';
import Card from '../components/card';
import MosaicFull from '../components/mosaicFull';
import getPostInfo from '../../pages/api/getPostInfo';

class MainPosts extends Component {
  state = {};

  async componentDidMount() {
    this.setState({
      ids: await DatabaseSearch({
        opr: 'or',
        tags: [this.props.tag],
        excl: this.props.tag == 'posts' ? null : 'zero',
        max: 1000,
      }),
    });
  }

  render() {
    if (this.state.ids === undefined) return <Loading height="1000vh" />;
    return (
      <React.Fragment>
        <h1 className="markup-h1">All Projects</h1>
        <TagList actives={[this.props.tag]} />
        <MosaicFull>
          {this.state.ids.map((id, i) => (
            <Card key={i} info={getPostInfo(id)} />
          ))}
        </MosaicFull>
      </React.Fragment>
    );
  }
}

export default MainPosts;
