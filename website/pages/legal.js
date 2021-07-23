import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import App from '../private/structure/App';
import Page from '../private/structure/Page';
import PostMain from '../private/structure/PostMain';
import PageHeader from '../private/structure/PageHeader';

import Loading from '../private/components/Loading';
import dbGet from '../private/lib/dbGet';

export default function Legal(props) {
  const id = 'legal';
  //https://stackoverflow.com/questions/53819864/how-to-async-await-in-react-render-function
  const [info, updateInfo] = useState();
  useEffect(() => {
    const getInfo = async () => {
      updateInfo(await dbGet('exact', id));
    };
    getInfo();
  }, [props]);

  var loading = typeof info === 'undefined' || typeof info[id] === 'undefined';
  return (
    <App title="Legal" description="" image="icon.png">
      <br />
      <br />
      <br />
      {loading ? (
        <Page>
          <Loading height="1000vh" />
        </Page>
      ) : (
        <React.Fragment>
          <PageHeader info={info[id]} />
          <Page>
            <PostMain info={info[id]} />
          </Page>
        </React.Fragment>
      )}
    </App>
  );
}
