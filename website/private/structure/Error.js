import React, { Component } from 'react';
import errorMap from '../../private/lib/errorMap';

import App from '../../private/structure/App';
import Aside from '../../private/structure/Aside';
import Nav from '../../private/structure/Nav';
import Main from '../../private/structure/Main';
import ErrorMain from '../../private/structure/ErrorMain';

import Loading from '../../private/components/Loading';
import useDbGet from '../../private/lib/useDbGet';

const Error = (props) => {
  var { status } = props || '400';

  const isError = errorMap.includes(status);
  if (!isError) status = '400';

  const info = useDbGet('exact', status);

  const loading =
    typeof info === 'undefined' || typeof info[status] === 'undefined';
  return (
    <App title={'Error'} description={''} image={''}>
      <Aside />
      <Nav />
      <Main>
        {loading ? (
          <Loading height="1000vh" />
        ) : (
          <ErrorMain info={info[status]} />
        )}
      </Main>
    </App>
  );
};

export default Error;
