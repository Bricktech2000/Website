import React, { Component } from 'react';
import { useRouter } from 'next/router';
import getPostInfo from './api/getPostInfo';
import TagMap from '../private/api/tagMap';

import App from '../private/structure/app';
import HeaderPost from '../private/structure/headerPost';
import Nav from '../private/structure/nav';
import Aside from '../private/structure/aside';
import Main from '../private/structure/main';
import MainPost from '../private/structure/mainPost';
import MainPosts from '../private/structure/mainPosts';
import Footer from '../private/structure/footer';

var Post = () => {
  var router = useRouter();
  var { id } = router.query;

  //https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
  if (router.asPath === router.route) return '';
  var tag = id.replace(/-/g, ' ');
  if (TagMap[tag] || tag == 'posts')
    return (
      <App>
        <Nav />
        <Aside />
        <Main>
          <MainPosts tag={tag} />
        </Main>
        <Footer />
      </App>
    );

  return (
    <App>
      <HeaderPost info={getPostInfo(id)} />
      <Nav />
      <Aside />
      <Main>
        <MainPost id={id} />
      </Main>
      <Footer />
    </App>
  );
};

export default Post;
