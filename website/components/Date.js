import React, { Component } from 'react';
import Tag from './Tag';

const formatDate = (date) => {
  //input format:  YYYY-MM-DD
  //output format: DD MMM YYYY

  const months = [
    '000',
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const [year, month, day] = date.split('-');
  return `${parseInt(day)} ${months[parseInt(month)]} ${parseInt(year)}`;
};

const Date = (props) => {
  return <Tag label={formatDate(props.date)} active />;
};

export default Date;
