import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import errorMap from '../../private/lib/errorMap';

import App from '../../private/structure/App';
import Page from '../../private/structure/Page';
import ErrorMain from '../../private/structure/ErrorMain';

import Loading from '../../private/components/Loading';
import dbGet from '../../private/lib/dbGet';

var Error = (props) => {
  var { status } = props || '400';

  var isError = errorMap.includes(status);
  if (!isError) status = '400';

  //https://stackoverflow.com/questions/53819864/how-to-async-await-in-react-render-function
  const [info, updateInfo] = useState();
  useEffect(() => {
    const getInfo = async () => {
      updateInfo(await dbGet('exact', status));
    };
    getInfo();
  }, [props]);

  var loading =
    typeof info === 'undefined' || typeof info[status] === 'undefined';
  return (
    <App title={'Error'} description={''} image={''}>
      <Page>
        {loading ? (
          <Loading height="1000vh" />
        ) : (
          <ErrorMain info={info[status]} />
        )}
      </Page>
    </App>
  );
};

export default Error;
