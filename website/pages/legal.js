import React, { Component } from 'react';

import App from '../components/structure/App';
import PostMain from '../components/structure/PostMain';
import Main from '../components/structure/Main';
import Footer from '../components/structure/Footer';
import Nav from '../components/structure/Nav';

import Loading from '../components/Loading';
import useDbGet from '../hooks/useDbGet';
import { domain, github } from '../records/consts';
import PostSubHeader from '../components/structure/PostSubHeader';

// TODO: style legal page from scratch

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
        <React.Fragment>
          <Main>
            <Loading height="1000vh" />
          </Main>
          <Footer github={`public/${id}/index.md`} />
          <Nav />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <PostSubHeader info={info[id]} />
          <br />
          <br />
          <br />
          <Main>
            <PostMain info={info[id]} />
          </Main>
          <Footer github={`public/${id}/index.md`} />
          <Nav />
        </React.Fragment>
      )}
    </App>
  );
};

export default Legal;
