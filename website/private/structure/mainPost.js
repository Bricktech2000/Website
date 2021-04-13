import React, { Component } from 'react';
import getPostInfo from '../../pages/api/getPostInfo';
import databaseSearch from '../api/databaseSearch';
import MosaicSmall from '../components/mosaicSmall';
import Card from '../components/card';

class MainPost extends Component {
  state = {};

  async componentDidMount() {
    this.setState({
      text: await (await fetch('/' + this.props.id + '/index.md')).text(),
    });
    this.setState({
      ids: await databaseSearch({
        opr: 'like',
        tags: (await getPostInfo(this.props.id)).tags,
        excl: this.props.id,
        max: 4,
      }),
    });
  }

  render() {
    if (this.state.text === undefined || this.state.ids === undefined)
      return '';

    return (
      <React.Fragment>
        <p className="">{this.state.text}</p>
        <h1 className="markup-h1">Related Posts</h1>
        <br />
        <br />
        <MosaicSmall>
          {this.state.ids.map((id) => (
            <Card key={id} info={getPostInfo(id)} />
          ))}
        </MosaicSmall>
      </React.Fragment>
    );
  }
}

export default MainPost;
