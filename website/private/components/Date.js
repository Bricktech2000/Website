import React, { Component } from 'react';
import Tag from './Tag';

import formatDate from '../lib/formatDate.js';

class Date extends Component {
  state = {};
  render() {
    return <Tag label={formatDate(this.props.date)} active />;
  }
}

export default Date;
