import React, { Component } from 'react';

import App from '../components/structure/App';
import Page from '../components/structure/Page';
import PostMain from '../components/structure/PostMain';
import PageHeader from '../components/structure/PageHeader';

import Loading from '../components/Loading';
import useDbGet from '../hooks/useDbGet';
import { domain, github } from '../records/consts';

const Legal = () => {
  const id = 'legal';
  const info = useDbGet('exact', id);

  const loading =
    typeof info === 'undefined' || typeof info[id] === 'undefined';

  if (!loading)
    info[id].source = info[id].source
      .replace('LEGAL_JS_YEAR', new Date().getFullYear())
      .replace('LEGAL_JS_DOMAIN', domain)
      .replace('LEGAL_JS_SOURCE', github);

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
