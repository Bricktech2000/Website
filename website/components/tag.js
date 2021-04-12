import React, { Component } from 'react';

class Tag extends Component {
  state = {};
  render() {
    return <React.Fragment>{'[[' + this.props.label + ']]'}</React.Fragment>;
  }
}

export default Tag;
