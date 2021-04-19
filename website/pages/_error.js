import React, { Component } from 'react';
import Error from '../private/error';

//https://nextjs.org/docs/advanced-features/custom-error-page

function _Error({ status }) {
  return <Error status={status} />;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default _Error;
