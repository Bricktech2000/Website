import React, { Component } from 'react';

class HeaderEmpty extends Component {
  state = {};
  render() {
    return <div style={{ gridArea: 'header' }}></div>;
  }
}

export default HeaderEmpty;
