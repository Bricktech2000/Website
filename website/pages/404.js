import React, { Component } from 'react';
import Error from '../private/structure/Error';

//https://nextjs.org/docs/advanced-features/custom-error-page

const Error404 = () => {
  return <Error status={'404'} />;
};

export default Error404;
