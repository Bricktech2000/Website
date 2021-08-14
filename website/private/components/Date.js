import React, { Component } from 'react';
import Tag from './Tag';

import formatDate from '../lib/formatDate.js';

const Date = (props) => {
  return <Tag label={formatDate(props.date)} active />;
};

export default Date;
