import React, { Component, useEffect } from 'react';
import { useRouter } from 'next/router';
import postMap from '../records/postMap';
import errorMap from '../records/errorMap';

import App from '../components/structure/App';
import PostHeader from '../components/structure/PostHeader';
import PostMain from '../components/structure/PostMain';
import RelatedProjects from '../components/structure/RelatedProjects';
import Error from '../components/structure/Error';
import Main from '../components/structure/Main';
import Footer from '../components/structure/Footer';
import Nav from '../components/structure/Nav';

import Loading from '../components/Loading';
import useDbGet from '../hooks/useDbGet';

const Post = (props) => {
  //https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
  const router = useRouter();
  const { id } = router.query || props;

  const isError = errorMap.includes(id);
  const isPost = postMap.includes(id);

  const info = useDbGet('exact', id);

  if (isError) return <Error status={id} />;
  if (!isPost && !isError) return <Error status={'404'} />;

  const loading = typeof info === 'undefined';
  const currentId = !loading && Object.keys(info)[0];

  return (
    <App
      title={props.ogTitle}
      description={props.ogDescription}
      image={props.ogImage}
    >
      {loading ? (
        <React.Fragment>
          <Main>
            <Loading height="1000vh" />
          </Main>
          <Footer github={props.github} />
          <Nav />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <PostHeader info={info[currentId]} />
          <Main>
            <PostMain info={info[currentId]} />
            <RelatedProjects info={info[currentId]} />
          </Main>
          <Footer github={`public/${currentId}/index.md`} />
          <Nav />
        </React.Fragment>
      )}
    </App>
  );
};

import { promises as fs } from 'fs';

export async function getServerSideProps({ params }) {
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

export default Post;
