import React, { Component } from 'react';
import { useRouter } from 'next/router';
import pageMap from '../private/api/pageMap';
import getPostInfo from '../private/api/getPostInfo';

import App from '../private/structure/app';
import HeaderPost from '../private/structure/headerPost';
import Aside from '../private/structure/aside';
import Main from '../private/structure/main';
import MainPost from '../private/structure/mainPost';
import Footer from '../private/structure/footer';
import Error from '../private/error';

var Post = (props) => {
  var router = useRouter();
  var { id } = router.query || props;

  //https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
  //if (router.asPath === router.route) return '';
  if (!id) return '';

  if (pageMap.includes(id))
    return (
      <App
        title={props.ogTitle}
        description={props.ogDescription}
        image={props.ogImage}
      >
        <HeaderPost info={(async () => (await getPostInfo([id]))[id])()} />
        <Aside />
        <Main>
          <MainPost id={id} />
        </Main>
        <Footer />
      </App>
    );

  return <Error status={404} />;
};

/*export async function getServerSideProps(context) {
  var { id } = context.params;
  return {
    props: {
      id: id,
    },
  };
}*/

//https://nextjs.org/docs/basic-features/data-fetching
import { promises as fs } from 'fs';

export async function getServerSideProps({ params }) {
  var id = params.id;
  var info = JSON.parse(
    await fs.readFile(process.cwd() + '/public/' + id + '/index.json')
  );

  return {
    props: {
      ogTitle: info.title,
      ogDescription: info.desc,
      ogImage: `${id}/index.jpg`,
    },
  };
}

export default Post;
