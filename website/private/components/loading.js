import React, { Component } from 'react';

class Loading extends Component {
  state = {};
  render() {
    return <div style={{ height: this.props.height || '50vh' }}></div>;
  }
}

export default Loading;
