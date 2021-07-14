import React, { Component } from 'react';
import Error from '../private/structure/Error';

//https://nextjs.org/docs/advanced-features/custom-error-page

function _Error({ status }) {
  return <Error status={status} />;
}

Error.getInitialProps = ({ res, err }) => {
  const status = res ? res.statusCode : err ? err.statusCode : 404;
  return { status };
};

export default _Error;
