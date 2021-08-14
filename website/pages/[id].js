import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import postMap from '../private/lib/postMap';
import errorMap from '../private/lib/errorMap';

import App from '../private/structure/App';
import Page from '../private/structure/Page';
import PostHeader from '../private/structure/PostHeader';
import PostMain from '../private/structure/PostMain';
import PostRelated from '../private/structure/PostRelated';
import Error from '../private/structure/Error';

import Loading from '../private/components/Loading';
import dbGet from '../private/lib/dbGet';

const Post = (props) => {
  //https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
  const router = useRouter();
  const { id } = router.query || props;

  const isError = errorMap.includes(id);
  const isPost = postMap.includes(id);

  if (isError) return <Error status={id} />;
  if (!isPost && !isError) return <Error status={'404'} />;

  //https://stackoverflow.com/questions/53819864/how-to-async-await-in-react-render-function
  const [info, updateInfo] = useState();
  useEffect(() => {
    (async () => {
      updateInfo(await dbGet('exact', id));
    })();
  }, [props]);

  const loading =
    typeof info === 'undefined' || typeof info[id] === 'undefined';
  return (
    <App
      title={props.ogTitle}
      description={props.ogDescription}
      image={props.ogImage}
    >
      {loading ? (
        <Page github={`public/${id}/index.md`}>
          <Loading height="1000vh" />
        </Page>
      ) : (
        <React.Fragment>
          <PostHeader info={info[id]} />
          <Page github={`public/${id}/index.md`}>
            <PostMain info={info[id]} />
            <PostRelated info={info[id]} />
          </Page>
        </React.Fragment>
      )}
    </App>
  );
};

//https://nextjs.org/docs/basic-features/data-fetching
import { promises as fs } from 'fs';

export async function getStaticProps({ params }) {
  const id = params.id;
  const info = JSON.parse(
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
  //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
  //necessary to prevent ``Conflicting paths returned from getStaticPaths`` error
  const errorMapModified = errorMap.filter(
    (item) => !['404', '500'].includes(item)
  );
  const paths = postMap.concat(errorMapModified).map((id) => ({
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
