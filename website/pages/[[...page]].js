import React, { Component, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import postMap from '../records/postMap';
import errorMap from '../records/errorMap';

import App from '../components/structure/App';
// import Page from '../components/structure/Page';
import BuiltMapGrid from '../components/structure/BuiltMapGrid';
import PostHeader from '../components/structure/PostHeader';
import PostMain from '../components/structure/PostMain';
import PostRelated from '../components/structure/PostRelated';
import About from '../components/structure/About';
import Posts from '../components/structure/Posts';
import Error from '../components/structure/Error';

import Loading from '../components/Loading';
import useDbGet from '../hooks/useDbGet';

const Post = (props) => {
  const { id } = props;

  const isError = errorMap.includes(id);
  const isPost = postMap.includes(id);

  const info = useDbGet('exact', id);

  if (isError) return <Error status={id} />;
  if (!isPost && !isError) return <Error status={'404'} />;

  const loading = typeof info === 'undefined';
  const currentId = !loading && Object.keys(info)[0];

  return loading ? (
    <Loading height="1000vh" />
  ) : (
    <div style={{ flexDirection: 'column' }}>
      <PostHeader info={info[currentId]} />
      <PostMain info={info[currentId]} />
      <PostRelated info={info[currentId]} />
    </div>
  );
};

const Page = (props) => {
  const positionMap = {
    ['']: [1, 1],
    about: [2, 1],
    pinned: [3, 1],
    posts: [2, 2],
  };

  const router = useRouter();
  const page = ((router.query ?? props).page ?? [])[0] ?? '';

  const [position, setPosition] = useState(positionMap[page] ?? [3, 2]);

  useEffect(() => {
    setPosition(positionMap[page] ?? [3, 2]);
  }, [router]);

  return (
    <App
      title={props.ogTitle}
      description={props.ogDescription}
      image={props.ogImage}
    >
      <BuiltMapGrid
        position={position}
        onPositionChange={async (position) => {
          setPosition(position);

          const key = Object.keys(positionMap).find(
            (key) =>
              positionMap[key][0] == position[0] &&
              positionMap[key][1] == position[1]
          );

          if (key !== undefined) router.push(key + '/');
        }}
        project={positionMap[page] !== undefined ? null : <Post id={page} />}
      />
    </App>
  );
};

// https://nextjs.org/docs/basic-features/data-fetching
// https://nextjs.org/docs/routing/dynamic-routes

// import { promises as fs } from 'fs';

export async function getServerSideProps(router) {
  // const info = JSON.parse(
  //   await fs.readFile(process.cwd() + `/public/${page}/index.json`)
  // );

  return {
    props: {
      // ogTitle: info.title,
      // ogDescription: info.desc,
      // ogImage: `${page}/index.jpg`,
      page: router.query.page ?? [],
    },
  };
}

// //https://nextjs.org/docs/basic-features/data-fetching
// import { promises as fs } from 'fs';

// export async function getStaticProps({ params }) {
//   const id = params.id;
//   const info = JSON.parse(
//     await fs.readFile(process.cwd() + '/public/' + id + '/index.json')
//   );

//   return {
//     props: {
//       ogTitle: info.title,
//       ogDescription: info.desc,
//       ogImage: `${id}/index.jpg`,
//     },
//   };
// }

// //next js scroll restoration not working with getserversideprops
// //https://github.com/vercel/next.js/issues/12530

// export async function getStaticPaths() {
//   //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
//   //necessary to prevent `Conflicting paths returned from getStaticPaths` error
//   const errorMapModified = errorMap.filter(
//     (item) => !['404', '500'].includes(item)
//   );
//   const paths = postMap.concat(errorMapModified).map((id) => ({
//     params: {
//       id: id,
//     },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

export default Page;
