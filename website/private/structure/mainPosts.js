import React, { Component } from 'react';
import DatabaseSearch from '../api/databaseSearch';
import TagList from '../components/tagList';
import Loading from '../components/loading';
import Card from '../components/card';
import MosaicFull from '../components/mosaicFull';
import getPostInfo from '../../pages/api/getPostInfo';
import tagNameMap from '../api/tagNameMap';

class MainPosts extends Component {
  state = {};

  fetchData = async () =>
    this.setState({
      tag: this.props.tag,
      ids: await DatabaseSearch({
        opr: 'or',
        tags: [this.props.tag],
        excl: this.props.tag == 'posts' ? null : 'zero',
        max: 1000,
      }),
    });

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
      return <Loading height="1000vh" />;
    }

    return (
      <React.Fragment>
        <h1 className="markup-h1">
          {tagNameMap[this.state.tag] || 'All Projects'}
        </h1>
        <TagList actives={[this.state.tag]} />
        <MosaicFull>
          {this.state.ids.map((id, i) => (
            <Card key={id} info={getPostInfo(id)} />
          ))}
        </MosaicFull>
      </React.Fragment>
    );
  }
}

export default MainPosts;
