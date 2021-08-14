import React, { Component } from 'react';

import App from '../private/structure/App';
import Page from '../private/structure/Page';
import PostMain from '../private/structure/PostMain';
import PageHeader from '../private/structure/PageHeader';

import Loading from '../private/components/Loading';
import useDbGet from '../private/lib/useDbGet';

const Legal = (props) => {
  const id = 'legal';
  const info = useDbGet('exact', id);

  const loading =
    typeof info === 'undefined' || typeof info[id] === 'undefined';
  return (
    <App title="Legal" description="" image="icon.png">
      <br />
      <br />
      <br />
      {loading ? (
        <Page github={`public/${id}/index.md`}>
          <Loading height="1000vh" />
        </Page>
      ) : (
        <React.Fragment>
          <PageHeader info={info[id]} />
          <Page github={`public/${id}/index.md`}>
            <PostMain info={info[id]} />
          </Page>
        </React.Fragment>
      )}
    </App>
  );
};

export default Legal;
