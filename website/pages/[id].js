import React, { Component } from 'react';
import { useRouter } from 'next/router';
//import getPostInfo from '../private/api/getPostInfo';
import tagMap from '../private/api/tagMap';
import pageMap from '../private/api/pageMap';
import getPostInfo from '../private/api/getPostInfo';

import App from '../private/structure/app';
import HeaderPost from '../private/structure/headerPost';
import HeaderEmpty from '../private/structure/headerEmpty';
import Nav from '../private/structure/nav';
import Aside from '../private/structure/aside';
import Main from '../private/structure/main';
import MainPost from '../private/structure/mainPost';
import MainPosts from '../private/structure/mainPosts';
import Footer from '../private/structure/footer';
import Error404 from '../private/error404';

var Post = (props) => {
  var router = useRouter();
  var { id } = router.query || props;

  //https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
  if (router.asPath === router.route) return '';
  var tag = id.replace(/-/g, ' ');

  if (tagMap[tag] || tag == 'posts')
    return (
      <App>
        <HeaderEmpty />
        <Nav highlight={'posts'} id={id} />
        <Aside />
        <Main>
          <MainPosts tag={tag} />
        </Main>
        <Footer />
      </App>
    );

  if (pageMap.includes(id))
    return (
      <App>
        <HeaderPost info={(async () => (await getPostInfo([id]))[id])()} />
        <Nav highlight={'post'} id={id} />
        <Aside />
        <Main>
          <MainPost id={id} />
        </Main>
        <Footer />
      </App>
    );

  return <Error404 />;
};

export async function getServerSideProps(context) {
  var { id } = context.params;
  return {
    props: {
      id: id,
    },
  };
}

export default Post;
