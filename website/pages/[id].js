import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import pageMap from '../private/api/pageMap';

import App from '../private/structure/app';
import Page from '../private/structure/page';
import PostHeader from '../private/structure/postHeader';
import PostMain from '../private/structure/postMain';
import PostRelated from '../private/structure/postRelated';
import Error from '../private/error';

import Loading from '../private/components/loading';
import dbGet from '../private/api/dbGet';

var Post = (props) => {
  //https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
  const router = useRouter();
  var { id } = router.query || props;

  //https://stackoverflow.com/questions/53819864/how-to-async-await-in-react-render-function
  const [info, updateInfo] = useState();
  useEffect(() => {
    const getInfo = async () => {
      updateInfo((await dbGet('exact', id))[id]);
    };
    getInfo();
  }, []);

  if (typeof info === 'undefined')
    return (
      <App
        title={props.ogTitle}
        description={props.ogDescription}
        image={props.ogImage}
      >
        <Page>
          <Loading height="1000vh" />
        </Page>
      </App>
    );

  if (pageMap.includes(id))
    return (
      <App
        title={props.ogTitle}
        description={props.ogDescription}
        image={props.ogImage}
      >
        <Page>
          <PostHeader info={info} />
          <PostMain info={info} />
          <PostRelated info={info} />
        </Page>
      </App>
    );

  return <Error status={404} />;
};

//https://nextjs.org/docs/basic-features/data-fetching
import { promises as fs } from 'fs';

export async function getStaticProps({ params }) {
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

//next js scroll restoration not working with getserversideprops
//https://github.com/vercel/next.js/issues/12530

export async function getStaticPaths() {
  var paths = pageMap.map((id) => ({
    params: {
      id: id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default Post;
