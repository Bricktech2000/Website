import React, { Component } from 'react';
import TagList from '../components/tagList';

class MainPosts extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1 className="markup-h1">All Projects</h1>
        <TagList actives={[this.props.tag]} />
      </React.Fragment>
    );
  }
}

export default MainPosts;
