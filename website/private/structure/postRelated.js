import React, { Component } from 'react';

class PostRelated extends Component {
  state = {};
  render() {
    return 'PostRelated' + JSON.stringify(this.props.info);
  }
}

export default PostRelated;
