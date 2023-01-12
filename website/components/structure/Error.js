import React, { Component } from 'react';
import errorMap from '../../records/errorMap';

import App from './App';
import Nav from './Nav';
import Main from './Main';
import ErrorMain from './ErrorMain';

import Loading from '../Loading';
import useDbGet from '../../hooks/useDbGet';

const Error = (props) => {
  const { status } = props ?? '400';

  const isError = errorMap.includes(status);
  if (!isError) status = '400';

  const info = useDbGet('exact', status);

  const loading =
    typeof info === 'undefined' || typeof info[status] === 'undefined';
  return (
    <App title={'Error'} description={''} image={''}>
      <Main>
        {loading ? (
          <Loading height="1000vh" />
        ) : (
          <ErrorMain info={info[status]} />
        )}
      </Main>
      <Nav />
    </App>
  );
};

export default Error;
