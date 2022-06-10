import React, { Component } from 'react';
import Error from '../components/structure/Error';

//https://nextjs.org/docs/advanced-features/custom-error-page

const Error500 = () => {
  return <Error status={'500'} />;
};

export default Error500;
