import React, { Component } from 'react';

class HeaderEmpty extends Component {
  state = {};
  render() {
    return <div style={{ 'grid-area': 'header' }}></div>;
  }
}

export default HeaderEmpty;
